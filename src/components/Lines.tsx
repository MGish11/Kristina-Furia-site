import { useEffect, useRef } from 'react'
import type { ElementType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LINES } from '../config/tuning'

gsap.registerPlugin(ScrollTrigger)

/**
 * The headline treatment: each line sits in its own overflow-hidden box
 * and rises into view from below the clip, one after the next.
 *
 * Lines are authored explicitly rather than measured from wrapped text.
 * With a display serif the break points are a design decision — letting
 * the browser choose them and then animating whatever it produced gives
 * you a different composition at every viewport width.
 */
export function Lines({
  lines,
  as: Tag = 'h2',
  className = '',
  delay = 0,
}: {
  lines: readonly string[]
  as?: ElementType
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const inners = el.querySelectorAll('.lines__inner')
      gsap.set(inners, { yPercent: 110 })
      gsap.to(inners, {
        yPercent: 0,
        duration: LINES.duration,
        ease: LINES.ease,
        delay,
        stagger: LINES.stagger,
        scrollTrigger: { trigger: el, start: LINES.start, once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [delay])

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span className="lines__line" key={i}>
          {/* Trailing space so the heading extracts as "eight the" rather
              than "eightthe" for screen readers and copy-paste. Each line
              is a block, so the browser collapses it to nothing visually. */}
          <span className="lines__inner">{i < lines.length - 1 ? `${line} ` : line}</span>
        </span>
      ))}
    </Tag>
  )
}
