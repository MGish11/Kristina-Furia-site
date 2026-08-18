import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NAV } from '../config/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fixed header. Transparent over the hero, then picks up a cream
 * ground and a hairline once you have left it.
 */
export function Nav() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const st = ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => el.classList.toggle('nav--stuck', self.scroll() > 80),
    })

    return () => st.kill()
  }, [])

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="nav" ref={ref}>
      <div className="nav__inner wrap">
        <a className="nav__name" href="#top">
          <img className="nav__mark" src={NAV.mark} alt="" aria-hidden="true" />
          {NAV.name}
        </a>

        <nav className={`nav__links${open ? ' nav__links--open' : ''}`}>
          {NAV.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="btn btn--solid nav__cta--mobile" href={NAV.cta.href}>
            {NAV.cta.label}
          </a>
        </nav>

        <a className="btn btn--solid nav__cta" href={NAV.cta.href}>
          {NAV.cta.label}
        </a>

        <button
          className="nav__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className={`nav__bar${open ? ' nav__bar--a' : ''}`} />
          <span className={`nav__bar${open ? ' nav__bar--b' : ''}`} />
        </button>
      </div>
    </header>
  )
}
