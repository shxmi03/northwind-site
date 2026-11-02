# Astral (heyastral.ai) — RE analiza javnog sloja

Datum: 2026-11-02 · Metoda: passivni HTTP recon + Playwright/CDP promatranje + analiza JS bundleova (bez prijave, bez napada)
Alati: curl, browser (Chrome/CDP), grep/AST nad 51 chunkom (~2.6 MB), jadx/apktool nisu bili potrebni

---

## 1. Što je proizvod

| | |
|---|---|
| Pozicioniranje | "AI-powered quantitative trading workstation" za nezavisne tradere |
| Pravni entitet | Astral Trading, Inc (iz /terms) |
| Model | Jedan plan: $9 prvi mjesec → $30/mj, **nema besplatnog probnog perioda**, pristup tek nakon plaćanja |
| Tržište | Samo SAD, 18+ |
| Ključni hook | **Astral MCP** — jedan endpoint koji spaja ChatGPT / Claude / Cursor / Codex / Gemini na njihov trading backend |
| Veza s brokerom | Preko agregatora **SnapTrade**; Astral nije broker, ne čuva sredstva, ne daje investicijski savjet |
| Podržani brokeri | Alpaca Paper, E*TRADE, moomoo, Coinbase, tastytrade, Public, Webull (US), Kraken |
| Marketing brojke | "10.000+ traders", "30.000+ backtestova", "1.000+ strategija" — nije nezavisno provjerljivo |

Limiti plana: neograničeni promptovi i backtestovi, 40.000 barova povijesti, 10 live deploymenta, neograničene brokerske konekcije i alertovi sa SMS-om.

## 2. Tehnologija (dokazano)

- **Next.js (App Router) + Turbopack**, hosting **Vercel** (`server: Vercel`, `x-vercel-id: fra1::iad1`, `x-powered-by: Next.js`), edge regija Frankfurt → iad1
- DNS: **GoDaddy** (ns43/ns44.domaincontrol.com), A zapis 216.150.1.1 (Vercel anycast)
- RSC prefetch za rute (`?_rsc=`), streaming SSR, `data-dpl-id` deployment ID
- **Stripe** za pretplatu i customer portal (`/api/stripe/subscription`, `/api/stripe/portal`)
- **PostHog** analitika, ali **proxied kroz vlastitu domenu** (`/ingest/array/phc_...`), tj. ad-blockerima teže vidljiva
- **Vercel Analytics** (`va.vercel-scripts.com`)
- **TradingView Lightweight Charts** za grafove (vidljiv attribution "Charting by TradingView")
- Fontovi preko `www.gstatic.com`, ikone/diagrami preko `api.elbstream.com`
- **Filebase IPFS gateway** (`ipfs.filebase.io`) — najvjerojatnije za dijeljenje/pohranu strategija i custom indikatora
- Identity: vlastiti cookie sustav (`astral_vid` visitor id, `astral_acquisition` attribution, `ph_*` PostHog cookie) + `/api/auth/*`; nema Clerka, Supabasea, Auth0, Firebasea
- A/B testiranje: `astral:experiment-contexts:v1` u localStorage → eksperiment `landing_main` s dodjelom varijante preko `/api/experiments/assignment`

## 3. API površina (iz klijentskih bundleova)

Autentikacija / sesija
```
/api/auth/me            /api/auth/logout          /api/auth/ws-token
/api/auth/attribution   /api/auth/session-clear  /api/experiments/assignment
```
Korisnici, brokeri, SnapTrade
```
/api/users             /api/users/access         /api/users/{id}/broker-catalog
/api/users/{id}/broker-connections                /api/users/{id}/broker-accounts/{id}
/api/snaptrade/connect /api/snaptrade/connections /api/snaptrade/connections/{id}
```
Trading / strategije / podaci
```
/api/trading                    /api/trading/orders/{id}
/api/trading/orders/pending-deferred
/api/strategies/{id}            /api/backtests
/api/chart/history              /api/stream            (streaming, vjerojatno WS/SSE)
/api/session/manifest           /api/session/chart-workspace
/api/sectors/fmp                /api/fundamentals/watchlist-detail
/api/memecoins/metadata-image
```
Backend proxy sloj (interni servis iza Next.js-a)
```
/api/astral-backend                          /api/astral-backend/users/{id}
/api/astral-backend/symbols                  /api/astral-backend/conditional-orders/{id}
/api/astral-backend/expression-indicators/prebuilt-catalog
/api/astral-backend/users/{id}/futures/provider-series
/api/astral-backend/analytics/events
```
Ostalo: `/api/bugs`, `/api/telemetry/ws`, `/api/affiliates/me`

Ponašanje: `/terminal` → 307 na `/auth/signin?returnTo=/terminal`; `/api/auth/me` → `{"isAuthenticated":false,"user":null}`; `/api/mcp` (bez tokena) → 404, tj. MCP endpoint je tokeniziran po korisniku i ne otkriva se javno.

## 4. Treće strane i partneri

| Servis | Uloga |
|---|---|
| SnapTrade | agregacija brokerskih računa (OAuth flow, `launch_url`, reauthorize) — srž "connect brokerage" |
| Stripe | naplata, pretplate, portal |
| PostHog (proxy) | produktna analitika, feature flagevi (`/ingest/flags/`) |
| Vercel | hosting, edge, analytics |
| TradingView LWC | charting |
| FinancialModelingPrep | logotipi simbola, `/api/sectors/fmp` |
| Dexscreener | logotipi Solana memecoin tokena |
| Filebase IPFS | distribucija sadržaja strategija |
| Public | affiliate ponuda ($20 free stock za nove račune) |

## 5. Zanimljivi nalazi

1. **`fe-dev.heyastral.ai` je ostao u produkcijskom bundleu** — hardkodiran fallback host za `/settings/brokers`. Dev/staging domena je javno vidljiva.
2. **Hardkodirana mapa SnapTrade broker ID-jeva s očitim dummy UUID-jevima**: uz stvarne (SnapTrade Demo, Alpaca, IBKR) stoje `d21b7b08-...-3a8c1d1b1b1b` (Robinhood), `f1e2d3c4-b5a6-7890-abcd-ef1234567890` (TD Ameritrade), `a1b2c3d4-e5f6-7890-abcd-1234567890ab` (Schwab), `b2c3d4e5-f6a7-8901-bcde-2345678901bc` (Fidelity). To su placeholderi — brokeri koje marketinški ne navode, a tehnički su "pripremljeni" (ili zaboravljeni) u klijentu.
3. **PostHog ide preko vlastite domene** — svjesna odluka da se zaobiđu ad-blockeri; znači da im je attribution/analitika bitna (normalno za paid-only proizvod bez free triala).
4. **Nema free triala** — sve je iza plaćanja, što je rijetko u ovom segmentu i objašnjava agresivan landing A/B (`landing_main`).
5. **`/llms.txt`** — eksplicitno objavljen AI-crawler brief; očito im je AI-discovery kanal (MCP, ChatGPT/Claude integracije) dio GTM strategije, ne dodatak.
6. MCP endpoint nije javno dokumentiran kao fiksni URL — izdaje se po korisniku (dokaz: `/api/mcp` → 404 bez tokena).
7. Sav UI trading sloj (order ticket, rizik, deploymenti) je u klijentskom bundleu, normalno za SPA, ali znači da se cijeli UX može rekonstruirati bez naloga.
8. Sigurnosna stranica **eksplicitno ne tvrdi** SOC2/audit/bug bounty ("does not currently represent this page as a certification").

## 6. Ograničenja analize

Sve iznad je javni sloj: HTML/RSC, JS bundleovi, HTTP headeri, javne rute i dokumentacija. Nema prijave u produkt, nema poziva autentificiranim endpointima, nema skeniranja ni fuzzinga. Unutarnja arhitektura (`astral-backend`), AI model koji pokreće "terminal", stvarni izvor tržišnih podataka i kvaliteta backtesta nisu vidljivi izvana.

## 7. Artefakti

```
~/workspace/rev-heyastral/
├── REPORT.md          (ovaj dokument)
├── route-scope.md     (routing zapis reverse-skill routera)
├── http/              (headers, body.html, llms.txt, sitemap.xml)
└── js/                (51 chunk, 2.6 MB, + chunks.txt)
```
