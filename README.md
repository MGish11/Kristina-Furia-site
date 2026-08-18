# Kristina Furia

Marketing site for Kristina Furia, MS — coach, therapist and breathwork
teacher. React + Vite + TypeScript, GSAP + Lenis.

```bash
npm install
npm run dev     # http://localhost:5184
npm run build
```

Registered in `../.claude/launch.json` as `kristina`.

Replaces her current Squarespace site at kristinafuria.com.

---

## The idea

Her whole practice is nervous system regulation. So the site is **paced
like a breath** rather than decorated like a wellness page.

One constant drives it — `BREATH` in `src/config/tuning.ts`:

```
in 4s · hold 2s · out 6s
```

That is a real physiological ratio. A longer exhale than inhale is what
tips you parasympathetic, which is the thing she teaches. It shows up in
three places:

**1. The hero mark** (`components/Breath.tsx`) — three concentric rings
on that cycle, with a caption that swaps between "Breathe in" and
"Breathe out" on the phase boundaries. The headline sits *inside* the
rings, so the proposition is legible as one image before a word is read.

**2. The approach arc** (`components/BreathArc.tsx`) — a stroked circle
scrubbed to scroll position, sized so it closes as the third pillar
lands. At normal scroll speed, reading the three pillars takes about one
long breath. Nobody will consciously notice. It still lands.

**3. The ink scrub** (`sections/Breathe.tsx`) — a pinned full-bleed
section whose video is *seeked* by scroll position rather than played.
Scrolling down blooms the ink, scrolling back draws it in. The hero
demonstrates the breath; here the reader performs it.

**4. The easing everywhere else** — reveals run `power3.out` at 1.1s and
the marquee crawls at 34px/s. At agency tempo this page would read as
urgency, which is the opposite of what it sells.

`sine.inOut` on the ring is not a stylistic pick. Breath volume over time
really is close to a sinusoid; power curves snap at the turn and linear
looks like a loading spinner.

Change `BREATH` and the whole page changes tempo with it.

## The scrubbed video

Generated with Higgsfield (`seedance_2_0`, 8s, **4K**, high bitrate,
silent) and then supersampled to 1080p and re-encoded. **The re-encode is not optional.**

Scrubbing seeks the video every frame. Ordinary long-GOP H.264 can only
seek to keyframes — roughly one every two seconds — so the picture snaps
between them and the whole effect reads as a stutter. The fix is
all-intra: every frame its own keyframe.

Run `scripts/encode-scrub.sh`; it does the whole job. The part that
matters is `-g 1 -keyint_min 1 -sc_threshold 0`, which forces every
frame to be a keyframe. `-an` drops the audio, dead weight on a muted
element.

All-intra multiplies file size — that is the trade. **1080p at CRF 23
comes out at 5.0MB, and it is worth it.** An early pass shipped 720p to
save space and read as visibly soft full-bleed; this is a foreground
element, not a background texture.

The master is 4K even though the page ships 1080p. That is deliberate:
downscaling 3840→1920 with `flags=lanczos` averages away the model's
noise, so the result is cleaner than a native 1080p render at the same
bitrate. The 4K itself is unusable on the web — all-intra at that size
runs ~25MB.

Keep the Higgsfield master out of `public/` so it is never shipped.

### The colour grade

Tuned by measuring, not by eye — and **re-tuned for the 4K source**,
which needed a different grade from the first 1080p roll. Do not copy a
grade between renders without re-measuring:

| | 1080p roll | 4K roll |
|---|---|---|
| raw ground | `#D9CEBD` | `#D8CDB5` |
| raw ink | vivid kelly green | already muted forest |
| saturation | 0.60 (heavy) | 0.85 (light touch) |
| blue balance | `-0.015` (blue-heavy) | `+0.05` (blue-deficient) |

Putting the palette into the prompt is what changed it — the 4K render
lands the ink on-register already, so the old `0.60` would flatten it.
Both still need the same lift: the raw ground is darker than `--cream`.

```
eq=brightness=0.11:saturation=0.85,colorbalance=rh=0.01:bh=0.05
```

Lands the ground on `#F2E8D9` against a `#F1E8DC` target and lifts the
ink core to `#2C362F` rather than crushing it to black.

To re-tune after changing the source, sample with a 1x1 crop:

```bash
ffmpeg -v error -i frame.jpg -vf "crop=300:300:60:120,scale=1:1" -f rawvideo -pix_fmt rgb24 - | xxd -p
```

Because the graded ground is cream, the section is styled as a **cream**
section with dark ink in it — `--deep` type at 8.3:1, and a left-to-right
cream wash that protects the text column as the bloom spreads. An earlier
version had this inverted (dark scrim, cream type) and the quote sat
invisible on a cream bloom.

The Higgsfield render also comes back as **HEVC**, which Chrome will not
decode — so the transcode is doing double duty and is not skippable even
if you stop caring about seek accuracy.

Four things in `Breathe.tsx` that are easy to break:

- **The pin is built on mount, not when the video loads.** The pin adds a
  1.8vh spacer to the document. Building it later — whenever metadata
  happened to arrive — jumps the page under a reader mid-scroll. The
  timeline always exists; the *seek* is what waits on the video.
- The tween runs progress 0→1 and multiplies by `duration` at update
  time, which is what lets it exist before the video does.
- `currentTime` is driven through a proxy object GSAP tweens, **not**
  assigned straight from scroll progress. ScrollTrigger's `scrub`
  smoothing only applies to tweens; assigning in `onUpdate` bypasses it
  and you get raw, jittery seeking.
- **`muted` + `playsInline` are necessary but NOT sufficient on iOS.**
  Safari will not paint a seeked frame of a video that has never been
  played — it holds the poster forever no matter how correct
  `currentTime` is. `primeIOS()` plays it once (which iOS permits
  muted + inline, without a gesture) and immediately pauses, unlocking
  the decoder. This was why the scrub did nothing on phones. If autoplay
  is refused anyway — Low Power Mode does this — it re-primes on the
  first touch, which always carries a gesture.
- **Seeks are coalesced, not fired every frame.** Assigning `currentTime`
  on every tick queues work a phone decoder cannot retire, and the scrub
  falls progressively further behind the scroll. `pump()` holds the
  latest target, seeks only once the previous seek has landed, and
  reconciles on `seeked` so a stopped scroll never leaves a stale frame.
- `pump()` also pauses any stray playback. Priming leaves a brief window
  where the element really is playing before its `pause()` resolves, and
  playback there fights the seek.

### Two cuts

`public/breathe.mp4` is 1080p / 5.0MB; `public/breathe-mobile.mp4` is
720p / 2.8MB. Below `SCRUB.mobileWidth` (900px) the phone cut is served —
a phone decoder seeking 1080p all-intra falls behind and the scrub
stutters. Both are all-intra; the script verifies each and shouts if
either is not.

The choice is made **once, on approach** — not reactively on resize.
Swapping `src` mid-scroll drops the buffer and stalls the scrub.

`src` is attached on approach at `top bottom` rather than in markup, so
the file is not charged to every visitor for a section two screens down.
Looser starts (`bottom+=100%`) are already satisfied at scroll 0 on a
normal window — eager loading wearing a disguise.

Reduced motion drops the pin and the scrub entirely and lets the poster
frame carry the section.

Measured after encoding: seek error 0.000s at every sample, and scroll
progress 0/0.25/0.5/0.75/1 maps to 0.00/2.01/4.02/6.03/8.04s exactly.
If you re-encode and those stop being exact, the `-g 1` flags are gone.

## The botanical

Client-supplied illustration, `media/botanical-source.png` (1672x941 PNG,
1.5MB). Two derivatives ship, both WebP:

| file | what | size |
|---|---|---|
| `public/botanical-round.webp` | 900px square crop, whole tree | 38KB |
| `public/mark.webp` | 128px square crop, canopy + trunk | 3.4KB |

**Statement section.** Rendered as a circle. The square is cut in ffmpeg
(`crop=941:941:731:0` — the full frame height at native resolution, no
upscale) rather than left to `object-fit`, because a centre crop of the
16:9 original slices the tree. The circle then trims only the soft empty
corners.

```bash
ffmpeg -i media/botanical-source.png -vf "crop=941:941:731:0,scale=900:900:flags=lanczos" -c:v libwebp -quality 82 public/botanical-round.webp
```

It sits fully inside the section rather than bleeding off the edge — a
circle clipped by the viewport reads as a mistake where a rectangle did
not. At >=60rem the copy drops its auto margins and is capped at
`min(38rem, 54%)` so text clears the curve with ~107px to spare; the
earlier rectangle could be overlapped harmlessly because its left edge
was empty, but text crossing a curved edge looks like an accident.

Below 60rem there is no room beside the text, so it centres behind it at
0.38 opacity.

Note `max-width: none` on `.statement__art` — the global
`img { max-width: 100% }` otherwise caps the mobile `width: 108%` at the
section width and ignores the rule silently.

**Nav mark.** A crop, not a logo. The source is watercolour linework with
fine radial threads, and at 34px those do not survive — it reads as an
organic shape rather than a legible tree, which is the most this asset
can do at that size. If a real wordmark is ever wanted it should be drawn
as vector, not cropped from this.

The crop needs no cutout: the illustration's own ground is cream, so it
sits on the nav directly, with `mix-blend-mode: multiply` removing the
last of the seam once the nav picks up its translucent background.

Both are decorative — empty `alt`, `aria-hidden` — because the sections
read identically without them.

## Where the design came from

Palette and type scale were traced from the **Velora Wellness** Framer
template (`velora-wellness.framer.website`) by measuring the live DOM —
not copied from it. No assets, code, copy, layout or components came
across. What was taken is technique and hex values, neither of which is
protectable:

| | measured | used as |
|---|---|---|
| ground | `rgb(241,232,220)` | `--cream` |
| display / inverted sections | `rgb(49,71,58)` | `--deep` |
| body copy | `rgba(49,71,58,0.7)` | `--deep-70` |
| display face | Cormorant Garamond, 400/500 | `--font-display` |
| display tracking | `-1.92px` on `48px` | `--track: -0.04em` |
| scale @1440 | 90 / 68 / 48 / 28 / 20 / 16 / 12 | the `.t-*` classes |
| radii | 4px, 8px | `--radius`, `--radius-lg` |

Two deliberate departures:

- **`--clay: #b9846a`** — the reference has no accent. Hers needed one,
  pulled from the blush/tan blocks in her Instagram grid. It is used
  only on the breath ring, the numerals and the credential bullets.
- **The breath.** Velora is a static calm page. The motion system here
  is ours and is the reason this site exists rather than another one.

The template is $29 on the Framer marketplace if you want the original
to compare against.

## The three things that carry the look

Change anything else before you change these.

1. **Cormorant Garamond at `-0.04em`, every display size.** The serif
   needs the tightness to read as one mass rather than as letters.
2. **Display line-height at 0.95–1.0.** Same reason.
3. **Whole-section colour inversion**, cream → deep green → cream. The
   `.section--deep` block in `global.css` re-points every type token at
   once; never hand-colour type inside a deep section.

## Structure

```
src/
  config/content.ts   every string on the page
  config/tuning.ts    every motion constant
  scroll/             Lenis + ScrollTrigger wiring
  components/         Breath, BreathArc, Lines, Reveal, Marquee
  sections/           Nav, Hero, Statement, Approach, Work,
                      Course, Podcast, About, Contact
  styles/global.css   tokens + type scale
  styles/sections.css layout
```

`Lines` takes explicitly authored line breaks rather than measuring
wrapped text. With a display serif the break points are a design
decision — letting the browser choose them and animating whatever it
produced gives a different composition at every viewport width.

## Before this goes live

**Copy.** `config/content.ts` marks every string `HERS` or `DRAFT`.
`HERS` is lifted from kristinafuria.com / bio.site so the rebuild keeps
her voice — those are safe. `DRAFT` is written for this layout and needs
her sign-off.

The About section is entirely `HERS`, verbatim and first person — the
one place on the site where she speaks directly. Her live site reads
"from the The Philadelphia School of Psychoanalysis"; the doubled
article is corrected here. Everything else is untouched, including the
parentheticals and the em-dash-free punctuation, which are hers.

**Course modules.** `COURSE.modules` is a reasonable reading of her
syllabus graphic, but the source image is partly illegible. Confirm the
six titles with her before launch.

**Portrait.** In place at `public/kristina-portrait.webp` (2000×2000,
231 KB). The frame holds 4:5 whether or not the file resolves and falls
back to an empty frame if it goes missing, so the layout never shifts.
The 2000px source is well over what the frame needs (~700px at 2×) —
worth downscaling before launch, though 231 KB is not urgent.

**Links.** Podcast URLs point at the Apple/Spotify homepages — swap in
her actual show URLs. Instagram is real and live. Facebook was dropped
rather than left pointing at the site root; add it back to
`CONTACT.socials` once you have the real URL. The booking, course and
e-book links are real and already live.

## Verified

`npm run build` clean. Rendered at 1280×720 and 375×812: no console
errors, no horizontal overflow, grids collapse to one column, hamburger
takes over at 48rem. The breath cycle runs and swaps its caption
correctly.

The browser pane was hidden during the session, which pauses
`requestAnimationFrame` — so the mobile menu's open/close transition and
the scrubbed arc were verified as CSS/DOM state rather than driven
interactively. Worth a manual pass on both.
