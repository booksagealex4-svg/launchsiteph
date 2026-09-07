# Personal Profile Website

A personal portfolio homepage shell — React + Vite + TypeScript + Tailwind CSS.

**Status:** Homepage shell approved after SHELL-R2. See
[APPROVED-HOMEPAGE-BASELINE.md](APPROVED-HOMEPAGE-BASELINE.md) for what is
locked and what is still open (the Projects page and beyond).

## Requirements

- Node.js 20+ (built and tested on Node v24.19.0)
- npm (ships with Node)

## Setup

This archive does **not** include `node_modules/` — dependencies are restored
from `package.json` / `package-lock.json` via npm.

```bash
npm install
npm run dev
```

The dev server starts on **http://localhost:5173** by default (Vite prints
the exact URL/port on start; it will pick the next free port if 5173 is
already in use).

## Available scripts

```bash
npm run dev       # start the Vite dev server
npm run build      # type-check (tsc -b) then build for production into dist/
npm run preview    # preview the production build locally
npm run lint       # run oxlint over src/
```

## Project structure

```
src/
  components/
    layout/Sidebar.tsx        # left profile sidebar (approved, locked)
    sections/Hero.tsx         # hero header (approved, locked)
    sections/TechMarquee.tsx  # "Tools I Work With" marquee (approved, locked)
    sections/BentoGrid.tsx    # homepage workspace cards (approved, locked)
    VisitorCounter.tsx        # floating visitor counter (approved, locked)
  lib/
    useVisitorStats.ts        # provider-independent analytics data hook
    utils.ts                 # cn() class-merge helper
  App.tsx                     # page composition/layout
  index.css                   # design tokens, base styles, keyframes
  main.tsx                    # React entry point
index.html
vite.config.ts
tsconfig.json / tsconfig.app.json / tsconfig.node.json
```

## Notes

- No backend/analytics provider is wired up yet. `useVisitorStats.ts` is the
  provider-independent adapter for real visitor data; the floating counter
  currently shows a demo value for shell review only (see the baseline doc).
- No `.env` file is required or included — this project has no secrets.
- Do not redesign the approved homepage sections without first re-reading
  `APPROVED-HOMEPAGE-BASELINE.md`.
