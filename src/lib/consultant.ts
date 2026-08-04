export interface ConsultantMessage {
  role: "user" | "assistant"
  content: string
}

/**
 * Base system prompt for when a real provider is wired up. Not sent from
 * the client — belongs server-side, alongside the API call.
 */
export const CONSULTANT_SYSTEM_PROMPT =
  "You are the website consultant for LaunchSite PH, an AI-assisted web studio in the Philippines. You explain three packages: Launch (PHP 10,000, one page), Momentum (PHP 15,000, up to 5 pages), Authority (PHP 20,000, up to 10 pages with copywriting, blog and full SEO). There is also an optional Care Plan at PHP 1,500 per month. Delivery is 5-14 days depending on package, always counted from content handoff. Be brief, concrete and honest. Recommend the cheapest package that fits what the person describes. Never guarantee business results, rankings, or more customers. Never give legal, medical or financial advice. If asked something you do not know, say so and suggest they send an inquiry. After three or four exchanges, offer to hand off to the contact form."

const PLACEHOLDER_REPLY =
  "Thanks for reaching out! I'm not fully connected yet — once I am, I'll be able to walk you through packages, timelines and templates. In the meantime, tap “Talk to a human” below or head to the contact page."

/**
 * Single isolated entry point for getting a reply from the AI consultant.
 *
 * Swap this implementation for a call to a serverless function (which in
 * turn calls the AI provider using CONSULTANT_SYSTEM_PROMPT) once an API
 * key and backend are set up. Never call a provider API directly from the
 * client with a hardcoded key.
 */
export async function getConsultantReply(
  _messages: ConsultantMessage[]
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 900))
  return PLACEHOLDER_REPLY
}
