import { SOCIAL_PROOF } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export function SocialProof() {
  return (
    <section
      id="social-proof"
      aria-label="Platform benchmarks"
      className="border-y border-[var(--app-panel-border)] bg-[var(--strip-surface)] py-10 backdrop-blur-sm sm:py-12"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-4 text-center sm:px-6 md:grid-cols-4 lg:px-8">
        {SOCIAL_PROOF.map((item, index) => (
          <Reveal key={item.label} delay={index * 80} className="flex flex-col items-center">
            <p className="font-mono text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
              {item.value}
            </p>
            <p className="mt-2 text-[10px] font-medium uppercase leading-snug tracking-[0.16em] text-[var(--text-secondary)] sm:text-xs">
              {item.label}
            </p>
          </Reveal>
        ))}
      </div>
      <p className={cn("mt-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)]")}>
        Illustrative platform figures
      </p>
    </section>
  );
}
