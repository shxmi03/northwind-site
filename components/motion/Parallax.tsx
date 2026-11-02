import type { ReactNode } from "react";

/**
 * Fable 5.1 hero parallax — markup only.
 *
 * The transform is written by `MotionController` (one shared scroll/rAF loop
 * for every `[data-parallax]` layer) rather than by a client component per
 * layer. `data-parallax` holds the speed: negative values move the layer
 * slower than the page, which reads as depth.
 */
export function Parallax({
  children,
  speed = -0.08,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div
      data-parallax={speed}
      className={className}
    >
      {children}
    </div>
  );
}
