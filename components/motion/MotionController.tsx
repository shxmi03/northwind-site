"use client";

import { useEffect } from "react";

/**
 * Fable 5.1 motion controller — one client component for the whole page.
 *
 * Responsibilities:
 * 1. Scroll reveals: adds `.reveal-visible` to every `.reveal` element the
 *    first time it intersects the viewport (single shared observer, then it
 *    unobserves that element — no scroll listener, no per-block React state).
 * 2. Parallax: moves every `[data-parallax]` layer by scrollY * speed inside
 *    one rAF frame, transform-only so it composites on the GPU.
 * 3. Reduced motion: skips both, and the CSS already forces the visible
 *    end-state, so nothing depends on JS for legibility.
 *
 * All listeners are passive and removed on unmount.
 */
export function MotionController() {
  useEffect(() => {
    // Everything below runs after first paint: scroll reveals and hero
    // parallax are never needed for the above-the-fold content (the hero uses
    // pure CSS entrance animations), so wiring observers during hydration only
    // competed with the LCP paint on mobile.
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const idleWindow = window as IdleWindow;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const begin = () => {
      if (cancelled) return;
      cleanup = wire();
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      idleWindow.requestIdleCallback(begin, { timeout: 900 });
    } else {
      window.setTimeout(begin, 250);
    }

    return () => {
      cancelled = true;
      cleanup?.();
    };

    function wire() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const parallaxTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));

    // Reduced motion: reveal everything immediately, never move parallax
    // layers, and stop here so no observers/rAF loops are created at all.
    if (reduce.matches) {
      revealTargets.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("reveal-visible");
          revealObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    revealTargets.forEach((el) => revealObserver.observe(el));

    let raf = 0;
    const applyParallax = () => {
      raf = 0;
      const y = window.scrollY;
      for (const el of parallaxTargets) {
        const speed = Number(el.dataset.parallax || 0);
        el.style.transform = `translate3d(0, ${(y * speed).toFixed(2)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(applyParallax);
    };

    if (parallaxTargets.length) {
      applyParallax();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    }
  }, []);

  return null;
}
