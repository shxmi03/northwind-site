# Northwind — Marketing Site

Static marketing site for **Northwind**, an AI-assisted quantitative trading workstation.
Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and TradingView Lightweight Charts.

- **Production:** https://northwind-site-six.vercel.app (auto-deploy on every push to `main`)
- **Mirror:** https://shxmi03.github.io/northwind-site/ (GitHub Pages, same commit, `basePath=/northwind-site`)
- **Repo:** https://github.com/shxmi03/northwind-site

No backend, no server actions, no cookies. `output: 'export'` — everything ships as static HTML/CSS/JS.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into ./out
npx serve out    # preview the exact production bundle
```

`NEXT_PUBLIC_BASE_PATH` is **empty** on Vercel and **`/northwind-site`** on GitHub Pages.
`next.config.ts` reads that env var; components never hardcode a base path — public assets go through
`asset()` in `lib/utils.ts` (or `next/image` / a relative import).

---

## Section map (top → bottom)

| # | Section | Component | Anchor |
|---|---|---|---|
| 1 | Navigation bar (sticky, glass, mobile drawer, theme toggle) | `components/layout/Navbar.tsx` | — |
| 2 | Hero (H1, CTAs, animated terminal + live-looking chart) | `components/sections/Hero.tsx` | `#hero` |
| 3 | Social proof strip (4 illustrative metrics) | `components/sections/SocialProof.tsx` | `#social-proof` |
| 4 | Features — 5 alternating pillars with UI mocks | `components/sections/Features.tsx` | `#features` |
| 5 | MCP endpoint — 9 capability cards + endpoint snippet | `components/sections/McpSection.tsx` | `#mcp` |
| 6 | Explore — community strategies with filter tabs | `components/sections/Explore.tsx` | `#explore` |
| 7 | Brokers — 8 integration targets, 4-step connect flow | `components/sections/Brokers.tsx` | `#brokers` |
| 8 | Pricing — single plan, 8 bullets | `components/sections/Pricing.tsx` | `#pricing` |
| 9 | FAQ — 8 accessible accordions | `components/sections/Faq.tsx` | `#faq` |
| 10 | Final CTA + footer + legal disclaimer | `components/sections/FinalCta.tsx`, `components/layout/Footer.tsx` | — |

Secondary pages: `/privacy`, `/terms`, `/security` (shared shell in `components/layout/LegalPage.tsx`).

### Supporting modules

```
lib/brand.ts          single source of truth: name, tagline, domain, prices, MCP endpoint, socials
lib/content.ts        all copy + demo data (nav, features, MCP cards, strategies, brokers, FAQ)
lib/utils.ts          cn(), asset() base-path helper, signedPct()
components/ui/        Button (rainbow CTA / outline / ghost), Badge, Accordion, TerminalMock,
                      ChartCard, FeatureVisuals (5 UI mocks), Logo, SectionHeading
components/theme/     ThemeProvider (data-theme on <html>) + ThemeToggle
app/globals.css       design tokens, dark/light palettes, rainbow keyframes, reduced-motion guards
```

---

## Interactions

- **Theme toggle** — `data-theme="light|dark"` on `<html>`, persisted in `localStorage`
  (`northwind-theme`), inline `<head>` script prevents a flash of the wrong theme. Dark is the default.
- **Terminal mock** — four tabs (Research / Indicator / Strategy / Backtest), typewriter prompt,
  progressive output reveal, arrow-key tab navigation, full transcript exposed to screen readers.
- **Chart card** — `lightweight-charts` v5 candlestick series over a deterministic synthetic series
  (labelled "Illustrative data"), mock ticks every 2.4 s, re-themed on theme change.
- **FAQ accordion** — `aria-expanded` / `aria-controls`, one panel open at a time.
- **Reduced motion** — every animation (typewriter, chart ticks, rainbow CTA, pulses) stops under
  `prefers-reduced-motion: reduce`.

---

## Deployment

**Vercel (primary):** project `northwind-site` is connected to `shxmi03/northwind-site`, branch `main`.
Push → production build (~60–90 s). Framework preset: Next.js, build command `next build`, no custom
output directory (Vercel serves the static export from `out/` automatically via the Next.js runtime).

**GitHub Pages (mirror):** `.github/workflows/deploy.yml` builds with `NEXT_PUBLIC_BASE_PATH=/northwind-site`
and publishes `out/`. Don't touch that env value or the workflow unless the repo name changes.

CI note: the Pages job runs `npm ci`, so `package-lock.json` must stay in sync when dependencies change.

---

## TODO (needs owner sign-off before launch)

- [ ] **Brand name / domain** — `Northwind` and `northwind.ai` are placeholders. Edit `BRAND` in `lib/brand.ts`
      and `metadataBase` follows via `NEXT_PUBLIC_SITE_URL`.
- [ ] **Pricing** — spec conflict: `DESIGN_SPEC.md` says **$9 first month, then $30/month**, `COPY_SPEC.md`
      says **$29/month**. The build currently shows the DESIGN_SPEC values (`BRAND.planPriceInitial` /
      `BRAND.planPriceMonthly`). Confirm one number, then update `lib/brand.ts`.
- [ ] **Checkout link** — pricing CTA is a `mailto:` placeholder (`CHECKOUT_HREF` in `components/sections/Pricing.tsx`).
      Replace with the Stripe Payment Link when it exists.
- [ ] **Brokers** — the integration list (Interactive Brokers, Alpaca, Tradier, Coinbase, Kraken, E*TRADE,
      Webull, ChoiceTrade) is a target list, not a partnership claim. Confirm legal wording before launch.
- [ ] **Forms** — no forms are wired yet. When signup lands, point it at Formspree (or similar) per brief.
- [ ] **Illustrative figures** — social-proof numbers, strategy returns and chart data are synthetic and
      labelled as such in the UI. Replace with real metrics or keep the labels.
- [ ] **Legal** — `/privacy`, `/terms`, `/security` are drafts pending counsel review.
- [ ] **Analytics** — intentionally not added in phase 1.
