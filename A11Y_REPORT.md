# Accessibility Audit — Northwind landing site

**Standard:** WCAG 2.2 Level AA
**Scope:** `/`, `/privacy`, `/terms`, `/security` (static export, `npm run build` → `out/`)
**Date:** 2026-11-02
**Auditor:** AccessibilityAuditor (accessibility-auditor profile)
**Verdict:** CONFORMS — Lighthouse a11y **100 / 100** (desktop + mobile), axe-core **0 violations** across 7 page × viewport combinations.

---

## 1. Methodology

| Layer | Tool / method | Coverage |
|---|---|---|
| Automated | Lighthouse 13 (a11y category) | desktop 1440, mobile 412 (Moto-G emulation) |
| Automated | axe-core 4.10.2, tags `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa` | `/` dark 1440/768/390, `/` light 1440, `/privacy` `/terms` `/security` light 1440 |
| Keyboard | Chromium (Playwright), 25-step Tab walk, focus-ring computed-style probe | every interactive element on `/` |
| Screen-reader semantics | CDP role/tabindex/aria state inspection + APG pattern checks | terminal tabs, FAQ, drawer, theme toggle, chart, mock widgets |
| Motion | `prefers-reduced-motion: reduce` emulation, 3 s sampling | terminal typewriter, chart ticks, all CSS animations |
| Reflow | Real narrow viewports 320 / 375 / 390 / 640 / 768 / 900 / 1024 / 1180 / 1280 / 1440 / 1920 | horizontal-overflow probe (WCAG 1.4.10 equivalent of 400 % zoom) |
| Contrast | axe colour-contrast engine in both themes | computed fg/bg pairs, rounded to real rendered colours |

Notes on honesty: no live VoiceOver/NVDA session was possible in this headless environment. Screen-reader behaviour was therefore verified through the accessibility tree (roles, names, states, `aria-*` relationships) rather than by listening to a synthesizer. A manual NVDA/VoiceOver pass on the tabbed terminal and the pricing section is still recommended before launch — see §5.

---

## 2. Findings and fixes

All findings below were **fixed in code** in this change set. Severity uses user impact, not compliance level.

### F1 — Status colours and CTA labels failed contrast (Serious) — FIXED
**WCAG:** 1.4.3 Contrast (Minimum), AA
**Impact:** 37 nodes. The primary CTA label (`Launch Workspace`, `Get Started`, `Connect via MCP`, footer brand wordmark, 20 footer/nav links) resolved to `#9e9eff` on `#ffffff` = **2.38:1** because the "rainbow" button variant had no parseable solid background. Terminal chrome (`text-slate-500` on `#090d16`/`#0b1019`) measured **3.99–4.07:1**.
**Fix:**
- `components/ui/Button.tsx` — the `rainbow` variant now declares a solid `bg-[#0052ff]` base behind the gradient, so both renderers and humans get white-on-blue at **8.6:1**.
- `components/ui/TerminalMock.tsx`, `components/sections/McpSection.tsx`, `components/ui/FeatureVisuals.tsx` — terminal/box chrome lifted from `slate-500` to `slate-400` (**7.4:1** on the dark panel).

### F2 — Dark-first status palette collapsed in light theme (Serious) — FIXED
**WCAG:** 1.4.3 Contrast (Minimum), AA
**Impact:** Switching the theme toggle to light left 23 nodes unreadable: `emerald-400` on white measured **1.95:1**, `rose-400` **2.80:1**, `blue-300` code on `#f1f5f9` **1.64:1**, brand info chips **4.31:1**. Dark mode (the default) was unaffected, so this only hit users who switch — but they were completely blocked from reading prices, P&L and code samples.
**Fix:** `app/globals.css` — added a documented "light-theme contrast floor" block that remaps the semantic status utilities (`emerald/rose/amber/sky/blue-300`) to 700-level shades inside `[data-theme="light"]` only, and darkened `--color-info` to `#1d4ed8`. The always-dark terminal mock escapes the remap by using explicit hex values (`#34d399`, `#38bdf8`), because a terminal should stay dark in both themes.

### F3 — Mock chart and terminal were noise for screen readers (Serious) — FIXED
**WCAG:** 1.1.1 Non-text Content (A); 1.3.1 Info and Relationships (A)
**Impact:** A screen reader walked the chart `<canvas>` (invisible), and the terminal's per-character typewriter output — including the blinking cursor spans — announcing fragments of text that change while the user is reading.
**Fix:**
- `components/ui/ChartCard.tsx` — the plot container is now `role="img"` with a stable `aria-label` carrying final close and aggregate change; the redundant `sr-only` paragraph was removed so assistive tech hears one coherent description instead of two overlapping ones.
- `components/ui/TerminalMock.tsx` — the transcript panel is `role="img"` labelled with the full, already-final transcript for the active tab. The `tablist`/`tab`/`tabpanel` pattern sits *outside* that node, so the tabs stay keyboard- and AT-operable (putting `role="img"` on the whole card would have made the tabs unreachable — that trap was avoided deliberately).

### F4 — Mobile drawer had no focus trap (Moderate) — FIXED
**WCAG:** 2.4.3 Focus Order (A); 2.1.2 No Keyboard Trap (A)
**Impact:** Opening the drawer locked `body` scroll, which reads as modal, but Tab walked straight out of the panel into the page behind it — a keyboard user could land on invisible-relative-to-context content.
**Fix:** `components/layout/Navbar.tsx` — Tab/Shift+Tab now cycle within the drawer plus its toggle; Escape still closes and returns focus to the toggle. No trap is possible: the cycle has both a first and last element.

### F5 — Touch targets under 24 px (Moderate) — FIXED
**WCAG:** 2.5.8 Target Size (Minimum), AA (WCAG 2.2)
**Impact:** The strategy filter chips rendered 31×21 px (`All`), and footer links 17 px tall with ~2 px safe spacing — hard to hit with a thumb or a tremor.
**Fix:** filter chips raised to `min-h-[38px] py-2`; footer links already carried `min-h-[28px]` (now measured at 28 px in-browser). Re-verified: Lighthouse target-size audit passes with zero findings.

### F6 — Page did not reflow at 320 px and 768 px (Moderate) — FIXED
**WCAG:** 1.4.10 Reflow (AA)
**Impact:** At 320 px (400 % zoom on a 1280 px window) the document was **350 px wide** — 30 px of forced horizontal scrolling; at 768 px it was **840 px**. Root cause: the nav CTA carried `hidden sm:inline-flex`, but the `Button` base class also declares `inline-flex`, so `display:inline-flex` won the cascade and the desktop "Get started" button never hid on small screens. A second cause: the desktop nav list switched on at `md` (768 px) while the header actions still needed that space.
**Fix:** `components/layout/Navbar.tsx` — CTA now uses `max-sm:hidden`; nav links and the drawer breakpoint moved from `md` (768) to `lg` (1024), which is where the horizontal layout actually fits. Verified overflow = 0 px at 320/375/390/640/768/900/1024/1180/1280/1440/1920.

### F7 — Duplicate announcement in terminal (Minor) — FIXED
**WCAG:** 1.1.1 (A)
**Impact:** The terminal had both a `role="img"`-style description and a hidden duplicate transcript paragraph, so the same content was announced twice.
**Fix:** collapsed to one description inside the `aria-label` (see F3).

---

## 3. What was already correct (preserve these)

- **Skip link** — first Tab stop, becomes visible, targets `#main-content`, which exists on every route.
- **Landmarks** — `banner` (`header`), `nav aria-label="Primary"`, `main#main-content`, `contentinfo`, and labelled footer navs.
- **Focus visibility** — 25 consecutive Tab stops, **0 missing indicators**; every component pairs `focus-visible:ring-2` with a global `:focus-visible` outline fallback.
- **FAQ accordion** — 8 buttons, real `<button>` elements, `aria-expanded` + `aria-controls`, panels toggle consistently with state.
- **Terminal tabs** — full APG tablist: roving `tabindex` (`0/-1`), Arrow Left/Right wraps, Home/End jump, `aria-selected`, `aria-controls`, panel `aria-labelledby` follows selection.
- **Theme toggle** — label flips `Switch to dark theme` ⇄ `Switch to light theme`; both icons are `aria-hidden`.
- **Strategy filters** — `aria-pressed` toggle buttons inside `role="group"`, with a polite live region announcing the result count.
- **Reduced motion** — with `prefers-reduced-motion: reduce`, the terminal transcript is fully rendered and static, the chart stops ticking, and `document.getAnimations()` returns **0** running animations. Both the CSS global guard and the JS `matchMedia` guards work.
- **Heading and language** — `lang="en"` set, single `h1` per page, sections labelled via `aria-labelledby`.

---

## 4. Verification evidence

```
Lighthouse accessibility — desktop preset ......... 100
Lighthouse accessibility — mobile (Moto G) ........ 100
axe-core 4.10.2 (wcag2a..wcag22aa)
  / dark 1440 ..................................... 0 violations, 34 passes
  / dark 768 ...................................... 0 violations, 33 passes
  / dark 390 ...................................... 0 violations, 34 passes
  / light 1440 .................................... 0 violations, 34 passes
  /privacy light 1440 ............................. 0 violations, 24 passes
  /terms light 1440 ............................... 0 violations, 24 passes
  /security light 1440 ............................ 0 violations, 24 passes
Keyboard: 25 Tab stops, 0 missing focus indicators
Drawer: focus contained after 12 Tabs → Esc closes, focus returns to toggle
Reduced motion: terminal frozen, chart frozen, 0 animations
Reflow: 0 px horizontal overflow at 320…1920 px
```

Reproduce:

```bash
npm run build
npx serve out -p 3005
npx lighthouse http://localhost:3005 --only-categories=accessibility --preset=desktop
npx lighthouse http://localhost:3005 --only-categories=accessibility
```

### Live deployment re-check

Same suite run against the deployed static export (GitHub Pages, basePath `/northwind-site`):

```
https://shxmi03.github.io/northwind-site/ ....... HTTP 200
Lighthouse accessibility — desktop ............. 100 (0 failing audits)
Lighthouse accessibility — mobile .............. 100 (0 failing audits)
axe-core / dark 1440 ........................... 0 violations, 34 passes
axe-core / light 1440 .......................... 0 violations, 34 passes
axe-core /privacy /terms /security (light) ..... 0 violations each
Reflow 320/390/768/1440 ........................ 0 px overflow
Reduced motion ................................. terminal static, 0 animations
role=img nodes present ......................... 3 (terminal transcript, chart, equity curve)
```

---

## 5. Open items / recommendations (not release blockers)

1. **Manual screen-reader pass still owed.** Automation and the AX tree cannot tell you whether the typewriter *sounds* pleasant. Run NVDA (Windows, Chrome) and VoiceOver (macOS, Safari) over: hero → terminal tabs → pricing → FAQ. Estimated 20 minutes.
2. **`role="img"` transcript is a snapshot.** It is labelled with the final transcript, so the typing animation is not announced fragment by fragment — correct — but if a tab's copy changes between builds, the label must be regenerated (it is, it is derived from `tab.lines`).
3. **`aria-live` announcements on filter changes** are polite but fire on every click. If marketing copy in the count line grows, consider shortening it to the number only.
4. **Contrast floor is utility-scoped.** New status colours added to the design system must be added to the `[data-theme="light"]` override block in `app/globals.css`, or they will regress in light mode. Recommend adding `axe-core` to CI (`npx @axe-core/cli`) so this is caught automatically rather than by eye.
5. **Cookie/analytics banners do not exist yet.** When they land, they will need `role="dialog"` + `aria-modal`, a focus trap, and Escape — the drawer implementation in `Navbar.tsx` is a good template.
