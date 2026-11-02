import { Check, Terminal } from "lucide-react";
import type { McpResult, McpStat } from "@/lib/content";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Shared atoms                                                              */
/* -------------------------------------------------------------------------- */

const TONE: Record<NonNullable<McpStat["tone"]>, string> = {
  up: "text-emerald-400",
  down: "text-rose-400",
  warn: "text-amber-400",
  neutral: "text-[var(--text-primary)]",
};

/**
 * Stat tile. Deliberately two treatments only: mono micro-label + mono value,
 * so a result card never exceeds the three type treatments the brief allows.
 */
function Stat({ stat }: { stat: McpStat }) {
  return (
    <div className="rounded-lg bg-[var(--app-widget-inner-bg)] px-3 py-2">
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
        {stat.label}
      </p>
      <p
        className={cn(
          "mt-1 font-mono text-base font-semibold leading-none",
          TONE[stat.tone ?? "neutral"],
        )}
      >
        {stat.value}
      </p>
    </div>
  );
}

function StatGrid({ stats }: { stats: McpStat[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {stats.map((stat) => (
        <Stat key={stat.label} stat={stat} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Result variants                                                           */
/* -------------------------------------------------------------------------- */

function DatasetResult({ result }: { result: Extract<McpResult, { kind: "dataset" }> }) {
  return (
    <>
      <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">{result.caption}</p>
      <div className="overflow-hidden rounded-lg border border-[var(--app-panel-border)]">
        <table aria-label={result.caption} className="w-full border-collapse text-left font-mono text-[11px]">
          <thead className="bg-[var(--app-widget-inner-bg)] text-[var(--text-secondary)]">
            <tr>
              {result.columns.map((column) => (
                <th scope="col" key={column} className="px-3 py-1.5 font-medium uppercase tracking-[0.12em]">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[var(--text-primary)]">
            {result.rows.map((row) => (
              <tr key={row[0]} className="border-t border-[var(--app-panel-border)]">
                {row.map((cell, index) => (
                  <td
                    key={`${row[0]}-${index}`}
                    className={cn("px-3 py-1.5", index > 0 && "text-[var(--text-secondary)]")}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <StatGrid stats={result.stats} />
    </>
  );
}

function CodeResult({ result }: { result: Extract<McpResult, { kind: "code" }> }) {
  return (
    <>
      <div className="on-dark-panel rounded-lg border border-[var(--app-panel-border)] bg-[#090d16] p-3">
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">{result.file}</p>
        <ol className="space-y-0.5 font-mono text-[10.5px] leading-relaxed">
          {result.lines.map((line, index) => (
            <li key={index} className="flex gap-3">
              <span aria-hidden="true" className="w-3 select-none text-right text-slate-600">
                {index + 1}
              </span>
              <span className="whitespace-pre-wrap break-words text-blue-300">{line}</span>
            </li>
          ))}
        </ol>
      </div>
      <ul className="flex flex-wrap gap-2">
        {result.checks.map((check) => (
          <li
            key={check}
            className="inline-flex items-center gap-1 rounded-full border border-[var(--app-panel-border)] px-2 py-1 font-mono text-[10px] text-[var(--text-secondary)]"
          >
            <Check aria-hidden="true" className="h-3 w-3 text-emerald-400" />
            {check}
          </li>
        ))}
      </ul>
    </>
  );
}

function BacktestResult({ result }: { result: Extract<McpResult, { kind: "backtest" }> }) {
  const max = Math.max(...result.curve);
  const min = Math.min(...result.curve);
  const toPoint = (value: number, index: number) => {
    const x = (index / (result.curve.length - 1)) * 300;
    const y = 64 - ((value - min) / Math.max(1, max - min)) * 56;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };
  const points = result.curve.map(toPoint).join(" ");

  return (
    <>
      <StatGrid stats={result.stats} />
      <svg
        viewBox="0 0 300 66"
        role="img"
        aria-label="Illustrative equity curve rising from the first to the last simulated trade"
        className="h-20 w-full"
      >
        <defs>
          <linearGradient id="mcp-equity-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0052ff" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#0052ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={points} fill="none" stroke="#22c55e" strokeWidth="1.6" strokeLinejoin="round" />
        <polyline points={`${points} 300,66 0,66`} fill="url(#mcp-equity-fill)" stroke="none" />
      </svg>
      <div className="overflow-hidden rounded-lg border border-[var(--app-panel-border)]">
        <table aria-label="Illustrative sample of simulated trades" className="w-full border-collapse text-left font-mono text-[10.5px]">
          <thead className="bg-[var(--app-widget-inner-bg)] text-[var(--text-secondary)]">
            <tr>
              <th scope="col" className="px-3 py-1.5 font-medium uppercase tracking-[0.12em]">side</th>
              <th scope="col" className="px-3 py-1.5 font-medium uppercase tracking-[0.12em]">entry</th>
              <th scope="col" className="px-3 py-1.5 font-medium uppercase tracking-[0.12em]">exit</th>
              <th scope="col" className="px-3 py-1.5 text-right font-medium uppercase tracking-[0.12em]">p&amp;l</th>
            </tr>
          </thead>
          <tbody className="text-[var(--text-secondary)]">
            {result.trades.map((trade) => (
              <tr key={trade.entry} className="border-t border-[var(--app-panel-border)]">
                <td className="px-3 py-1.5">{trade.side}</td>
                <td className="px-3 py-1.5">{trade.entry}</td>
                <td className="px-3 py-1.5">{trade.exit}</td>
                <td
                  className={cn(
                    "px-3 py-1.5 text-right",
                    trade.pnl.startsWith("+") ? "text-emerald-400" : "text-rose-400",
                  )}
                >
                  {trade.pnl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function OrderResult({ result }: { result: Extract<McpResult, { kind: "order" }> }) {
  return (
    <>
      <StatGrid stats={result.account} />
      <dl className="divide-y divide-[var(--app-panel-border)] overflow-hidden rounded-lg border border-[var(--app-panel-border)]">
        {result.ticket.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-3 py-2">
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              {row.label}
            </dt>
            <dd className="font-mono text-[12px] text-[var(--text-primary)]">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-amber-400">
        approval required before routing
      </p>
    </>
  );
}

function MonitorResult({ result }: { result: Extract<McpResult, { kind: "monitor" }> }) {
  return (
    <>
      <StatGrid stats={result.stats} />
      <div className="space-y-1.5 rounded-lg border border-[var(--app-panel-border)] p-3">
        {result.exposures.map((exposure) => (
          <div key={exposure.label} className="flex items-center gap-3">
            <span className="w-28 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
              {exposure.label}
            </span>
            <span aria-hidden="true" className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--app-widget-inner-bg)]">
              <span
                className="block h-full rounded-full bg-[var(--northwind-primary)]/70"
                style={{ width: `${exposure.pct}%` }}
              />
            </span>
            <span className="w-9 shrink-0 text-right font-mono text-[11px] text-[var(--text-primary)]">
              {exposure.pct}%
            </span>
          </div>
        ))}
      </div>
      <ul className="space-y-1.5 font-mono text-[10.5px]">
        {result.events.map((event) => (
          <li key={event.time} className="flex gap-3">
            <span className="text-[var(--text-secondary)]">{event.time}</span>
            <span className={TONE[event.tone]}>{event.text}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card shell                                                                */
/* -------------------------------------------------------------------------- */

/**
 * The interactive result card of the chat pattern: tool header, typed payload,
 * and a plain-language footnote. Structural twin of `Frame` in
 * `FeatureVisuals.tsx`, so the MCP section shares the page's mock language.
 */
export function McpResultCard({ result }: { result: McpResult }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--app-panel-border)] px-4 py-2.5">
        <span className="inline-flex min-w-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
          <Terminal aria-hidden="true" className="h-3 w-3 shrink-0" />
          <span className="truncate">{result.tool}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded border border-[var(--app-panel-border)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          synthetic
        </span>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        {result.kind === "dataset" ? <DatasetResult result={result} /> : null}
        {result.kind === "code" ? <CodeResult result={result} /> : null}
        {result.kind === "backtest" ? <BacktestResult result={result} /> : null}
        {result.kind === "order" ? <OrderResult result={result} /> : null}
        {result.kind === "monitor" ? <MonitorResult result={result} /> : null}
      </div>

      <p className="border-t border-[var(--app-panel-border)] px-4 py-3 text-[11px] leading-relaxed text-[var(--text-secondary)]">
        {result.note}
      </p>
    </div>
  );
}
