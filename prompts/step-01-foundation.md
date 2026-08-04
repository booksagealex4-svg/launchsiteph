# Step 1 — Foundation

Create a new React + Vite + TypeScript + Tailwind + shadcn/ui project for "LaunchSite PH", an AI-assisted website studio that builds professional websites for Philippine businesses and licensed professionals.

In this step build ONLY the global design system and layout shell. No page content. The home page should render just the header, an empty <main> placeholder, and the footer.

DESIGN TOKENS — define in tailwind.config and as CSS variables:
background #0E1116, surface #161A20, surface-elevated #1D222A, border #232A33, primary #2E7DFF, primary-hover #1B6AF0, primary-glow #4DA3FF, text-primary #E8ECF2, text-muted #94A1B2, light-bg #F5F7FA, light-text #0E1116, success #22C55E.
No pure black, no pure white, no second accent color.

TYPOGRAPHY:
- Headings: Sora (Google Fonts), 600/700, letter-spacing -0.02em
- Body: Inter (Google Fonts), 400/500
- h1 clamp(2.25rem, 6vw, 4.5rem), h2 clamp(1.75rem, 4vw, 3rem), h3 clamp(1.25rem, 2.5vw, 1.75rem)
- Body 1rem mobile / 1.125rem desktop, line-height 1.6, paragraphs max-w-[65ch]

SHAPE:
- Radius 14px cards and buttons, 999px pills, 10px inputs
- Cards: surface bg, 1px border, hover to surface-elevated with border shifting to primary-glow at 30% opacity
- Primary button: primary bg, glow shadow 0 0 24px rgba(46,125,255,0.35), translate-y -2px on hover
- Secondary button: transparent, 1px border, fills surface-elevated on hover
- Separate with borders, not drop shadows

SPACING: sections py-20 desktop / py-14 mobile. Container max-w-6xl centered, px-5 mobile / px-8 desktop. Grid gaps 24px mobile / 32px desktop. Minimum tap target 48x48px.

MOTION — do NOT install Framer Motion, GSAP, or any animation library. CSS transitions and IntersectionObserver only.
- Build a reusable <Reveal> component: opacity 0 to 1, translateY 16px to 0, 400ms ease-out, fires once on entering viewport, optional stagger delay prop (80ms increments)
- All hover transitions 200ms ease
- Wrap all motion in a prefers-reduced-motion: no-preference check

HEADER (sticky, global):
- Transparent at scroll 0, transitions to blurred charcoal bar with bottom border after 40px scroll
- Left: "LaunchSite PH" wordmark in Sora 700 with a small electric-blue geometric mark
- Nav links: Home, Templates, Pricing, Process, Resources, About, Contact
- Right: primary "Get a Free Quote" button
- Mobile: hamburger opening a full-screen charcoal overlay, large tap targets, links staggering in, quote button pinned full-width at the bottom

FOOTER (global), 4 columns collapsing to 1 on mobile:
- Col 1: wordmark, tagline "Professional websites powered by AI and crafted by humans.", social icons
- Col 2 Services: Templates, Pricing, Process, Care Plans
- Col 3 Company: About, Resources, Contact, FAQ
- Col 4 Get in touch: email placeholder, mobile number placeholder, "[City], Philippines", "Mon-Sat, 9AM-6PM PHT"
- Bottom bar: copyright, Privacy Policy, Terms, Refund Policy

ROUTING: react-router with /, /templates, /pricing, /process, /resources, /about, /contact — each a temporary placeholder heading.

RESPONSIVE: mobile-first. Assume mid-range Android on mobile data. Small bundle, lazy-loaded images, no heavy effects.

ACCESSIBILITY: 2px primary-glow focus rings with 2px offset, semantic landmarks, aria-label on the mobile menu toggle, 4.5:1 text contrast minimum.
