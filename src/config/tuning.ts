/**
 * Every motion constant on the site.
 *
 * The organising idea: this page is paced like a breath. BREATH below is
 * a real physiological ratio — a longer exhale than inhale is what tips
 * you parasympathetic — and the same ratio is reused as the easing bias
 * everywhere else. Reveals ease OUT slowly for the same reason the ring
 * does. Change BREATH and the whole page changes tempo with it.
 */

export const LENIS = {
  /** Lower than the agency sites. This one should feel unhurried. */
  lerp: 0.07,
  wheelMultiplier: 1,
} as const

/** Seconds. 4-in / 2-hold / 6-out — box-ish, exhale-weighted. */
export const BREATH = {
  in: 4,
  hold: 2,
  out: 6,
  /** Ring scale at the top and bottom of the cycle. */
  minScale: 0.72,
  maxScale: 1,
  /** Opacity of the outer halo at rest and at full inhale. */
  minGlow: 0.25,
  maxGlow: 0.6,
} as const

export const REVEAL = {
  start: 'top 86%',
  duration: 1.1,
  /** Long tail — the visual equivalent of an exhale. */
  ease: 'power3.out',
  y: 24,
  stagger: 0.12,
} as const

/** Per-line mask reveal used on the big headings. */
export const LINES = {
  start: 'top 88%',
  duration: 1.2,
  ease: 'power4.out',
  stagger: 0.09,
} as const

export const PARALLAX = {
  /** Fraction of element height travelled across its scroll span. */
  rate: 0.12,
  ease: 'none',
} as const

export const MARQUEE = {
  /** Pixels per second. Negative scrolls right-to-left. */
  speed: 34,
} as const

/**
 * The pinned ink section. The video is scrubbed by scroll position
 * rather than played, so the visitor's own scroll drives the bloom —
 * forward disperses the ink, back draws it in. Same gesture as the
 * hero ring, but performed by the reader instead of watched.
 */
export const SCRUB = {
  /**
   * How far the section stays pinned. 180% of viewport height means the
   * 8s clip spans a little under two screens of scrolling — fast enough
   * that nobody feels trapped, slow enough to read as a held breath.
   */
  scrollLength: '180%',
  /** Seconds of catch-up. Higher is smoother but laggier on the seek. */
  scrub: 0.6,
  /** Copy fades out across the last third of the pin. */
  textFadeStart: 0.55,
  /** Below this viewport width, serve the 720p cut. */
  mobileWidth: 900,
} as const

/**
 * The approach section's scrubbed arc: a stroked circle that draws itself
 * as you scroll through the three pillars, so the reader is unknowingly
 * pacing a single long breath while reading about pacing breath.
 */
export const ARC = {
  start: 'top 70%',
  end: 'bottom 60%',
  /** Scrub smoothing in seconds. */
  scrub: 0.8,
} as const
