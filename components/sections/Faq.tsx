import { FAQ_ITEMS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 border-t border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)]/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title={<span id="faq-heading">Clear answers about the workspace.</span>}
          description="How the platform functions, how broker connections operate, and how subscriptions work."
        />
        <Accordion items={FAQ_ITEMS} defaultOpen={0} className="mt-10" />
      </div>
    </section>
  );
}
