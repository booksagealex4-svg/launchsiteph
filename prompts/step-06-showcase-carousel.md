# Step 6 — Industry Showcase Carousel

Add a showcase carousel below the process timeline on the LaunchSite PH home page. Back to the dark background. Existing tokens and <Reveal> only. Do not modify sections already built.

Section header:
- Eyebrow: "Templates"
- H2: "Built for your industry, not a generic template."
- Sub: "Eight flagship designs, each adapted to how your industry actually sells."

Carousel: a horizontal slider showing 3 cards at a time on desktop, 2 on tablet, 1 on mobile with a peek of the next card.

Eight slides, each a card containing a browser-frame mockup (CSS chrome bar with three dots, then a placeholder image area with the template's palette applied as a gradient), plus below it: template name, industry label, and 3 feature chips.

1. Meridian - Medical Clinic - chips: Appointment request, Doctor bios, Clinic hours
2. Verdict - Law Firm - chips: Practice areas, Attorney profiles, Consultation form
3. Enamel - Dental Clinic - chips: Services grid, Before/after gallery, Booking
4. Plateau - Architecture - chips: Project gallery, Case studies, Full-bleed imagery
5. Ember - Restaurant / Cafe - chips: Menu, Reservations, Photo gallery
6. Tidewater - Resort / Hotel - chips: Room showcase, Amenities, Booking inquiry
7. Ledger - Accounting / Financial - chips: Services, Credentials, Consultation
8. Anthem - Coach / Speaker - chips: Big typography, Video embed, Testimonials

Each card links to /templates/[slug].

CONTROLS: previous/next arrow buttons, plus dot indicators. Autoplay every 5 seconds, pausing on hover, on focus, and when the tab is hidden. Fully keyboard navigable with arrow keys. aria-live="polite" on the slide region. Swipeable on touch.

Under prefers-reduced-motion: no autoplay, instant slide changes, manual controls only.

Below the carousel, a centered secondary button: "View all templates" linking to /templates.

Do not change: any earlier section, header, footer, tokens.
