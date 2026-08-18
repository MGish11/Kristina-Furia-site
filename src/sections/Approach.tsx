import { BreathArc } from '../components/BreathArc'
import { Lines } from '../components/Lines'
import { Reveal } from '../components/Reveal'
import { APPROACH } from '../config/content'

/**
 * Deep-green section. The three pillars run as a numbered ladder with
 * the scrubbed breath arc pinned alongside — see BreathArc for why.
 */
export function Approach() {
  return (
    <section className="section section--deep approach" id="approach">
      <div className="wrap">
        <div className="approach__head">
          <Reveal className="t-label">{APPROACH.eyebrow}</Reveal>
          <Lines
            as="h2"
            className="t-h1 approach__title"
            lines={['Growth happens where', 'all of you is considered']}
          />
        </div>

        <div className="approach__grid">
          <div className="approach__aside">
            <BreathArc />
            <Reveal className="approach__caption t-label" delay={0.2}>
              {APPROACH.scrubCaption}
            </Reveal>
          </div>

          <ol className="approach__list">
            {APPROACH.pillars.map((p) => (
              <Reveal as="li" className="pillar" key={p.n}>
                <span className="pillar__n t-label">{p.n}</span>
                <div className="pillar__text">
                  <h3 className="t-h3">{p.title}</h3>
                  <p className="t-body">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
