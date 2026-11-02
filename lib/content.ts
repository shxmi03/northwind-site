import type { LucideIcon } from "lucide-react";
import {
  Binary,
  Bot,
  Braces,
  Code2,
  Compass,
  Database,
  Gauge,
  LineChart,
  ListOrdered,
  Plug,
  Radar,
  Repeat,
  ScanSearch,
  SlidersHorizontal,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export type NavLink = { label: string; href: string };

/** Primary links, in the reference order: Features · MCP · Pricing · Brokers. */
export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "MCP", href: "#mcp" },
  { label: "Pricing", href: "#pricing" },
  { label: "Brokers", href: "#brokers" },
];

/**
 * Resources dropdown (BRIEF §1 / COPY_SPEC §1). Every target resolves: three
 * in-page sections plus the changelog route, so no link 404s on GitHub Pages.
 */
export const NAV_RESOURCES: NavLink[] = [
  { label: "Documentation", href: "#features" },
  { label: "API Reference", href: "#mcp" },
  { label: "Changelog", href: "/changelog" },
  { label: "FAQ", href: "#faq" },
];

/* -------------------------------------------------------------------------- */
/*  Section 2 — Hero terminal tabs                                            */
/* -------------------------------------------------------------------------- */

export type HeroTab = {
  id: string;
  label: string;
  /** Lines typed into the left terminal pane. */
  lines: { kind: "prompt" | "out" | "ok" | "code" | "meta"; text: string }[];
};

export const HERO_TABS: HeroTab[] = [
  {
    id: "research",
    label: "01. Research",
    lines: [
      { kind: "prompt", text: 'Show 14-day RSI divergence on AAPL with 200-day SMA trend filter.' },
      { kind: "meta", text: "resolving symbol · AAPL · daily candles" },
      { kind: "out", text: "identified 3 divergence points on daily candles" },
      { kind: "ok", text: "trend filter active (close > SMA200)" },
    ],
  },
  {
    id: "logic",
    label: "02. Strategy Logic",
    lines: [
      { kind: "prompt", text: "Generate rule-based strategy from the previous research step." },
      { kind: "code", text: "export const strategy = {" },
      { kind: "code", text: '  name: "RSI Trend Breakout",' },
      { kind: "code", text: "  entry: (bar) => bar.rsi(14) < 30 && bar.close > bar.sma(200)," },
      { kind: "code", text: "  exit: (bar) => bar.rsi(14) > 70," },
      { kind: "code", text: "  risk: { maxPositionSize: 0.05, stopLossPct: 0.02 }" },
      { kind: "code", text: "};" },
      { kind: "ok", text: "static audit passed · 0 blocking rules" },
    ],
  },
  {
    id: "backtest",
    label: "03. Backtest Simulation",
    lines: [
      { kind: "prompt", text: "Run this logic against 10 years of daily bars." },
      { kind: "meta", text: "bars: 2,516 · commission: 0.01% · slippage: 1 tick" },
      { kind: "out", text: "return +18.4% · max drawdown -4.1%" },
      { kind: "out", text: "sharpe 1.82 · trades 142 · win rate 61.3%" },
      { kind: "ok", text: "simulation finished in 0.84s" },
    ],
  },
  {
    id: "dashboard",
    label: "04. Active Dashboard",
    lines: [
      { kind: "prompt", text: "Attach the strategy to my paper account and monitor it." },
      { kind: "out", text: "status: monitoring · 4 active watchlists" },
      { kind: "out", text: "pending orders: 0 · alert channels: webhook, email" },
      { kind: "ok", text: "deployment healthy · next evaluation in 60s" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 3 — Social proof                                                  */
/* -------------------------------------------------------------------------- */

export const SOCIAL_PROOF = [
  { value: "10,000+", label: "Active Research Workspaces" },
  { value: "50,000+", label: "Historical Backtests Run" },
  { value: "2,500+", label: "Strategies Built & Tested" },
  { value: "99.9%", label: "System Monitoring Uptime" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Section 4 — Feature pillars                                               */
/* -------------------------------------------------------------------------- */

export type FeaturePillar = {
  index: string;
  tag: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Visual mock rendered on the opposite side of the copy column. */
  visual: "chat" | "code" | "backtest" | "analytics" | "monitor";
};

export const FEATURES: FeaturePillar[] = [
  {
    index: "01",
    tag: "01 / Research",
    title: "Define trading parameters in natural language.",
    description:
      "Describe setup rules, technical indicators, and entry conditions. Northwind converts text inputs into structured strategy definitions.",
    icon: Compass,
    visual: "chat",
  },
  {
    index: "02",
    tag: "02 / Inspect",
    title: "Review generated code and risk rules.",
    description:
      "Inspect the underlying TypeScript and Python logic. Edit entry triggers, position sizing caps, and stop-loss limits directly in the built-in editor.",
    icon: Code2,
    visual: "code",
  },
  {
    index: "03",
    tag: "03 / Simulate",
    title: "Test strategies against historical tick data.",
    description:
      "Run multi-year simulations using historical price series. Evaluate performance metrics alongside benchmark market indexes.",
    icon: LineChart,
    visual: "backtest",
  },
  {
    index: "04",
    tag: "04 / Analyze",
    title: "Examine trade logs and risk profiles.",
    description:
      "Review trade-by-trade logs, equity curves, maximum drawdown periods, and risk-adjusted return ratios to refine parameters.",
    icon: Gauge,
    visual: "analytics",
  },
  {
    index: "05",
    tag: "05 / Monitor",
    title: "Track market conditions and alert feeds.",
    description:
      "Maintain live watchlists, custom price alerts, order status updates, and portfolio metrics in a consolidated monitoring dashboard.",
    icon: Radar,
    visual: "monitor",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 5 — MCP stage explainer                                           */
/* -------------------------------------------------------------------------- */

/** A metric tile the result cards render as label + value. */
export type McpStat = {
  label: string;
  value: string;
  tone?: "up" | "down" | "warn" | "neutral";
};

/**
 * Result-card payloads. Each variant maps to one chat step of the reference's
 * prompt -> answer -> result pattern, rendered by `McpResultCard`.
 * All figures are synthetic demonstration data.
 */
export type McpResult =
  | {
      kind: "dataset";
      tool: string;
      caption: string;
      columns: string[];
      rows: string[][];
      stats: McpStat[];
      note: string;
    }
  | {
      kind: "code";
      tool: string;
      file: string;
      lines: string[];
      checks: string[];
      note: string;
    }
  | {
      kind: "backtest";
      tool: string;
      stats: McpStat[];
      curve: number[];
      trades: { side: string; entry: string; exit: string; pnl: string }[];
      note: string;
    }
  | {
      kind: "order";
      tool: string;
      account: McpStat[];
      ticket: { label: string; value: string }[];
      note: string;
    }
  | {
      kind: "monitor";
      tool: string;
      stats: McpStat[];
      exposures: { label: string; pct: number }[];
      events: { time: string; text: string; tone: "up" | "warn" | "down" | "neutral" }[];
      note: string;
    };

export type McpStage = {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Exact endpoint path, shown in the result-card header instead of a generic chip. */
  tools: string[];
  prompt: string;
  answer: string;
  chips: string[];
  result: McpResult;
};

/**
 * Five stages replace the previous nine equal-weight cards. The nine tools are
 * mapped in: Research = market data + indicators, Build = logic construction,
 * Backtest = simulation, Trade = account status + order ticket, Monitor = risk
 * audit + alerts + events.
 */
export const MCP_STAGES: McpStage[] = [
  {
    id: "research",
    label: "Research",
    icon: Database,
    tools: ["market_data.query", "indicators.overlay"],
    prompt:
      "Pull 5-minute NVDA bars for the last 30 days and flag every touch of the 20-period Bollinger band.",
    answer:
      "Fetched 2,340 five-minute bars and overlaid a 20-period band at 2σ. 14 bars touched the band, 3 of them inside the opening half hour. The dataset is cached for this session, so follow-up calls are free.",
    chips: ["NVDA", "5-minute", "2,340 bars"],
    result: {
      kind: "dataset",
      tool: "market_data.query · indicators.overlay",
      caption: "NVDA · 5m closes around the first band touch · bar 1 of 2,340",
      columns: ["time", "close", "volume"],
      rows: [
        ["09:30", "118.42", "1.24M"],
        ["09:35", "118.06", "0.83M"],
        ["09:40", "117.64", "1.07M"],
        ["09:45", "118.11", "0.91M"],
        ["09:50", "118.68", "0.77M"],
      ],
      stats: [
        { label: "band touches", value: "14" },
        { label: "session range", value: "116.90–121.30" },
        { label: "last close", value: "118.68" },
      ],
      note: "Dataset cached for this workspace session · 3 touches inside the first 30 minutes",
    },
  },
  {
    id: "build",
    label: "Build",
    icon: Braces,
    tools: ["strategy.generate", "strategy.audit"],
    prompt:
      "Turn that into a strategy: enter on a lower-band touch while price is above the 200-day average, exit at the mid-band.",
    answer:
      "Built a rule-based strategy with entry, exit and risk blocks from the research step. Static audit passed with 0 blocking findings: no look-ahead reads, position size capped at 4% of equity, ATR stop at 2.5×.",
    chips: ["entry", "exit", "risk"],
    result: {
      kind: "code",
      tool: "strategy.generate · strategy.audit",
      file: "bollinger-touch.ts",
      lines: [
        "export const bollingerTouch = defineStrategy({",
        '  symbol: "NVDA",',
        '  timeframe: "5m",',
        "  filter: (bar) => bar.close > bar.sma(200),",
        "  entry: (bar) => bar.low <= bar.bbands(20, 2).lower,",
        "  exit: (bar) => bar.close >= bar.bbands(20, 2).middle,",
        "  risk: { sizePct: 0.04, stopAtr: 2.5 },",
        "});",
      ],
      checks: ["no look-ahead reads", "position cap 4%", "stop-loss defined"],
      note: "Editable in the workspace editor · every parameter is addressable from the chat",
    },
  },
  {
    id: "backtest",
    label: "Backtest",
    icon: LineChart,
    tools: ["backtest.run"],
    prompt:
      "Run it on NVDA daily history from 2019 to 2025 with 0.01% commission and one tick of slippage.",
    answer:
      "Simulation finished in 1.2 s over 1,760 daily bars. Net return +18.4% against a +7.1% benchmark, maximum drawdown −4.1%, Sharpe 1.82 across 142 trades.",
    chips: ["1,760 bars", "0.01% fee", "1 tick slippage"],
    result: {
      kind: "backtest",
      tool: "backtest.run",
      stats: [
        { label: "net return", value: "+18.4%", tone: "up" },
        { label: "max drawdown", value: "−4.1%", tone: "down" },
        { label: "sharpe", value: "1.82" },
        { label: "win rate", value: "61.3%" },
      ],
      curve: [10, 16, 14, 24, 22, 31, 29, 40, 38, 50, 47, 59, 56, 68, 64, 76, 72, 84, 80, 92],
      trades: [
        { side: "long", entry: "118.24", exit: "121.90", pnl: "+2.9%" },
        { side: "long", entry: "122.05", exit: "120.44", pnl: "−1.3%" },
        { side: "short", entry: "131.10", exit: "127.85", pnl: "+2.4%" },
      ],
      note: "Synthetic history · equity curve and trades are illustrative, not a performance claim",
    },
  },
  {
    id: "trade",
    label: "Trade",
    icon: ListOrdered,
    tools: ["account.status", "order.stage"],
    prompt: "Check the paper account and draft the first entry ticket for review.",
    answer:
      "Paper account holds $24,180 cash with no open positions. Staged a limit buy for 50 NVDA at $118.40, valued at $5,920. Nothing is submitted until you approve the ticket.",
    chips: ["paper account", "awaiting approval"],
    result: {
      kind: "order",
      tool: "account.status · order.stage",
      account: [
        { label: "equity", value: "$24,180" },
        { label: "cash", value: "$24,180" },
        { label: "open positions", value: "0" },
      ],
      ticket: [
        { label: "side", value: "buy" },
        { label: "quantity", value: "50 shares" },
        { label: "order type", value: "limit" },
        { label: "limit price", value: "$118.40" },
        { label: "time in force", value: "day" },
        { label: "estimated value", value: "$5,920" },
      ],
      note: "Staged only · the workspace never routes an order without an explicit approval",
    },
  },
  {
    id: "monitor",
    label: "Monitor",
    icon: Radar,
    tools: ["risk.audit", "alerts.create", "events.list"],
    prompt:
      "Watch it from here: alert me if QQQ breaks its 200-day average, and audit concentration every week.",
    answer:
      "Registered 2 monitoring rules and a weekly risk audit. Portfolio beta 1.08, technology weight 34%, one-week VaR −2.6%. Alerts route to webhook and email, and every trigger is written to the activity feed.",
    chips: ["2 rules", "webhook + email"],
    result: {
      kind: "monitor",
      tool: "risk.audit · alerts.create · events.list",
      stats: [
        { label: "portfolio beta", value: "1.08" },
        { label: "tech weight", value: "34%", tone: "warn" },
        { label: "1-week VaR", value: "−2.6%", tone: "down" },
      ],
      exposures: [
        { label: "technology", pct: 34 },
        { label: "semiconductors", pct: 21 },
        { label: "crypto", pct: 9 },
        { label: "cash", pct: 36 },
      ],
      events: [
        { time: "09:31", text: "rule armed · QQQ below 200-day average", tone: "up" },
        { time: "10:02", text: "alert delivered · webhook 200 OK", tone: "neutral" },
        { time: "10:15", text: "concentration warning · technology 34%", tone: "warn" },
      ],
      note: "Synthetic portfolio · exposure and risk figures are illustrative",
    },
  },
];

export const MCP_CLIENTS = ["ChatGPT", "Claude", "Cursor", "Codex", "Gemini", "Custom clients"];

/* -------------------------------------------------------------------------- */
/*  Section 6 — Community strategies                                          */
/* -------------------------------------------------------------------------- */

export type Strategy = {
  name: string;
  category: "Trend Following" | "Mean Reversion" | "Crypto" | "Options" | "Custom Indicators";
  tag: string;
  description: string;
  author: string;
  tickers: string[];
  return12m: string;
  sharpe: string;
  maxDrawdown: string;
  sparkline: number[];
};

export const STRATEGY_FILTERS = [
  "All",
  "Trend Following",
  "Mean Reversion",
  "Crypto",
  "Options",
  "Custom Indicators",
] as const;

export const STRATEGIES: Strategy[] = [
  {
    name: "Volatile Asset Mean Reversion",
    category: "Mean Reversion",
    tag: "Equities · Intraday",
    description:
      "Identifies statistical price overextensions using Z-score metrics and 15-minute candle history.",
    author: "@quant_trader",
    tickers: ["SPY", "QQQ"],
    return12m: "+38.4%",
    sharpe: "1.94",
    maxDrawdown: "-8.6%",
    sparkline: [3, 6, 5, 9, 8, 12, 11, 15, 14, 18, 17, 21],
  },
  {
    name: "Multi-Timeframe Trend Breakout",
    category: "Trend Following",
    tag: "Forex / Equities · Swing",
    description:
      "Combines daily trend direction filters with 1-hour channel breakout entry triggers.",
    author: "@systematic_ops",
    tickers: ["EURUSD", "AAPL"],
    return12m: "+24.1%",
    sharpe: "1.61",
    maxDrawdown: "-11.2%",
    sparkline: [4, 5, 7, 6, 9, 11, 10, 13, 16, 15, 18, 22],
  },
  {
    name: "VWAP Rebalancing",
    category: "Mean Reversion",
    tag: "Indices · Day Trading",
    description:
      "Monitors institutional price benchmarks to execute mean-reverting limit orders during session opens.",
    author: "@session_open",
    tickers: ["ES", "NQ"],
    return12m: "+17.9%",
    sharpe: "2.08",
    maxDrawdown: "-5.4%",
    sparkline: [5, 7, 6, 8, 11, 10, 12, 14, 13, 16, 19, 20],
  },
  {
    name: "Moving Average Crossover Filter",
    category: "Trend Following",
    tag: "Macro · Trend Following",
    description:
      "Utilises 50-day and 200-day exponential moving averages to manage market exposure rules.",
    author: "@macro_weights",
    tickers: ["SPY"],
    return12m: "+12.6%",
    sharpe: "1.12",
    maxDrawdown: "-9.8%",
    sparkline: [6, 6, 8, 7, 9, 10, 12, 11, 13, 14, 16, 17],
  },
  {
    name: "Statistical Arbitrage Pairs",
    category: "Custom Indicators",
    tag: "Pairs · Long/Short",
    description:
      "Tracks cointegrated stock pairs and executes mean-reversion signals based on spread variance.",
    author: "@spread_lab",
    tickers: ["KO", "PEP"],
    return12m: "+29.7%",
    sharpe: "2.31",
    maxDrawdown: "-4.9%",
    sparkline: [4, 8, 7, 10, 13, 12, 15, 17, 16, 19, 21, 24],
  },
  {
    name: "Volatility Breakout & Risk Guard",
    category: "Options",
    tag: "Options / Futures · Systematic",
    description:
      "Triggers position changes upon Average True Range (ATR) expansion with trailing stop protection.",
    author: "@atr_desk",
    tickers: ["SPX", "VIX"],
    return12m: "+43.2%",
    sharpe: "1.77",
    maxDrawdown: "-14.1%",
    sparkline: [2, 5, 4, 8, 12, 11, 15, 14, 19, 18, 23, 26],
  },
  {
    name: "Perpetual Funding Rate Carry",
    category: "Crypto",
    tag: "Crypto · Delta-neutral",
    description:
      "Balances spot exposure against perpetual futures while funding rates remain positive across venues.",
    author: "@basis_desk",
    tickers: ["BTC", "ETH", "SOL"],
    return12m: "+21.5%",
    sharpe: "2.46",
    maxDrawdown: "-3.2%",
    sparkline: [6, 7, 9, 8, 10, 12, 13, 14, 15, 17, 18, 19],
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 7 — Brokers                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Integration targets, not live partners. No brokerage partnership exists, so
 * venues are described by category and status only — see reality-check F1.
 */
export const BROKERS = [
  { name: "US equities", status: "Planned", mark: "EQ" },
  { name: "US options", status: "Planned", mark: "OP" },
  { name: "Futures", status: "Planned", mark: "FU" },
  { name: "Crypto spot", status: "Planned", mark: "CS" },
  { name: "Crypto perpetuals", status: "Planned", mark: "CP" },
  { name: "Paper trading", status: "Sandbox", mark: "PT" },
  { name: "Retirement accounts", status: "Planned", mark: "RA" },
  { name: "Multi-account sync", status: "Planned", mark: "MA" },
] as const;

export const BROKER_STEPS = [
  { step: "01", title: "Select venue", body: "Pick a provider from the connection directory." },
  { step: "02", title: "Authorize access", body: "Approve the OAuth2 or API-key handshake. We never store passwords." },
  { step: "03", title: "Sync balances", body: "Import holdings, cash, and eligible order types into the workspace." },
  { step: "04", title: "Set approval gates", body: "Require manual approval for every strategy-generated ticket." },
] as const;

/* -------------------------------------------------------------------------- */
/*  Section 8 — Pricing                                                       */
/* -------------------------------------------------------------------------- */

export const PRICING_BULLETS = [
  "Uncapped market research queries",
  "Uncapped backtest execution across multi-year histories",
  "Unlimited saved and versioned strategies",
  "Extended history up to 50,000 bars per simulation",
  "Live-price paper trading environments",
  "Broker connection framework for positions and order staging — venue integrations planned, none live yet",
  "Custom price and condition alerts (webhook + dashboard)",
  "Full MCP server access for ChatGPT, Claude, Cursor and custom clients",
] as const;

/* -------------------------------------------------------------------------- */
/*  Section 9 — FAQ                                                           */
/* -------------------------------------------------------------------------- */

export type FaqItem = { question: string; answer: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Northwind?",
    answer:
      "Northwind is an AI-assisted quantitative research workspace. It enables traders to design rule-based strategies using natural language, backtest logic against historical market data, inspect generated code, and manage orders via supported brokerages.",
  },
  {
    question: "Is programming experience required to build strategies?",
    answer:
      "No. You can define rules, indicators, and risk boundaries using plain text descriptions. Northwind converts your specifications into inspectable code, which you can edit or run directly.",
  },
  {
    question: "Can I use Northwind with ChatGPT, Claude, or Cursor?",
    answer:
      "Yes. Northwind provides a standardized Model Context Protocol (MCP) server endpoint. You can connect compatible AI clients to run backtests, query market data, and generate strategies directly within your preferred AI interface.",
  },
  {
    question: "What capabilities are included in the subscription?",
    answer:
      "The subscription provides full access to market research tools, backtesting engines, saved strategy storage, historical data feeds, paper trading, alert monitors, the broker connection framework, and MCP integration.",
  },
  {
    question: "Can I test strategies without risking real capital?",
    answer:
      "Yes. You can construct strategies and evaluate their performance using historical backtests and live-price paper trading environments without connecting a broker or placing live orders.",
  },
  {
    question: "Does Northwind hold user funds or act as a custodian?",
    answer:
      "No. Northwind is a software provider, not a broker-dealer, custodian, or registered investment adviser. User capital and securities remain at your connected brokerage. Trades are routed to your broker only upon your authorization.",
  },
  {
    question: "Which brokerage accounts can be connected?",
    answer:
      "Northwind targets major brokerage platforms through standard API protocols, but no venue integration is live yet: paper trading is available today and each connection ships as its integration completes. The broker section of this page lists venues by category and status.",
  },
  {
    question: "How can I manage or cancel my subscription?",
    answer:
      "Subscriptions can be managed, updated, or cancelled at any time through your account settings panel. Access remains active through the end of the paid billing period.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "MCP Server Protocol", href: "#mcp" },
      { label: "Strategy Repository", href: "#explore" },
      { label: "Broker Connectivity", href: "#brokers" },
      { label: "Pricing Plans", href: "#pricing" },
    ],
  },
  {
    title: "Resources & Learn",
    links: [
      { label: "Documentation", href: "#faq" },
      { label: "Quickstart Guide", href: "#hero" },
      { label: "API Reference", href: "#mcp" },
      { label: "MCP Setup Guide", href: "#mcp" },
      { label: "System Status", href: "#social-proof" },
    ],
  },
  {
    title: "Company & Legal",
    links: [
      { label: "About Northwind", href: "#features" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security Practices", href: "/security" },
      { label: "Contact Support", href: "mailto:support@northwind.ai" },
    ],
  },
];

/* Small helper icons re-exported for section headers that need them. */
export const ICONS = {
  Bot,
  Binary,
  Compass,
  Plug,
  Repeat,
  ScanSearch,
  SlidersHorizontal,
};
