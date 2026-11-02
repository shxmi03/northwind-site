"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, GitFork } from "lucide-react";
import { STRATEGIES, STRATEGY_FILTERS, type Strategy } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 28 - ((value - min) / span) * 26;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 30" className="h-8 w-24" aria-hidden="true" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke="#22c55e" strokeWidth="1.6" />
    </svg>
  );
}

function StrategyCard({ strategy }: { strategy: Strategy }) {
  return (
    <article className="flex flex-col justify-between rounded-xl border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] p-5 transition-colors hover:border-[var(--color-info)]/40">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-semibold leading-snug text-[var(--text-primary)]">
              {strategy.name}
            </h3>
            <p className="mt-1 font-mono text-[11px] text-[var(--text-secondary)]">
              {strategy.tag} · {strategy.author}
            </p>
          </div>
          <Sparkline values={strategy.sparkline} />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          {strategy.description}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Instruments">
          {strategy.tickers.map((ticker) => (
            <li
              key={ticker}
              className="rounded border border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
            >
              {ticker}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--app-panel-border)] pt-3">
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              12m return
            </dt>
            <dd className="mt-0.5 font-mono text-sm font-semibold text-emerald-400">
              {strategy.return12m}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              sharpe
            </dt>
            <dd className="mt-0.5 font-mono text-sm font-semibold text-[var(--text-primary)]">
              {strategy.sharpe}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              max dd
            </dt>
            <dd className="mt-0.5 font-mono text-sm font-semibold text-[var(--text-secondary)]">
              {strategy.maxDrawdown}
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex items-center gap-2">
          <a
            href="#pricing"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--app-panel-border)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-colors hover:border-[var(--color-info)]/50 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info)]"
          >
            Inspect logic
            <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
          </a>
          <a
            href="#pricing"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--app-panel-border)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-colors hover:border-[var(--color-info)]/50 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info)]"
          >
            <GitFork aria-hidden="true" className="h-3 w-3" />
            Fork
          </a>
        </div>
      </div>
    </article>
  );
}

export function Explore() {
  const [filter, setFilter] = useState<string>("All");

  const visible = useMemo(
    () => (filter === "All" ? STRATEGIES : STRATEGIES.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <section
      id="explore"
      aria-labelledby="explore-heading"
      className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Strategy repository"
          title={<span id="explore-heading">Explore rule-based strategy templates.</span>}
          description="Inspect, clone, and modify strategy templates created by quantitative developers."
        />

        <div
          className="mt-8 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter strategies by category"
        >
          {STRATEGY_FILTERS.map((item) => {
            const active = item === filter;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item)}
                className={cn(
                  "min-h-[36px] rounded-lg border px-3.5 py-1.5 font-mono text-[11px] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--app-canvas)]",
                  active
                    ? "border-[var(--astral-primary)] bg-[var(--astral-primary)] text-white"
                    : "border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] text-[var(--text-secondary)] hover:border-[var(--color-info)]/60 hover:text-[var(--text-primary)]",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          {visible.length} {visible.length === 1 ? "template" : "templates"} shown · illustrative performance
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((strategy) => (
            <StrategyCard key={strategy.name} strategy={strategy} />
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            No templates in this category yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}
