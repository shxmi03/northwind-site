# Northwind Marketing Site

Marketing landing page for Northwind built with Next.js (App Router), TypeScript, and Tailwind CSS.

## 🚀 Development

Start local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build

Build static export for deployment:

```bash
NEXT_PUBLIC_BASE_PATH=/northwind-site npm run build
```

Static output is generated in `./out`.

## 🌐 Live Preview

- **URL**: [https://shxmi03.github.io/northwind-site/](https://shxmi03.github.io/northwind-site/)
- **Deployment**: Automatic via GitHub Actions workflow (`.github/workflows/deploy.yml`) on `main` branch push.

## 📝 TODO
- [ ] Implement Northwind brand design & visual copy (task `t_000cbdc0`)
- [ ] Configure final pricing plans and features
- [ ] Add integration details for supported brokers/connectors
