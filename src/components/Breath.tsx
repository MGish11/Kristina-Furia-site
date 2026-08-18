import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { BREATH } from '../config/tuning'
import { HERO } from '../config/content'

/**
 * The hero mark: three concentric rings on a real breath cycle —
 * 4s in, 2s hold, 6s out, looping. The caption swaps on the phase
 * boundaries, so the page is quietly running a box-breathing prompt
 * whether or not the visitor notices.
 *
 * sine.inOut is not a stylistic pick. Breath volume over time really
 * is close to a sinusoid, and every other ease reads as mechanical
 * next to it — power curves snap at the turn, linear looks like a
 * loading spinner.
 *
 * Pauses when scrolled out of view and under reduced-motion, since an
 * unattended infinite timeline is the one thing on this page that
 * would keep a laptop fan running.
 */
export function Breath() {
  const root = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const rings = el.querySelectorAll<SVGCircleElement>('.breath__ring')
      const glow = el.querySelector('.breath__glow')

      const setLabel = (text: string) => {
        const node = label.current
        if (!node || node.textContent === text) return
        gsap.to(node, {
          opacity: 0,
          duration: 0.45,
          ease: 'sine.inOut',
          onComplete: () => {
            node.textContent = text
            gsap.to(node, { opacity: 1, duration: 0.45, ease: 'sine.inOut' })
          },
        })
      }

      gsap.set([rings, glow], {
        transformOrigin: '50% 50%',
        scale: BREATH.minScale,
      })
      gsap.set(glow, { opacity: BREATH.minGlow })

      const tl = gsap.timeline({ repeat: -1 })

      tl.to([rings, glow], {
        scale: BREATH.maxScale,
        duration: BREATH.in,
        ease: 'sine.inOut',
        onStart: () => setLabel(HERO.breathIn),
      })
        .to(glow, { opacity: BREATH.maxGlow, duration: BREATH.in, ease: 'sine.inOut' }, 0)
        // The hold is dead time on purpose — the pause is the point.
        .to({}, { duration: BREATH.hold })
        .to([rings, glow], {
          scale: BREATH.minScale,
          duration: BREATH.out,
          ease: 'sine.inOut',
          onStart: () => setLabel(HERO.breathOut),
        })
        .to(glow, { opacity: BREATH.minGlow, duration: BREATH.out, ease: 'sine.inOut' }, '<')

      // Only run while the mark is actually on screen.
      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? tl.play() : tl.pause()),
        { threshold: 0 },
      )
      io.observe(el)

      return () => io.disconnect()
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div className="breath" ref={root}>
      <svg className="breath__svg" viewBox="0 0 200 200" aria-hidden="true">
        <circle className="breath__glow" cx="100" cy="100" r="88" />
        <circle className="breath__ring" cx="100" cy="100" r="88" />
        <circle className="breath__ring" cx="100" cy="100" r="64" />
        <circle className="breath__ring" cx="100" cy="100" r="40" />
      </svg>
      <span className="breath__label t-label" ref={label}>
        {HERO.breathIn}
      </span>
    </div>
  )
}
