import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";

export function FinalCta() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--color-info)]/30 bg-gradient-to-r from-[var(--color-info)]/15 via-[var(--app-widget-content-bg)] to-[#7928ca]/15 p-8 text-center sm:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(0,82,255,0.25),transparent_70%)]"
        />
        <div className="relative">
          <Eyebrow className="justify-center">Start in minutes</Eyebrow>
          <h2
            id="final-cta-heading"
            className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl"
          >
            Build and test your first strategy today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            Formulate entry rules, simulate historical performance, and refine your quantitative workflow.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#pricing" size="lg" className="w-full justify-center sm:w-auto">
              Launch {BRAND.name} Workspace
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              Monthly subscription · {BRAND.planPriceMonthly}/{BRAND.planPricePeriod} · cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
