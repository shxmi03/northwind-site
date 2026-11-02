import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Original Northwind mark: a compass needle built from two weighted chevrons.
 * Decorative — the accessible name always comes from the adjacent wordmark.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 32 32"
      className={cn("h-7 w-7", className)}
      fill="none"
    >
      <defs>
        <linearGradient id="nw-logo-gradient" x1="4" y1="28" x2="28" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0052ff" />
          <stop offset="0.55" stopColor="#7928ca" />
          <stop offset="1" stopColor="#00dfd8" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" stroke="url(#nw-logo-gradient)" strokeWidth="1.5" />
      <path d="M21.5 10.5 17.6 17.6 10.5 21.5 14.4 14.4 21.5 10.5Z" fill="url(#nw-logo-gradient)" />
      <circle cx="16" cy="16" r="1.6" fill="var(--app-canvas)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-mono text-[15px] font-bold tracking-[0.18em] text-[var(--text-primary)] uppercase">
        {BRAND.name}
      </span>
    </span>
  );
}
