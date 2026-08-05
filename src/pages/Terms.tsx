import { Reveal } from "@/components/shared/Reveal"
import { Seo } from "@/components/shared/Seo"
import { ArticleBody } from "@/components/resources/ArticleBody"
import type { ContentBlock } from "@/data/articles"
import { BUSINESS_EMAIL } from "@/lib/site"

const body: ContentBlock[] = [
  { type: "heading", text: "What this site is" },
  {
    type: "paragraph",
    text: "LaunchSite PH is a website design and build studio serving Philippine businesses and licensed professionals. This website is for inquiries only — there is no account creation, login, checkout, or payment processing on this site.",
  },
  { type: "heading", text: "How an engagement works" },
  {
    type: "paragraph",
    text: "You send an inquiry through this site's contact form or referral program. We reply with a fixed written quote and a package recommendation. Once you accept, you send your content (logo, photos, text) — this is what starts the delivery clock. We build, you review, we revise, and we launch. See our [Process page](/process) for the full breakdown.",
  },
  { type: "heading", text: "Pricing" },
  {
    type: "paragraph",
    text: "Prices shown on this site are starting prices for the described scope. Your final quote depends on your specific requirements and will be provided in writing before any work begins.",
  },
  { type: "heading", text: "Payment" },
  {
    type: "paragraph",
    text: "Payment is arranged directly between you and LaunchSite PH — commonly via GCash, Maya, or bank transfer — and is never processed through this website. Payment terms, including any downpayment, will be stated in your written quote.",
  },
  { type: "heading", text: "Revisions" },
  {
    type: "paragraph",
    text: "Each package includes a set number of revision rounds, from 2 to 5 depending on package. Additional revisions beyond that can be arranged for an added cost.",
  },
  { type: "heading", text: "Ownership" },
  {
    type: "paragraph",
    text: "Once your project is paid in full, the domain, content and website are yours. There is no lock-in and no ongoing dependency on LaunchSite PH unless you choose an optional Care Plan.",
  },
  { type: "heading", text: "Referral program" },
  {
    type: "paragraph",
    text: "The [referral program](/referral) pays PHP 1,000 per successful referral, once the referred client's payment is received in full. LaunchSite PH may adjust or end this program at any time; changes will not affect referrals already submitted.",
  },
  { type: "heading", text: "No guaranteed results" },
  {
    type: "paragraph",
    text: "We build professional, fast, well-structured websites. We do not guarantee search rankings, more customers, or any specific business outcome.",
  },
  { type: "heading", text: "Limitation of liability" },
  {
    type: "paragraph",
    text: "LaunchSite PH is not liable for indirect or consequential losses arising from use of this website or its services, to the extent permitted by law.",
  },
  { type: "heading", text: "Governing law" },
  {
    type: "paragraph",
    text: "These terms are governed by the laws of the Republic of the Philippines. (Full business registration details: to be added.)",
  },
  { type: "heading", text: "Contact" },
  {
    type: "paragraph",
    text: `Questions about these terms? Email ${BUSINESS_EMAIL}.`,
  },
]

export default function Terms() {
  return (
    <div className="py-14 md:py-20">
      <Seo
        title="Terms of Service | LaunchSite PH"
        description="The terms that apply when you work with LaunchSite PH."
        path="/terms"
      />
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <h1 className="text-foreground">Terms of Service</h1>
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
