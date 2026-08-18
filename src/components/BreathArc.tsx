import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ARC } from '../config/tuning'

gsap.registerPlugin(ScrollTrigger)

/**
 * A stroked circle that draws itself across the approach section,
 * scrubbed to scroll position rather than to a clock.
 *
 * The idea: reading the three pillars takes about one long breath at
 * normal scroll speed, and the arc closes exactly as the last one
 * lands. The visitor paces a breath while reading about pacing breath.
 * Nobody will consciously notice. That is fine — it still lands.
 *
 * The dash length is derived from the real path length rather than
 * hardcoded, because the circle is sized in viewport units and r is
 * not knowable at author time.
 */
export function BreathArc() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const ctx = gsap.context(() => {
      const path = el.querySelector<SVGCircleElement>('.arc__path')
      if (!path) return

      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: ARC.start,
          end: ARC.end,
          scrub: ARC.scrub,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div className="arc" ref={root} aria-hidden="true">
      <svg className="arc__svg" viewBox="0 0 200 200">
        <circle className="arc__base" cx="100" cy="100" r="94" />
        {/* -90deg start puts the origin at 12 o'clock. */}
        <circle className="arc__path" cx="100" cy="100" r="94" transform="rotate(-90 100 100)" />
      </svg>
    </div>
  )
}
