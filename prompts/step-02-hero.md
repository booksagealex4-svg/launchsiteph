# Step 2 — Home Hero

Build the hero section for the LaunchSite PH home page. Use the existing design tokens, fonts, and <Reveal> component. Do not modify the header, footer, or any global styles.

Context: This is the first thing a Filipino doctor, lawyer, architect or restaurant owner sees. Their real question is "will this make me look professional, and can I afford it?" Answer both above the fold.

Layout — two columns on desktop (60/40), stacked on mobile with text first:

LEFT:
- Small pill label above the headline: "AI-assisted web studio - Philippines"
- H1: "Your business deserves more than a Facebook page."
- Subheadline: "Professional websites for Filipino businesses and licensed professionals. Built with AI assistance, finished by hand, delivered in as little as 7 days."
- Two buttons: "Get a Free Quote" (primary, links to /contact) and "See Templates" (secondary, links to /templates)
- Micro-trust line under the buttons in text-muted, small: "Fixed prices from PHP 10,000. No retainers. No surprises."

RIGHT — a CSS-only device mockup cluster (no images of real sites yet, no video):
- A laptop frame containing a simplified abstract website wireframe rendered in divs
- A phone frame overlapping its bottom-left corner, showing a narrower version
- Every 4 seconds the wireframe inside both frames cross-fades to a different color scheme and layout arrangement, cycling through 4 variants suggesting different industries
- Pure CSS transitions plus a React interval. Pause the cycle when the tab is hidden and when prefers-reduced-motion is set (show variant 1 statically).
- Add a soft primary-glow behind the cluster

BACKGROUND: radial electric-blue glow top-center at about 8% opacity over the charcoal, plus a faint 1px grid at 3% opacity. Nothing else.

RESPONSIVE: on mobile the device cluster sits below the text at reduced scale, buttons go full-width and stack, and the headline stays under 4 lines at 375px.

MOTION: headline, subheadline and buttons reveal with an 80ms stagger on load. Device cluster fades in last.

Do not change: header, footer, routing, or design tokens.
