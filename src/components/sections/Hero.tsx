import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import { DeviceMockup } from "@/components/sections/hero/DeviceMockup"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.08] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-14 md:grid-cols-[3fr_2fr] md:gap-8 md:px-8 md:py-20">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-primary-glow/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary md:text-sm">
              AI-assisted web studio &mdash; Philippines
            </span>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="text-foreground">
              Your Business Deserves More Than a Facebook Page.
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="text-muted-foreground">
              Professional websites for Filipino businesses and licensed
              professionals. Built with AI assistance, finished by hand,
              delivered in as little as 7 days.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <Link to="/templates">See Templates</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <p className="text-sm text-muted-foreground">
              Fixed prices from PHP 10,000. No retainers. No surprises.
            </p>
          </Reveal>
        </div>

        <Reveal delay={5}>
          <DeviceMockup />
        </Reveal>
      </div>
    </section>
  )
}
