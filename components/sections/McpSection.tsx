import { ArrowRight, Copy, Plug } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { MCP_CARDS, MCP_CLIENTS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function McpSection() {
  return (
    <section
      id="mcp"
      aria-labelledby="mcp-heading"
      className="relative scroll-mt-24 overflow-hidden border-y border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)]/40 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,rgba(0,82,255,0.16),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Developer protocol"
          title={
            <span id="mcp-heading">Integrate {BRAND.name} tools into your existing AI workflows.</span>
          }
          description={`Connect ChatGPT, Claude, Cursor, Codex, Gemini, or custom client tools through ${BRAND.name}'s standardized MCP server endpoint.`}
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

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MCP_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.label}
                className="group flex flex-col justify-between rounded-xl border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] p-5 transition-all duration-200 hover:border-[var(--color-info)]/45 hover:bg-[var(--app-widget-inner-bg)] hover:shadow-[0_0_25px_rgba(59,130,246,0.14)]"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-[var(--color-info)] transition-transform group-hover:scale-110"
                    />
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                      mcp tool
                    </span>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                    {card.label}
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold text-[var(--text-primary)]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{card.output}</p>
                </div>

                <div className="mt-4 rounded-lg border border-[var(--app-panel-border)] bg-[#090d16] p-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">prompt</p>
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-[#8ec5ff]">
                    &ldquo;{card.prompt}&rdquo;
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <ul className="flex flex-wrap items-center gap-2" aria-label="Compatible AI clients">
            {MCP_CLIENTS.map((client) => (
              <li
                key={client}
                className="rounded-full border border-[var(--app-panel-border)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)]"
              >
                {client}
              </li>
            ))}
          </ul>
          <Button href="#pricing" variant="outline" size="md" className="w-full sm:w-auto">
            View MCP technical docs
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
