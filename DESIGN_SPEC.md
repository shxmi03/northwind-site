# Northwind UI Design System & Technical Specification

> **Operational Handoff Document for Frontend Engineering**  
> **Brand Working Name:** `Northwind` (placeholder configured in `lib/brand.ts`)  
> **Target Deployment:** GitHub Pages (Next.js Static Export, dark mode primary, no server-side features)  
> **Design Parity:** Inspired by `heyastral.ai` structural rhythm, spacing, and micro-interaction patterns.

---

## 1. Brand & Architectural Principles

### 1.1 Brand Centralization (`lib/brand.ts`)
To allow instant re-branding, all brand strings, taglines, domain references, and legal names are centralized in a single configuration file. Components MUST import brand values from `lib/brand.ts` rather than hardcoding string literals.

```typescript
// lib/brand.ts
export const BRAND = {
  name: "Northwind",
  tagline: "AI-powered quantitative trading workstation",
  shortTagline: "Quantitative trading workstation",
  domain: "northwind.ai",
  legalName: "Northwind Trading Technologies Inc.",
  planPriceInitial: "$9",
  planPriceMonthly: "$30",
  planPricePeriod: "month",
  mcpEndpoint: "https://api.northwind.ai/v1/mcp",
  supportEmail: "support@northwind.ai",
  socials: {
    x: "https://x.com/northwind_ai",
    github: "https://github.com/shxmi03/northwind-site",
    discord: "https://discord.gg/northwind"
  }
} as const;
```

### 1.2 Target Stack & Deployment Constraints
- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Export Mode:** `output: 'export'` (Static HTML/CSS/JS export for GitHub Pages)
- **Asset Rules:** `next/image` configured with `unoptimized: true`. No Server Actions, ISR, or edge runtime functions.
- **Theming:** Dark mode is the primary default (`dark`). Light mode is supported via a client-side theme switcher applying `data-theme="light"` or `dark` on `<html>`.

---

## 2. Design Tokens & Visual Foundations

### 2.1 Color Token System
The color system utilizes CSS custom properties with fallback Tailwind utility classes mapping directly to dark and light modes.

```css
:root, [data-theme="dark"] {
  /* Surfaces & Backgrounds */
  --app-canvas: #08090c;
  --app-widget-content-bg: #0d1017;
  --app-widget-inner-bg: #131822;
  --tertiary-surface-bg: #161b26;
  --tertiary-surface-border: #262f3e;
  --app-panel-border: #1e2532;

  /* Accent Blue Palette */
  --astral-primary: #0052ff;
  --astral-blue-700: #1d4ed8;
  --astral-blue-800: #1e40af;
  
  /* Text & Neutral Grays */
  --text-primary: #ffffff;
  --text-secondary: #94a3b8;
  --astral-70: #94a3b8;
  --astral-50: #64748b;
  --astral-30: #334155;
  --astral-20: #1e293b;
  --astral-15: #0f172a;
  --astral-10: #090d16;

  /* Semantic Indicator Colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}

[data-theme="light"] {
  --app-canvas: #f8fafc;
  --app-widget-content-bg: #ffffff;
  --app-widget-inner-bg: #f1f5f9;
  --tertiary-surface-bg: #e2e8f0;
  --tertiary-surface-border: #cbd5e1;
  --app-panel-border: #e2e8f0;

  --astral-primary: #2563eb;
  --astral-blue-700: #1d4ed8;
  --astral-blue-800: #1e40af;

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --astral-70: #475569;
  --astral-50: #64748b;
  --astral-30: #cbd5e1;
  --astral-20: #e2e8f0;
  --astral-15: #f1f5f9;
  --astral-10: #f8fafc;

  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-error: #dc2626;
  --color-info: #2563eb;
}
```

### 2.2 Typography Scale
- **Primary Body Font:** Geist Sans / Inter (`font-sans`)
- **Code, Buttons & Terminal Font:** Geist Mono / JetBrains Mono (`font-mono`)

| Token | Class | Font Size | Line Height | Weight | Usage |
|---|---|---|---|---|---|
| `text-xs` | `text-[12px]` | 0.75rem (12px) | 1.0rem (16px) | 400 / 500 | Badges, micro labels, stats |
| `text-sm` | `text-[14px]` | 0.875rem (14px) | 1.25rem (20px) | 400 / 500 | Navigation links, table cells, descriptions |
| `text-base` | `text-[16px]` | 1.0rem (16px) | 1.5rem (24px) | 400 / 500 | Standard body paragraphs, FAQ body |
| `text-lg` | `text-[18px]` | 1.125rem (18px) | 1.75rem (28px) | 500 / 600 | Card titles, subsection headings |
| `text-xl` | `text-[20px]` | 1.25rem (20px) | 1.75rem (28px) | 600 / 700 | Feature step headers |
| `text-2xl` | `text-[24px]` | 1.5rem (24px) | 2.0rem (32px) | 600 / 700 | Section secondary titles |
| `text-3xl` | `text-[30px]` | 1.875rem (30px) | 2.25rem (36px) | 700 | Section main titles, pricing numbers |
| `text-4xl` | `text-[36px]` | 2.25rem (36px) | 2.5rem (40px) | 700 / 800 | Section H2 headlines |
| `text-5xl` | `text-[48px]` | 3.0rem (48px) | 1.0 (48px) | 800 | Large stats, pricing hero |
| `text-6xl` | `text-[60px]` | 3.75rem (60px) | 1.0 (60px) | 800 | Landing Hero H1 |

### 2.3 Spacing & Container Grid
- **Base Grid:** 4px baseline (`p-1` = 4px, `p-2` = 8px, `p-3` = 12px, `p-4` = 16px, `p-6` = 24px, `p-8` = 32px, `p-12` = 48px, `p-16` = 64px)
- **Max Container Width:** `max-w-7xl` (1280px) centered with `mx-auto px-4 sm:px-6 lg:px-8`

---

## 3. Replicated "Astral" Signature Visual Effects

### 3.1 Rainbow Glow Animated CTA Button (`mk2-action-button`)
The primary action button uses a multi-stop rainbow gradient border, animated background positioning, and a blurred glowing pseudo-element drop shadow.

```tsx
// Tailwind implementation formula for Rainbow CTA
<button className="
  relative group inline-flex items-center justify-center h-10 px-6 
  font-mono text-[14px] uppercase tracking-[0.025em] font-medium text-white 
  rounded-xl overflow-hidden cursor-pointer transition-all duration-200
  bg-[length:200%] border border-[var(--astral-blue-700)]
  bg-[linear-gradient(#0052ff,#0052ff),linear-gradient(90deg,#ff007a,#7928ca,#0070f3,#00dfd8,#ff007a)]
  bg-clip-padding
  hover:shadow-[0_0_20px_rgba(0,82,255,0.4)]
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
  
  /* Inner bevel shadow */
  after:absolute after:inset-0 after:rounded-[inherit]
  after:shadow-[inset_0_1px_0_rgba(142,197,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.34)]
  
  /* Glowing bottom blur effect */
  before:absolute before:inset-x-[14%] before:bottom-0 before:h-[40%] before:max-h-[10px]
  before:bg-[linear-gradient(90deg,#ff007a,#7928ca,#0070f3,#00dfd8,#ff007a)]
  before:bg-[length:200%] before:opacity-50 before:blur-[6px] before:animate-rainbow
">
  <span className="relative z-10 flex items-center gap-2">
    {children}
  </span>
</button>
```

### 3.2 Glassmorphism & Gradient Panels
- **Glass Panel:** `backdrop-blur-md bg-[#0d1017]/80 border border-[#1e2532] shadow-sm rounded-xl`
- **Gradient Glow Border:** `relative before:absolute before:-inset-[1px] before:rounded-xl before:bg-gradient-to-r before:from-blue-600/30 before:to-purple-600/30 before:-z-10`

---

## 4. Section-by-Section Operational Specifications

Below is the complete operational guide for all 10 landing page sections.

---

### Section 1: Navigation Bar (`Navbar.tsx`)

#### Layout & Hierarchy
- **Position:** Sticky top (`sticky top-0 z-50 w-full`)
- **Background:** Glassmorphism `backdrop-blur-lg bg-[#08090c]/80 border-b border-[#1e2532]`
- **Height:** `h-16` (64px)

#### Key Elements
1. **Brand Mark (Left):**
   - Logo icon + Name: `<BRAND.name>` in `font-mono font-bold tracking-wider text-white text-base`
2. **Nav Links (Center Desktop):**
   - `Features`, `MCP`, `Pricing`, `Brokers`, `Explore`
   - Link Class: `text-sm font-medium text-[#94a3b8] hover:text-white transition-colors py-2 px-3`
3. **Controls (Right):**
   - **Theme Toggle:** Button with `Sun`/`Moon` icon (`p-2 rounded-lg border border-[#262f3e] bg-[#161b26] text-[#94a3b8] hover:text-white`)
   - **Sign In:** `text-sm font-mono text-[#94a3b8] hover:text-white px-3 py-2`
   - **Get Started:** Rainbow CTA Button (Small: `h-8 px-4 text-xs`)

#### Responsive Behavior
- Below `md` (768px): Nav links collapse into a Mobile Hamburger Menu toggle (`p-2 text-white`). Mobile drawer slides down with `bg-[#0d1017] border-b border-[#1e2532] p-4 flex flex-col gap-3`.

---

### Section 2: Hero Section (`Hero.tsx`)

#### Layout & Hierarchy
- **Spacing:** `pt-20 pb-16 md:pt-28 md:pb-24`
- **Grid:** Centered hero header + 2-column or wide interactive terminal showcase

#### Key Elements
1. **Hero Headline (H1):**
   - Text: `"Build, test, and launch any trading algorithm."`
   - Class: `text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto text-center leading-[1.1]`
2. **Subheadline:**
   - Text: `"The AI workstation for quantitative traders. Describe strategies in natural language or connect directly via remote MCP endpoint."`
   - Class: `text-lg sm:text-xl text-[#94a3b8] max-w-2xl mx-auto text-center mt-6 leading-relaxed`
3. **CTA Button Group:**
   - Primary: Rainbow CTA (`"Start Trading Now"`)
   - Secondary: Outline Button (`"Trade inside ChatGPT / MCP"`) with ChatGPT/Claude icon
   - Class: `flex flex-col sm:flex-row items-center justify-center gap-4 mt-8`

4. **Interactive Terminal & Chart Workspace Showcase:**
   - Container: `mt-12 max-w-5xl mx-auto rounded-2xl border border-[#1e2532] bg-[#0d1017] shadow-2xl overflow-hidden`
   - **Top Navigation Bar:**
     - Tabs: `[Research]`, `[Indicator]`, `[Strategy]`, `[Backtest]`
     - Tab Class: `font-mono text-xs uppercase px-4 py-3 border-b-2 text-[#94a3b8] hover:text-white transition-all` (Active: `border-[#3b82f6] text-white bg-[#131822]`)
   - **Workspace Body (Grid 1:1 on desktop):**
     - **Left Pane (Terminal Code / Chat):**
       - Monospace code view (`font-mono text-xs text-blue-300 leading-relaxed bg-[#090d16] p-4 font-normal`)
       - Animated typing prompt: `> Northwind.generateStrategy({ ticker: "BTC/USD", indicator: "RSI_MACD_Crossover" })`
     - **Right Pane (Live Interactive Chart Card):**
       - TradingView Lightweight Charts canvas mock
       - Price Ticker: `BTC/USD $94,250.00` + `+4.25%` green badge (`bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-xs`)
       - Performance Overlay stats: `Win Rate: 68.4%` | `Sharpe: 2.14` | `Max DD: -11.2%`

---

### Section 3: Social Proof Strip (`SocialProof.tsx`)

#### Layout & Hierarchy
- **Container:** `py-12 border-y border-[#1e2532] bg-[#0a0c10]/60 backdrop-blur-sm`
- **Grid:** `grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 text-center`

#### Metrics Items
1. **Stat 1:** `10,000+` Active Traders
2. **Stat 2:** `30,000+` Backtests Executed
3. **Stat 3:** `1,000+` Community Strategies
4. **Stat 4:** `24/7` Cloud Strategy Monitoring

#### Styling
- **Number Class:** `text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight`
- **Label Class:** `text-xs uppercase tracking-widest text-[#94a3b8] mt-2 font-medium`

---

### Section 4: Features Showcase (`Features.tsx`)

#### Section Header
- **Title (H2):** `"From question to working strategy."` (`text-3xl sm:text-4xl font-bold text-white text-center`)
- **Subtitle:** `"Five structured steps from natural language query to automated execution."`

#### The 5 Feature Steps (Alternating Layout)
Each step consists of an informational column and a visual UI mock pane (`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12`):

1. **Step 01: Ask — "Build through conversation."**
   - Info: Prompt input interface description.
   - Visual: Chat window mock with user prompt `"Create a momentum strategy for NVDA using 200 EMA and RSI divergence"`.
2. **Step 02: Inspect — "Inspect the generated code."**
   - Info: Pure, readable Python / TypeScript strategy code generation.
   - Visual: Code editor widget with syntax highlighting, line numbers, and safety audit checkmark badge (`Audit Passed`).
3. **Step 03: Test — "Test in the same workspace."**
   - Info: Fast historical backtesting engine with 40,000 bar history.
   - Visual: Backtest simulation card with equity growth curve graph, trade list table, and benchmark comparison.
4. **Step 04: Measure — "Read the full result."**
   - Info: Risk & return analytics (Sharpe ratio, Max Drawdown, Profit Factor, Win Rate).
   - Visual: Analytics metric dashboard card with green/red indicator pills and distribution histogram.
5. **Step 05: Operate — "Watch the market and activity."**
   - Info: 24/7 cloud strategy monitoring, real-time alerts, and broker routing.
   - Visual: Live execution feed card with real-time log entries and webhook event status badges.

#### Step Pill Badge Style
- `font-mono text-xs font-semibold text-[#3b82f6] bg-[#3b82f6]/10 border border-[#3b82f6]/20 px-2.5 py-1 rounded-md inline-block mb-3`

---

### Section 5: Remote MCP Endpoint Section (`McpSection.tsx`)

#### Section Header
- **Pill Badge:** `NORTHWIND MCP ENDPOINT` (`font-mono text-xs uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full`)
- **Title (H2):** `"Bring Northwind into the AI you already use."`
- **Description:** `"Connect ChatGPT, Claude, Cursor, Codex, or Gemini to your quantitative trading workstation using one remote MCP endpoint."`

#### 9 Workflow Cards Grid (`grid grid-cols-1 md:grid-cols-3 gap-6 mt-12`)
1. **Research Card:** Market data queries, news sentiment analysis, ticker scan.
2. **Chart Card:** Automated indicator rendering, pattern detection.
3. **Build Card:** Convert conversation into rule-based strategy logic.
4. **Test Card:** Instant backtest execution directly inside LLM chat windows.
5. **Connect Card:** Secure SnapTrade OAuth brokerage connection management.
6. **Order Card:** Manual order preparation and smart order tickets.
7. **Portfolio Card:** Multi-broker position tracking and real-time PnL monitoring.
8. **Deploy Card:** One-click cloud strategy deployment with auto-scaling.
9. **Events Card:** Webhook notifications, SMS condition alerts, price triggers.

#### Card Styling & Hover Effect
```tsx
<div className="
  group bg-[#0d1017] border border-[#1e2532] rounded-xl p-6 transition-all duration-200
  hover:border-[#3b82f6]/50 hover:bg-[#131822] hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]
  flex flex-col justify-between
">
  <div className="flex items-center justify-between mb-4">
    <Icon className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
    <span className="font-mono text-[10px] text-[#94a3b8] uppercase">MCP Tool</span>
  </div>
  <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
  <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">{description}</p>
  <div className="bg-[#090d16] rounded-lg p-3 border border-[#1e2532] font-mono text-xs text-blue-300">
    {mockChatSnippet}
  </div>
</div>
```

---

### Section 6: Community Strategy Explore (`Explore.tsx`)

#### Layout & Filter Tabs
- **Title (H2):** `"See how your strategy holds up."`
- **Subtitle:** `"Browse public strategies and indicators created by the quantitative trading community."`
- **Filter Tabs:** `All`, `Trend Following`, `Mean Reversion`, `Crypto`, `Options`, `Custom Indicators`
  - Tab Style: `font-mono text-xs px-4 py-2 rounded-lg border border-[#1e2532] bg-[#0d1017] text-[#94a3b8] hover:text-white hover:border-[#3b82f6]` (Active: `bg-[#0052ff] text-white border-[#0052ff]`)

#### Card Grid (`grid grid-cols-1 md:grid-cols-3 gap-6 mt-8`)
- **Card Content:**
  - Header: Strategy Name + Author Handle (`@quant_trader`)
  - Tags: Ticker Badges (`BTC`, `ETH`, `SPY`)
  - Key Metrics Row:
    - **12M Return:** `+142.8%` (`text-emerald-400 font-mono font-bold`)
    - **Sharpe Ratio:** `2.14` (`font-mono text-white`)
    - **Max Drawdown:** `-12.4%` (`font-mono text-slate-400`)
  - Card Action: `"Inspect Logic"` / `"Fork Strategy"` CTA button

---

### Section 7: Supported Brokerages (`Brokers.tsx`)

#### Layout & Hierarchy
- **Title (H2):** `"Connect your brokerage."`
- **Subtitle:** `"Trade directly through supported venues via secure SnapTrade OAuth integration."`

#### Elements
1. **Broker Logo Grid (8 Venues):**
   - Alpaca Paper, E*TRADE, moomoo, Coinbase, tastytrade, Public, Webull, Kraken
   - Grid: `grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8`
   - Item: `bg-[#0d1017] border border-[#1e2532] rounded-xl p-6 text-center flex flex-col items-center justify-center hover:border-blue-500/40 transition-colors`
2. **Featured Partner Promo Banner:**
   - Public brokerage partner card highlighting `$20 Free Stock Offer` upon registration.
   - Styling: `bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between mt-8`
3. **4-Step Connection Process (`grid grid-cols-1 sm:grid-cols-4 gap-4 mt-12`):**
   - Step 1: `Select Venue`
   - Step 2: `OAuth Authorization`
   - Step 3: `Sync Positions & Cash`
   - Step 4: `Enable Strategy Execution`

---

### Section 8: Pricing (`Pricing.tsx`)

#### Layout & Hierarchy
- **Title (H2):** `"Clear pricing. One plan."`
- **Subtitle:** `"Full access to workstation, backtesting engine, MCP endpoint, and brokerage connections."`

#### Pricing Card Specs
- Container: `max-w-xl mx-auto bg-[#0d1017] border border-blue-500/40 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden`
- Top Badge: `ONE COMPLETE PLAN` (`font-mono text-xs uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block mb-4`)
- Price Tag Display:
  - Initial Month: `<BRAND.planPriceInitial>` (e.g. `$9`)
  - Regular Monthly: `then <BRAND.planPriceMonthly>/month` (e.g. `$30/month`)
  - Class: `text-5xl font-extrabold font-mono text-white tracking-tight`
- Subtext: `"No hidden fees. No complicated tiers. Cancel anytime in one click."`

#### 8 Feature Bullets (Checkmark Icon + Text)
1. Unlimited AI strategy research prompts
2. Full backtesting engine with 40,000 bar history
3. 10 active strategy live cloud deployments
4. Unlimited brokerage connections via SnapTrade
5. Remote MCP endpoint (ChatGPT, Claude, Cursor)
6. Real-time condition alerts via SMS & Webhook
7. Interactive TradingView Lightweight Charts
8. Public community strategy library access

#### Primary CTA
- Full-width Rainbow CTA Button: `"Get Started Now"` (`w-full h-12 text-base mt-8`)

---

### Section 9: FAQ Accordion (`Faq.tsx`)

#### Layout & Hierarchy
- **Title (H2):** `"Questions, answered plainly."`
- **Container:** `max-w-3xl mx-auto mt-12 space-y-4`

#### 8 Accordion Questions & Answers
1. **Is Northwind a broker or investment adviser?**
   - *Answer:* No. Northwind is an AI software workstation for strategy research and backtesting. User funds remain securely at connected brokerages.
2. **How does the $9 first month trial work?**
   - *Answer:* You receive complete, unrestricted access to all features for $9 during your first month, renewing at $30/month thereafter.
3. **Which brokerages are supported?**
   - *Answer:* Alpaca, E*TRADE, moomoo, Coinbase, tastytrade, Public, Webull, and Kraken via SnapTrade.
4. **What is the MCP endpoint and how do I set it up?**
   - *Answer:* An Model Context Protocol endpoint that links AI assistants (ChatGPT, Claude, Cursor) directly to your Northwind workstation.
5. **Can I run backtests on historical crypto and equity data?**
   - *Answer:* Yes, backtests support up to 40,000 bars of historical intraday and daily price history.
6. **Are my brokerage credentials safe?**
   - *Answer:* Yes. Northwind never sees or stores passwords. Connections use OAuth authorization tokens managed by SnapTrade.
7. **Can I cancel my subscription anytime?**
   - *Answer:* Yes, cancel instantly with a single click inside your account billing portal.
8. **Does Northwind offer automated order execution?**
   - *Answer:* Yes, live deployed strategies can trigger automated order routing to your authorized broker.

#### Accordion Micro-Interactions
```tsx
<div className="border border-[#1e2532] bg-[#0d1017] rounded-xl overflow-hidden">
  <button 
    onClick={() => toggle(index)}
    className="w-full p-6 text-left flex items-center justify-between font-semibold text-white hover:bg-[#131822] transition-colors"
    aria-expanded={isOpen}
  >
    <span>{question}</span>
    <ChevronDown className={`w-5 h-5 text-[#94a3b8] transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
  </button>
  {isOpen && (
    <div className="px-6 pb-6 text-[#94a3b8] text-sm leading-relaxed border-t border-[#1e2532]/50 pt-4">
      {answer}
    </div>
  )}
</div>
```

---

### Section 10: Final CTA & Footer (`Footer.tsx` & `FinalCta.tsx`)

#### Final Pre-Footer CTA Banner
- **Container:** `my-20 max-w-5xl mx-auto bg-gradient-to-r from-blue-900/30 via-[#0d1017] to-purple-900/30 border border-blue-500/30 rounded-2xl p-10 text-center relative overflow-hidden`
- **Headline:** `"Ready to build your next trading strategy?"` (`text-3xl sm:text-4xl font-bold text-white`)
- **Subtext:** `"Join thousands of quantitative traders building with Northwind."`
- **CTA:** Rainbow CTA Button (`"Start Trading Now"`)

#### Footer Layout (4 Columns)
- **Column 1 (Brand):** Logo, tagline (`<BRAND.tagline>`), copyright `© 2026 <BRAND.legalName>. All rights reserved.`
- **Column 2 (Product):** Terminal, MCP Endpoint, Pricing, Brokerages, Explore
- **Column 3 (Resources):** Documentation, Quickstart, Changelog, System Health
- **Column 4 (Legal & Socials):** Terms of Service, Privacy Policy, Security, X (Twitter), GitHub, Discord

#### Legal Disclaimer Box (Mandatory Footer Banner)
```tsx
<div className="mt-12 pt-8 border-t border-[#1e2532] text-xs text-[#64748b] leading-relaxed max-w-5xl mx-auto text-center">
  <p>
    <strong>Disclaimer:</strong> {BRAND.name} is an AI software technology platform for trading strategy research, backtesting, and workflow automation. {BRAND.name} is not a registered broker-dealer, investment adviser, exchange, or custodian. All investments involve risk, and past performance in backtests is no guarantee of future trading success. Connected brokerage orders are executed under user authorization by independent third-party brokers.
  </p>
</div>
```

---

## 5. Next.js Component Directory Architecture

To ensure modularity and clean separation of concerns, the frontend project should follow this exact component directory structure:

```
/home/ubuntu/workspace/astral-clone/
├── lib/
│   └── brand.ts                    # Centralized brand constants
├── design/
│   └── tokens.json                 # JSON design tokens spec
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Section 1: Navigation bar & Mobile drawer
│   │   └── Footer.tsx              # Section 10: Footer & Legal disclaimer
│   ├── sections/
│   │   ├── Hero.tsx                # Section 2: Hero H1, CTAs, workspace wrapper
│   │   ├── SocialProof.tsx         # Section 3: 4 Stat metrics strip
│   │   ├── Features.tsx            # Section 4: 5 Alternating feature steps
│   │   ├── McpSection.tsx          # Section 5: 9 MCP workflow cards grid
│   │   ├── Explore.tsx             # Section 6: Strategy library cards & filter tags
│   │   ├── Brokers.tsx             # Section 7: Broker logo grid & SnapTrade steps
│   │   ├── Pricing.tsx             # Section 8: Single plan pricing card & bullets
│   │   ├── Faq.tsx                 # Section 9: 8 Accordion Q&A items
│   │   └── FinalCta.tsx            # Section 10: Pre-footer CTA banner
│   └── ui/
│       ├── Button.tsx              # Rainbow CTA & Outline button variants
│       ├── Card.tsx                # Standard glassmorphism card wrapper
│       ├── Badge.tsx               # Status & category pill badges
│       ├── Accordion.tsx           # Reusable accessible accordion item
│       ├── TerminalMock.tsx        # Interactive code editor widget mock
│       └── ChartCard.tsx           # Lightweight chart simulation card
├── app/
│   ├── layout.tsx                  # Root layout, Geist font loading, theme provider
│   └── page.tsx                    # Landing page assembling all 10 sections in sequence
└── DESIGN_SPEC.md                  # This operational design specification
```

---

## 6. Accessibility & Responsive Implementation Guidelines

### 6.1 WCAG AA Compliance Checklist
- **Color Contrast:** All body text meets at least 4.5:1 contrast against dark `#08090c` / `#0d1017` backgrounds. Secondary text `#94a3b8` meets 4.5:1.
- **Touch Targets:** Interactive buttons, accordion triggers, and nav links maintain a minimum target area of `44px x 44px` or `min-h-[44px]`.
- **Keyboard Focus Rings:** All focusable elements implement explicit focus styles (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090c]`).
- **Screen Reader Support:** Expandable sections (Mobile menu, FAQ accordions) supply correct `aria-expanded="true|false"` attributes. Icons use `aria-hidden="true"`.

### 6.2 Reduced Motion
All CSS keyframe animations (such as button rainbow gradient translation) respect the user's OS reduced motion settings via Tailwind's `motion-reduce:animate-none` modifier.

---

## 7. Hand-off Verification Checklist for `frontend-developer`

- [x] Brand strings centralized in `lib/brand.ts`
- [x] All 10 sections documented with layout grids and Tailwind classes
- [x] Rainbow CTA button formula specified with glowing backdrop blur
- [x] Monospace code typography specified for terminal and stats
- [x] Dark mode tokens defined as primary; light mode supported
- [x] `tokens.json` generated in `design/tokens.json`
- [x] Component folder hierarchy established under `components/`
