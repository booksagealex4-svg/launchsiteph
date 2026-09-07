# Personal Profile Website
## Approved Homepage Baseline

Status:
HOMEPAGE SHELL — USER APPROVED (after SHELL-R2)

Approved components:

- Left profile sidebar
- Circular profile image placeholder
- Full Name + custom blue verification badge
- @username
- Facebook / LinkedIn / WhatsApp / Email icons
- Navigation:
  - Home
  - Projects
  - Services
  - Testimonials
  - About
  - Contact
- Compact light hero
- PERSONAL PORTFOLIO eyebrow
- "Build smarter. Create better." headline
- Supporting sentence
- Client Portal button
- Subtle animated organic line background
- Daily Tools / Tools I Work With marquee
- Colored tool icons
- Framed internal marquee track
- Tool separators
- Light global page background
- Homepage Bento workspace
- Equal-height desktop Projects / About / Contact row
- Credentials
- Featured Services
- Preview Client Portal CTA
- Floating visitor counter
- Demo visitor value currently used only for shell review
- Responsive desktop/tablet/mobile behavior

## Important rule

DO NOT redesign or materially change these approved homepage components
unless the user explicitly reopens the homepage for revision.

The next authorized design work after this package is created is the
Projects page/shell.

## Where things live

| Approved piece | File |
|---|---|
| Sidebar | `src/components/layout/Sidebar.tsx` |
| Hero | `src/components/sections/Hero.tsx` |
| Tools marquee | `src/components/sections/TechMarquee.tsx` |
| Bento workspace (Projects/About/Contact/Credentials/Featured Services/Preview Client Portal) | `src/components/sections/BentoGrid.tsx` |
| Floating visitor counter | `src/components/VisitorCounter.tsx` |
| Visitor data contract (provider-independent) | `src/lib/useVisitorStats.ts` |
| Page composition, outer canvas background, footer | `src/App.tsx` |
| Design tokens, base styles, keyframes | `src/index.css` |

## Known temporary/demo state (not real content, not a defect)

- The floating visitor counter displays a hardcoded **142 visits** demo value
  (clearly marked `DEMO_TOTAL_VISITS` in `VisitorCounter.tsx`) for shell
  visual review only. `useVisitorStats.ts` itself remains untouched and
  provider-independent — it returns `null`/"no data" until a real analytics
  backend is wired up. Remove the demo override at that point.
- All names, credentials, project titles, service names, and contact details
  across the homepage are intentional placeholders, not real content.

## Verified before this package was cut

- `npm run build` — passes (tsc -b + vite build)
- `npx tsc -b` — 0 errors
- `npx oxlint src` — 0 issues
- No horizontal overflow at 375px / 768px / 1440px
- No secrets, no hardcoded machine-specific absolute paths in source
