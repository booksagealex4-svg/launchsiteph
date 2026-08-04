# Step 11 — Resources

Build the /resources index page plus a reusable /resources/:slug article page for LaunchSite PH, driven by a local data file (src/data/articles.ts). Existing tokens, header, footer and <Reveal>. Do not modify other pages.

Purpose: build trust before anyone contacts you. These articles should read as genuinely useful guidance, not sales pages.

INDEX PAGE:
- H1: "Guides for Philippine businesses going online."
- Sub: "Plain explanations of what a website actually needs, what it costs, and what you can skip."
- Category filter pills: All, Getting Started, SEO and Google, Costs, Industry Guides
- Card grid, 3 columns desktop / 2 tablet / 1 mobile. Each card: category chip, title, two-line excerpt, read time, and a "Read" link.

Seed with eight article records (title, slug, category, excerpt, readTime, body as markdown-ish placeholder paragraphs the user will replace):
1. What a small business website actually needs in 2026 - Getting Started - 6 min
2. How much should a website cost in the Philippines? - Costs - 7 min
3. Domain and hosting, explained without jargon - Getting Started - 5 min
4. Setting up your Google Business Profile the right way - SEO and Google - 6 min
5. Why your Facebook page is not enough on its own - Getting Started - 5 min
6. A website checklist for clinics and dental practices - Industry Guides - 8 min
7. What restaurants and cafes should put on their website - Industry Guides - 6 min
8. SEO basics: what actually moves the needle for a local business - SEO and Google - 9 min

ARTICLE PAGE:
- Breadcrumb, category chip, H1, read time and publish date
- Body column max-w-[68ch], comfortable line-height, styled headings, lists, blockquotes and inline links using the tokens
- A sticky table of contents on desktop (from the h2s), hidden on mobile
- End-of-article CTA panel: "Want this handled for you? Get a free quote." with a primary button to /contact
- Three related-article cards at the bottom

Handle unknown slugs with a "Article not found" state linking back to /resources.

Do not change: header, footer, other pages, tokens.
