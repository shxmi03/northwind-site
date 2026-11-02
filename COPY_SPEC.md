# Brand Voice & Copywriting Specification: Northwind

> **Brand Name Centralization Notice:**  
> The working brand name for this project is **`Northwind`**. All occurrences of the product name on the front-end must be sourced from a single configuration file (`lib/brand.ts`). If the final brand name is updated by the project owner, changing `lib/brand.ts` will update the entire site seamlessly.

---

## 1. Brand Strategy & Voice System

### 1.1 Core Brand Positioning
Northwind is an AI-assisted quantitative market research and strategy development workstation. It provides independent traders and analysts with tools to construct rule-based strategies, evaluate historical performance, monitor price movements, and manage orders through connected brokerages.

### 1.2 Tone of Voice Guidelines
- **Direct & Factual:** Use short, declarative sentences. State capabilities and specifications clearly.
- **Zero Hype:** Avoid marketing buzzwords, superlative adjectives ("best", "revolutionary", "game-changing"), and dramatic metaphors.
- **Value-First:** Focus on what the user can accomplish (data query, backtesting, rule inspection) rather than generic software claims.
- **Precise Terminology:** Use standard financial and algorithmic trading terms accurately (e.g., drawdown, Sharpe ratio, tick historical data, order routing, paper trading).

### 1.3 Vocabulary Standards
| Concept | Standard Northwind Terminology | Disallowed Terms (Astral / Generic Hype) |
| :--- | :--- | :--- |
| Product Name | `Northwind` | *Astral*, *HeyAstral* |
| AI Integration Protocol | `Northwind MCP Endpoint` | *Universal API*, *Astral Magic* |
| Strategy Engine | `Rule Builder` / `Strategy Workspace` | *Autonomous AI Trader*, *Money Machine* |
| Testing System | `Historical Simulation` / `Backtest Engine` | *Instant Wealth Simulator* |
| Broker Integration | `Broker Connection Interface` | *Seamless Broker Sync* |

---

## 2. Information Architecture & Section Copy

---

### Section 1: Navigation Bar (Nav)

- **Logo Text:** `Northwind` (Rendered with brand symbol)
- **Navigation Links:**
  1. `Features`
  2. `MCP Endpoint`
  3. `Explore Strategies`
  4. `Broker Connectivity`
  5. `Resources` *(Dropdown: Documentation, API Reference, Changelog, FAQ)*
- **Control & Auth Actions:**
  - `Theme Toggle` (Dark / Light toggle icon)
  - `Sign In` (Secondary button)
  - `Get Started` (Primary CTA button)

---

### Section 2: Hero Section

- **Eyebrow:** `Quantitative Trading Workstation`
- **Main Headline (H1):**  
  `Research market data. Build rule-based strategies. Automate execution.`
- **Subhead:**  
  `Northwind combines natural language strategy design, historical tick-data backtesting, and broker connection protocols in one unified interface.`
- **Primary CTA:** `Launch Workspace`
- **Secondary CTA:** `Connect via MCP`
- **Secondary Note:** `No credit card required for workspace exploration · Setup takes 2 minutes`

#### Hero Terminal Mockup Copy
- **Tab 1 Header:** `01. Research`  
  - *Prompt Input:* `"Show 14-day RSI divergence on AAPL with 200-day SMA trend filter."`  
  - *Output Summary:* `Identified 3 divergence points on daily candles. Trend filter active.`
- **Tab 2 Header:** `02. Strategy Logic`  
  - *Code Output Snippet:*
    ```typescript
    export const strategy = {
      name: "RSI Trend Breakout",
      entry: (bar) => bar.rsi(14) < 30 && bar.close > bar.sma(200),
      exit: (bar) => bar.rsi(14) > 70,
      risk: { maxPositionSize: 0.05, stopLossPct: 0.02 }
    };
    ```
- **Tab 3 Header:** `03. Backtest Simulation`  
  - *Summary Metrics:* `Return: +18.4% | Max Drawdown: -4.1% | Sharpe Ratio: 1.82 | Trades: 142`
- **Tab 4 Header:** `04. Active Dashboard`  
  - *Status Indicator:* `Status: Monitoring · 4 Active Watchlists · 0 Pending Orders`

---

### Section 3: Social Proof Strip

> *Note on figures:* All metrics listed below are illustrative platform benchmark targets.

- **Metric 1:** `10,000+`  
  - **Label:** `Active Research Workspaces` *(Illustrative figure)*
- **Metric 2:** `50,000+`  
  - **Label:** `Historical Backtests Run` *(Illustrative figure)*
- **Metric 3:** `2,500+`  
  - **Label:** `Strategies Built & Tested` *(Illustrative figure)*
- **Metric 4:** `99.9%`  
  - **Label:** `System Monitoring Uptime` *(Illustrative figure)*

---

### Section 4: Features Section (5 Core Pillars)

- **Eyebrow:** `Platform Capabilities`
- **Section Heading (H2):**  
  `From strategy concept to verified backtest.`
- **Section Subhead:**  
  `Construct, evaluate, refine, and deploy quantitative trading logic within a single workspace.`

#### Pillar 01: Research & Formulation
- **Index Tag:** `01 / Research`
- **Headline (H3):** `Define trading parameters in natural language.`
- **Description:**  
  `Describe setup rules, technical indicators, and entry conditions. Northwind converts text inputs into structured strategy definitions.`

#### Pillar 02: Code Inspection
- **Index Tag:** `02 / Inspect`
- **Headline (H3):** `Review generated code and risk rules.`
- **Description:**  
  `Inspect the underlying TypeScript and Python logic. Edit entry triggers, position sizing caps, and stop-loss limits directly in the built-in editor.`

#### Pillar 03: Historical Backtesting
- **Index Tag:** `03 / Simulate`
- **Headline (H3):** `Test strategies against historical tick data.`
- **Description:**  
  `Run multi-year simulations using historical price series. Evaluate performance metrics alongside benchmark market indexes.`

#### Pillar 04: Performance Analytics
- **Index Tag:** `04 / Analyze`
- **Headline (H3):** `Examine trade logs and risk profiles.`
- **Description:**  
  `Review trade-by-trade logs, equity curves, maximum drawdown periods, and risk-adjusted return ratios to refine parameters.`

#### Pillar 05: Operational Monitoring
- **Index Tag:** `05 / Monitor`
- **Headline (H3):** `Track market conditions and alert feeds.`
- **Description:**  
  `Maintain live watchlists, custom price alerts, order status updates, and portfolio metrics in a consolidated monitoring dashboard.`

- **Section CTA:** `Explore Complete Feature List →`

---

### Section 5: MCP Section (Model Context Protocol)

- **Eyebrow:** `Developer Protocol`
- **Section Heading (H2):**  
  `Integrate Northwind tools into your existing AI workflows.`
- **Section Subhead:**  
  `Connect ChatGPT, Claude, Cursor, Codex, Gemini, or custom client tools through Northwind's standardized MCP server endpoint.`

#### MCP Workflow Mechanism
- **Hook Headline:** `Query the engine directly from external clients.`
- **Hook Subhead:**  
  `Your AI client routes requests to the Northwind MCP server. Northwind executes data queries, backtests, or code generation, returning structured data into your conversation thread.`

#### 9 MCP Capability Cards
1. **Research Data Card**  
   - **Label:** `01. Market Data Query`  
   - **Sample Prompt:** `"Pull 5-minute OHLCV data for NVDA over the past 30 days."`  
   - **Output:** Returns clean JSON dataset with volume and price metrics.
2. **Technical Indicators Card**  
   - **Label:** `02. Indicator Overlay`  
   - **Sample Prompt:** `"Calculate 20-day Bollinger Bands and MACD for TSLA."`  
   - **Output:** Returns indicator series mapped against price timestamps.
3. **Strategy Generation Card**  
   - **Label:** `03. Logic Construction`  
   - **Sample Prompt:** `"Generate a momentum strategy combining VWAP and 50-day EMA."`  
   - **Output:** Outputs structured strategy code with customizable entry/exit variables.
4. **Backtest Execution Card**  
   - **Label:** `04. Simulation Trigger`  
   - **Sample Prompt:** `"Run backtest for Strategy #402 across 2022-2025 SPY historical data."`  
   - **Output:** Generates performance breakdown, win-loss ratio, and drawdown curve.
5. **Broker Interface Card**  
   - **Label:** `05. Account Status`  
   - **Sample Prompt:** `"Fetch current open positions and available cash margin."`  
   - **Output:** Displays authenticated brokerage account summary.
6. **Order Placement Card**  
   - **Label:** `06. Order Ticket Setup`  
   - **Sample Prompt:** `"Draft a limit buy order for 50 shares of AMD at $110.00."`  
   - **Output:** Creates staged order ticket requiring manual user approval.
7. **Portfolio Risk Card**  
   - **Label:** `07. Risk Audit`  
   - **Sample Prompt:** `"Evaluate portfolio beta and sector concentration."`  
   - **Output:** Provides exposure heatmap and portfolio concentration analysis.
8. **Automated Alert Deployment Card**  
   - **Label:** `08. Condition Monitor`  
   - **Sample Prompt:** `"Set an alert trigger if QQQ breaks below 200-day moving average."`  
   - **Output:** Registers active monitoring rule with webhook notification.
9. **Event Feed Card**  
   - **Label:** `09. Market Events`  
   - **Sample Prompt:** `"List upcoming earnings reports for portfolio watchlists."`  
   - **Output:** Delivers calendar feed with projected earnings dates and volatility metrics.

- **Section CTA:** `View MCP Technical Documentation →`

---

### Section 6: Explore Section (Community Strategies)

- **Eyebrow:** `Strategy Repository`
- **Section Heading (H2):**  
  `Explore rule-based strategy templates.`
- **Section Subhead:**  
  `Inspect, clone, and modify strategy templates created by quantitative developers.`

#### 6 Featured Strategy Modules
1. **Volatile Asset Mean Reversion**  
   - **Tag:** `Equities · Intraday`  
   - **Description:** Identifies statistical price overextensions using Z-score metrics and 15-minute candle history.
2. **Multi-Timeframe Trend Breakout**  
   - **Tag:** `Forex / Equities · Swing`  
   - **Description:** Combines daily trend direction filters with 1-hour channel breakout entry triggers.
3. **Volume-Weighted Average Price (VWAP) Rebalancing**  
   - **Tag:** `Indices · Day Trading`  
   - **Description:** Monitors institutional price benchmarks to execute mean-reverting limit orders during session opens.
4. **Moving Average Crossover Filter**  
   - **Tag:** `Macro · Trend Following`  
   - **Description:** Utilizes 50-day and 200-day exponential moving averages to manage market exposure rules.
5. **Statistical Arbitrage Pair Trading**  
   - **Tag:** `Pairs · Long/Short`  
   - **Description:** Tracks cointegrated stock pairs and executes mean-reversion signals based on spread variance.
6. **Volatility Breakout & Risk Guard**  
   - **Tag:** `Options / Futures · Systematic`  
   - **Description:** Triggers position changes upon Average True Range (ATR) expansion with trailing stop protection.

- **Section CTA:** `Browse Strategy Repository →`

---

### Section 7: Broker Connectivity Section

- **Eyebrow:** `Broker Integration`
- **Section Heading (H2):**  
  `Connect your brokerage accounts.`
- **Section Subhead:**  
  `Link supported brokerage credentials to stream balances, inspect positions, and stage authorized trades.`

#### Broker Connection Status & Partners Notice
- **Integration Notice:** `Broker connection API protocols — partner integration framework coming soon.`
- **Supported Integration Standards (Placeholders):**  
  `Interactive Brokers (API) · Alpaca Securities · Tradier Brokerage · ChoiceTrade (Coming Soon)`

#### 4-Step Connection Workflow
1. **Step 1: Select Brokerage Provider**  
   `Choose your registered brokerage provider from the connection directory.`
2. **Step 2: Authorize API Credentials**  
   `Authenticate using secure OAuth2 or API key credentials. Northwind does not store login passwords.`
3. **Step 3: Sync Balances & Portfolio Data**  
   `Import account holdings, cash balances, and eligible order types into the workspace.`
4. **Step 4: Configure Order Approval Gates**  
   `Set manual approval requirements for all strategy-generated order tickets before submission.`

- **Section CTA:** `Review Broker Integration Security →`

---

### Section 8: Pricing Section

- **Eyebrow:** `Subscription Pricing`
- **Section Heading (H2):**  
  `Simple pricing. Complete workspace access.`
- **Section Subhead:**  
  `Access market research, backtesting engines, strategy builders, and broker connection tools under a single subscription.`

#### Plan Box Details
- **Plan Name:** `Northwind Professional`
- **Price Tag:** `$29` `/ month`  
  *(TODO Note for Project Lead: Placeholder pricing of $29/month. Final price subject to confirmation.)*
- **Billing Note:** `Billed monthly. Cancel subscription anytime via account dashboard.`
- **Included Capabilities (8 Bullets):**
  1. `Uncapped Market Research Queries` — Search tick data, news feeds, and indicators without daily prompt caps.
  2. `Uncapped Backtest Execution` — Run historical simulations across multi-year asset price histories.
  3. `Unlimited Saved Strategies` — Store, version, and manage custom strategy code in your library.
  4. `Extended Historical Data Access` — Access up to 50,000 historical data bars per simulation run.
  5. `Live-Price Paper Trading` — Test strategy execution in simulated environments using live price streams.
  6. `Broker API Connections` — Link supported brokerage accounts for position tracking and order staging.
  7. `Custom Price & Condition Alerts` — Configure webhook and dashboard notifications with custom rules.
  8. `Full Northwind MCP Server Access` — Connect ChatGPT, Claude, Cursor, and custom clients with a dedicated endpoint.

- **Primary CTA:** `Subscribe to Northwind ($29/mo)`

---

### Section 9: FAQ Section (Frequently Asked Questions)

- **Eyebrow:** `Frequently Asked Questions`
- **Section Heading (H2):**  
  `Clear answers about Northwind.`
- **Section Subhead:**  
  `Learn how the workspace functions, how broker connections operate, and how subscriptions work.`

#### 8 Accordion Q&A Pairs

1. **Q: What is Northwind?**  
   **A:** Northwind is an AI-assisted quantitative research workspace. It enables traders to design rule-based strategies using natural language, backtest logic against historical market data, inspect generated code, and manage orders via supported brokerages.

2. **Q: Is programming experience required to build strategies?**  
   **A:** No. You can define rules, indicators, and risk boundaries using plain text descriptions. Northwind converts your specifications into inspectable code, which you can edit or run directly.

3. **Q: Can I use Northwind with ChatGPT, Claude, or Cursor?**  
   **A:** Yes. Northwind provides a standardized Model Context Protocol (MCP) server endpoint. You can connect compatible AI clients to run backtests, query market data, and generate strategies directly within your preferred AI interface.

4. **Q: What capabilities are included in the Northwind subscription?**  
   **A:** The subscription provides full access to market research tools, backtesting engines, saved strategy storage, historical data feeds, paper trading, alert monitors, broker connectivity, and MCP integration.

5. **Q: Can I test strategies without risking real capital?**  
   **A:** Yes. You can construct strategies and evaluate their performance using historical backtests and live-price paper trading environments without connecting a broker or placing live orders.

6. **Q: Does Northwind hold user funds or execute trades as a custodian?**  
   **A:** No. Northwind is a software provider, not a broker-dealer, custodian, or registered investment adviser. User capital and securities remain securely at your connected brokerage. Trades are routed to your broker only upon your authorization.

7. **Q: Which brokerage accounts can be connected?**  
   **A:** Northwind supports major brokerage platforms via standard API protocols. Supported partners and setup instructions are documented on the Brokerage Integration page.

8. **Q: How can I manage or cancel my subscription?**  
   **A:** Subscriptions can be managed, updated, or cancelled at any time through your account settings panel. Access remains active through the end of the paid billing period.

---

### Section 10: Final Call-to-Action & Footer

#### Final CTA Block
- **Headline (H2):** `Build and test your first strategy today.`
- **Subhead:** `Formulate entry rules, simulate historical performance, and refine your quantitative workflow.`
- **CTA Button:** `Launch Northwind Workspace`
- **Sub-text:** `Monthly subscription · $29/month · Cancel anytime`

#### Footer Column Structure
- **Column 1: Product**  
  - `Features`  
  - `MCP Server Protocol`  
  - `Strategy Repository`  
  - `Broker Connectivity`  
  - `Pricing Plans`
- **Column 2: Resources & Learn**  
  - `Documentation`  
  - `Quickstart Guide`  
  - `API Reference`  
  - `MCP Setup Guide`  
  - `System Status`
- **Column 3: Company & Legal**  
  - `About Northwind`  
  - `Privacy Policy`  
  - `Terms of Service`  
  - `Security Practices`  
  - `Contact Support`

---

### Section 11: Mandatory Legal Disclaimer (Footer / Site-wide)

> **Mandatory Legal Text (Must be included verbatim or equivalent in footer):**
> 
> **Legal Disclaimer & Risk Disclosure:**  
> Northwind is a financial research, strategy development, and workflow automation software tool. Northwind is not a broker-dealer, custodian, or registered investment adviser, and does not provide financial, investment, legal, or tax advice. All content, strategy templates, and performance metrics generated by Northwind are provided strictly for educational and research purposes.  
> 
> Historical backtests and hypothetical performance data do not guarantee future trading results. Real trading involves risk of financial loss. User capital, securities, and cash balances remain under the custody of the user's independent brokerage. Northwind does not custody funds or independently execute orders without user authorization. Service intended for individuals aged 18 and older.

---

## 3. Brand Protection & Compliance Verification

1. **Paraphrase Verification:**  
   All headings, descriptions, and feature bullet points have been written from scratch. No text from heyastral.ai (`ref/http/llms.txt` or `ref/http/body.html`) has been copied or paraphrased.
2. **Centralization Check:**  
   The name `Northwind` is identified as a placeholder and MUST be referenced via `lib/brand.ts` across the application codebase.
3. **Illustrative Figures Tag:**  
   All metric counts (workspaces, backtests, uptime) are explicitly marked as target illustrative figures.
4. **Broker Placeholders:**  
   Broker connection options are listed neutrally as standard API integrations.
5. **Legal Boundaries:**  
   Clear disclaimers establish software-only status (non-custodial, non-advisory, 18+).

---
**Brand Guardian:** Northwind Strategy Spec  
**Status:** Approved for implementation  
**Deliverable File:** `/home/ubuntu/workspace/astral-clone/COPY_SPEC.md`
