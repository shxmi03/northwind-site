import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Bell,
  Binary,
  Bot,
  Braces,
  CalendarClock,
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
  ShieldCheck,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "MCP Endpoint", href: "#mcp" },
  { label: "Explore Strategies", href: "#explore" },
  { label: "Broker Connectivity", href: "#brokers" },
  { label: "Pricing", href: "#pricing" },
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
/*  Section 5 — MCP capability cards                                          */
/* -------------------------------------------------------------------------- */

export type McpCard = {
  label: string;
  title: string;
  prompt: string;
  output: string;
  icon: LucideIcon;
};

export const MCP_CARDS: McpCard[] = [
  {
    label: "01. Market Data Query",
    title: "Research data",
    prompt: "Pull 5-minute OHLCV data for NVDA over the past 30 days.",
    output: "Returns a clean JSON dataset with volume and price metrics.",
    icon: Database,
  },
  {
    label: "02. Indicator Overlay",
    title: "Technical indicators",
    prompt: "Calculate 20-day Bollinger Bands and MACD for TSLA.",
    output: "Returns indicator series mapped against price timestamps.",
    icon: BarChart3,
  },
  {
    label: "03. Logic Construction",
    title: "Strategy generation",
    prompt: "Generate a momentum strategy combining VWAP and 50-day EMA.",
    output: "Outputs structured strategy code with editable entry and exit variables.",
    icon: Braces,
  },
  {
    label: "04. Simulation Trigger",
    title: "Backtest execution",
    prompt: "Run backtest for Strategy #402 across 2022-2025 SPY historical data.",
    output: "Generates performance breakdown, win-loss ratio, and drawdown curve.",
    icon: Activity,
  },
  {
    label: "05. Account Status",
    title: "Broker interface",
    prompt: "Fetch current open positions and available cash margin.",
    output: "Displays the authenticated brokerage account summary.",
    icon: Wallet,
  },
  {
    label: "06. Order Ticket Setup",
    title: "Order placement",
    prompt: "Draft a limit buy order for 50 shares of AMD at $110.00.",
    output: "Creates a staged order ticket that requires manual approval.",
    icon: ListOrdered,
  },
  {
    label: "07. Risk Audit",
    title: "Portfolio risk",
    prompt: "Evaluate portfolio beta and sector concentration.",
    output: "Provides an exposure heatmap and concentration analysis.",
    icon: ShieldCheck,
  },
  {
    label: "08. Condition Monitor",
    title: "Automated alerts",
    prompt: "Set an alert trigger if QQQ breaks below its 200-day moving average.",
    output: "Registers an active monitoring rule with webhook notification.",
    icon: Bell,
  },
  {
    label: "09. Market Events",
    title: "Event feed",
    prompt: "List upcoming earnings reports for my portfolio watchlists.",
    output: "Delivers a calendar feed with earnings dates and volatility metrics.",
    icon: CalendarClock,
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
  "Broker API connections for positions and order staging",
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
      "The subscription provides full access to market research tools, backtesting engines, saved strategy storage, historical data feeds, paper trading, alert monitors, broker connectivity, and MCP integration.",
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
      "Northwind targets major brokerage platforms through standard API protocols. Supported partners and setup instructions are documented on the broker connectivity section of this page.",
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
