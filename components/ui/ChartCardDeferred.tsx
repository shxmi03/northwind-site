"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * Deferred chart card.
 *
 * `lightweight-charts` is ~140 KB of JS that only paints a mock inside the
 * hero's workspace showcase. Mounting it during hydration pushed mobile LCP
 * render delay past 2.3 s, so the chart is code-split and mounted only when it
 * nears the viewport (300 px look-ahead). The placeholder reserves the same
 * height as the real card, so CLS stays at 0.
 */
const ChartCard = dynamic(() => import("@/components/ui/ChartCard").then((mod) => mod.ChartCard), {
  ssr: false,
});

export function ChartCardDeferred({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browsers): render on the next tick.
    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setShown(true), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (shown) return <ChartCard className={className} />;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`h-[360px] animate-pulse rounded-xl border border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)]/60 motion-reduce:animate-none ${className ?? ""}`}
    />
  );
}
