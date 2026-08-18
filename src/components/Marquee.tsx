import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MARQUEE as SPEED } from '../config/tuning'

/**
 * Continuous horizontal scroll. The track holds two copies of the list
 * and translates by exactly half its width before wrapping, so the seam
 * never lands mid-item.
 *
 * Deliberately slow — 34px/s. At agency speed it would read as urgency,
 * which is the opposite of what this page is selling.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const half = el.scrollWidth / 2
      if (!half) return

      const tween = gsap.to(el, {
        x: -half,
        duration: half / SPEED.speed,
        ease: 'none',
        repeat: -1,
      })

      return () => tween.kill()
    }, el)

    return () => ctx.revert()
  }, [items])

  const doubled = [...items, ...items]

  return (
    <div className="marquee">
      <div className="marquee__track" ref={track}>
        {doubled.map((item, i) => (
          <span className="marquee__item t-label" key={i} aria-hidden={i >= items.length}>
            {item}
            <span className="marquee__dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}
