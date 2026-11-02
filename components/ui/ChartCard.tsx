"use client";

import { useEffect, useRef, useState } from "react";
import {
  CandlestickSeries,
  createChart,
  LineStyle,
  type CandlestickData,
  type IChartApi,
  type ISeriesApi,
  type Time,
  type UTCTimestamp,
} from "lightweight-charts";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn, signedPct } from "@/lib/utils";

/** Deterministic pseudo-random walk — illustrative data only, no live feed. */
function buildSeries(count = 160, seed = 42): CandlestickData<Time>[] {
  let state = seed;
  const random = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };

  const start = 1704067200; // 2024-01-01T00:00:00Z
  const step = 60 * 60 * 4; // 4h candles
  let price = 82400;
  const bars: CandlestickData<Time>[] = [];

  for (let i = 0; i < count; i += 1) {
    const drift = 34 + Math.sin(i / 11) * 46;
    const noise = (random() - 0.45) * 520;
    const open = price;
    const close = Math.max(1500, open + drift + noise);
    const high = Math.max(open, close) + random() * 210;
    const low = Math.min(open, close) - random() * 210;

    bars.push({
      time: (start + i * step) as UTCTimestamp,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
    });

    price = close;
  }

  return bars;
}

const BARS = buildSeries();
const LAST = BARS[BARS.length - 1];
const FIRST = BARS[0];
const CHANGE_PCT = ((Number(LAST.close) - Number(FIRST.open)) / Number(FIRST.open)) * 100;

export function ChartCard({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const { theme } = useTheme();
  const [liveTick, setLiveTick] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDark = theme === "dark";
    const chart = createChart(container, {
      layout: {
        background: { color: "transparent" },
        textColor: isDark ? "#94a3b8" : "#475569",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
        fontSize: 10,
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: isDark ? "rgba(38,47,62,0.55)" : "rgba(203,213,225,0.7)" },
        horzLines: { color: isDark ? "rgba(38,47,62,0.55)" : "rgba(203,213,225,0.7)" },
      },
      rightPriceScale: {
        borderColor: isDark ? "#262f3e" : "#cbd5e1",
        scaleMargins: { top: 0.12, bottom: 0.08 },
      },
      timeScale: {
        borderColor: isDark ? "#262f3e" : "#cbd5e1",
        timeVisible: true,
        secondsVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: isDark ? "#64748b" : "#94a3b8",
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: "#0052ff",
        },
        horzLine: {
          color: isDark ? "#64748b" : "#94a3b8",
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: "#0052ff",
        },
      },
      handleScale: false,
      handleScroll: false,
      autoSize: true,
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
      priceLineColor: "#0052ff",
      priceLineWidth: 1,
      priceLineStyle: LineStyle.Dotted,
    });

    series.setData(BARS);
    chart.timeScale().fitContent();

    chartRef.current = chart;
    seriesRef.current = series;

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [theme]);

  /* Mock "live" price ticks — stopped entirely for reduced-motion users. */
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const interval = window.setInterval(() => {
      setLiveTick((tick) => tick + 1);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (liveTick === 0) return;
    const series = seriesRef.current;
    const chart = chartRef.current;
    if (!series || !chart) return;

    const base = BARS[BARS.length - 1];
    const drift = (liveTick % 5) * 24 - 40;
    const open = Number(base.close);
    const close = open + drift;
    const nextTime = (Number(base.time) + 4 * 60 * 60 * liveTick) as UTCTimestamp;

    series.update({
      time: nextTime,
      open,
      high: Math.max(open, close) + 60,
      low: Math.min(open, close) - 60,
      close,
    });
    chart.timeScale().scrollToRealTime();
  }, [liveTick]);

  const price = Number(LAST.close);
  const positive = CHANGE_PCT >= 0;

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)]",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--app-panel-border)] px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold tracking-wide text-[var(--text-primary)]">
              BTC/USD
            </span>
            <span
              className={cn(
                "rounded border px-1.5 py-0.5 font-mono text-[10px]",
                positive
                  ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-400"
                  : "border-rose-500/25 bg-rose-500/10 text-rose-400",
              )}
            >
              {signedPct(CHANGE_PCT)}
            </span>
          </div>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-[var(--text-primary)]">
            ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="flex gap-4 text-right font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
          <div>
            <p>Win rate</p>
            <p className="mt-1 text-xs font-semibold text-[var(--text-primary)]">61.3%</p>
          </div>
          <div>
            <p>Sharpe</p>
            <p className="mt-1 text-xs font-semibold text-[var(--text-primary)]">1.82</p>
          </div>
          <div>
            <p>Max DD</p>
            <p className="mt-1 text-xs font-semibold text-rose-400">-4.1%</p>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        role="img"
        aria-label={`Illustrative BTC/USD candlestick chart built from synthetic data. Final close ${price.toFixed(
          2,
        )} dollars, aggregate change ${signedPct(CHANGE_PCT)}.`}
        className="h-[220px] w-full sm:h-[260px]"
        data-testid="chart-canvas"
      />

      <div className="flex items-center justify-between border-t border-[var(--app-panel-border)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" aria-hidden="true" />
          Simulated feed
        </span>
        <span>Illustrative data</span>
      </div>
    </div>
  );
}

export default ChartCard;
