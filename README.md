# Port.site

Portfolio website presenting the original Port.site website offer, in English.

## Stack
React + TypeScript + Vite frontend. GitHub Pages serves the static production build. The offer is generated from server/offer.js into public/offer.json during each build. The optional Node.js HTTP backend also serves the production build and GET /api/offer. No database is needed for this read-only presentation.

## Run
Requires Node.js 22 or newer.

```sh
npm ci
npm run build
npm start
```
Open http://localhost:3000. Set PORT to change the port.

For development, run `npm start` and `npm run dev` in separate terminals. Vite proxies /api to port 3000.

```sh
npm test
```

## Content
Edit server/offer.js for pricing, scope and schedule. Editorial copy lives in src/main.tsx; styles in src/style.css. Based on Port_site_Proposal_EDITABLE_FINAL.docx, August 2026: $9,000 USD, four estimated weeks, 50/50 payment, optional $1,500 USD annual support.

The site has no contact submission workflow because no studio contact address or mail service was supplied. Its links navigate the proposal. A contact form described in the offer is a deliverable for clients, not an active form on this presentation.

Fonts use Google Fonts with local system fallbacks. No client work or testimonials are fabricated. The three visual panels illustrate the studio's principles.

## Deployment
Deploy to a Node-capable host using `npm ci && npm run build` and `npm start`. GitHub Pages alone cannot run this Node backend.

## Repository

https://github.com/peraita10/port-site

## GitHub Pages

The Pages workflow builds and publishes main. Expected URL: https://peraita10.github.io/port-site/. If automatic enablement is denied, select Settings > Pages > Source > GitHub Actions and rerun the workflow.
