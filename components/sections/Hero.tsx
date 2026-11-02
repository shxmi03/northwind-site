import { ArrowRight, Plug, ShieldCheck, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { TerminalMock } from "@/components/ui/TerminalMock";
import { ChartCardDeferred } from "@/components/ui/ChartCardDeferred";
import { asset } from "@/lib/utils";
import { Parallax } from "@/components/motion/Parallax";
import { Particles } from "@/components/motion/Particles";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Generated backdrop art — decorative only.
          Fable 5.1: the 43 KB hero-visual-800.webp stays the LCP-safe base and
          gains motion via (a) a slow CSS drift, (b) a scroll parallax layer at
          -0.08 speed and (c) a lightweight canvas particle field. No AVIF
          frame sequence is shipped, which keeps mobile LCP under budget. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Parallax speed={-0.08} className="absolute inset-x-0 top-0 h-[560px] sm:h-[700px] lg:h-[820px]">
          <img
            src={asset("/assets/images/hero-visual.webp")}
            srcSet={`${asset("/assets/images/hero-visual-800.webp")} 800w, ${asset("/assets/images/hero-visual.webp")} 1280w`}
            sizes="100vw"
            alt=""
            width={1280}
            height={768}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="hero-drift h-full w-full object-cover opacity-30"
          />
        </Parallax>
        {/* Fade-out veil instead of a CSS mask: masking a large image forces an
            offscreen buffer on every animation frame and delayed mobile LCP,
            while a plain gradient overlay composites cheaply. */}
        <div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_65%_55%_at_50%_0%,transparent_15%,var(--app-canvas)_85%)] sm:h-[700px] lg:h-[820px]" />
        <div className="grid-backdrop absolute inset-0 opacity-60" />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_50%_60%_at_50%_-10%,rgba(0,82,255,0.22),transparent_70%)]" />
        {/* Ambient particles: 20–56 dots, paused off-screen and under
            prefers-reduced-motion. Decorative, aria-hidden, non-interactive. */}
        <Particles className="opacity-70" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span
            className="entrance inline-flex items-center gap-2 rounded-full border border-[var(--color-info)]/25 bg-[var(--color-info)]/10 px-3 py-1.5"
            style={{ "--entrance-delay": "0ms" } as React.CSSProperties}
          >
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-[var(--color-info)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-info)]">
              Quantitative Trading Workstation
            </span>
          </span>

          <h1
            id="hero-heading"
            className="entrance mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
            style={{ "--entrance-delay": "90ms" } as React.CSSProperties}
          >
            Research market data. Build rule-based strategies.{" "}
            <span className="rainbow-text">Automate execution.</span>
          </h1>

          <p
            className="entrance mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
            style={{ "--entrance-delay": "180ms" } as React.CSSProperties}
          >
            {BRAND.name} combines natural language strategy design, historical tick-data backtesting, and
            broker connection protocols in one unified interface.
          </p>

          <div
            className="entrance mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
            style={{ "--entrance-delay": "270ms" } as React.CSSProperties}
          >
            <Button href="#pricing" size="lg" className="micro-sheen w-full justify-center sm:w-auto">
              Launch Workspace
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
            <Button href="#mcp" variant="outline" size="lg" className="w-full justify-center sm:w-auto">
              <Plug aria-hidden="true" className="h-4 w-4" />
              Connect via MCP
            </Button>
          </div>

          <p
            className="entrance mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)]"
            style={{ "--entrance-delay": "360ms" } as React.CSSProperties}
          >
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span className="text-left">No credit card required for workspace exploration · Setup takes 2 minutes</span>
          </p>
        </div>

        {/* Workspace showcase */}
        <div
          className="entrance mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] shadow-2xl shadow-black/40 sm:mt-16"
          style={{ "--entrance-delay": "450ms" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between border-b border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)]/60 px-4 py-2.5">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              {BRAND.name.toLowerCase()}.ai / workspace
            </p>
            <span className="rounded border border-[var(--app-panel-border)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)]">
              demo
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 lg:gap-5 lg:p-5">
            <TerminalMock className="min-h-[260px]" />
            <ChartCardDeferred />
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          Interface preview · synthetic market data · illustrative metrics
        </p>
      </div>
    </section>
  );
}
