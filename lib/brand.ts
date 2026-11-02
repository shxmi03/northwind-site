// lib/brand.ts
export const BRAND = {
  name: "Northwind",
  tagline: "AI-powered quantitative trading workstation",
  shortTagline: "Quantitative trading workstation",
  domain: "northwind.ai",
  legalName: "Northwind Trading Technologies Inc.",
  planPriceInitial: "$9",
  planPriceMonthly: "$30",
  planPricePeriod: "month",
  mcpEndpoint: "https://api.northwind.ai/v1/mcp",
  supportEmail: "support@northwind.ai",
  socials: {
    x: "https://x.com/northwind_ai",
    github: "https://github.com/shxmi03/northwind-site",
    discord: "https://discord.gg/northwind"
  }
} as const;
