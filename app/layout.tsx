import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/theme/ThemeProvider";
import { MotionController } from "@/components/motion/MotionController";
import { asset } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Canonical origin used for OG/Twitter absolute URLs. Set NEXT_PUBLIC_SITE_URL
 * once the custom domain is live; until then point at the Vercel deployment so
 * social previews resolve instead of 404ing on the placeholder domain.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://northwind-site-six.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description: `${BRAND.name} combines natural language strategy design, historical tick-data backtesting, and broker connection protocols in one unified interface.`,
  applicationName: BRAND.name,
  keywords: [
    "quantitative trading",
    "backtesting",
    "algorithmic trading",
    "MCP endpoint",
    "strategy research",
  ],
  authors: [{ name: BRAND.legalName }],
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "Research market data, build rule-based strategies, and automate execution from a single workstation.",
    images: [
      {
        url: asset("/assets/images/og-image.png"),
        width: 1200,
        height: 630,
        alt: `${BRAND.name} workstation preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "Research market data, build rule-based strategies, and automate execution from a single workstation.",
    images: [asset("/assets/images/og-image.png")],
  },
  icons: {
    icon: [{ url: asset("/favicon.ico") }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* No-JS safety net: if scripts never run, scroll-reveal blocks must not
            stay at opacity 0. The reveal styles are already gated behind
            @media (scripting: enabled); this covers older engines. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-[var(--app-canvas)] font-sans text-[var(--text-primary)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[var(--northwind-primary)] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-white"
        >
          Skip to content
        </a>
        {/* One shared motion controller for scroll reveals + hero parallax. */}
        <MotionController />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
