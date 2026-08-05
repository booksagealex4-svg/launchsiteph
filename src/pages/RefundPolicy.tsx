import { Reveal } from "@/components/shared/Reveal"
import { Seo } from "@/components/shared/Seo"
import { ArticleBody } from "@/components/resources/ArticleBody"
import type { ContentBlock } from "@/data/articles"
import { BUSINESS_EMAIL } from "@/lib/site"

const body: ContentBlock[] = [
  { type: "heading", text: "Before content handoff" },
  {
    type: "paragraph",
    text: "If you cancel before sending your content (logo, photos, text), any downpayment made is refundable. (Exact refund terms and any processing fee: to be confirmed.)",
  },
  { type: "heading", text: "After content handoff, before the draft build" },
  {
    type: "paragraph",
    text: "Once your delivery clock has started but before a draft is delivered, a partial refund may be available, reflecting work already scoped and started. (Exact percentage: to be confirmed.)",
  },
  { type: "heading", text: "After the draft build is delivered" },
  {
    type: "paragraph",
    text: "Once a working draft is live on a preview link, the build work has been substantially completed, and payments made at that stage are generally non-refundable. Revisions are covered by your package's included rounds instead.",
  },
  { type: "heading", text: "Care Plan cancellations" },
  {
    type: "paragraph",
    text: "The optional monthly Care Plan can be cancelled at any time. Cancelling stops future billing; it does not refund past months already paid.",
  },
  { type: "heading", text: "Referral commissions" },
  {
    type: "paragraph",
    text: "Referral commissions are paid only after the referred client's payment is received in full, and are not refundable once paid.",
  },
  { type: "heading", text: "How to request a refund" },
  {
    type: "paragraph",
    text: `Email ${BUSINESS_EMAIL} with your name and project details. We will respond within a reasonable time with next steps.`,
  },
]

export default function RefundPolicy() {
  return (
    <div className="py-14 md:py-20">
      <Seo
        title="Refund Policy | LaunchSite PH"
        description="When and how refunds work for LaunchSite PH projects."
        path="/refund-policy"
      />
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <h1 className="text-foreground">Refund Policy</h1>
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
