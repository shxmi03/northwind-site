"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItemData = { question: string; answer: string };

export function Accordion({
  items,
  defaultOpen = 0,
  className,
}: {
  items: AccordionItemData[];
  defaultOpen?: number | null;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-xl border transition-colors",
              isOpen
                ? "border-[var(--color-info)]/40 bg-[var(--app-widget-inner-bg)]"
                : "border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)]",
            )}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(
                  "flex min-h-[44px] w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6",
                  "text-[15px] font-semibold text-[var(--text-primary)] transition-colors",
                  "hover:bg-[var(--app-widget-inner-bg)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-info)]",
                )}
              >
                <span className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="font-mono text-[11px] text-[var(--text-secondary)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-[var(--text-secondary)] transition-transform duration-200",
                    isOpen && "rotate-180 text-[var(--color-info)]",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="px-5 pb-6 pt-0 sm:px-6"
            >
              <p className="border-t border-[var(--app-panel-border)] pt-4 pl-8 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
