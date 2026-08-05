import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import { Seo } from "@/components/shared/Seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { packages } from "@/data/packages"
import { PricingCard } from "@/components/pricing/PricingCard"
import { CarePlanPanel } from "@/components/pricing/CarePlanPanel"
import { ComparisonTable } from "@/components/pricing/ComparisonTable"
import { FaqAccordion, faqItems } from "@/components/pricing/FaqAccordion"

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

export default function Pricing() {
  return (
    <div className="py-14 md:py-20">
      <Seo
        title="Pricing — Three Website Packages From PHP 10,000 | LaunchSite PH"
        description="Launch, Momentum and Authority packages compared. Real prices, published openly, with delivery in 5 to 14 days from content handoff."
        path="/pricing"
      />
      <JsonLd data={faqSchema} />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h1 className="text-foreground">
            Three packages. Real prices. No quote request required.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Most agencies hide their pricing until you have sat through a
            meeting. Here it is. Pick the package that matches how much of
            your business needs to be online, and we will tell you honestly
            if a cheaper one would do.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:items-start md:gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i} className="h-full">
              <PricingCard pkg={pkg} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={3} className="mt-16 md:mt-20">
          <CarePlanPanel />
        </Reveal>

        <Reveal className="mt-20">
          <h2 className="text-center text-foreground">
            How this compares to a traditional agency.
          </h2>
          <div className="mt-8">
            <ComparisonTable />
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <h2 className="text-center text-foreground">
            Frequently asked questions.
          </h2>
          <div className="mx-auto mt-8 max-w-3xl">
            <FaqAccordion />
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <div className="rounded-[14px] border border-border bg-surface p-8 text-center md:p-10">
            <h3 className="text-foreground">
              Still not sure? Send a message and we will recommend a package
              in one business day.
            </h3>
            <div className="mt-6">
              <Button asChild>
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          All prices are starting prices. Final quote depends on scope.
          Delivery timelines begin from content handoff.
        </p>
      </div>
    </div>
  )
}
