import { Hero } from "@/components/sections/Hero"
import { StatsTrust } from "@/components/sections/StatsTrust"
import { WhyChooseUs } from "@/components/sections/WhyChooseUs"
import { ProcessTimeline } from "@/components/sections/ProcessTimeline"
import { Showcase } from "@/components/sections/Showcase"
import { Seo } from "@/components/shared/Seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { SITE_URL } from "@/lib/site"

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "LaunchSite PH",
  description:
    "AI-assisted, human-finished websites for Filipino businesses and licensed professionals. Fixed prices from PHP 10,000, delivered in as little as 7 days from content handoff.",
  url: SITE_URL,
  email: "hello@launchsiteph.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cebu City",
    addressCountry: "PH",
  },
  areaServed: "PH",
  priceRange: "PHP 10,000–20,000",
}

export default function Home() {
  return (
    <>
      <Seo
        title="LaunchSite PH — Professional Websites for Filipino Businesses, Built in 7 Days"
        description="AI-assisted, human-finished websites for Philippine professionals and small businesses. Fixed prices from PHP 10,000, delivered in as little as 7 days from content handoff."
        path="/"
      />
      <JsonLd data={localBusinessSchema} />
      <Hero />
      <StatsTrust />
      <WhyChooseUs />
      <ProcessTimeline />
      <Showcase />
    </>
  )
}
