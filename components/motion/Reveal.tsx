import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in ms — use small steps (60–120ms) for grouped items. */
  delay?: number;
  /** Vertical travel distance in px (default 24). */
  y?: number;
  /** Render as a different element (default "div"). */
  as?: "div" | "section" | "li" | "article" | "span";
  className?: string;
};

/**
 * Fable 5.1 scroll-triggered reveal — markup only, zero client JS per instance.
 *
 * This is a *server* component on purpose. The actual visibility toggling is
 * done once for the whole document by `MotionController`, which observes every
 * `.reveal` element with a single IntersectionObserver. Rendering 40+ client
 * components with their own state/effects measurably delayed mobile
 * first paint, so the animation chrome is shared instead of per-block.
 */
export function Reveal({ children, delay = 0, y = 24, as = "div", className = "" }: RevealProps) {
  const Tag = as as "div";
  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  return (
    <Tag style={style} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}
