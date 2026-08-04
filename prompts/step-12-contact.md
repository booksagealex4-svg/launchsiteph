# Step 12 — Contact Page

Build the /contact page for LaunchSite PH. Existing tokens, header, footer and <Reveal>. Do not modify other pages.

IMPORTANT: no login, no account creation, no payment. This is an inquiry form only.

PAGE HEADER:
- H1: "Tell us what you do. We will tell you what it costs."
- Sub: "Send a short message or book a free 20-minute call. You will get a written quote with a fixed price and a delivery date — usually within one business day."

Two-column layout, stacked on mobile with the form first.

LEFT — INQUIRY FORM:
- Name (required)
- Business or practice name (required)
- Industry (select: Healthcare, Legal, Architecture and Design, Accounting and Finance, Real Estate, Restaurant and Cafe, Hotel and Resort, Education, Fitness and Wellness, Personal Brand, Other)
- Mobile number (required) and Email (required)
- Preferred contact method (radio: Messenger, Viber, Call, Email)
- Package interest (select: Not sure yet, Launch, Momentum, Authority) — pre-fill from the ?package= query string when present
- Template interest (optional text) — pre-fill from the ?template= query string when present
- Do you already have a website? (radio: No, Yes but it needs replacing, Only a Facebook page)
- Message (textarea)
- Submit button: "Send inquiry"

FORM BEHAVIOUR: client-side validation with inline error messages under each field, a loading state on the button while submitting, a success panel replacing the form on completion ("Thank you. You will hear from us within one business day."), and an error state with a fallback instruction to message directly. Submission handler should be a single clearly-marked function so the endpoint can be swapped later — do NOT add Supabase or any backend in this step.

RIGHT — CONTACT PANEL:
- "Prefer to talk?" heading
- Messenger link, Viber link, mobile number as a tel: link, and email — each as a bordered row with an icon, all large tap targets
- Business hours: Mon-Sat, 9AM-6PM PHT
- Location line: "[City], Philippines - we work with clients nationwide"
- A "Book a free 20-minute call" secondary button (placeholder link for a scheduling tool)
- A short reassurance list: "No obligation. No sales pressure. If a cheaper package fits, we will say so."

BELOW: a compact three-item FAQ — "What happens after I send this?", "Do I need to pay anything to get a quote?", "What if I do not know what I need yet?"

RESPONSIVE: form fields full-width on mobile, 48px minimum height, correct input types so mobile keyboards behave (tel, email).

Do not change: header, footer, other pages, tokens.
