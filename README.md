# GardaAI Academy — Web V2

React + Vite + Tailwind v4. Pages (hash-routed tabs): **Home, About, Learn, Impact**.

```
npm install --legacy-peer-deps
npm run dev      # http://localhost:3000
npm run build    # -> dist/
```

## Layout
| Path | What |
|---|---|
| `src/components/` | Navbar, Footer (shared), page views (`AboutView`, `LearnView`, `ImpactView`, `HomeView`), `ui.tsx` (paper sheet, notes, typing, count-up), `TornPaperEdge.tsx`, modals |
| `src/home/` | Home page ported from the old `index.html`: `home.html`, `home.css` (scoped to `.home-page`), `globals.js` |
| `src/data/academyData.ts` | Videos (YouTube ids), team, map stories, asset paths |
| `src/assets/images/` | Photos imported by the React pages |
| `public/` | Served as-is: `favicon.ico`, `icons/`, `site.webmanifest`, `images/` (logo, hero, phone, team) |
| `docs/` | Design brief (`instruction.md`, `checklist.md`) and `reference/` screenshots |
| `scripts/` | `shot.mjs` full-page screenshots, `montage.mjs` to tile them (needs Chrome) |
| `legacy/` | Original static `index.html` + its images, kept for reference |
