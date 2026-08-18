import { Lines } from '../components/Lines'
import { Reveal } from '../components/Reveal'
import { COURSE } from '../config/content'

/**
 * The course — the one commercial moment that gets a whole deep section
 * to itself. Modules run as a plain numbered list rather than cards;
 * the offer is already the loudest thing here.
 */
export function Course() {
  return (
    <section className="section section--deep course" id="course">
      <div className="wrap course__grid">
        <div className="course__lead">
          <Reveal className="t-label">{COURSE.eyebrow}</Reveal>
          <Lines
            as="h2"
            className="t-h1 course__title"
            lines={['The Heal', 'Anxiety Course']}
          />
          <Reveal className="t-lead course__sub" delay={0.2}>
            {COURSE.sub}
          </Reveal>
          <Reveal className="t-body course__body" delay={0.3}>
            {COURSE.body}
          </Reveal>
          <Reveal className="course__actions" delay={0.4}>
            <a className="btn btn--solid" href={COURSE.cta.href}>
              {COURSE.cta.label}
            </a>
          </Reveal>
        </div>

        <Reveal className="course__modules" stagger delay={0.2}>
          {COURSE.modules.map((m, i) => (
            <div className="module" key={m}>
              <span className="module__n t-label">{String(i + 1).padStart(2, '0')}</span>
              <span className="module__name">{m}</span>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="wrap">
        <Reveal className="ebook" delay={0.2}>
          <hr className="rule" />
          <a className="ebook__inner" href={COURSE.ebook.href}>
            <div>
              <h3 className="t-h3">{COURSE.ebook.title}</h3>
              <p className="t-body">{COURSE.ebook.sub}</p>
            </div>
            <span className="t-label ebook__link">
              Get the e-book
              <span className="card__arrow" aria-hidden="true">
                →
              </span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
