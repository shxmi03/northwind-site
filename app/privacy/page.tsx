import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND.name} handles account, workspace, and brokerage connection data.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`This policy describes the categories of data ${BRAND.name} processes when you use the research workspace, the MCP endpoint, and connected brokerage tooling.`}
      updated="2 November 2026"
    >
      <LegalSection heading="Data we process">
        <p>
          Account identifiers (name, email, workspace name), billing records handled by our payment
          processor, and product telemetry such as feature usage and error reports.
        </p>
        <p>
          Strategy content you author, chat transcripts generated inside the workspace, and saved backtest
          results are stored so that your workspace can be restored across sessions.
        </p>
      </LegalSection>

      <LegalSection heading="Brokerage connections">
        <p>
          Brokerage access is granted through OAuth2 or scoped API keys issued by the broker. We never
          receive or store brokerage passwords. Access tokens are encrypted at rest and can be revoked from
          your broker or from the workspace settings at any time.
        </p>
      </LegalSection>

      <LegalSection heading="What we do not do">
        <p>
          We do not sell personal data, and we do not use your private strategy logic to train shared
          models. Public strategy templates are only published when you explicitly publish them.
        </p>
      </LegalSection>

      <LegalSection heading="Retention and deletion">
        <p>
          Workspace data is retained while your subscription is active. Deleting a workspace removes its
          strategies, transcripts, and backtest artefacts within 30 days, except where records must be kept
          for tax or fraud-prevention obligations.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Privacy requests can be sent to{" "}
          <a className="underline decoration-dotted underline-offset-4" href={`mailto:${BRAND.supportEmail}`}>
            {BRAND.supportEmail}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
