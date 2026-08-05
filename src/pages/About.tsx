import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import { Seo } from "@/components/shared/Seo"
import { ValuesGrid } from "@/components/about/ValuesGrid"
import { CareerTimeline } from "@/components/about/CareerTimeline"
import { ToolsStrip } from "@/components/about/ToolsStrip"
import alexPortrait from "@/assets/alex-portrait.jpg"

export default function About() {
  return (
    <div className="py-14 md:py-20">
      <Seo
        title="About — You're Hiring a Person, Not an Agency | LaunchSite PH"
        description="Meet the person behind LaunchSite PH: 6 years in publishing and creative production, now building AI-assisted websites for Philippine professionals."
        path="/about"
      />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          <Reveal>
            <h1 className="text-foreground">
              You are hiring a person, not an agency.
            </h1>
            <p className="mt-4 text-muted-foreground">
              Alex. 6 years in publishing and creative production, including
              work with international clients. I now build websites for
              Philippine professionals using current AI tooling, which is
              how a site that would cost PHP 40,000 elsewhere starts at PHP
              10,000 here.
            </p>
          </Reveal>

          <Reveal delay={1}>
            <div className="relative mx-auto max-w-sm">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-[80px]"
              />
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[14px] border border-border bg-surface">
                <img
                  src={alexPortrait}
                  alt="Alex, founder of LaunchSite PH"
                  width={800}
                  height={800}
                  loading="eager"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 md:mt-20">
          <div className="mx-auto max-w-3xl rounded-[14px] border border-border bg-surface p-8 text-center md:p-10">
            <h2 className="text-foreground">Why solo is a feature</h2>
            <p className="mx-auto mt-3 text-muted-foreground">
              No account manager. No handoffs between departments. You talk
              to the person building your site, from the first message to
              launch day.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 md:mt-20">
          <ValuesGrid />
        </div>

        <Reveal className="mt-16 md:mt-20">
          <h2 className="text-foreground">The journey so far.</h2>
          <div className="mt-8 max-w-2xl">
            <CareerTimeline />
          </div>
        </Reveal>

        <Reveal className="mt-16 md:mt-20">
          <ToolsStrip />
        </Reveal>

        <Reveal className="mt-16">
          <div className="rounded-[14px] border border-border bg-surface p-8 text-center md:p-10">
            <h3 className="text-foreground">
              Tell me what you do. I will tell you what it costs.
            </h3>
            <div className="mt-6">
              <Button asChild>
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
