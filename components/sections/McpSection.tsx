import { ArrowRight, Copy, Plug } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { MCP_CLIENTS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { McpExplainer } from "@/components/sections/McpExplainer";

/**
 * Three bands, mirroring the reference's treatment of MCP as the product
 * signature: hook -> compatible-client strip -> stage-driven chat explainer.
 */
export function McpSection() {
  return (
    <section
      id="mcp"
      aria-labelledby="mcp-heading"
      className="relative scroll-mt-24 overflow-hidden border-y border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)]/40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,rgba(0,82,255,0.16),transparent_70%)]"
      />

      {/* Band 1 — hook */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <SectionHeading
          eyebrow="Developer protocol"
          title={
            <span id="mcp-heading">
              Your AI client runs the workspace. {BRAND.name} supplies the tools.
            </span>
          }
          description="One standardized MCP endpoint turns a chat request into a market-data query, a strategy build, a backtest, a staged order, or a monitoring rule — and returns the result inside the same conversation."
        />

        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-stretch gap-3 rounded-xl border border-[var(--app-panel-border)] bg-[#090d16] p-3 sm:flex-row sm:items-center">
          <span className="flex items-center gap-2 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
            <Plug aria-hidden="true" className="h-3.5 w-3.5 text-[var(--color-info)]" />
            endpoint
          </span>
          <code className="flex-1 overflow-x-auto whitespace-nowrap rounded-lg bg-[var(--app-widget-inner-bg)] px-3 py-2 font-mono text-[11px] text-blue-300 scroll-slim">
            {BRAND.mcpEndpoint}
          </code>
          <span className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--app-panel-border)] px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">
            <Copy aria-hidden="true" className="h-3 w-3" />
            streamable http
          </span>
        </div>

        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          nine tools · five stages · one endpoint
        </p>
      </div>

      {/* Band 2 — compatible clients (neutral text labels, no third-party assets) */}
      <div className="relative mt-14 border-y border-[var(--app-panel-border)] bg-[var(--app-widget-inner-bg)]/40 py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            connects to the AI client you already work in
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2" aria-label="Compatible AI clients">
            {MCP_CLIENTS.map((client) => (
              <li
                key={client}
                className="rounded-full border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-secondary)]"
              >
                {client}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Band 3 — stage-driven chat explainer */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <McpExplainer />

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="#pricing" size="md" className="w-full justify-center sm:w-auto">
            Connect your client
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
          <Button href="#faq" variant="outline" size="md" className="w-full justify-center sm:w-auto">
            MCP questions
          </Button>
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          Sample conversation · synthetic market data · no live brokerage connection
        </p>
      </div>
    </section>
  );
}
