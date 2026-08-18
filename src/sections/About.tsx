import { useState } from 'react'
import { Lines } from '../components/Lines'
import { Reveal } from '../components/Reveal'
import { ABOUT, INSTAGRAM } from '../config/content'

/**
 * About. Portrait on the left, bio and credentials on the right.
 *
 * The frame keeps its 4:5 ratio whether or not the photo resolves, so a
 * missing file degrades to the placeholder instead of collapsing the
 * grid. onError rather than a build-time import for the same reason —
 * see ABOUT.portrait.
 */
export function About() {
  const [failed, setFailed] = useState(false)

  return (
    <section className="section about" id="about">
      <div className="wrap about__grid">
        <Reveal className="about__portrait">
          <figure className="portrait">
            {failed ? (
              <span className="portrait__note t-label">Portrait</span>
            ) : (
              <img
                className="portrait__img"
                src={ABOUT.portrait}
                alt={ABOUT.portraitAlt}
                loading="lazy"
                onError={() => setFailed(true)}
              />
            )}
          </figure>
          <a className="about__ig t-label" href={INSTAGRAM}>
            @kristina.furia
            <span className="card__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </Reveal>

        <div className="about__text">
          <Reveal className="t-label">{ABOUT.eyebrow}</Reveal>
          <Lines as="h2" className="t-h1 about__title" lines={ABOUT.headline} />

          <Reveal className="about__body" stagger delay={0.2}>
            {ABOUT.body.map((p, i) => (
              <p className="t-body" key={i}>
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal className="about__creds" delay={0.3}>
            <hr className="rule" />
            <ul>
              {ABOUT.credentials.map((c) => (
                <li className="t-body" key={c}>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
