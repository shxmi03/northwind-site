"use client";

import { useEffect, useRef } from "react";

/**
 * Fable 5.1 ambient particle field for the hero backdrop.
 *
 * Design constraints (why it is built this way):
 * - Pure canvas 2D, ~48 particles at a fixed DPR cap of 2 — cheap enough that
 *   Lighthouse interaction/TBT is unaffected and mobile GPUs stay cool.
 * - Pauses when the hero leaves the viewport (IntersectionObserver) and on
 *   document visibilitychange, so it never burns battery off-screen.
 * - Fully skipped under prefers-reduced-motion (returns null-equivalent
 *   render output), and the canvas is aria-hidden + pointer-events-none.
 * - No JS animation when the tab is hidden; rAF is cancelled on cleanup.
 */
export function Particles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area but is capped so wide screens stay cheap.
      const count = Math.min(56, Math.max(20, Math.round((width * height) / 26000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 0.6 + Math.random() * 1.5,
        a: 0.12 + Math.random() * 0.35,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.documentElement.dataset.theme === "light";
      const dot = isLight ? "37, 99, 235" : "96, 165, 250";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges instead of bouncing — reads as drifting dust.
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;
        if (p.y < -4) p.y = height + 4;
        if (p.y > height + 4) p.y = -4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot}, ${p.a})`;
        ctx.fill();
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    // Do not start painting until the browser is idle (or 1.5 s has passed).
    // Starting the rAF loop during hydration competed with the LCP paint.
    type IdleWindow = Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    const idleWindow = window as IdleWindow;
    if (typeof idleWindow.requestIdleCallback === "function") {
      idleWindow.requestIdleCallback(start, { timeout: 1500 });
    } else {
      window.setTimeout(start, 600);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) start();
    });
    ro.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`.trim()}
    />
  );
}
