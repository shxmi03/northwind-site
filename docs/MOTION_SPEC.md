# Northwind — Fable 5.1 Motion Design Specification

Implementation of interactive motion graphics on the Northwind landing page
(`app/`, Next.js 16 static export). Everything below is what actually ships in
the repo, not a proposal.

---

## 1. Design intent

Fable 5.1 is applied as a restraint-first motion system:

- **One idea per viewport.** The hero carries the only ambient motion (drifting
  artwork, particles, parallax). Everything below it is quiet: content fades up
  once, then stops.
- **Motion never gates content.** Every animated block has a visible static
  end-state. Nothing depends on JS, observers, or a completed animation.
- **Transform + opacity only.** No animated `width`, `height`, `top`, `left`,
  `filter` (except the 180 ms dropdown blur), or box-shadow geometry. Everything
  composites on the GPU and avoids layout.
- **Cost is proportional to attention.** The hero gets the expensive effects
  because it owns first impression; cards get a 2 px lift and nothing more.

---

## 2. Motion tokens

Defined in `app/globals.css` inside `@theme inline`, so Tailwind utilities and
hand-written CSS share one scale.

| Token | Value | Used for |
| --- | --- | --- |
| `--motion-duration-fast` | 150 ms | hover lifts, button/border colour |
| `--motion-duration-base` | 300 ms | colour + transform state changes |
| `--motion-duration-slow` | 500 ms | scroll reveal (opacity + translate) |
| `--motion-duration-slowest` | 800 ms | hero entrance |
| `--motion-easing-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | all entrances/reveals |
| `--motion-easing-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | ambient loops |
| stagger step | 50–90 ms | lists, stat grids, cards |
| `--reveal-y` | 12–24 px | reveal travel distance |

Hero entrance stagger: badge 0 ms → H1 90 ms → subhead 180 ms → CTAs 270 ms →
trust line 360 ms → workspace mock 450 ms.

---

## 3. Motion inventory

| Primitive | File | Trigger | Behaviour | Reduced motion |
| --- | --- | --- | --- | --- |
| `Reveal` | `components/motion/Reveal.tsx` | enters viewport (10 % visible, −40 px margin) | fade + 24 px rise, 500 ms, one-shot | element is visible from the start; no transition |
| `MotionController` | `components/motion/MotionController.tsx` | page load (after idle) | one shared IntersectionObserver for all reveals + one rAF scroll loop for all parallax layers | adds `reveal-visible` to everything, never starts rAF |
| `Parallax` | `components/motion/Parallax.tsx` | scroll | hero backdrop translates `scrollY × −0.08`, transform only | transform never written |
| `Particles` | `components/motion/Particles.tsx` | viewport intersection + document visible | 20–56 dots, canvas 2D, DPR ≤ 2, starts after `requestIdleCallback` | canvas `display: none`, no rAF |
| Hero entrance | `.entrance` in `globals.css` | page load | `fade-up` 800 ms, staggered via `--entrance-delay` | animation `none` |
| Hero drift | `.hero-drift` | always (after 1.2 s delay) | 14 s translate+scale loop on the 43 KB WebP | animation `none` |
| Card lift | `.micro-lift` | hover / focus-visible | −2 px translate + shadow/border shift, 150 ms; hover only on `(hover: hover)` | no transform |
| Button sheen | `.micro-sheen` | hover / focus-visible | 105° highlight sweep across primary CTA | transition suppressed globally |
| Section heading | `ui/SectionHeading.tsx` | viewport | same reveal primitive, used by every section | visible |
| MCP stage swap | `sections/McpExplainer.tsx` + `.stage-swap` | tab change | 420 ms `fade-up` replay of the whole thread, keyed on stage id | instant swap |
| Accordion panel | `ui/Accordion.tsx` + `.panel-reveal` | expand | 240 ms fade-up; `hidden` attribute retained for a11y | instant |
| Resources dropdown | `layout/Navbar.tsx` + `.dropdown-panel` | open | 180 ms opacity+blur entrance (transform is reserved for centring) | instant |
| Rainbow headline | existing | always | 4 s gradient loop (pre-existing, retained) | disabled via `motion-reduce` |

Scroll reveals applied to: SocialProof stats (4, 80 ms stagger), Features steps
(5 × ~600–700 px blocks), MCP endpoint card, MCP client chips (50 ms stagger),
MCP explainer, Explore strategy cards (70 ms × column), Brokers venues (60 ms ×
column) and steps (70 ms), Pricing card, FAQ, Final CTA.

---

## 4. Breakpoint behaviour (320 → 1440 px)

| Range | Hero backdrop | Hero typography | Reveals / motion |
| --- | --- | --- | --- |
| 320–639 px | artwork 560 px tall, `object-cover`, veil gradient on top | 4xl H1, full-width stacked CTAs | identical reveal timing; hover effects suppressed on touch |
| 640–1023 px | artwork 700 px tall | 5xl H1, side-by-side CTAs | same |
| 1024–1439 px | artwork 820 px tall, 2-col workspace mock | 6xl H1 | same |
| ≥1440 px | content capped at `max-w-7xl`; backdrop full-bleed | 6xl | same |

Verified zero horizontal overflow (`scrollWidth − innerWidth = 0`) at 320, 360,
375, 390, 414, 480, 768, 1024, 1280 and 1440 px.

---

## 5. Fallback strategy

1. **`prefers-reduced-motion: reduce`** — reveals render visible with no
   transition, the parallax loop is never created, the particle canvas is
   `display: none`, hero drift/entrance animations are `none`, and the existing
   global rule zeroes remaining animation/transition durations. Verified: 44/44
   reveal blocks visible at opacity 1 on first paint.
2. **No JavaScript** — reveal styles live inside
   `@media (scripting: enabled)`, so a scripting-disabled engine renders every
   section fully visible; a `<noscript>` style block backstops older engines.
3. **No `IntersectionObserver`** — the deferred chart renders immediately; reveals
   rely on the same API but degrade to visible content because the hidden state
   only applies when scripting is enabled *and* the observer runs; content is
   always present in the DOM for crawlers.
4. **Low-end devices** — the particle field pauses when the hero leaves the
   viewport, the chart is code-split and mounted only when near viewport, and
   the parallax loop only runs while scrolling.
5. **Theme switch** — all motion uses `transform`/`opacity` only, so light and
   dark themes share the same timings and no colour interpolation errors occur.

---

## 6. Why the hero is not a 238-frame AVIF sequence

The brief asked for the existing 238-frame AVIF set. Those frames belong to the
Mallokka hero (1920 px, ~14 MB total) and shipping them here would break the same
brief's hard constraint — mobile LCP < 2.6 s — because 14 MB cannot download,
decode and paint inside a 1.6 Mbps throttle. The brief's other instruction
(“optimise motion graphics to use the existing `hero-visual-800.webp` (43 KB) as
the base”) is the one that was followed:

- **Base asset:** `hero-visual-800.webp`, 43 KB, `fetchpriority="high"`,
  `loading="eager"`, `decoding="async"`, `srcSet` 800/1280 w.
- **Motion:** 14 s CSS drift + scroll parallax (−0.08) + canvas particles.
- **Cost:** ~4 KB of JS (controller + particles) instead of 14 MB of images.
- **If the frame sequence is ever wanted:** the hero markup isolates the backdrop
  in one `Parallax` block, so a frame player can be dropped in there behind a
  `data-motion="frames"` flag without touching any other section. Budget check
  first: 238 frames at 720 px / AVIF q45 lands near 4–5 MB, which is still over
  the mobile LCP budget, so it should ship only behind an explicit
  “enhanced motion” opt-in or on wide viewports with a fast connection.

---

## 7. Accessibility

- A11y score **100/100** on desktop and mobile Lighthouse (unchanged from
  baseline), zero console errors or warnings.
- `aria-live="polite"` region inside the MCP tabpanel announces
  “Stage N of 5: <label>. <answer>” on every stage change; the visual swap alone
  was previously silent to screen readers.
- Explore already had an `aria-live` counter for filtered results; untouched.
- Keyboard: roving tabindex in the MCP tablist (Arrow/Home/End verified), Escape
  closes Resources and restores focus, accordion triggers keep `aria-expanded`,
  all interactive elements keep visible focus rings. Motion never traps focus.
- Decorative layers (`canvas`, backdrop, veil) are `aria-hidden`, `tabIndex={-1}`,
  `pointer-events-none`.
- No new colour pairs were introduced; all motion runs over existing tokens, so
  contrast ratios are unchanged.

---

## 8. Verification results

Environment: production build (`next build`, `output: export`) served through
Caddy with zstd/gzip and immutable asset caching; Lighthouse 12.8.2, Chromium
headless; 4× CPU + slow-4G mobile throttling.

### Lighthouse — desktop

| Category | Score |
| --- | --- |
| Performance | **100** |
| Accessibility | **100** |
| Best practices | **100** |
| SEO | **100** |

FCP 0.3 s · LCP 0.7 s · TBT 0 ms · CLS 0 · Speed Index 0.7 s

### Lighthouse — mobile

| Category | Score (median of 5 runs) |
| --- | --- |
| Performance | **95** (range 89–96) |
| Accessibility | **100** |
| Best practices | **100** |
| SEO | **100** |

Median LCP 2.89 s (range 2.59–3.25 s) · TBT ~110 ms · CLS 0 · Speed Index 2.1 s

### Before / after, same harness

| Metric | Live baseline (Vercel) | Redesign (local prod build) |
| --- | --- | --- |
| Mobile performance | 90–92 | 89–96 (median 95) |
| Mobile LCP | 2.9 s (3 runs, stable) | 2.89 s median / 3.2 s latest run |
| Mobile TBT | 210–270 ms | 100–130 ms |
| Desktop performance | 100 | 100 |
| A11y (both) | 100 | 100 |

**Honest note on the 2.6 s LCP target:** in this harness the *current live site*
measures 2.9 s at the same settings, so 2.6 s is not reproducible here — the
remaining time is render delay from the React bundle and a 249 KB Tailwind
stylesheet on a 4× throttled CPU, not from images (the hero image loads in
~200 ms). The redesign matches the baseline LCP and improves TBT by roughly
100–150 ms; it does not claim sub-2.6 s on this machine.

### Interaction / regression tests (Playwright, Chromium)

- Console: 0 errors, 0 warnings.
- Reveals: 0 → 44/44 visible after scroll; 44/44 visible instantly under reduced motion.
- Parallax: `translate3d(0, 0, 0)` at top → `translate3d(0, −48px, 0)` at 600 px scroll.
- MCP tabs: 5 tabs, click → panel `aria-labelledby` updates, live region announces “Stage 3 of 5: Backtest…”, ArrowRight moves to Trade and keeps focus on the tab.
- Resources: opens with Enter, lists Documentation / API Reference / Changelog / FAQ, Escape closes.
- Accordion: `aria-expanded` toggles and panel animates.
- Overflow: 0 px at 320/360/375/390/414/480/768/1024/1280/1440.

---

## 9. Preservation checklist

| Requirement | Status |
| --- | --- |
| MCP five-stage structure (Research, Build, Backtest, Trade, Monitor) | unchanged — same `MCP_STAGES` data, same APG tabs |
| Resources dropdown (Documentation, API Reference, Changelog, FAQ) | unchanged |
| Primary nav order (Features · MCP · Pricing · Brokers · Resources) | unchanged |
| Hero content and copy | unchanged — only wrapper motion added |
| Pricing, brokers, FAQ, legal pages | unchanged copy, reveal wrappers only |
| GitHub Pages mirror | unchanged: `output: export` + `NEXT_PUBLIC_BASE_PATH` workflow untouched |

---

## 10. Files touched

```
app/globals.css                      motion tokens, keyframes, primitives, reduced-motion guards
app/layout.tsx                       MotionController mount + <noscript> reveal backstop
components/motion/Reveal.tsx         server-side reveal markup (zero client JS per block)
components/motion/MotionController.tsx  one observer + one rAF parallax loop
components/motion/Parallax.tsx       parallax layer markup ([data-parallax])
components/motion/Particles.tsx      idle-started, viewport-paused particle canvas
components/ui/ChartCardDeferred.tsx  code-split chart (drops ~140 KB from first load)
components/ui/ChartCard.tsx          unchanged (now only mounted when near viewport)
components/ui/SectionHeading.tsx     heading wrapped in Reveal
components/ui/Accordion.tsx          panel-reveal animation
components/layout/Navbar.tsx         dropdown-panel entrance
components/sections/Hero.tsx         parallax + particles + entrance stagger + veil
components/sections/{SocialProof,Features,McpSection,McpExplainer,Explore,Brokers,Pricing,FinalCta}.tsx
docs/MOTION_SPEC.md                  this document
docs/screens/{before,after}-*.webp   before/after captures (1440 and 390 px)
```
