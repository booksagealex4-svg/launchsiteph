import { useEffect, useRef, useState } from "react"

import { Reveal } from "@/components/shared/Reveal"
import { StatCounter } from "@/components/sections/stats/StatCounter"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

const stats = [
  {
    value: 7,
    suffix: " Days",
    label: "Typical delivery from content handoff",
  },
  { value: 8, suffix: "", label: "Industry templates ready to adapt" },
  { value: 100, suffix: "%", label: "Mobile-optimised, every build" },
  { value: 1, suffix: " Year", label: "Domain and hosting included" },
]

export function StatsTrust() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="border-y border-border bg-surface py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8 md:gap-y-8">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span
                className="font-heading whitespace-nowrap font-bold text-primary"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
              >
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  started={started}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={4} className="mt-12 text-center">
          <p className="mx-auto max-w-none text-sm text-muted-foreground md:text-base">
            Fixed quotes. Written timelines. You talk to the person building
            your site.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
