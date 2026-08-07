import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import heroCityscape from "@/assets/hero/hero-cityscape.jpg"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <img
          src={heroCityscape}
          alt=""
          width={1600}
          height={1067}
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col items-start justify-center gap-6 px-5 py-14 md:min-h-[680px] md:px-8 md:py-20">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-primary-glow/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary md:text-sm">
            AI-assisted web studio &mdash; Philippines
          </span>
        </Reveal>

        <Reveal delay={1}>
          <h1 className="max-w-2xl text-foreground">
            Your Business Deserves More Than a Facebook Page.
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <p className="max-w-xl text-muted-foreground">
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
            <Button asChild variant="secondary" className="w-full sm:w-auto">
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
    </section>
  )
}
