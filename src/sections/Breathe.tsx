import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SCRUB } from '../config/tuning'
import { BREATHE } from '../config/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * The page's pause: a pinned full-bleed section whose video is seeked by
 * scroll position rather than played. Scrolling down blooms the ink,
 * scrolling back draws it in — the reader performs the breath the hero
 * only demonstrates.
 *
 * Things this depends on, all easy to break:
 *
 * 1. The source MUST be all-intra (every frame a keyframe). Ordinary
 *    long-GOP H.264 only seeks to keyframes, so scrubbing snaps between
 *    them and reads as a stutter. See README for the ffmpeg recipe.
 * 2. The pin is built on mount, NOT when the video loads. The pin adds a
 *    ~1.8vh spacer to the document; creating it later — when metadata
 *    happens to arrive — would jump the page under a reader mid-scroll.
 *    So the timeline always exists and the seek is what waits.
 * 3. currentTime is driven through a proxy object that GSAP tweens, not
 *    set straight from scroll progress — ScrollTrigger's scrub smoothing
 *    applies to tweens, and assigning in onUpdate bypasses it entirely.
 * 4. muted + playsInline, AND the priming play/pause below. See primeIOS.
 */
export function Breathe() {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const copy = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = root.current
    const vid = video.current
    if (!section || !vid) return

    // Reduced motion keeps the poster and drops the pin entirely.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      /**
       * iOS Safari will not paint a seeked frame of a video that has
       * never been played — it holds the poster forever no matter how
       * correct currentTime is. Playing it once (muted + inline, which
       * iOS permits without a gesture) and immediately pausing unlocks
       * the decoder. This is THE reason the scrub did nothing on phones.
       *
       * If autoplay is refused anyway — Low Power Mode does this — fall
       * back to priming on the first touch, which always carries a
       * gesture. Both paths are idempotent.
       */
      let primed = false
      const primeIOS = () => {
        if (primed) return
        primed = true
        const p = vid.play()
        if (p && typeof p.then === 'function') {
          p.then(() => vid.pause()).catch(() => {
            primed = false
            window.addEventListener('touchstart', primeIOS, { once: true, passive: true })
          })
        } else {
          vid.pause()
        }
      }

      /**
       * Coalesced seeking. Firing currentTime every frame queues work a
       * phone decoder cannot retire, and the scrub falls progressively
       * further behind the scroll. Instead: hold the latest target, seek
       * only when the previous seek has landed, and reconcile once at the
       * end so a stopped scroll does not leave a stale frame.
       */
      let target = 0
      let inFlight = false

      const pump = () => {
        // Priming leaves a brief window where the element is genuinely
        // playing before its pause() resolves. Playback there would fight
        // the seek, so any stray play state self-corrects here.
        if (!vid.paused) vid.pause()
        if (inFlight || vid.readyState < 1 || !isFinite(vid.duration)) return
        if (Math.abs(vid.currentTime - target) < 0.02) return
        inFlight = true
        vid.currentTime = target
      }

      const onSeeked = () => {
        inFlight = false
        // Scroll may have moved on while that seek was in flight.
        pump()
      }
      vid.addEventListener('seeked', onSeeked)

      const onMeta = () => {
        primeIOS()
        pump()
      }
      vid.addEventListener('loadedmetadata', onMeta)

      /**
       * The clip is 2.8-5MB depending on cut. Attaching src in markup
       * makes every visitor pay that for a section two screens down, so
       * it is attached on approach. 'top bottom' gives a full viewport of
       * lead time; looser starts are already satisfied at scroll 0 on a
       * normal window, which is eager loading wearing a disguise.
       */
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        once: true,
        onEnter: () => {
          if (vid.src) return
          // Chosen once, on approach — not reactive to resize. Swapping
          // the source mid-scroll would drop the buffer and stall.
          vid.src =
            window.innerWidth < SCRUB.mobileWidth ? BREATHE.videoMobile : BREATHE.video
        },
      })

      // Progress 0→1, mapped to duration at update time so the timeline
      // can exist before the video does.
      const state = { p: 0 }

      gsap.to(state, {
        p: 1,
        ease: 'none',
        onUpdate: () => {
          if (vid.readyState >= 1 && isFinite(vid.duration)) {
            target = state.p * vid.duration
            pump()
          }
        },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${SCRUB.scrollLength}`,
          pin: true,
          scrub: SCRUB.scrub,
          invalidateOnRefresh: true,
        },
      })

      // Copy holds, then clears out so the ink finishes uncovered.
      gsap.to(copy.current, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: `top top+=${SCRUB.textFadeStart * 100}%`,
          end: `+=${SCRUB.scrollLength}`,
          scrub: SCRUB.scrub,
        },
      })

      return () => {
        vid.removeEventListener('seeked', onSeeked)
        vid.removeEventListener('loadedmetadata', onMeta)
        window.removeEventListener('touchstart', primeIOS)
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="breathe" ref={root}>
      <video
        className="breathe__video"
        ref={video}
        /* src is attached on approach — see the loader trigger above */
        poster={BREATHE.poster}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="breathe__scrim" aria-hidden="true" />

      <div className="breathe__copy wrap" ref={copy}>
        <p className="t-label breathe__eyebrow">{BREATHE.eyebrow}</p>
        <blockquote className="t-h1 breathe__quote">
          {BREATHE.quote.map((line) => (
            <span key={line}>{line} </span>
          ))}
          <span className="breathe__tail">{BREATHE.tail}</span>
        </blockquote>
      </div>
    </section>
  )
}
