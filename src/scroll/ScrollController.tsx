import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LENIS } from '../config/tuning'

gsap.registerPlugin(ScrollTrigger)

/**
 * Owns smooth scrolling. Renders nothing.
 *
 * Same standard integration as growth-club — no scrollerProxy, because
 * nothing here issues programmatic scrolls that would fight Lenis. Feed
 * Lenis from GSAP's ticker, push every Lenis scroll into ScrollTrigger.
 *
 * lagSmoothing(0) matters — without it GSAP silently skips ticks after a
 * long frame and Lenis visibly jumps.
 */
export function ScrollController() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      lerp: LENIS.lerp,
      wheelMultiplier: LENIS.wheelMultiplier,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Anchor links have to go through Lenis or they teleport.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.6 })
    }
    document.addEventListener('click', onClick)

    ScrollTrigger.refresh()

    if (import.meta.env.DEV) {
      // Debug handles for driving scroll from the console.
      ;(window as unknown as Record<string, unknown>).__lenis = lenis
      ;(window as unknown as Record<string, unknown>).__ST = ScrollTrigger
    }

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
