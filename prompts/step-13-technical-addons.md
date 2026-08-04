# Step 13 — Technical Add-Ons

Only start this after all of Phase C is approved. Do each part as a separate prompt, not all at once.

---

## 13a — AI Website Consultant

Add an AI consultant widget to LaunchSite PH. Call it "Website Consultant" in the UI, never "chatbot."

- Floating button bottom-right, above the fold on every page, 56px, primary bg with glow. On mobile it sits above the thumb zone and shrinks when scrolling down.
- Opens a panel: 380px wide on desktop, full-screen sheet on mobile. Header with name, a "Usually replies instantly" line, and a close button.
- Opening message: "Hi — I can explain our packages, timelines and process, or help you pick a template. What do you do?"
- Four suggested-question chips: "How much does a website cost?", "How long does it take?", "Which template fits my business?", "What do I need to provide?"
- Messages in bubbles: user in primary, assistant in surface with a border. Typing indicator with three animated dots.
- Conversation state in React state only. No login, no persistence, no database.
- The API call goes through a single clearly-isolated function so the provider can be swapped. Do not hardcode any API key in client code — use an environment variable and a serverless function.

SYSTEM PROMPT for the assistant (use verbatim as the base):
"You are the website consultant for LaunchSite PH, an AI-assisted web studio in the Philippines. You explain three packages: Launch (PHP 10,000, one page), Momentum (PHP 15,000, up to 5 pages), Authority (PHP 20,000, up to 10 pages with copywriting, blog and full SEO). There is also an optional Care Plan at PHP 1,500 per month. Delivery is 5-14 days depending on package, always counted from content handoff. Be brief, concrete and honest. Recommend the cheapest package that fits what the person describes. Never guarantee business results, rankings, or more customers. Never give legal, medical or financial advice. If asked something you do not know, say so and suggest they send an inquiry. After three or four exchanges, offer to hand off to the contact form."

Include an escape hatch in every conversation: a persistent "Talk to a human" link to /contact.

---

## 13b — Project Tracker (no login)

Build a /track/:code route. A client receives a link like /track/LS-2049 after signing.

- Look the code up in a local data file for now (src/data/projects.ts); no auth, no database.
- Show: project code, client business name, package, start date, target launch date, and a 7-stage progress tracker matching the process timeline (Inquiry, Quote, Questionnaire, Content handoff, Draft build, Revisions, Launch).
- Completed stages get a success checkmark and a date. The current stage is highlighted in primary with a subtle pulse. Future stages are muted.
- A "What we need from you right now" panel — the single next action, prominent.
- A preview link button, disabled until the draft stage.
- Unknown code shows a clean "We could not find that project" state with a contact link.
- Add `noindex` to this route.

Security note: codes are unguessable but not secret. Never display anything sensitive — no prices paid, no contact details, no documents.

---

## 13c — SEO and Analytics

- react-helmet-async for per-page title, meta description, canonical URL, Open Graph and Twitter card tags. Write real descriptions for every page, not templated ones.
- LocalBusiness JSON-LD schema on the home page. Article schema on resource pages. FAQPage schema on the pricing FAQ.
- robots.txt and a generated sitemap.xml covering all public routes, excluding /track/*.
- Google Analytics 4 and Microsoft Clarity, both loaded only after a cookie consent choice.
- A minimal cookie consent bar: accept / decline, decision stored in localStorage, no tracking scripts loaded until accepted.
- Run a Lighthouse pass and fix anything below 90 on mobile performance or accessibility.
