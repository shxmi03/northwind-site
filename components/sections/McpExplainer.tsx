"use client";

import { useRef, useState } from "react";
import { ChevronDown, CornerDownRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { MCP_STAGES } from "@/lib/content";
import { McpResultCard } from "@/components/ui/McpResultCard";
import { cn } from "@/lib/utils";

const TAB_ID = (id: string) => `mcp-tab-${id}`;
const PANEL_ID = "mcp-tabpanel";

/**
 * The reference's signature MCP moment: five stage pills drive one chat thread
 * (user prompt -> assistant answer -> interactive result card).
 *
 * APG tabs pattern: one tablist, roving tabindex, automatic activation on
 * ArrowLeft/ArrowRight/Home/End, a single labelled tabpanel.
 */
export function McpExplainer() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = MCP_STAGES[active];

  const move = (index: number) => {
    const next = (index + MCP_STAGES.length) % MCP_STAGES.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        move(active + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        move(active - 1);
        break;
      case "Home":
        event.preventDefault();
        move(0);
        break;
      case "End":
        event.preventDefault();
        move(MCP_STAGES.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="MCP workflow stage"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)]/70 p-1.5 sm:rounded-full"
      >
        {MCP_STAGES.map((item, index) => {
          const selected = index === active;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={TAB_ID(item.id)}
              aria-selected={selected}
              aria-controls={PANEL_ID}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors sm:flex-none sm:px-4",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--app-canvas)]",
                selected
                  ? "bg-[var(--app-widget-content-bg)] text-[var(--text-primary)] shadow-sm ring-1 ring-inset ring-[var(--color-info)]/45"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
              )}
            >
              <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-5 w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] shadow-2xl shadow-black/30 sm:mt-6 sm:rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)]/50 px-4 py-2.5 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
            client
            <span className="text-[var(--text-primary)]">ChatGPT</span>
            <ChevronDown aria-hidden="true" className="h-3 w-3" />
          </span>
          <code className="font-mono text-[10px] text-[var(--text-secondary)]">{BRAND.mcpEndpoint}</code>
        </div>

        <div
          id={PANEL_ID}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={TAB_ID(stage.id)}
          className="px-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-info)] sm:px-6 sm:py-7"
        >
          {/* Announce stage changes to screen readers (aria-live) — the visual
              swap alone is not perceivable for non-sighted users. */}
          <p aria-live="polite" aria-atomic="true" className="sr-only">
            Stage {active + 1} of {MCP_STAGES.length}: {stage.label}. {stage.answer}
          </p>

          {/* key={stage.id} remounts the thread so the .stage-swap entrance
              animation replays on every tab change (Fable 5.1 transition). */}
          <div key={stage.id} className="stage-swap space-y-4">
            {/* user prompt */}
            <div className="flex justify-end">
              <div className="max-w-[92%] rounded-2xl rounded-br-sm border border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)] px-4 py-3 sm:max-w-[75%]">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">you</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--text-primary)] sm:text-sm">
                  {stage.prompt}
                </p>
              </div>
            </div>

            {/* assistant answer */}
            <div className="max-w-[92%] sm:max-w-[85%]">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-info)]">
                {BRAND.name.toLowerCase()} via mcp
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                {stage.answer}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <CornerDownRight aria-hidden="true" className="h-3 w-3 shrink-0 text-[var(--text-secondary)]" />
                {stage.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded border border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* tool result */}
            <McpResultCard result={stage.result} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)]/40 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-secondary)] sm:px-6">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            streamable http · session cached
          </span>
          <span>
            stage {String(active + 1).padStart(2, "0")} · {stage.label.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
