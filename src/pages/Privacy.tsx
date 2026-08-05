import { Reveal } from "@/components/shared/Reveal"
import { Seo } from "@/components/shared/Seo"
import { ArticleBody } from "@/components/resources/ArticleBody"
import type { ContentBlock } from "@/data/articles"
import { BUSINESS_EMAIL } from "@/lib/site"

const body: ContentBlock[] = [
  { type: "heading", text: "What we collect" },
  {
    type: "paragraph",
    text: "When you send an inquiry, refer a client, or use the Website Consultant on this site, we may collect your name, business name, industry, mobile number, email address, and anything you write in a message field. Referral submissions also include the name and contact details of the person you refer.",
  },
  { type: "heading", text: "How your inquiry is sent" },
  {
    type: "paragraph",
    text: "The contact form on this site does not store your message on our servers. Submitting it opens your own email app with the message pre-filled, addressed to us — you send it yourself. We only receive what you choose to send.",
  },
  { type: "heading", text: "Referral data" },
  {
    type: "paragraph",
    text: "Referral submissions are stored securely so we can track and pay out commissions. This data is only accessible to LaunchSite PH's administrator and is never sold or shared with third parties.",
  },
  { type: "heading", text: "Cookies and analytics" },
  {
    type: "paragraph",
    text: "We use cookies for basic site analytics, but only after you accept the cookie banner shown on your first visit. If you decline, no tracking scripts run. You can change your choice at any time by clearing your browser's local storage for this site.",
  },
  { type: "heading", text: "Third-party services" },
  {
    type: "list",
    items: [
      "Supabase — stores referral submissions securely.",
      "Google Analytics and Microsoft Clarity — anonymised usage analytics, loaded only after consent.",
    ],
  },
  { type: "heading", text: "Your rights" },
  {
    type: "paragraph",
    text: `You can request to see, correct, or delete any information we hold about you by emailing ${BUSINESS_EMAIL}. We will respond within a reasonable time.`,
  },
  { type: "heading", text: "Business registration" },
  {
    type: "paragraph",
    text: "(To be added.)",
  },
  { type: "heading", text: "Changes to this policy" },
  {
    type: "paragraph",
    text: "We may update this policy as the site changes. The date at the top of this page reflects the most recent update.",
  },
  { type: "heading", text: "Contact" },
  {
    type: "paragraph",
    text: `Questions about this policy? Email ${BUSINESS_EMAIL}.`,
  },
]

export default function Privacy() {
  return (
    <div className="py-14 md:py-20">
      <Seo
        title="Privacy Policy | LaunchSite PH"
        description="How LaunchSite PH collects, stores and uses your information."
        path="/privacy"
      />
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <h1 className="text-foreground">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: August 2026
          </p>
        </Reveal>
        <Reveal delay={1} className="mt-10">
          <ArticleBody body={body} />
        </Reveal>
      </div>
    </div>
  )
}
