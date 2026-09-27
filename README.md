# Captain Trading website

Angular 21 + Tailwind CSS v4 site for trading architectural glass, glass hardware,
construction materials and glue guns. All content is dummy data for review.

## Run it

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build in dist/captain-trading
```

Requires Node.js 20.19+ or 22.12+.

## Pages

| Route | What it does |
|---|---|
| `/` | Home: hero search, categories, bulk-price calculator, best sellers, trade and delivery sections |
| `/products` | Catalogue with category tabs, search, sort and in-stock filter (all kept in the URL, e.g. `/products?category=glass&q=tempered`) |
| `/products/:slug` | Product page with tier pricing, quantity stepper, specs and related items |
| `/quote` | Quote list (saved in the browser), VAT estimate and request-for-quote form |
| `/about` | Company story, order process, trade accounts (`#trade`), white-label (`#white-label`) |
| `/contact` | Contact details and enquiry form |

## Where to change things

- **Products, categories, prices, images:** `src/app/data/catalog.ts`
- **Company name, phone, email, address, stats, cities:** `src/app/data/company.ts`
- **Colours and fonts:** the `@theme` block in `src/styles.css`. The accent is the logo gold
  (`--color-gold: #ffdd00`). Set it to `#9fe870` for the reference lime.
- **Logo and favicon:** `public/logo.png` (transparent gold mark), `public/favicon.ico`,
  `public/favicon.png`, `public/apple-touch-icon.png`
- **Forms:** `submit()` in `src/app/pages/quote/quote.ts` and `src/app/pages/contact/contact.ts`
  only show a confirmation. Connect them to your API, email service or CRM.

## Images

Product and section photos are free Unsplash images loaded by URL (see `IMAGES` and each
product's `image` in `catalog.ts`). Replace them with your own product photography before launch.
