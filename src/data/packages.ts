export interface PackageRecord {
  name: "Launch" | "Momentum" | "Authority"
  price: number
  audience: string
  includesNote?: string
  features: string[]
  deliveryRange: string
  revisionRounds: number
  supportNote: string
  highlighted?: boolean
}

export const packages: PackageRecord[] = [
  {
    name: "Launch",
    price: 10000,
    audience: "For solo professionals replacing a Facebook page.",
    features: [
      "One-page site, up to 5 sections",
      "Industry template with your branding",
      "Fully mobile responsive",
      "Contact form to your email",
      "Click-to-call and Messenger buttons",
      "Google Maps embed and business hours",
      "Basic on-page SEO",
      "Domain and hosting for 1 year",
    ],
    deliveryRange: "5-7 days from content handoff",
    revisionRounds: 2,
    supportNote: "14 days post-launch support",
  },
  {
    name: "Momentum",
    price: 15000,
    audience: "For established practices that need a real presence.",
    includesNote: "Everything in Launch, plus:",
    features: [
      "Up to 5 pages",
      "Photo gallery or portfolio grid",
      "Appointment or booking request form",
      "Copy editing across all pages",
      "Google Analytics configured",
      "Google Business Profile setup",
      "Custom section layouts",
    ],
    deliveryRange: "7-10 days from content handoff",
    revisionRounds: 3,
    supportNote: "1 month post-launch support",
    highlighted: true,
  },
  {
    name: "Authority",
    price: 20000,
    audience: "For firms that want to be found first in their city.",
    includesNote: "Everything in Momentum, plus:",
    features: [
      "Up to 10 pages including service detail pages",
      "Fully custom layout, not template-based",
      "Full copywriting from your questionnaire",
      "Blog you can update yourself",
      "Schema markup, sitemap, Search Console, local SEO",
      "FAQ and testimonials system",
      "Newsletter signup",
    ],
    deliveryRange: "10-14 days from content handoff",
    revisionRounds: 5,
    supportNote: "3 months support with 2 content updates per month",
  },
]
