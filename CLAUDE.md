# GardaaiWebV2 — session handoff

React 19 + Vite 8 + Tailwind v4. Real routes `/`, `/about`, `/learn`, `/impact` (tiny pushState router in `src/App.tsx`, paths+SEO in `src/routes.ts`). `npm run build` = client build + SSR build + `scripts/prerender.mjs` (one static HTML per route, hydrated on load). Old `/#about` links redirect.
Run: `npm install --legacy-peer-deps && npm run dev` (port 3000). Screenshots: `node scripts/shot.mjs 1280 home,about [baseUrl]` -> `shots/` (dev :3000, or `npm run preview` :4173), tile with `scripts/montage.mjs`.

## State
- About / Learn / Impact rebuilt to match `docs/reference/*` (design brief in `docs/instruction.md`).
- Shared: `src/components/ui.tsx` (Sheet, Note, Photo, Squiggle, Count, Typed, useScrollReveal), `TornPaperEdge.tsx` (seeded jagged tears, 4 layers), fixed `Navbar.tsx`, common `Footer.tsx` (wired via `goTo(tab, anchor)` in App).
- Home = real JSX in `src/components/HomeView.tsx` (data arrays + one component; CSS `src/home/home.css` scoped under `.home-page`). Old HTML/globals kept in `legacy/`. Chatbot removed (see SEO/deploy notes).
- Learn uses 3 real YouTube ids (`src/data/academyData.ts`); modal + Learn cards play via iframe.
- Bihar map = `src/assets/images/bihar-map.png` (transparent PNG).
- Favicons/manifest in `public/`.

## Status (end of session 2)
- Pushed to https://github.com/Prabuddha747/GardaAi_Web (main). Vercel deploy: install fixed (`.npmrc` + removed esbuild); domain gardaai.in.
- Done: real routes + prerender, SEO/JSON-LD/favicons/sitemap, chatbot (`api/chat.ts`), video slots (`.env.example`), CSS purge, images moved to `public/images`, mentor photo on About, scroll-reveal on About/Learn/Impact.

## Next steps
- Vercel: set `ANTHROPIC_API_KEY` (revoke the old leaked key — it's still in local `legacy/`, which is git-ignored), add domain, submit sitemap in Search Console, verify chatbot + `/about` on prod.
- Mobile not verified on Home/Learn/Impact (only About was).
- Image compression (hero/team PNGs are 1-2MB) — Lighthouse will flag; deferred by request.
- Optional: designed 1200x630 OG banner (`public/images/og-image.jpg` is a crop of mentor.png); About chapter timeline (00:00…) still describes the old story video; Home testimonial names are tied to HOME_2-4 videos.
- Chatbot has no rate limit; no Privacy Policy page; torn-edge tweak / slower typing not re-verified visually.

## Deploy / env (Vercel)
- Env: see `.env.example`. `ANTHROPIC_API_KEY` (server only) powers `api/chat.ts` (used by `components/Chatbot.tsx`); local test with `vercel dev`.
- Videos: numbered slots (HOME_1-4, ABOUT_1, IMPACT_1, LEARN_1-6) via `VITE_VIDEO_<SLOT>` — defaults in `src/data/videos.ts`.
- SEO: `index.html` (meta, canonical, JSON-LD, favicons), `public/robots.txt`, `public/sitemap.xml`. Domain assumed `https://gardaai.in`. Hash routes are not indexable separately.
- `src/home/home.css` was purged of unused rules (original: `legacy/home.css.orig`).
- All images live in `public/images` (never reference `/src/assets/...` — those 404 in production).
