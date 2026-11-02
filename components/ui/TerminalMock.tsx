"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { HERO_TABS, type HeroTab } from "@/lib/content";
import { cn } from "@/lib/utils";

const KIND_STYLES: Record<string, string> = {
  prompt: "text-slate-100",
  out: "text-slate-300",
  ok: "text-[#34d399]",
  code: "text-[#38bdf8]",
  meta: "text-slate-400",
};

const PROMPT_PREFIX: Record<string, string> = {
  prompt: "❯",
  out: "·",
  ok: "✓",
  code: " ",
  meta: "·",
};

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(MOTION_QUERY).matches,
    () => false,
  );
}

/** Typewriter for the prompt, then one output line every 380 ms. */
function Transcript({ lines, label }: { lines: HeroTab["lines"]; label: string }) {
  const reduced = useReducedMotion();
  const [typedCount, setTypedCount] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const prompt = lines[0]?.text ?? "";

  useEffect(() => {
    if (reduced) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 2;
      setTypedCount(index);
      if (index >= prompt.length) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, [prompt, reduced]);

  useEffect(() => {
    if (reduced || typedCount < prompt.length || revealed >= lines.length - 1) return;
    const timer = window.setTimeout(() => setRevealed((count) => count + 1), 380);
    return () => window.clearTimeout(timer);
  }, [reduced, typedCount, prompt.length, revealed, lines.length]);

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) panel.scrollTop = panel.scrollHeight;
  }, [typedCount, revealed]);

  const shownPrompt = reduced ? prompt : prompt.slice(0, typedCount);
  const visible = reduced ? lines.length : 1 + revealed;

  return (
    <div
      ref={panelRef}
      role="img"
      aria-label={label}
      className="scroll-slim h-[188px] overflow-y-auto font-mono text-[11px] leading-relaxed sm:text-xs"
    >
      {lines.slice(0, visible).map((line, index) => {
        const isPrompt = index === 0;
        return (
          <p
            key={index}
            className={cn("flex gap-2 whitespace-pre-wrap", KIND_STYLES[line.kind])}
          >
            <span aria-hidden="true" className="select-none text-slate-500">
              {PROMPT_PREFIX[line.kind]}
            </span>
            <span>{isPrompt ? shownPrompt : line.text}</span>
            {isPrompt && shownPrompt.length < prompt.length ? (
              <span aria-hidden="true" className="inline-block w-[7px] bg-slate-300 motion-safe:animate-blink" />
            ) : null}
          </p>
        );
      })}
    </div>
  );
}

export function TerminalMock({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = HERO_TABS[activeTab];

  const focusTab = (index: number) => {
    setActiveTab(index);
    document.getElementById(`hero-tab-${HERO_TABS[index].id}`)?.focus();
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border border-[var(--app-panel-border)] bg-[#090d16]",
        className,
      )}
    >
      <div className="relative">
        <div
          role="tablist"
          aria-label="Workspace panels"
          className="scroll-slim flex overflow-x-auto border-b border-[var(--app-panel-border)] bg-[#0b1019]"
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
                    focusTab((index + 1) % HERO_TABS.length);
                  }
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    focusTab((index - 1 + HERO_TABS.length) % HERO_TABS.length);
                  }
                  if (event.key === "Home") {
                    event.preventDefault();
                    focusTab(0);
                  }
                  if (event.key === "End") {
                    event.preventDefault();
                    focusTab(HERO_TABS.length - 1);
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
        {/* Fading edge: 630 px of tabs sit in a 322 px strip on phones (R-1). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0b1019] via-[#0b1019]/80 to-transparent sm:hidden"
        />
      </div>

      <div
        id="hero-tabpanel"
        role="tabpanel"
        aria-labelledby={`hero-tab-${tab.id}`}
        className="flex-1 px-4 py-4"
      >
        {/* Keyed so switching tabs restarts the animation without a reset effect. */}
        <Transcript
          key={tab.id}
          lines={tab.lines}
          label={`Simulated terminal transcript for panel ${tab.label}: ${tab.lines
            .map((line) => line.text)
            .join(" ")}`}
        />
      </div>

      <div className="flex items-center justify-between border-t border-[var(--app-panel-border)] bg-[#0b1019] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          workspace ready
        </span>
        <span>{tab.label.replace("0", "")} · simulated session</span>
      </div>
    </div>
  );
}

export default TerminalMock;
