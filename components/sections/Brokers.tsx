import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { BROKERS, BROKER_STEPS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Brokers() {
  return (
    <section
      id="brokers"
      aria-labelledby="brokers-heading"
      className="scroll-mt-24 border-y border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)]/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Broker integration"
          title={<span id="brokers-heading">Connect your brokerage accounts.</span>}
          description="Link supported brokerage credentials to stream balances, inspect positions, and stage authorized trades."
        />

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {BROKERS.map((broker) => (
            <li
              key={broker.name}
              className="flex flex-col items-start gap-2 rounded-xl border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] p-4 transition-colors hover:border-[var(--color-info)]/40"
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--tertiary-surface-border)] bg-[var(--app-widget-inner-bg)] font-mono text-[11px] font-semibold tracking-wide text-[var(--text-secondary)]"
              >
                {broker.mark}
              </span>
              <span className="text-[13px] font-medium leading-tight text-[var(--text-primary)]">
                {broker.name}
              </span>
              <span
                className={cn(
                  "rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em]",
                  broker.status === "Soon"
                    ? "border border-[var(--app-panel-border)] text-[var(--text-secondary)]"
                    : "border border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
                )}
              >
                {broker.status === "Soon" ? "coming soon" : broker.status}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col items-start gap-4 rounded-xl border border-[var(--color-info)]/25 bg-gradient-to-r from-[var(--color-info)]/10 via-transparent to-transparent p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-info)]" />
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Partner integration framework is rolling out
              </p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
                Broker connection APIs ship in phases. Join the integration list to be notified when your
                venue is available — no password sharing, OAuth or scoped API keys only.
              </p>
            </div>
          </div>
          <Button href="#pricing" size="sm" variant="outline" className="shrink-0">
            Join the list
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Button>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BROKER_STEPS.map((step) => (
            <li
              key={step.step}
              className="rounded-xl border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[var(--color-info)]">{step.step}</span>
                <Lock aria-hidden="true" className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{step.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          Brokerage names shown as integration targets only · no partnership implied
        </p>
      </div>
    </section>
  );
}
