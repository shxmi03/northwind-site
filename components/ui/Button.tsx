import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "rainbow" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-10 px-6 text-[13px]",
  lg: "h-12 px-8 text-sm",
};

const BASE =
  "relative inline-flex items-center justify-center gap-2 rounded-xl font-mono uppercase tracking-[0.025em] font-medium " +
  "transition-all duration-200 cursor-pointer select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info)] focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-[var(--app-canvas)] disabled:opacity-60 disabled:pointer-events-none";

const VARIANTS: Record<Variant, string> = {
  rainbow: cn(
    "overflow-hidden text-white border border-[var(--astral-blue-700)]",
    "bg-[linear-gradient(#0052ff,#0052ff),linear-gradient(90deg,#ff007a,#7928ca,#0070f3,#00dfd8,#ff007a)]",
    "bg-[length:200%_200%,200%_100%] bg-[position:0_0,0_50%] bg-no-repeat",
    "hover:shadow-[0_0_22px_rgba(0,82,255,0.45)] hover:bg-[position:0_0,200%_50%]",
    "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]",
    "after:shadow-[inset_0_1px_0_rgba(142,197,255,0.45),inset_0_-1px_0_rgba(0,0,0,0.35)]",
    "before:pointer-events-none before:absolute before:inset-x-[16%] before:bottom-0 before:h-[38%] before:max-h-[9px]",
    "before:rounded-full before:bg-[linear-gradient(90deg,#ff007a,#7928ca,#0070f3,#00dfd8,#ff007a)]",
    "before:bg-[length:200%] before:opacity-60 before:blur-[6px] before:animate-rainbow before:motion-reduce:animate-none",
  ),
  outline: cn(
    "border border-[var(--tertiary-surface-border)] bg-[var(--app-widget-content-bg)]/60 text-[var(--text-primary)]",
    "hover:border-[var(--astral-primary)]/70 hover:bg-[var(--app-widget-inner-bg)]",
  ),
  ghost: cn(
    "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--app-widget-inner-bg)]",
  ),
};

function content(children: ReactNode, variant: Variant) {
  return variant === "rainbow" ? <span className="relative z-10 flex items-center gap-2">{children}</span> : children;
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  /** External links render a plain <a> instead of next/link. */
  external?: boolean;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "rainbow", size = "md", className, children } = props;
  const classes = cn(BASE, SIZES[size], VARIANTS[variant], className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} rel="noopener noreferrer" target="_blank">
          {content(children, variant)}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content(children, variant)}
      </Link>
    );
  }

  /* Forward any remaining native button props (onClick, disabled, aria-*) without
     destructuring names we would never read. */
  const rest = { ...props } as Record<string, unknown>;
  for (const key of ["href", "external", "variant", "size", "className", "children"]) {
    delete rest[key];
  }

  return (
    <button type="button" {...(rest as ComponentPropsWithoutRef<"button">)} className={classes}>
      {content(children, variant)}
    </button>
  );
}
