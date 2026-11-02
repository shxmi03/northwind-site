"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--tertiary-surface-border)]",
        "bg-[var(--tertiary-surface-bg)] text-[var(--text-secondary)] transition-colors",
        "hover:text-[var(--text-primary)] hover:border-[var(--astral-primary)]/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--app-canvas)]",
        className,
      )}
    >
      <Sun aria-hidden="true" className={cn("h-4 w-4", isDark ? "block" : "hidden")} />
      <Moon aria-hidden="true" className={cn("h-4 w-4", isDark ? "hidden" : "block")} />
    </button>
  );
}
