export interface ConsultantMessage {
  role: "user" | "assistant"
  content: string
}

/**
 * Base system prompt for when a real AI provider is wired up. Not sent from
 * the client — belongs server-side, alongside the API call.
 */
export const CONSULTANT_SYSTEM_PROMPT =
  "You are the website consultant for LaunchSite PH, an AI-assisted web studio in the Philippines. You explain three packages: Launch (PHP 10,000, one page), Momentum (PHP 15,000, up to 5 pages), Authority (PHP 20,000, up to 10 pages with copywriting, blog and full SEO). There is also an optional Care Plan at PHP 1,500 per month. Delivery is 5-14 days depending on package, always counted from content handoff. Be brief, concrete and honest. Recommend the cheapest package that fits what the person describes. Never guarantee business results, rankings, or more customers. Never give legal, medical or financial advice. If asked something you do not know, say so and suggest they send an inquiry. After three or four exchanges, offer to hand off to the contact form."

interface FaqEntry {
  keywords: string[]
  answer: string
}

// Keyword-matched FAQ, not a real AI — no API key or backend required.
// Ordered by priority: first matching entry wins. Covers the 4 suggested
// questions shown in the panel plus a handful of other common ones.
const FAQ: FaqEntry[] = [
  {
    keywords: ["cost", "price", "how much", "magkano", "presyo", "budget"],
    answer:
      "Three fixed packages: Launch is PHP 10,000 (one page), Momentum is PHP 15,000 (up to 5 pages), and Authority is PHP 20,000 (up to 10 pages, full copywriting and SEO). No hidden fees — your final quote is confirmed in writing before you pay anything.",
  },
  {
    keywords: [
      "how long",
      "days",
      "timeline",
      "how fast",
      "delivery",
      "when will",
    ],
    answer:
      "Launch takes 5-7 days, Momentum 7-10 days, and Authority 10-14 days — all counted from the day you hand off your content (photos, text, logo), not from your first message. If your content takes two weeks to gather, the build takes two weeks from there.",
  },
  {
    keywords: [
      "template",
      "which one",
      "fits my business",
      "recommend",
      "industry",
    ],
    answer:
      "We have 8 industry-specific templates — clinics, dental practices, law firms, architecture and interior design, restaurants and cafes, resorts and hotels, accounting firms, and coaches or speakers. Tell us your industry in your inquiry and we'll recommend the closest fit, or adapt one if you're something else. You can browse them all on the Templates page.",
  },
  {
    keywords: [
      "what do i need",
      "need to provide",
      "prepare",
      "content handoff",
      "what should i send",
    ],
    answer:
      "Five things, generally: your logo (or business name if you don't have one yet), photos of your work, space or team, a list of your services and prices, your business hours and location, and any written content you already have. We send a specific checklist after your first message so you're never guessing.",
  },
  {
    keywords: [
      "just ai",
      "real ai",
      "actually a person",
      "human",
      "generator",
      "chatbot",
    ],
    answer:
      "AI speeds up the build and keeps the cost down, but every site is planned, written, reviewed and finished by a real person. You're hiring judgement, not a generator.",
  },
  {
    keywords: ["refund", "cancel", "money back"],
    answer:
      "Refund terms depend on how far the project has progressed — see the Refund Policy page for specifics, or ask directly and we'll walk you through your situation.",
  },
  {
    keywords: ["support", "after launch", "maintenance", "care plan"],
    answer:
      "Every package includes post-launch support built in (14 days on Launch, 1 month on Momentum, 3 months on Authority). After that, an optional Care Plan is PHP 1,500 a month if you'd like us to keep handling updates, domain and hosting.",
  },
  {
    keywords: ["domain", "hosting"],
    answer:
      "Domain and hosting for 1 year are included in every package. After that, it's yours to manage, or you can move to a Care Plan and we'll handle the renewal for you.",
  },
  {
    keywords: ["get started", "how do i start", "begin"],
    answer:
      "Send an inquiry through the contact page with a bit about your business — you'll get a fixed written quote and package recommendation, usually within one business day. No payment required just to get a quote.",
  },
]

const FALLBACK_REPLY =
  "I don't have a specific answer for that one yet. Tap “Talk to a human” below, or send a message on the contact page and we'll get back to you directly — usually within one business day."

/**
 * Single isolated entry point for getting a reply from the AI consultant.
 * Currently keyword-matched against a fixed FAQ, not a real AI.
 *
 * Swap this implementation for a call to a serverless function (which in
 * turn calls the AI provider using CONSULTANT_SYSTEM_PROMPT) once an API
 * key and backend are set up. Never call a provider API directly from the
 * client with a hardcoded key.
 */
export async function getConsultantReply(
  messages: ConsultantMessage[]
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 700))

  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")
  const input = lastUserMessage?.content.toLowerCase() ?? ""

  const match = FAQ.find((entry) =>
    entry.keywords.some((keyword) => input.includes(keyword))
  )

  return match ? match.answer : FALLBACK_REPLY
}
