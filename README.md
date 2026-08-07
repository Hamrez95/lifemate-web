# LifeMate public website — Preview v1

Official public-facing website for the **LifeMate** family health and care ecosystem.

LifeMate itself is **not** a downloadable application. The two current products are:

- **WellMate** — personal health management
- **CareMate** — permission-based family care

Both products are pre-launch. Store badges in this preview are intentionally disabled and marked **Coming soon / به‌زودی**.

## Preview branch

Implementation branch: `preview-site-v1`

`main` remains the production gate and must not receive this implementation until explicit preview approval.

## Stack

- Next.js 16 + React 19
- TypeScript strict
- App Router + Server Components by default
- CSS design tokens and responsive component system
- Typed FA/EN dictionaries (`/fa`, `/en`) with true RTL/LTR layouts
- Cloudflare Workers via `@opennextjs/cloudflare`
- Vitest + Playwright

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm run preview
```

## Cloudflare preview

The preview Worker is intentionally named `lifemate-web-preview` and has no production custom-domain route.

To enable automatic preview deployment for the preview branch, configure these GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Without them, the preview deployment workflow exits without deploying and reports that credentials are missing.

## Public-content boundary

Do not commit or publish:

- TAM / SAM / SOM
- funding ask, equity, IRR, NPV or revenue projections
- private roadmap/module inventory
- private research/questionnaires
- internal architecture or credentials
- personal medical information

The public investor page is an invitation to a private discussion only.
