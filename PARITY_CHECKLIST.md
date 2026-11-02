# Parity Checklist — Northwind vs. heyastral.ai

Reviewed: 2026-11-02 · Site: https://shxmi03.github.io/northwind-site/ (commit `7a1c485`)
Reference: https://heyastral.ai/ · Method: live DOM measurements at 1440 px (section
offsets/heights), full-page screenshots at 390/768/1440, section-by-section visual review,
programmatic checks (overflow, counts, contrast, text presence).
Screenshots: `docs/screens/` · Verdict and findings: `docs/PARITY_REPORT.md`

## 1. Information architecture — 10 sections, in reference order

| # | Reference section (top / height @1440) | Ours (id / top / height @1440) | Height vs ref | Status |
|---|---|---|---|---|
| 1 | Nav (overlay, no layout height) | sticky nav, 65 px | — | PARTIAL — no Resources dropdown |
| 2 | Hero `mk2-hero` 0 / 1710 | `#hero` 65 / 1201 | 70 % | PASS (pattern), tighter |
| 3 | Proof band 1849 / 268 | `#social-proof` 1266 / 202 | 75 % | PASS |
| 4 | Features 2117 / 4331 (5 blocks ≈ 866 each) | `#features` 1468 / 2434 (5 blocks ≈ 487 each) | 56 % | PARTIAL — rhythm |
| 5 | MCP 6448 / 935 + logo strip 209 + chat explainer 1456 | `#mcp` 3902 / 1467 | 56 % (3 bands → 1) | FAIL — interaction model |
| 6 | Community 8839 / 958 | `#explore` 5369 / 1369 | 143 % | PASS |
| 7 | Brokers 9797 / 1091 | `#brokers` 6738 / 976 | 89 % | PASS |
| 8 | Pricing 10888 / 969 | `#pricing` 7714 / 1063 | 110 % | PASS |
| 9 | FAQ 11857 / 832 | `#faq` 8777 / 1089 | 131 % | PASS |
| 10 | Final CTA 12688 / 724 + footer 374 | `#final-cta` 9866 / 475 + footer 564 | 66 % / 151 % | PASS |
| | **Total 13 787 px** | **Total 10 904 px** | **79 %** | |

Rhythm read: sections appear in the reference order and the page reaches every beat, but
the top half of the page runs ~35 % shorter than the reference (hero + features + MCP), while
the bottom half is slightly taller (explore, FAQ, footer). The result is a denser, more
"documentation-like" page and a less cinematic opening than the reference.

## 2. Section-by-section parity

| Item | Reference behaviour | Ours | Status | Note |
|---|---|---|---|---|
| Nav structure | Features · MCP · Pricing · Brokers · Resources (dropdown) | Features · MCP Endpoint · Explore Strategies · Broker Connectivity · Pricing | PARTIAL | Resources dropdown missing; Pricing moved to last |
| Theme toggle | present | present, light/dark verified, `--northwind-*` tokens | PASS | light theme keeps AA contrast |
| Hero first read | massive H1 over cityscape, CTAs, product mock | H1 (gradient on last line), 2 CTAs, one workspace frame with tabs + chart | PASS | mock is visible above the fold at 1440×900 |
| Hero visual background | cityscape horizon + light band (own asset) | grid + light streaks (original asset) | ACCEPTED | IP rule forbids their assets; ours is deliberately calmer |
| Hero terminal tabs | floating pill switcher above the mock | tablist inside the window frame, 4 tabs, APG keyboard model | PASS | at 390 px the strip scrolls horizontally (no fade hint — see R-1) |
| Proof strip | 4 figures | 4 figures + "Illustrative platform figures" label | PASS | honesty label present |
| Features | 5 alternating blocks, each ~866 px, 35/65 text-visual, glowing frame | 5 alternating blocks, ~487 px, 50/50, quiet frame | PARTIAL | same structure and order; different vertical scale |
| MCP hook | headline + "one secure endpoint" + AI-client logo strip + CTA | headline + endpoint chip + 9-card grid | FAIL | see F1 |
| MCP explainer | 5 workflow pills driving a chat thread: prompt → AI answer → result card | 9 equal cards, each with prompt snippet | FAIL | see F1 |
| Explore | community grid, illustrative performance | filters + 7 cards, sparkline, metrics, "illustrative performance" | PASS | equal-weight cards; filters carry the hierarchy |
| Brokers | logo grid + partner offer + 4 steps | 8 venue-category tiles with planned/sandbox + framework banner + 4 steps | PASS | neutral by design — no implied partnership (post reality-check fix) |
| Pricing | one plan, $9 then $30, 8 bullets | one plan, $9 then $30, 8 bullets, placeholder-pricing note | PASS | intro price dominates; recurring price is deliberately quieter |
| FAQ | 8 items, accordion | 8 items, accordion, `aria-expanded`/`aria-controls` | PASS | |
| Final CTA + footer | statement CTA, 4-column footer, disclaimer | statement CTA, 4-column footer, disclaimer | PASS | footer taller than ref (extra legal column content) |
| Disclaimer | "not a broker-dealer / custodian / adviser" | present in footer + FAQ | PASS | verified in DOM text |
| Brand traces | — | no "Astral" in UI text, assets or CSS token names | PASS | token names renamed to `--northwind-*` |
| Responsive | 390/768/1440 | no horizontal overflow at 320/390/768/1440 | PASS | `scrollWidth == clientWidth` at all four |
| A11y | — | Lighthouse a11y 100, axe 0 violations (7 combos) | PASS | measured by accessibility-auditor on this code |
| Performance | — | desktop 94 / mobile 67 (Lighthouse, code-review run) | ACCEPTED RISK | DoD requires desktop ≥ 90; mobile LCP is the hero webp (see R-3) |

## 3. Findings opened by this gate

**F1 — MCP section: card wall instead of the reference's chat-in-chat demo (BLOCKER).**
The reference treats MCP as its signature moment: a 5-pill workflow switcher over a chat
thread that stages *user prompt → AI response → interactive result card*. Ours renders nine
equal-weight cards, each carrying icon + `MCP TOOL` chip + `01. MARKET DATA QUERY` label +
title + description + a prompt box — six typographic treatments per card, repeated nine times.
Everything is equally loud, so nothing leads; the pattern is interchangeable with any SaaS
feature grid. Section is honest and complete, but not at reference parity.

**F2 — Nav is missing the Resources dropdown (REQUIRED).**
BRIEF §1 and COPY_SPEC §1 both specify Resources → Documentation / API Reference / Changelog /
FAQ. The live nav has five flat links; the links exist only in the footer. Reference order is
also Features · MCP · Pricing · Brokers · Resources, ours ends with Pricing.

**F3 — Opening rhythm runs short (REFINEMENT, documented as accepted unless F1 is rebuilt).**
Features blocks are 56 % of reference height (487 px vs 866 px each); hero is 70 %. The page
still reads as a sequence of scenes, but the reference's pacing (one capability per screen) is
not reproduced. If the MCP section is rebuilt (F1), re-check whether the page now opens too
dense; a small increase in block spacing would restore the beat.

**R-1 — Mobile tab strip has no overflow affordance.** `.tablist` is `overflow-x:auto`
(630 px of tabs in 322 px), so tab 3 is cut mid-word at 390 px with no fading edge or scroll hint.

**R-2 — Pricing/brokers copy mismatch.** Pricing lists "Broker API connections for positions
and order staging" as included while the broker section now says integrations are planned.
Either qualify the bullet ("…on general availability") or keep it but link it to the waitlist.

**R-3 — Mobile Lighthouse performance 67** (desktop 94). LCP element is
`assets/images/hero-visual.webp`; a narrower crop/srcset for < 640 px would recover it.
DoD only requires desktop ≥ 90, so this does not block, but it is a real mobile cost.

## 4. Verified green before approval

- All three review cards `done`; a11y (`0a4010c`) and code review (`d1e91d8`) findings applied.
- Reality-check FAIL items fixed in `2bcf940`: broker names replaced by venue categories with
  `planned` / `sandbox` status, visible `illustrative sample` label on the backtest card.
- Live URL 200, no horizontal overflow, no "Astral" text in the rendered page, disclaimer present,
  8 brokers / 9 MCP cards / 8 pricing bullets / 8 FAQ items, nav CTA visible at 1440.
- Deliverables: `docs/screens/ref-desktop-1440.png`, `docs/screens/ours-{390,768,1440}.png`,
  plus per-section crops `ref-*.png` / `ours-*.png`.
