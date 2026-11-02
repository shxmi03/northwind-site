# Screenshots — parity evidence (2026-11-02)

Captured from the live deployments, dark theme, deviceScaleFactor 1.

| File | What it is |
|---|---|
| `ref-desktop-1440.png` | https://heyastral.ai/ full page at 1440 px (13 787 px tall) |
| `ours-1440.png` / `ours-768.png` / `ours-390.png` | https://shxmi03.github.io/northwind-site/ full page at each width (10 904 / 13 654 / 18 051 px) |

Per-section crops, same section on both sides, for side-by-side review:

| Reference | Ours |
|---|---|
| `ref-hero.png` | `ours-hero.png` |
| `ref-features.png`, `ref-features2.png` | `ours-features.png`, `ours-features2.png` |
| `ref-mcp.png`, `ref-mcp2.png` | `ours-mcp.png`, `ours-mcp2.png` |
| `ref-explore.png` | `ours-explore.png` |
| `ref-brokers.png` | `ours-brokers.png` |
| `ref-pricing.png` | `ours-pricing.png` |
| `ref-faq.png` | `ours-faq.png` |
| `ref-cta.png` | `ours-cta.png` |

Reference crops are 1440×1100 viewport frames anchored at each section's measured top offset;
our crops are viewport frames at the matching scroll position. Full-page files are the ones to
use for rhythm comparisons. Findings live in `docs/PARITY_REPORT.md`.
