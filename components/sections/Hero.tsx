import { ArrowRight, Plug, ShieldCheck, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { TerminalMock } from "@/components/ui/TerminalMock";
import { ChartCard } from "@/components/ui/ChartCard";
import { asset } from "@/lib/utils";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Generated backdrop art — decorative only. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={asset("/assets/images/hero-visual.webp")}
          srcSet={`${asset("/assets/images/hero-visual-800.webp")} 800w, ${asset("/assets/images/hero-visual.webp")} 1280w`}
          sizes="100vw"
          alt=""
          width={1280}
          height={768}
          fetchPriority="high"
          className="h-full w-full object-cover opacity-30 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000_15%,transparent_85%)]"
        />
        <div className="grid-backdrop absolute inset-0 opacity-60" />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_50%_60%_at_50%_-10%,rgba(0,82,255,0.22),transparent_70%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-info)]/25 bg-[var(--color-info)]/10 px-3 py-1.5">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-[var(--color-info)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-info)]">
              Quantitative Trading Workstation
            </span>
          </span>

          <h1
            id="hero-heading"
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
          >
            Research market data. Build rule-based strategies.{" "}
            <span className="rainbow-text">Automate execution.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {BRAND.name} combines natural language strategy design, historical tick-data backtesting, and
            broker connection protocols in one unified interface.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button href="#pricing" size="lg" className="w-full justify-center sm:w-auto">
              Launch Workspace
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
            <Button href="#mcp" variant="outline" size="lg" className="w-full justify-center sm:w-auto">
              <Plug aria-hidden="true" className="h-4 w-4" />
              Connect via MCP
            </Button>
          </div>

          <p className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span className="text-left">No credit card required for workspace exploration · Setup takes 2 minutes</span>
          </p>
        </div>

        {/* Workspace showcase */}
        <div className="mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] shadow-2xl shadow-black/40 sm:mt-16">
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
            <ChartCard />
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          Interface preview · synthetic market data · illustrative metrics
        </p>
      </div>
    </section>
  );
}
