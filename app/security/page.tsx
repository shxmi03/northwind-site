import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Security Practices",
  description: `How ${BRAND.name} isolates workspaces, protects credentials, and handles brokerage authorization.`,
};

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security Practices"
      intro={`This page summarises how ${BRAND.name} protects account data, workspace content, and brokerage authorization flows.`}
      updated="2 November 2026"
    >
      <LegalSection heading="Brokerage authorization">
        <p>
          Connections use OAuth2 or scoped API keys issued by the broker. Passwords are never requested or
          stored. Tokens are encrypted at rest, scoped to the permissions you approve, and revocable from
          either the broker or the workspace settings.
        </p>
      </LegalSection>

      <LegalSection heading="Transport and storage">
        <p>
          Traffic is served over TLS. Workspace data is encrypted at rest and partitioned per account so
          that one workspace cannot read another&apos;s strategies or transcripts.
        </p>
      </LegalSection>

      <LegalSection heading="Order safety controls">
        <p>
          Strategy-generated order tickets are staged, not submitted automatically, unless you explicitly
          configure a live gate. Position size caps, stop-loss rules, and manual approval requirements are
          enforced before a ticket reaches a broker.
        </p>
      </LegalSection>

      <LegalSection heading="What this preview is not">
        <p>
          This marketing site is a static preview. It contains no account system and collects no
          credentials. Charts and counters are illustrative and do not represent live market or platform
          data.
        </p>
      </LegalSection>

      <LegalSection heading="Reporting">
        <p>
          Report a suspected vulnerability to{" "}
          <a className="underline decoration-dotted underline-offset-4" href={`mailto:${BRAND.supportEmail}`}>
            {BRAND.supportEmail}
          </a>{" "}
          with reproduction steps. Please do not test against accounts you do not own.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
