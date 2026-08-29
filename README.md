# Portfolio

Visual-forward portfolio site. React + Vite, no CSS framework, minimal
dependencies (`react-router-dom` for routing, `gh-pages` for deploys).

## Structure

- `src/components/Hero.jsx` — hero image, headline, body copy (static —
  no hover/animation/sound yet, see "Not built yet" below)
- `src/components/ProjectGrid.jsx` / `ProjectCard.jsx` — the homepage grid
- `src/pages/Home.jsx` — hero + grid
- `src/pages/ProjectPage.jsx` — the template every project page runs
  through, so structure stays consistent as content changes
- `src/data/projects.js` — project content (title, blurb, image count).
  Add/edit entries here — the grid and pages read from this file
- `src/assets/hero.png` — the hero illustration

## Develop

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. `npm run deploy` — builds and pushes `dist/` to a `gh-pages` branch.
3. In the repo's Settings → Pages, set the source to the `gh-pages`
   branch (first deploy only).

`vite.config.js` uses a relative `base: './'` and the router is a
`HashRouter`, so this works from any repo name/subpath without extra
config, matching how the other prototypes are set up.

## Not built yet

Per the brief, these are ideas to explore later, not built into this
scaffold:

- Hover interactions on the hero (canopy color shift, soil reveal,
  mycelium pulse, soil "veil" effect)
- Ambient canopy animation + optional ambient sound with mute toggle
- Nav bar / back-button treatment beyond the current simple back link
- Final visual treatment for grid cards (borders, hover states)
- Real project content — `src/data/projects.js` currently holds one
  fleshed-out example and five placeholders
