import { useEffect, useRef } from 'react'
import type { ElementType, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { REVEAL } from '../config/tuning'

gsap.registerPlugin(ScrollTrigger)

/**
 * Appear-on-scroll: opacity + a short rise, on a long out-ease.
 *
 * `stagger` walks the element's direct children instead of moving the
 * wrapper, which is what you want for grids and lists.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  stagger = false,
  delay = 0,
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  stagger?: boolean
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : [el]
      gsap.set(targets, { opacity: 0, y: REVEAL.y })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: REVEAL.duration,
        ease: REVEAL.ease,
        delay,
        stagger: stagger ? REVEAL.stagger : 0,
        scrollTrigger: { trigger: el, start: REVEAL.start, once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [stagger, delay])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
