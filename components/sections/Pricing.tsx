import { ArrowRight, Check } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { PRICING_BULLETS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Single-plan pricing. The checkout target is a placeholder until the Stripe
 * link exists — see README TODO.
 */
const CHECKOUT_HREF = `mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(
  `${BRAND.name} Professional — subscription request`,
)}`;

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative scroll-mt-24 overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 h-72 bg-[radial-gradient(ellipse_45%_60%_at_50%_0%,rgba(0,82,255,0.14),transparent_75%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Subscription pricing"
          title={<span id="pricing-heading">Simple pricing. Complete workspace access.</span>}
          description="Access market research, backtesting engines, strategy builders, and broker connection tools under a single subscription."
        />

        <Reveal className="mx-auto mt-10 max-w-xl overflow-hidden rounded-2xl border border-[var(--color-info)]/35 bg-[var(--app-widget-content-bg)] p-6 shadow-2xl shadow-black/40 sm:p-9">
          <div className="flex items-center justify-between">
            <Badge tone="brand">One complete plan</Badge>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              cancel anytime
            </span>
          </div>

          <h3 className="mt-5 text-xl font-semibold text-[var(--text-primary)]">
            {BRAND.name} Professional
          </h3>

          <div className="mt-3 flex flex-wrap items-end gap-x-2 gap-y-1">
            <span className="font-mono text-5xl font-extrabold leading-none tracking-tight text-[var(--text-primary)]">
              {BRAND.planPriceInitial}
            </span>
            <span className="pb-1 font-mono text-sm text-[var(--text-secondary)]">first month</span>
            <span className="pb-1 pl-1 font-mono text-sm text-[var(--text-secondary)]">
              then {BRAND.planPriceMonthly}/{BRAND.planPricePeriod}
            </span>
          </div>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Billed monthly after the first month. Cancel from the account dashboard at any time.
          </p>

          <Button href={CHECKOUT_HREF} size="lg" className="micro-sheen mt-6 w-full justify-center">
            Get started — {BRAND.planPriceInitial} first month
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>

          <ul className="mt-7 space-y-2.5 border-t border-[var(--app-panel-border)] pt-6">
            {PRICING_BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                  <Check aria-hidden="true" className="h-2.5 w-2.5 text-emerald-400" />
                </span>
                <span className="text-sm leading-relaxed text-[var(--text-secondary)]">{bullet}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t border-[var(--app-panel-border)] pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
            Placeholder pricing · no payment is collected from this preview
          </p>
        </Reveal>
      </div>
    </section>
  );
}
