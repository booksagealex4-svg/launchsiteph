import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import { Seo } from "@/components/shared/Seo"
import { ProcessTimeline } from "@/components/sections/ProcessTimeline"

const whatWeNeed = [
  "Your logo, or your business name if you do not have one yet",
  "Photos of your work, your space, or your team",
  "A list of your services and prices",
  "Business hours and location",
  "Any written content you already have",
]

export default function Process() {
  return (
    <>
      <Seo
        title="Our Process — How a 7-Day Website Build Works | LaunchSite PH"
        description="Every stage dated in writing before you pay for anything. Here is exactly what happens between your first message and launch day."
        path="/process"
      />

      <div className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h1 className="text-foreground">
              How Your 7-Day Build Actually Works.
            </h1>
            <p className="mt-4 text-muted-foreground">
              Every stage is dated in writing before you pay for anything.
              Here is exactly what happens between your first message and
              launch day.
            </p>
          </Reveal>
        </div>
      </div>

      <ProcessTimeline />

      <div className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <div className="rounded-[14px] border border-border bg-surface p-8 md:p-10">
              <h2 className="text-foreground">What we need from you</h2>
              <p className="mt-3 text-muted-foreground">
                We will send a short checklist after your first message, so
                you are never guessing what to prepare. In general, it comes
                down to five things.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {whatWeNeed.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Nothing here yet? Authority-tier projects include full
                copywriting, and we can point you to stock photo options for
                the rest. See{" "}
                <Link
                  to="/pricing"
                  className="text-primary underline underline-offset-2 hover:text-primary-hover"
                >
                  pricing
                </Link>{" "}
                for details.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1} className="mt-16">
            <div className="rounded-[14px] border border-border bg-surface p-8 text-center md:p-10">
              <h3 className="text-foreground">
                Ready to start the clock?
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
    </>
  )
}
