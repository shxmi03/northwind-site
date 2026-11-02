import { Check, ShieldCheck, Play, Terminal } from "lucide-react";
import { asset, cn } from "@/lib/utils";

function Frame({
  label,
  image,
  children,
  className,
}: {
  label: string;
  image: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] shadow-xl shadow-black/20",
        className,
      )}
    >
      <img
        src={asset(image)}
        alt=""
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]"
      />
      <div className="relative">
        <div className="flex items-center justify-between border-b border-[var(--app-panel-border)] px-4 py-2.5">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">
            <Terminal aria-hidden="true" className="h-3 w-3" />
            {label}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            live mock
          </span>
        </div>
        <div className="p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}

export function ChatMock() {
  return (
    <Frame label="workspace · chat" image="/assets/images/feature-1.webp">
      <div className="space-y-3">
        <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm border border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)] px-3.5 py-2.5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">you</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-primary)]">
            Create a momentum strategy for NVDA using a 200 EMA trend filter and RSI divergence entries.
          </p>
        </div>
        <div className="max-w-[92%] rounded-xl rounded-bl-sm border border-[var(--color-info)]/25 bg-[var(--color-info)]/[0.07] px-3.5 py-2.5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-info)]">
            northwind
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">
            Parsed 2 signals and 1 filter. Draft strategy ready with 5 parameters.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {["EMA(200)", "RSI(14)", "Divergence", "ATR stop"].map((chip) => (
              <span
                key={chip}
                className="rounded border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-[var(--app-panel-border)] px-3 py-2">
          <span className="font-mono text-[11px] text-[var(--text-secondary)]">Ask a follow-up…</span>
          <span className="ml-auto rounded bg-[var(--northwind-primary)] px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white">
            send
          </span>
        </div>
      </div>
    </Frame>
  );
}

const CODE_LINES = [
  { n: 1, text: "export const strategy = defineStrategy({" },
  { n: 2, text: '  symbol: "NVDA", timeframe: "1D",' },
  { n: 3, text: "  filter: (bar) => bar.close > bar.ema(200)," },
  { n: 4, text: "  entry: (bar) => bar.rsi(14) < 32," },
  { n: 5, text: "  exit: (bar) => bar.rsi(14) > 68," },
  { n: 6, text: "  risk: { sizePct: 0.04, stopAtr: 2.5 }," },
  { n: 7, text: "});" },
];

export function CodeMock() {
  return (
    <Frame label="editor · strategy.ts" image="/assets/images/feature-2.webp">
      <div className="on-dark-panel rounded-lg border border-[var(--app-panel-border)] bg-[#090d16] p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
            strategy.ts
          </span>
          <span className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
            <ShieldCheck aria-hidden="true" className="h-3 w-3" />
            audit passed
          </span>
        </div>
        <ol className="space-y-0.5 font-mono text-[11px] leading-relaxed">
          {CODE_LINES.map((line) => (
            <li key={line.n} className="flex gap-3">
              <span aria-hidden="true" className="w-4 select-none text-right text-slate-600">
                {line.n}
              </span>
              <span className="whitespace-pre text-blue-300">{line.text}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {["no look-ahead bias", "position cap 4%", "stop-loss defined"].map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 rounded-full border border-[var(--app-panel-border)] px-2 py-1 font-mono text-[10px] text-[var(--text-secondary)]"
          >
            <Check aria-hidden="true" className="h-3 w-3 text-emerald-400" />
            {item}
          </span>
        ))}
      </div>
    </Frame>
  );
}

export function BacktestMock() {
  const points = "0,58 22,52 44,55 66,44 88,47 110,38 132,41 154,30 176,33 198,22 220,25 242,14";
  return (
    <Frame label="backtest · equity curve" image="/assets/images/feature-3.webp">
      <p className="mb-2 inline-flex items-center rounded border border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
        illustrative sample
      </p>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
            net return
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold text-emerald-400">+18.4%</p>
        </div>
        <div className="text-right font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
          <p>benchmark +7.1%</p>
          <p className="mt-1">142 trades</p>
        </div>
      </div>

      <svg
        viewBox="0 0 242 66"
        role="img"
        aria-label="Illustrative equity curve rising 18.4 percent against a 7.1 percent benchmark"
        className="mt-3 h-20 w-full"
      >
        <defs>
          <linearGradient id="equity-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0052ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0052ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={points} fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinejoin="round" />
        <polyline points={`${points} 242,66 0,66`} fill="url(#equity-fill)" stroke="none" />
        <polyline
          points="0,60 22,58 44,59 66,54 88,55 110,50 132,51 154,46 176,47 198,42 220,43 242,40"
          fill="none"
          stroke="#64748b"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
      </svg>

      <div className="mt-2 overflow-hidden rounded-lg border border-[var(--app-panel-border)]">
        <table className="w-full border-collapse text-left font-mono text-[10px]">
          <caption className="sr-only">Illustrative recent backtest trades</caption>
          <thead className="bg-[var(--app-widget-inner-bg)] text-[var(--text-secondary)]">
            <tr>
              <th scope="col" className="px-2.5 py-1.5 font-medium">side</th>
              <th scope="col" className="px-2.5 py-1.5 font-medium">entry</th>
              <th scope="col" className="px-2.5 py-1.5 font-medium">exit</th>
              <th scope="col" className="px-2.5 py-1.5 text-right font-medium">p&amp;l</th>
            </tr>
          </thead>
          <tbody className="text-[var(--text-secondary)]">
            {[
              ["long", "118.24", "121.90", "+2.9%"],
              ["long", "122.05", "120.44", "-1.3%"],
              ["short", "131.10", "127.85", "+2.4%"],
            ].map((row) => (
              <tr key={row[1]} className="border-t border-[var(--app-panel-border)]">
                <td className="px-2.5 py-1.5">{row[0]}</td>
                <td className="px-2.5 py-1.5">{row[1]}</td>
                <td className="px-2.5 py-1.5">{row[2]}</td>
                <td
                  className={cn(
                    "px-2.5 py-1.5 text-right",
                    row[3].startsWith("+") ? "text-emerald-400" : "text-rose-400",
                  )}
                >
                  {row[3]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Frame>
  );
}

export function AnalyticsMock() {
  const metrics = [
    { label: "sharpe", value: "1.82", tone: "text-emerald-400" },
    { label: "max dd", value: "-4.1%", tone: "text-rose-400" },
    { label: "profit factor", value: "1.64", tone: "text-[var(--text-primary)]" },
    { label: "win rate", value: "61.3%", tone: "text-[var(--text-primary)]" },
  ];
  const histogram = [18, 26, 34, 52, 78, 96, 74, 50, 32, 21, 12, 7];
  const max = Math.max(...histogram);

  return (
    <Frame label="analytics · risk profile" image="/assets/images/feature-4.webp">
      <div className="grid grid-cols-2 gap-2.5">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)]/70 px-3 py-2"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              {metric.label}
            </p>
            <p className={cn("mt-1 font-mono text-lg font-semibold", metric.tone)}>{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-[var(--app-panel-border)] p-3">
        <div className="flex items-end justify-between gap-1" aria-hidden="true">
          {histogram.map((height, index) => (
            <span
              key={index}
              className={cn(
                "w-full rounded-t-sm",
                index > 4 && index < 8 ? "bg-[var(--northwind-primary)]/80" : "bg-[var(--northwind-primary)]/30",
              )}
              style={{ height: `${(height / max) * 56}px` }}
            />
          ))}
        </div>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
          return distribution · 142 trades
        </p>
      </div>
    </Frame>
  );
}

export function MonitorMock() {
  const rows = [
    { time: "09:31:02", text: "signal · NVDA entry conditions met", tone: "text-emerald-400" },
    { time: "09:31:03", text: "order ticket staged · awaiting approval", tone: "text-amber-400" },
    { time: "09:33:47", text: "webhook delivered · 200 OK", tone: "text-[var(--text-secondary)]" },
    { time: "10:05:18", text: "watchlist scan · 42 symbols", tone: "text-[var(--text-secondary)]" },
    { time: "10:12:55", text: "alert · QQQ below 200-day MA", tone: "text-rose-400" },
  ];

  return (
    <Frame label="monitor · activity feed" image="/assets/images/feature-5.webp">
      <div className="flex items-center justify-between rounded-lg border border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)]/70 px-3 py-2">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
          <Play aria-hidden="true" className="h-3 w-3 text-emerald-400" />
          monitoring · 4 watchlists
        </span>
        <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
          healthy
        </span>
      </div>
      <ul className="mt-3 space-y-1.5 font-mono text-[10.5px]">
        {rows.map((row) => (
          <li key={row.time} className="flex gap-3 rounded border border-transparent px-1 py-1">
            <span className="text-slate-600">{row.time}</span>
            <span className={row.tone}>{row.text}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export const FEATURE_VISUALS = {
  chat: ChatMock,
  code: CodeMock,
  backtest: BacktestMock,
  analytics: AnalyticsMock,
  monitor: MonitorMock,
} as const;
