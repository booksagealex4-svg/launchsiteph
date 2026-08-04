# Step 8 — Template Detail Page

Build a reusable /templates/:slug detail page for LaunchSite PH, driven by a local data file (src/data/templates.ts) holding all eight templates. Existing tokens, header, footer and <Reveal>. Do not modify other pages.

Each template record: slug, name, industry, category, tagline, description, palette (3 hex values), features (6 strings), sections (list of included page sections), recommendedPackage, deliveryRange.

PAGE LAYOUT:

1. Breadcrumb: Templates / [Name]

2. Hero row — two columns, stacked on mobile:
   - Left: template name as H1, industry label, tagline, palette swatches (3 circles with hex on hover), and two buttons: "Start with this template" (primary, to /contact with the template name pre-filled in the query string) and "See all templates" (secondary)
   - Right: a device preview switcher — tabs for Desktop / Tablet / Mobile that change the frame around a placeholder mockup, with a 250ms cross-fade between frame sizes

3. Features grid: 6 items, 3 columns desktop / 2 tablet / 1 mobile, each an icon + label + one line.

4. "What's included" list: the page sections this template ships with, as a two-column checklist with success-colored checkmarks.

5. Recommended package strip: a bordered panel naming the recommended package, its price, and delivery range, with a link to /pricing. Copy: "Recommended package: [name] - from PHP [price] - delivered in [range] from content handoff."

6. Related templates: three cards from the same category, reusing the gallery card component.

7. Closing CTA panel: "Want this adapted to your brand?" with a primary button to /contact.

Handle an unknown slug with a simple "Template not found" state and a link back to /templates.

Do not change: header, footer, other pages, tokens.
