# Design System — Charcoal + Electric Blue

Never invent values outside this file. If something is missing, ask.

## Colors

| Token | Hex | Use |
|---|---|---|
| `background` | `#0E1116` | Page background (dark sections) |
| `surface` | `#161A20` | Cards, panels |
| `surface-elevated` | `#1D222A` | Hover states, nested panels |
| `border` | `#232A33` | 1px borders, dividers |
| `primary` | `#2E7DFF` | Buttons, links, active states |
| `primary-hover` | `#1B6AF0` | Button hover |
| `primary-glow` | `#4DA3FF` | Glow shadows, accents, icon strokes |
| `text-primary` | `#E8ECF2` | Body and heading text on dark |
| `text-muted` | `#94A1B2` | Secondary text, labels |
| `light-bg` | `#F5F7FA` | Alternating light bands |
| `light-text` | `#0E1116` | Text on light bands |
| `success` | `#22C55E` | Confirmations, checkmarks |

Rules: no pure black, no pure white, no second accent color. Electric blue is the only
accent — used sparingly so it still means "click me."

## Typography

- Headings: **Sora** (Google Fonts), weights 600/700, letter-spacing -0.02em
- Body: **Inter** (Google Fonts), weights 400/500
- h1: `clamp(2.25rem, 6vw, 4.5rem)`
- h2: `clamp(1.75rem, 4vw, 3rem)`
- h3: `clamp(1.25rem, 2.5vw, 1.75rem)`
- body: `1rem` mobile, `1.125rem` desktop, line-height 1.6
- Max line length for paragraphs: 65 characters (`max-w-[65ch]`)

## Shape and depth

- Radius: 14px cards and buttons, 999px pills, 10px inputs
- Cards: `surface` bg, 1px `border`, on hover -> `surface-elevated` + border shifts to
  `primary-glow` at 30% opacity
- Primary button: `primary` bg, `0 0 24px rgba(46,125,255,0.35)` glow, translate-y -2px on hover
- Secondary button: transparent, 1px `border`, fills `surface-elevated` on hover
- Never use drop shadows on dark surfaces except the blue glow. Use borders for separation.

## Spacing

- Sections: `py-20` desktop, `py-14` mobile
- Container: `max-w-6xl` centered, `px-5` mobile / `px-8` desktop
- Grid gaps: 24px mobile, 32px desktop
- Minimum tap target: 48x48px

## Motion

Hard rule: **no animation libraries.** CSS transitions + Intersection Observer only.

- Reveal on scroll: opacity 0 -> 1, translateY 16px -> 0, 400ms ease-out, fires once
- Stagger children: 80ms apart
- Hover transitions: 200ms ease
- Carousel autoplay: 5s per slide, pause on hover/focus, always manual controls too
- Counters: count up over 1.2s when the stats block enters view, once only
- Every animation inside `@media (prefers-reduced-motion: no-preference)`

Build one shared `<Reveal>` component. Every section uses it. Do not re-implement.

## Backgrounds and texture

- Hero: subtle radial blue glow top-center at ~8% opacity, plus a faint 1px grid at 3% opacity
- Alternate dark and `light-bg` bands down long pages so it does not read as one slab
- Images: rounded 14px, 1px border, lazy-loaded, explicit width/height

## Accessibility

- Focus ring: 2px `primary-glow`, 2px offset, visible on all interactive elements
- Contrast: 4.5:1 minimum for text, 3:1 for UI borders
- Semantic landmarks, one h1 per page, alt text on every meaningful image
- Carousels: arrow-key navigable, `aria-live="polite"` on the slide region
