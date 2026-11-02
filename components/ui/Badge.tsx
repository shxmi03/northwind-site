import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "brand" | "neutral" | "success" | "danger" | "warning";

const TONES: Record<BadgeTone, string> = {
  brand:
    "text-[var(--color-info)] bg-[var(--color-info)]/10 border-[var(--color-info)]/25",
  neutral:
    "text-[var(--text-secondary)] bg-[var(--app-widget-inner-bg)] border-[var(--tertiary-surface-border)]",
  success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  danger: "text-rose-400 bg-rose-500/10 border-rose-500/25",
  warning: "text-amber-400 bg-amber-500/10 border-amber-500/25",
};

export function Badge({
  children,
  tone = "neutral",
  className,
  mono = true,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  mono?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] leading-none",
        mono && "font-mono uppercase tracking-[0.14em]",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-info)]",
        className,
      )}
    >
      {children}
    </p>
  );
}
