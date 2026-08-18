import { Lines } from '../components/Lines'
import { Reveal } from '../components/Reveal'
import { STATEMENT } from '../config/content'

/**
 * The turn. After the hero's motion the page goes still and just talks.
 *
 * The botanical sits right and the copy holds the left — which is how the
 * illustration was composed, its whole left half deliberately empty. On
 * narrow screens it drops behind the text at low opacity instead of
 * competing for width.
 */
export function Statement() {
  return (
    <section className="section statement">
      <img className="statement__art" src={STATEMENT.art} alt="" aria-hidden="true" loading="lazy" />

      <div className="wrap wrap--narrow statement__copy">
        <Lines as="h2" className="t-h1 statement__title" lines={[STATEMENT.headline]} />

        <Reveal className="statement__body" stagger delay={0.2}>
          {STATEMENT.body.map((p, i) => (
            <p className="t-lead" key={i}>
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal className="statement__pull" delay={0.3}>
          <hr className="rule" />
          <p className="t-h2 statement__pull-text">{STATEMENT.pull}</p>
        </Reveal>
      </div>
    </section>
  )
}
