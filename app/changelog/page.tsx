import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Changelog",
  description: `Notable changes to the ${BRAND.name} landing site and workspace preview.`,
};

const ENTRIES = [
  {
    version: "0.3",
    date: "2 November 2026",
    summary: "MCP section rebuilt as a stage-driven chat explainer; Resources menu added to the nav.",
    items: [
      "MCP section now runs the reference pattern: five stage pills (Research, Build, Backtest, Trade, Monitor) over one chat thread with a prompt, an answer and an interactive result card.",
      "The nine MCP tools are grouped into those five stages instead of nine equal-weight cards.",
      "Navigation gained a Resources menu (Documentation, API Reference, Changelog, FAQ); primary link order is now Features · MCP · Pricing · Brokers · Resources.",
      "Pricing bullet about broker API connections is qualified as rolling out, matching the connectivity section.",
      "Mobile hero tab strip gained a fading edge so the horizontally scrolling tabs read as scrollable.",
    ],
  },
  {
    version: "0.2",
    date: "1 November 2026",
    summary: "Honesty pass: integration targets described as categories, demo data labelled everywhere.",
    items: [
      "Broker grid lists venue categories with planned or sandbox status rather than partner names; a note states that no partnership is implied.",
      "Every demo figure on the page carries a visible illustrative or synthetic label.",
      "CSS custom properties renamed from the earlier template prefix to --northwind-*.",
    ],
  },
  {
    version: "0.1",
    date: "31 October 2026",
    summary: "First public preview of the landing page.",
    items: [
      "Hero workspace frame with a simulated terminal and a synthetic candlestick chart.",
      "Feature pillars, community strategy grid, broker connectivity, pricing placeholder, FAQ, and final call to action.",
      "Static export deployed to GitHub Pages and Vercel.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <LegalPage
      title="Changelog"
      eyebrow={`${BRAND.name} · resources`}
      intro={`Notable changes to the ${BRAND.name} site and workspace preview. This is a preview build: pricing is a placeholder and no brokerage integration is live.`}
      updated="2 November 2026"
      meta="Preview build · newest entry first"
    >
      {ENTRIES.map((entry) => (
        <LegalSection key={entry.version} heading={`${entry.version} — ${entry.date}`}>
          <p className="text-[var(--text-primary)]">{entry.summary}</p>
          <ul className="mt-1 list-disc space-y-1.5 pl-5">
            {entry.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </LegalSection>
      ))}
    </LegalPage>
  );
}
