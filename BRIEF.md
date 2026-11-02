# Cilj

Napraviti **naš vlastiti sajt po uzoru na https://heyastral.ai/** — klonirati informacijsku arhitekturu, ritam sekcija, interakcije i vizualni sustav, ali s **našim brendom i originalnim tekstom**. Rezultat: produkcijski landing + ključne podstranice, deployan na preview URL, s urednim repoom.

Ovo je **faza 1: sajt**. Produktna funkcionalnost (stvarni trading backend, broker integracije, MCP) nije u scopeu ove karte — ako Lovre kaže da ide i produkt, otvori odvojenu kartu.

# Referenca i artefakti (već prikupljeno, ne troši vrijeme na ponovni RE)

- Živi sajt: https://heyastral.ai/ (+ /features, /pricing, /brokerages, /mcp, /security, /docs)
- `ref/REPORT.md` — RE analiza: stack, 41 API ruta, treće strane (SnapTrade, Stripe, PostHog proxy, TradingView LWC, FMP, Filebase IPFS)
- `ref/http/` — `body.html`, headeri, `llms.txt` (njihov vlastiti sažetak proizvoda i svih podstranica), `sitemap.xml`
- `ref/js/` — 51 JS chunk (2.6 MB) njihovog landinga; korisno za točne animacije, spacing i copy blokove

# IA koju treba reproducirati (redoslijed s landinga)

1. **Nav** — logo, Features / MCP / Pricing / Brokers / Resources (dropdown), theme toggle, Sign in, Get started
2. **Hero** — veliki H1, podnaslov, dva CTA ("Start trading" / "Trade inside ChatGPT"), animirani terminal mock s tabovima (Research / Indicator / Strategy / Backtest), live-looking chart kartica s cijenom i statistikama
3. **Social proof strip** — 4 broja (njihovi: 10.000+ traders, 30.000+ backtestova, 1.000+ strategija, 24/7 monitoring)
4. **Features** — 5 numeriranih blokova (Ask / Inspect / Test / Measure / Operate) s vizualom po bloku
5. **MCP sekcija** — "jedan endpoint" hook, pa 9 kartica workflowa (Research, Chart, Build, Test, Connect, Order, Portfolio, Deploy, Events) — svaka s mock UI kartice u chatu
6. **Explore** — community biblioteka strategija (grid kartica)
7. **Brokers** — logo grid + affiliate blok (Public: $20 free stock) + 4 koraka konekcije
8. **Pricing** — jedan plan, velika cijena, 8 bulleta, CTA
9. **FAQ** — 8 pitanja u akordeonu
10. **Final CTA + Footer** — 4 kolone (Product / Learn / Company), disclaimer, social ikone

# Pravila (IP — obavezno)

- **Ne** kopirati njihov tekst, logo, ime "Astral", slike (`/landing/hero-cityscape.png`) ni dizajn assete.
- Klonirati: strukturu, grid, tipografsku skalu, ritam sekcija, način animiranja, raspored elemenata, UX obrazac kartica u chatu.
- Sav copy pišemo iznova, na engleskom, isti ton (kratke, konkretne tvrdnje, bez hype pridjeva).
- Imena brokera/partnera koristimo samo ako ih stvarno imamo; inače neutralne placeholdere.
- Demo brojke na sajtu moraju biti označene kao ilustrativne ili stvarne — ne izmišljati traction koji nemamo.

# Tech smjer (default, poslovođa može promijeniti uz obrazloženje)

- Next.js (App Router) + TypeScript + Tailwind, deploy na Vercel
- Bez backenda u fazi 1: forme → Formspree/Resend, pricing CTA → Stripe Payment Link kad bude
- Chart demo: `lightweight-charts` s mock serijom (ne pravi podaci)
- Novi repo pod GitHub računom `shxmi03`, rad u `~/workspace/astral-clone/`

# Tvoja rola: poslovođa

Ti si **chief_of_staff** — ne implementiraj sam. Razloži na child karte i dodijeli profilima koji postoje na serveru:

| Profil | Posao |
|---|---|
| `ui-designer` | design system (boje, type scale, spacing, komponente) + section-by-section spec |
| `frontend-developer` | implementacija Next.js sekcija |
| `image-prompt-engineer` | hero i section vizuali (pollinations-gen je dostupan u `~/workspace/pollinations-gen/`) |
| `brand-guardian` | ime/ton/poruke, provjera da copy nije izveden iz njihovog |
| `accessibility-auditor` | a11y prolaz (kontrast, focus, ARIA, reduced-motion) |
| `ui-finish-gate-reviewer` | gate prije `done` — vizualni paritet s referencom |
| `code-reviewer` | kvaliteta koda, struktura komponenti |
| `reality-checker` | da nijedna tvrdnja/demo brojka nije lažna |

Sekvenca koju preporučujem: (1) ui-designer spec → (2) paralelno frontend + vizuali + brand copy → (3) a11y + code review → (4) finish gate → (5) deploy + screenshots.

# Otvoreno — treba od Lovre (ne blokira početak)

1. Ime proizvoda i domena
2. Je li proizvod trading (kao Astral) ili nešto drugo — mijenja copy i sekcije
3. Cijena/plan koji se prikazuje

Ako odgovora nema u prvih par koraka: koristi neutralni placeholder brend (`<PROIZVOD>`, npr. "Northwind") i označi sve takve točke kao TODO u README-u. **Ne blokaj rad na tome.**

# Definition of done

- Sve sekcije 1–10 implementirane i vizualno na razini reference (bez njihovih asseta)
- Responsive: 390 / 768 / 1440 px, provjereno screenshotovima
- Lighthouse: performanse ≥ 90, a11y 100 na desktopu
- Preview URL + README s mapom sekcija i popisom TODO stavki
- Kratki "paritet checklist": referenca → naša sekcija → status
