/**
 * Every string on the page.
 *
 * Provenance matters here — see README. Lines marked HERS are Kristina's
 * own words, lifted from kristinafuria.com / bio.site so the rebuild keeps
 * her voice. Lines marked DRAFT are written for this layout and need her
 * sign-off before launch.
 */

export const NAV = {
  name: 'Kristina Furia',
  /** Square crop of the botanical illustration, used as the wordmark. */
  mark: '/mark.webp',
  links: [
    { label: 'Approach', href: '#approach' },
    { label: 'Work With Me', href: '#work' },
    { label: 'The Course', href: '#course' },
    { label: 'Podcast', href: '#podcast' },
    { label: 'About', href: '#about' },
  ],
  cta: { label: 'Book a session', href: 'https://kristinafuria.com/booknow' },
} as const

export const HERO = {
  eyebrow: 'Coach · Therapist · Breathwork Teacher',
  /** HERS — the headline from her current homepage. */
  headline: 'Guiding you back to wholeness',
  /** HERS — second half of the same line, broken out for emphasis. */
  headlineTail: 'so life can feel good again',
  /** DRAFT */
  sub: 'Integrative coaching that works with your mind, your body and your nervous system at the same time — because that is how a person actually changes.',
  primary: { label: 'Book a session', href: 'https://kristinafuria.com/booknow' },
  secondary: { label: 'The Heal Anxiety Course', href: '#course' },
  /** The breath instruction that sits under the hero mark. */
  breathIn: 'Breathe in',
  breathOut: 'Breathe out',
}

/** Modalities ticker. All HERS, drawn from her site and course material. */
export const MARQUEE = [
  'Integrative Coaching',
  'Functional Breathwork',
  'Nervous System Regulation',
  'Somatic Experiencing',
  'Cognitive Retraining',
  '15 Years of Practice',
]

export const STATEMENT = {
  /** HERS — section headline from her current homepage. */
  headline: 'Being human is complex',
  /** DRAFT — written around her "already always responding" line. */
  body: [
    'You are already always responding to the world around you. To pressure, to people, to the things you have not put down yet. Most of that response never reaches language — it happens in your breath, your gut, your shoulders, the hour of the night you wake up.',
    'So when you try to think your way out and nothing moves, that is not a failure of effort. It is a sign that the part of you asking for attention does not speak in thoughts.',
  ],
  /** HERS */
  pull: 'When life asks you to grow, say yes',
  /**
   * Decorative only — the section reads identically without it, so it
   * carries an empty alt and is hidden from assistive tech.
   */
  art: '/botanical-round.webp',
}

export const BREATHE = {
  eyebrow: 'Pause here',
  /**
   * HERS — transcribed from a caption tile on her Instagram grid, so
   * confirm the wording against the original post before launch. The
   * sense is unmistakable; the exact punctuation may not be.
   */
  quote: [
    'When you start knowing what you want,',
    'your body will tell you the ways',
    'it’s not ready for it yet.',
  ],
  /** HERS — the second half of the same caption. */
  tail: 'Then your job becomes to heal it.',
  /** Poster frame, and the reduced-motion / no-JS fallback image. */
  poster: '/breathe-poster.jpg',
  video: '/breathe.mp4',
  /** 720p cut. A phone decoder seeking 1080p all-intra falls behind. */
  videoMobile: '/breathe-mobile.mp4',
}

export const APPROACH = {
  eyebrow: 'The approach',
  /** HERS — section headline from her current homepage. */
  headline: 'Growth happens where all of you is considered',
  /** DRAFT — the three pillars, built from her stated methodology. */
  pillars: [
    {
      n: '01',
      title: 'Mind',
      body: 'Process-oriented coaching that finds the pattern underneath the problem — the recurring thought, the old strategy, the story that stopped being true a while ago.',
    },
    {
      n: '02',
      title: 'Body',
      body: 'Somatic work and functional breathwork. Roughly ninety percent of us breathe in a way that quietly costs us health and clarity. Changing that changes the baseline everything else runs on.',
    },
    {
      n: '03',
      title: 'Nervous System',
      body: 'Regulation first. A dysregulated system cannot integrate insight, which is why understanding yourself perfectly has not been enough. We build capacity before we build anything else.',
    },
  ],
  /** Scrubbed with the breath arc. */
  scrubCaption: 'In for four. Hold. Out for six.',
}

export const WORK = {
  eyebrow: 'Work with me',
  /** DRAFT */
  headline: 'Three ways in',
  /** Titles HERS (her three service cards); descriptions DRAFT. */
  offers: [
    {
      title: 'Short-Term Coaching & Functional Breathwork',
      body: 'A focused container for one thing that needs to move. Assessment, breath retraining and the practices that hold it in place after we finish.',
      meta: 'Focused engagement',
      href: 'https://kristinafuria.com/booknow',
    },
    {
      title: 'Long-Term Coaching',
      body: 'Ongoing depth work for a season of real change — a transition, a rebuild, a version of your life you can feel but have not reached yet.',
      meta: 'Ongoing',
      href: 'https://kristinafuria.com/booknow',
    },
    {
      title: 'Consulting for Service-Based Businesses & Conscious CEOs',
      body: 'For founders whose nervous system is now a business risk. The same work, applied to the person the company runs on.',
      meta: 'For founders & teams',
      href: 'https://kristinafuria.com/booknow',
    },
  ],
  cta: { label: 'Book a session', href: 'https://kristinafuria.com/booknow' },
}

export const COURSE = {
  eyebrow: 'Self-paced',
  /** HERS — product name and subtitle from bio.site. */
  title: 'The Heal Anxiety Course',
  sub: '30 days to regulate your nervous system and repattern anxious thoughts',
  /** DRAFT */
  body: 'Anxiety is a fear of the unknown that overrides the mind and the body at the same time. Thirty days of assessment, breath and cognitive retraining, built to be done alongside your actual life.',
  /**
   * DRAFT — module titles are a reasonable reading of her syllabus graphic
   * but the source image is partly illegible. Confirm before launch.
   */
  modules: [
    'Nervous system assessment',
    'The physiology of breath',
    'Foundational breathwork practices',
    'Functional breathwork',
    'Cognitive retraining',
    'Tools you keep afterward',
  ],
  cta: { label: 'Enroll now', href: 'https://kristinafuria.com/anxietycourse' },
  /** HERS — the e-book from bio.site. */
  ebook: {
    title: 'The Emotional Mastery Playbook',
    sub: 'An e-book on mind/body emotional processing',
    href: 'https://kristinafuria.thrivecart.com/emotionalmasteryplaybook/',
  },
}

export const PODCAST = {
  eyebrow: 'Listen',
  /** HERS */
  title: 'The Worth Living For Podcast',
  /**
   * DRAFT, but built from her own Apple Podcasts show description:
   * "challenge your current best thinking... ask different questions
   * about life and what makes it meaningful". Weekly.
   */
  body: 'Episodes that challenge your current best thinking and ask different questions about what makes a life meaningful — anxiety, motivation, self-esteem, and the practical work underneath them. New episodes weekly.',
  links: [
    { label: 'Apple Podcasts', href: 'https://podcasts.apple.com/us/podcast/the-worth-living-for-podcast/id1896267440' },
    // Share-link tracking params (si / nd / dlsi) stripped — they are a
    // per-session token from whoever copied the link, not part of the URL.
    { label: 'Spotify', href: 'https://open.spotify.com/show/0ClkoYjzgTQTjtAQ8eFTdu' },
  ],
}

/** Her Instagram. Used in the footer and the about section. */
export const INSTAGRAM = 'https://www.instagram.com/kristina.furia'

/** Her Facebook page. Footer only. */
export const FACEBOOK = 'https://www.facebook.com/kristinafuria'

export const ABOUT = {
  eyebrow: 'About',
  /**
   * Lives in public/ rather than src/assets/ on purpose — a missing file
   * 404s quietly instead of failing the build, so the placeholder frame
   * still holds the layout if the photo has not been dropped in yet.
   */
  portrait: '/kristina-portrait.webp',
  portraitAlt: 'Kristina Furia sitting on weathered wooden steps at the beach',
  /**
   * HERS — lifted from her own first line rather than written for the
   * layout. It is the most distinctive sentence in her bio and it earns
   * the display serif in a way a summary headline would not.
   */
  headline: ['I think I was eight', 'the first time it came up'],
  /**
   * HERS — her about page, verbatim and in full. First person, so this
   * section is the one place on the site where she speaks directly.
   * Trim from the end if it runs long; the opening two paragraphs carry
   * the credibility on their own.
   */
  body: [
    'My history supporting people on their healing and growth journeys is a long one. Having known psychology was the path for me from a young age (I think I was 8 years old the first time it came up), I got my Bachelor’s Degree in Psychology and then immediately went on to get my Master’s Degree in Clinical and Counseling Psychology while simultaneously working as a mental health and substance abuse counselor at an outpatient center.',
    'After finishing my Master’s degree, I went on to start a private practice that eventually became an award-winning, seven therapist group practice in Philadelphia, Pennsylvania. Within the context of my practice, I specialized in guiding people beyond depression, anxiety, codependent attachment, and trauma as well as supporting folks through life transitions like career changes, physical moves, and relationship changes (break-ups, engagements, marriages, etc.).',
    'In 2019, I shifted my focus away from my therapy practice and into the coaching space after feeling a very strong intuitive pull to make the transition. Since that time, I’ve supported thousands of people in improving their lives through the power of intentional thought and increasing mind/body awareness.',
    // "from the The Philadelphia School" on her live site — doubled article fixed.
    'In addition to my psychology degrees, I also have 5 years of post-graduate training from The Philadelphia School of Psychoanalysis and am a certified transformational coach and breathwork facilitator.',
    'The last 6 years have been a whirlwind of change that have also included several geographic moves on both sides of the country; I currently live at the beach in Southern Virginia with my dog, Emmi, and cat, James Dean.',
  ],
  /** All HERS — facts drawn from the bio above, pulled out for scanning. */
  credentials: [
    'MS, Clinical & Counseling Psychology',
    '5 years post-graduate training, The Philadelphia School of Psychoanalysis',
    'Certified transformational coach & breathwork facilitator',
    'Founder of an award-winning seven-therapist practice, Philadelphia',
  ],
}

export const CONTACT = {
  /** HERS — her existing section header. */
  headline: 'Begin the journey',
  /** DRAFT */
  sub: 'Start with a session, or start with the course. Either door opens onto the same work.',
  primary: { label: 'Book a session', href: 'https://kristinafuria.com/booknow' },
  secondary: { label: 'Get in touch', href: 'https://kristinafuria.com/contact' },
  socials: [
    { label: 'Instagram', href: INSTAGRAM },
    { label: 'Facebook', href: FACEBOOK },
  ],
  legal: `© ${new Date().getFullYear()} Kristina Furia. All rights reserved.`,
}
