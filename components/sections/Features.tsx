import { ArrowRight } from "lucide-react";
import { FEATURES } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURE_VISUALS } from "@/components/ui/FeatureVisuals";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Platform capabilities"
          title={<span id="features-heading">From strategy concept to verified backtest.</span>}
          description="Construct, evaluate, refine, and deploy quantitative trading logic within a single workspace."
        />

        <ol className="mt-14 space-y-16 sm:mt-16 sm:space-y-24 lg:space-y-28">
          {FEATURES.map((feature, index) => {
            const Visual = FEATURE_VISUALS[feature.visual];
            const reversed = index % 2 === 1;
            const Icon = feature.icon;

            return (
              <Reveal
                as="li"
                key={feature.index}
                className="grid grid-cols-1 items-center gap-8 py-4 sm:py-6 lg:grid-cols-2 lg:gap-14"
              >
                <div className={cn(reversed && "lg:order-2")}>
                  <span className="inline-flex items-center gap-2 rounded-md border border-[var(--color-info)]/25 bg-[var(--color-info)]/10 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-info)]">
                    <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                    {feature.tag}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
                    {feature.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                    <span aria-hidden="true" className="h-px w-8 bg-[var(--tertiary-surface-border)]" />
                    step {feature.index} of 05
                  </div>
                </div>

                <div className={cn(reversed && "lg:order-1")}>
                  <Visual />
                </div>
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-16 flex justify-center">
          <Button href="#mcp" variant="outline" size="md">
            Explore complete feature list
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
