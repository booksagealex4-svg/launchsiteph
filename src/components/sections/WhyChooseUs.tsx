import { LifeBuoy, Search, Smartphone, Sparkles, Tag, Timer } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Reveal } from "@/components/shared/Reveal"

interface Benefit {
  icon: LucideIcon
  title: string
  body: string
}

const benefits: Benefit[] = [
  {
    icon: Timer,
    title: "Built in days, not months",
    body: "Most projects go live within 7 to 14 days of receiving your content. No three-month agency timeline.",
  },
  {
    icon: Tag,
    title: "Published prices",
    body: "Three packages, listed openly. You know the cost before you send a message.",
  },
  {
    icon: Smartphone,
    title: "Made for Philippine mobile",
    body: "Most of your visitors are on a phone, on data. Every site is built light and fast for that first.",
  },
  {
    icon: Sparkles,
    title: "AI speed, human judgement",
    body: "AI handles the repetitive build work. Every layout, word and image is reviewed by a person before you see it.",
  },
  {
    icon: Search,
    title: "Found on Google",
    body: "Proper page titles, descriptions, sitemap and Google Business Profile setup, so people searching for you actually find you.",
  },
  {
    icon: LifeBuoy,
    title: "Support after launch",
    body: "Every package includes post-launch support, with an optional monthly care plan if you want it handled permanently.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-primary">
            Why businesses choose us
          </p>
          <h2 className="mt-3 text-foreground">
            Everything an agency does. Without the three-month wait.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i}>
              <div className="h-full rounded-[14px] border border-border bg-surface p-6 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-glow/30 hover:bg-surface-elevated md:p-8">
                <benefit.icon
                  className="text-primary-glow"
                  size={28}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-muted-foreground">{benefit.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={benefits.length} className="mt-12">
          <div className="mx-auto max-w-2xl rounded-[14px] border border-border bg-surface p-8 text-center">
            <h3 className="text-foreground">Is this just AI?</h3>
            <p className="mx-auto mt-3 text-muted-foreground">
              No. AI makes the build faster and keeps the cost down &mdash;
              that is why your price starts at PHP 10,000 instead of PHP
              40,000. But every site is planned, written, reviewed and
              finished by a person. You are hiring judgement, not a
              generator.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
