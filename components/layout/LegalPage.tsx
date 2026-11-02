import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function LegalPage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--app-panel-border)] bg-[var(--nav-surface)] backdrop-blur-lg">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info)]"
          >
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--tertiary-surface-border)] px-3 font-mono text-[11px] uppercase tracking-wide text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info)]"
            >
              <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
              Back to site
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 px-4 py-14 sm:px-6 lg:px-8">
        <article className="mx-auto w-full max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-info)]">
            {BRAND.name} · legal
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">{intro}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
            Last updated {updated} · placeholder pending counsel review
          </p>

          <div className="mt-10 space-y-8">{children}</div>
        </article>
      </main>

      <Footer />
    </>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">{heading}</h2>
      <div className="mt-2 space-y-3 text-sm leading-relaxed text-[var(--text-secondary)]">{children}</div>
    </section>
  );
}
