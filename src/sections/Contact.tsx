import { Lines } from '../components/Lines'
import { Reveal } from '../components/Reveal'
import { CONTACT, NAV } from '../config/content'

/** Closing CTA and footer, on deep green. */
export function Contact() {
  return (
    <footer className="section section--deep contact" id="contact">
      <div className="wrap contact__inner">
        <Lines as="h2" className="t-display contact__title" lines={[CONTACT.headline]} />

        <Reveal className="t-lead contact__sub" delay={0.2}>
          {CONTACT.sub}
        </Reveal>

        <Reveal className="contact__actions" stagger delay={0.3}>
          <a className="btn btn--solid" href={CONTACT.primary.href}>
            {CONTACT.primary.label}
          </a>
          <a className="btn btn--ghost" href={CONTACT.secondary.href}>
            {CONTACT.secondary.label}
          </a>
        </Reveal>
      </div>

      <div className="wrap contact__foot">
        <hr className="rule" />
        <div className="contact__foot-row">
          <span className="t-label">{NAV.name}</span>
          <div className="contact__socials">
            {CONTACT.socials.map((s) => (
              <a className="t-label" href={s.href} key={s.label}>
                {s.label}
              </a>
            ))}
          </div>
          <span className="t-label">{CONTACT.legal}</span>
        </div>
      </div>
    </footer>
  )
}
