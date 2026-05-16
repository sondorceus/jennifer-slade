# Jennifer Slade — Luxury Real Estate, Austin TX

A quiet-luxury authority site for Jennifer Slade, a high-end Austin
realtor focused on Westlake, Tarrytown, Lake Austin, Barton Creek,
and Dripping Springs estates.

## Architecture

Hub & Spoke per the 2026-05-16 brand brief:

- **Hub** (`/`, `/about`, `/listings`, `/contact`) — the 4-page
  authority site used as digital background-check by HNW clients
- **Spokes** (`/sell`, `/buy`) — hidden landing pages, no main nav
  link, targeted to elite sellers and buyers respectively

## TREC compliance

Every page footer must contain:
- TREC IABS (Information About Brokerage Services) link
- TREC Consumer Protection Notice link
- Brokerage name + logo
- Jennifer's TREC license number

## Dev

```
npm install
npm run dev
```
