import { Lines } from '../components/Lines'
import { Reveal } from '../components/Reveal'
import { WORK } from '../config/content'

/** The three services, as cards on cream. */
export function Work() {
  return (
    <section className="section work" id="work">
      <div className="wrap">
        <div className="work__head">
          <Reveal className="t-label">{WORK.eyebrow}</Reveal>
          <Lines as="h2" className="t-h1" lines={[WORK.headline]} />
        </div>

        <Reveal className="work__grid" stagger>
          {WORK.offers.map((o) => (
            <a className="card" href={o.href} key={o.title}>
              <span className="card__meta t-label">{o.meta}</span>
              <h3 className="t-h3 card__title">{o.title}</h3>
              <p className="t-body card__body">{o.body}</p>
              <span className="card__link t-label">
                Learn more
                <span className="card__arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </a>
          ))}
        </Reveal>

        <Reveal className="work__cta" delay={0.2}>
          <a className="btn btn--solid" href={WORK.cta.href}>
            {WORK.cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
