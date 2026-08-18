import { Lines } from '../components/Lines'
import { Reveal } from '../components/Reveal'
import { PODCAST } from '../config/content'

/**
 * Podcast. Deliberately light — one line, two links, no player embed.
 * An iframe here would drag a third-party stylesheet into the calmest
 * part of the page and undo the whole palette.
 */
export function Podcast() {
  return (
    <section className="section podcast" id="podcast">
      <div className="wrap wrap--narrow podcast__inner">
        <Reveal className="t-label">{PODCAST.eyebrow}</Reveal>
        <Lines as="h2" className="t-h1 podcast__title" lines={['The Worth', 'Living For Podcast']} />
        <Reveal className="t-lead podcast__body" delay={0.2}>
          {PODCAST.body}
        </Reveal>
        <Reveal className="podcast__links" stagger delay={0.3}>
          {PODCAST.links.map((l) => (
            <a className="btn btn--ghost" href={l.href} key={l.label}>
              {l.label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
