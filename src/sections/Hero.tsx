import { Breath } from '../components/Breath'
import { Marquee } from '../components/Marquee'
import { Lines } from '../components/Lines'
import { Reveal } from '../components/Reveal'
import { HERO, MARQUEE } from '../config/content'

/**
 * Hero. The breath mark sits behind the type rather than beside it —
 * the headline reads as sitting inside the breath, which is the whole
 * proposition in one image.
 */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__mark">
        <Breath />
      </div>

      <div className="hero__inner wrap">
        <Reveal className="hero__eyebrow t-label">{HERO.eyebrow}</Reveal>

        <Lines
          as="h1"
          className="t-display hero__title"
          lines={[HERO.headline, HERO.headlineTail]}
          delay={0.15}
        />

        <Reveal className="hero__sub t-lead" delay={0.5}>
          {HERO.sub}
        </Reveal>

        <Reveal className="hero__actions" delay={0.65} stagger>
          <a className="btn btn--solid" href={HERO.primary.href}>
            {HERO.primary.label}
          </a>
          <a className="btn btn--ghost" href={HERO.secondary.href}>
            {HERO.secondary.label}
          </a>
        </Reveal>
      </div>

      <div className="hero__marquee">
        <Marquee items={MARQUEE} />
      </div>
    </section>
  )
}
