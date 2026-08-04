# CLAUDE.md — Project Instructions

> Claude Code reads this file automatically at the start of every session.
> Keep it updated as decisions change.

## What we are building

A marketing website for **LaunchSite PH** *(WORKING NAME — replace everywhere before launch)*,
an AI-assisted website studio serving professionals and small businesses in the Philippines.

This is a **lead-generation marketing site**, not a SaaS product.
Visitors browse, get convinced, and submit an inquiry. There is no checkout.

## Non-negotiables

- **NO client portal. NO user login. NO authentication.** This was an explicit decision.
  If a feature seems to need auth, propose the no-auth alternative instead.
- **NO payment gateway.** Inquiries only. Payment is arranged off-site, person to person.
- **Mobile-first, always.** Most visitors are on mid-range Android phones over mobile data.
  Performance is a feature. Lighthouse mobile performance target: 90+.
- **No animation libraries.** No Framer Motion, no GSAP. CSS transitions + Intersection
  Observer only. Every animation must respect `prefers-reduced-motion`.

## Stack

- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- react-router for routing
- Deployed to Vercel via GitHub
- Forms: start with a simple mailto/Formspree-style handler. Supabase only if we later
  decide we need stored submissions — ask before adding it.

## How to work with me

- Build **one section at a time**, in the order in `brand/02-build-sequence.md`.
- Read `brand/01-design-system.md` before writing any component. Never invent new colors,
  fonts, or radii — use the tokens.
- Read `content/copy-bank.md` for real copy. Do not write filler lorem ipsum; use the
  approved copy, or ask me for it.
- Before building a section, tell me in 2–3 lines what you're about to make. Then build.
- Prefer small, composable components. One file per section, in `src/components/sections/`.
- Do not refactor or restyle sections that are already approved unless I ask.

## Content rules that matter legally / commercially

- **Never promise results.** Not "get more patients," not "rank #1 on Google."
  Say "look professional," "be found," "build trust."
- **Doctors, dentists and lawyers in the Philippines operate under advertising and
  solicitation restrictions** (PRC ethics rules; the Code of Professional Responsibility
  and Accountability for lawyers). Copy aimed at these verticals must emphasise
  credibility, accessibility and information — never client acquisition or self-laudatory
  claims. Verify current rules before publishing those pages.
- The "7 days" delivery claim must always appear as **"7 days from content handoff."**
- Prices shown are starting prices. Always include "Final quote depends on scope."

## Definition of done for any section

1. Renders correctly at 375px, 768px, and 1440px
2. Uses only design-system tokens
3. Reveal animation via the shared `<Reveal>` wrapper, reduced-motion safe
4. Images lazy-loaded with width/height set (no layout shift)
5. Semantic HTML, visible focus states, 4.5:1 contrast minimum
