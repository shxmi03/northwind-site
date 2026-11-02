import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${BRAND.name} research workspace.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={`These terms govern access to the ${BRAND.name} research workspace, including strategy tooling, historical simulation, and brokerage connection features.`}
      updated="2 November 2026"
    >
      <LegalSection heading="Software, not advice">
        <p>
          {BRAND.name} is research and workflow software. It is not a broker-dealer, custodian, or
          registered investment adviser, and it does not provide financial, investment, legal, or tax
          advice. All strategy templates and performance metrics are provided for educational and research
          purposes.
        </p>
      </LegalSection>

      <LegalSection heading="Your responsibilities">
        <p>
          You are responsible for the strategies you build, the parameters you choose, and any order you
          authorize with a connected broker. Keep credentials current, review generated code before
          deployment, and use manual approval gates for live trading.
        </p>
      </LegalSection>

      <LegalSection heading="Subscriptions and billing">
        <p>
          Subscriptions renew monthly until cancelled. You can cancel at any time from the account
          dashboard; access continues through the end of the paid period. Prices shown in this preview are
          placeholders.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <p>
          Do not use the platform to manipulate markets, to redistribute licensed market data outside its
          terms, to attempt unauthorised access to other accounts, or to build products that misrepresent
          the platform as an advisory service.
        </p>
      </LegalSection>

      <LegalSection heading="Risk disclosure">
        <p>
          Historical backtests and hypothetical performance do not guarantee future results. Real trading
          involves risk of loss, including loss of principal. Securities and cash remain under the custody
          of your independent brokerage. The service is intended for individuals aged 18 and older.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms:{" "}
          <a className="underline decoration-dotted underline-offset-4" href={`mailto:${BRAND.supportEmail}`}>
            {BRAND.supportEmail}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
