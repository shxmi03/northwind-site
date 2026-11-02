# UI Finish Gate — Northwind landing (parity vs. heyastral.ai)

**Decision: HOLD**

Site: https://shxmi03.github.io/northwind-site/ · commit `7a1c485`
Reference: https://heyastral.ai/ · checked 2026-11-02 at 1440, 768 and 390 px
Evidence: `docs/screens/` (full pages + per-section crops), `PARITY_CHECKLIST.md`

## Product lens

The reader is an independent retail/quant trader evaluating a paid workstation in under
two minutes. The page has to make one thing undeniable: *the same workspace takes a plain-language
idea to a tested strategy and a staged order, and my AI client can drive it*. The first-read
object is therefore the hero workspace frame (prompt → strategy → chart), and the second is the
MCP demonstration — that is the hook the whole reference is built around. Density should be
compact-but-scannable: traders scan metrics and prompts, they do not read marketing prose.
The page is a preview with placeholder pricing, so every number must read as illustrative and
no integration may read as live.

## Evidence

- Section order and count match the reference exactly (10 sections, same sequence); total page
  height is 10 904 px vs 13 787 px — the opening (hero 70 %, features 56 %) is compressed while
  the lower page is slightly taller (explore 143 %, FAQ 131 %).
- **F1 (blocking):** the MCP section is a 3×3 grid of nine equal-weight cards. The reference's
  signature pattern is a five-pill workflow switcher driving one chat thread — prompt bubble, AI
  explanation, interactive result card. Ours repeats a `MCP TOOL` chip and six type styles per
  card; nothing in the section tells the eye where to start, and the grid could belong to any SaaS.
- **F2 (required):** nav has no Resources dropdown although BRIEF §1 and COPY_SPEC §1 specify one,
  and link order diverges (Pricing is last instead of third).
- **F3 (refinement):** feature blocks are 487 px against the reference's 866 px, so each capability
  is a row rather than a scene. Structure and order are right; the pacing is not.
- Positives verified, not assumed: no horizontal overflow at 320/390/768/1440; no "Astral" text,
  asset or CSS token left in the build; footer + FAQ carry the broker/custodian disclaimer; every
  demo figure on the page carries an illustrative label; brokers now read as venue categories with
  `planned`/`sandbox` status and a "no partnership implied" note; new neutral pills measure 7.4:1
  (dark) and 8.0:1 (light); the mobile trust note was misaligned and is fixed (`7a1c485`).

## Required before PASS

1. **Rebuild MCP as the reference's demo, not a card grid.** Five stage pills (Research, Build,
   Backtest, Trade, Monitor) over one chat thread; each stage stages a user prompt, the assistant
   answer, and a result card built from our existing mock primitives. Map the nine current tools
   into the five stages. Drop the repeated `MCP TOOL` chip and cap each card at three type
   treatments. Verify at 1440 and 390, with keyboard-only operation (APG tablist: arrows, Home/End,
   roving tabindex) and axe clean.
2. **Add the Resources dropdown** (Documentation, API Reference, Changelog, FAQ) with
   `aria-expanded`, Escape-to-close and focus return; mirror it in the mobile drawer. Order the
   primary links as Features · MCP · Pricing · Brokers · Resources.
3. **Re-check rhythm after (1):** if the page now feels top-light, raise feature-block spacing
   toward ~600–700 px per block. Do not pad the hero.

Non-blocking refinements: fading edge on the mobile hero tab strip (630 px of tabs in 322 px);
qualify the pricing bullet about broker API connections against the "planned" broker status;
ship a narrower hero webp for < 640 px (mobile Lighthouse 67, LCP is that image).

## Keep

- Hero: one frame containing tabs, prompt trace and a real candlestick chart, with the accent
  gradient used only on "Automate execution." — product-specific and not the reference's artwork.
- Features: alternating 50/50 blocks sharing one mock-window language (`>_ MODULE · TITLE`,
  `LIVE MOCK`, status chips, parameter tags). The system is consistent across all five blocks.
- Brokers: venue categories with `planned`/`sandbox` under a "no partnership implied" note — honest
  and still visually a grid of eight.
- Pricing: single card, $9 first month explicit next to $30/month, placeholder-pricing note inside
  the card.
- Explore: filter pills with `aria-pressed` + live region, and "illustrative performance" above
  the grid rather than hidden in alt text.

## PASS criteria

- MCP section shows the prompt → answer → result pattern with a five-stage switcher, operable by
  keyboard, at 1440 and 390.
- Nav exposes Resources and follows the reference link order on desktop and in the drawer.
- Feature/MCP rhythm within roughly 15 % of the reference per screen, or a written decision that
  density is intentional.
- No regression: axe 0 violations, Lighthouse a11y 100, no horizontal overflow at 320–1440, no
  Astral traces, disclaimers and illustrative labels intact.
