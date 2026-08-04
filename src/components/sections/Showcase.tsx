import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import { Carousel } from "@/components/sections/showcase/Carousel"

export function Showcase() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-primary">
            Templates
          </p>
          <h2 className="mt-3 text-foreground">
            Built for your industry, not a generic template.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Eight flagship designs, each adapted to how your industry
            actually sells.
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-12">
          <Carousel />
        </Reveal>

        <Reveal delay={2} className="mt-10 text-center">
          <Button asChild variant="secondary">
            <Link to="/templates">View all templates</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
