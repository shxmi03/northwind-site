"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HERO_TABS } from "@/lib/content";
import { cn } from "@/lib/utils";

const KIND_STYLES: Record<string, string> = {
  prompt: "text-[var(--text-primary)]",
  out: "text-slate-400",
  ok: "text-emerald-400",
  code: "text-[var(--color-info)]",
  meta: "text-[var(--text-secondary)]",
};

const PROMPT_PREFIX: Record<string, string> = {
  prompt: "❯",
  out: "·",
  ok: "✓",
  code: " ",
  meta: "·",
};

export function TerminalMock({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typed, setTyped] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  const tab = HERO_TABS[activeTab];
  const lines = useMemo(() => tab.lines, [tab]);
  const reducedMotion = useReducedMotion();

  /* Reset the animation whenever the tab changes. */
  useEffect(() => {
    setVisibleLines(reducedMotion ? lines.length : 0);
    setTyped(reducedMotion ? lines[0]?.text ?? "" : "");
  }, [lines, reducedMotion]);

  /* Typewriter for the first prompt line, then reveal the rest progressively. */
  useEffect(() => {
    if (reducedMotion) return;
    const first = lines[0];
    if (!first) return;

    let charIndex = 0;
    let cancelled = false;

    const typeTimer = window.setInterval(() => {
      if (cancelled) return;
      charIndex += 2;
      setTyped(first.text.slice(0, charIndex));
      if (charIndex >= first.text.length) {
        window.clearInterval(typeTimer);
      }
    }, 18);

    return () => {
      cancelled = true;
      window.clearInterval(typeTimer);
    };
  }, [lines, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (!lines.length) return;
    if (typed.length < lines[0].text.length) return;

    let index = 1;
    const reveal = window.setInterval(() => {
      index += 1;
      setVisibleLines(Math.min(index, lines.length));
      if (index >= lines.length) window.clearInterval(reveal);
    }, 520);

    return () => window.clearInterval(reveal);
  }, [typed, lines, reducedMotion]);

  /* Keep the newest line in view. */
  useEffect(() => {
    const el = panelRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleLines, typed]);

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border border-[var(--app-panel-border)] bg-[#090d16]",
        className,
      )}
    >
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Workspace panels"
        className="flex overflow-x-auto border-b border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)] scroll-slim"
      >
        {HERO_TABS.map((item, index) => {
          const selected = index === activeTab;
          return (
            <button
              key={item.id}
              role="tab"
              id={`hero-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="hero-tabpanel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  const next = (index + 1) % HERO_TABS.length;
                  setActiveTab(next);
                  document.getElementById(`hero-tab-${HERO_TABS[next].id}`)?.focus();
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  const prev = (index - 1 + HERO_TABS.length) % HERO_TABS.length;
                  setActiveTab(prev);
                  document.getElementById(`hero-tab-${HERO_TABS[prev].id}`)?.focus();
                }
              }}
              className={cn(
                "shrink-0 border-b-2 px-4 py-3 font-mono text-[11px] uppercase tracking-wide transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-info)]",
                selected
                  ? "border-[var(--color-info)] bg-[#131822] text-white"
                  : "border-transparent text-slate-400 hover:text-white",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Terminal body */}
      <div
        id="hero-tabpanel"
        role="tabpanel"
        aria-labelledby={`hero-tab-${tab.id}`}
        className="flex-1 px-4 py-4"
      >
        <div
          ref={panelRef}
          className="scroll-slim h-[188px] overflow-y-auto font-mono text-[11px] leading-relaxed sm:text-xs"
        >
          {lines.map((line, index) => {
            const isFirst = index === 0;
            const shown = isFirst ? typed.length > 0 : index <= visibleLines;
            if (!shown) return null;
            const text = isFirst ? typed : line.text;

            return (
              <p key={`${tab.id}-${index}`} className={cn("flex gap-2 whitespace-pre-wrap", KIND_STYLES[line.kind])}>
                <span aria-hidden="true" className="select-none text-slate-600">
                  {PROMPT_PREFIX[line.kind]}
                </span>
                <span>{text}</span>
                {isFirst && typed.length < line.text.length ? (
                  <span aria-hidden="true" className="inline-block w-[7px] bg-slate-300 motion-safe:animate-blink" />
                ) : null}
              </p>
            );
          })}
        </div>
      </div>

      {/* Status line */}
      <div className="flex items-center justify-between border-t border-[var(--app-panel-border)] bg-[#0b1019] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          workspace ready
        </span>
        <span>{tab.label.replace("0", "")} · simulated session</span>
      </div>

      <p className="sr-only">
        Simulated terminal preview. Panel {tab.label} shows the following transcript:{" "}
        {lines.map((line) => line.text).join(" ")}
      </p>
    </div>
  );
}

/** Tracks prefers-reduced-motion without layout shift. */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export default TerminalMock;
