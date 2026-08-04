import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/shared/Reveal"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

interface Step {
  day: string
  title: string
  body: string
  highlight?: boolean
}

const steps: Step[] = [
  {
    day: "Day 0",
    title: "Inquiry",
    body: "You send a message or book a free 20-minute call.",
  },
  {
    day: "Day 1",
    title: "Quote and scope",
    body: "You get a fixed written quote and a package recommendation.",
  },
  {
    day: "Day 1-2",
    title: "Questionnaire",
    body: "A short form covering your services, credentials, hours and photos.",
  },
  {
    day: "Day 2",
    title: "Content handoff",
    body: "You send logo, photos and text. The delivery clock starts here.",
    highlight: true,
  },
  {
    day: "Day 3-5",
    title: "Draft build",
    body: "First working version, live on a preview link.",
  },
  {
    day: "Day 5-7",
    title: "Revisions",
    body: "Your changes applied, 2 to 5 rounds depending on package.",
  },
  {
    day: "Day 7",
    title: "Launch",
    body: "Domain connected, site live, tracking installed, walkthrough call.",
  },
]

function DayChip({ day }: { day: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
      {day}
    </span>
  )
}

function Dot({ highlight }: { highlight?: boolean }) {
  return (
    <span
      className={cn(
        "z-10 rounded-full border-2 border-primary bg-light-bg",
        highlight ? "h-4 w-4 bg-primary" : "h-3 w-3"
      )}
    />
  )
}

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [started, setStarted] = useState(false)

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
      { threshold: 0.2 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const active = prefersReducedMotion || started
  const animateTransitions = !prefersReducedMotion

  return (
    <section ref={sectionRef} className="bg-light-bg py-14 text-light-text md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-primary">
            How it works
          </p>
          <h2 className="mt-3 text-light-text">
            From first message to live website in seven days.
          </h2>
        </Reveal>

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-16 hidden md:block">
          <div className="absolute left-0 right-0 top-[15px] h-px bg-light-text/15" />
          <div
            className={cn(
              "absolute left-0 top-[15px] h-px origin-left bg-primary",
              animateTransitions && "transition-transform duration-[800ms] ease-out"
            )}
            style={{ transform: active ? "scaleX(1)" : "scaleX(0)" }}
          />
          <div className="relative grid grid-cols-7 gap-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={cn(
                  "flex flex-col items-center text-center",
                  animateTransitions && "transition-all duration-500 ease-out"
                )}
                style={{
                  transitionDelay: active ? `${i * 100}ms` : "0ms",
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(8px)",
                }}
              >
                <Dot highlight={step.highlight} />
                <div className="mt-4">
                  <DayChip day={step.day} />
                </div>
                <p className="mt-2 text-sm font-semibold text-light-text">
                  {step.title}
                </p>
                <p className="mt-1 text-xs text-light-text/70">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="relative mt-14 md:hidden">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-light-text/15" />
          <div
            className={cn(
              "absolute left-2 top-2 w-px origin-top bg-primary",
              animateTransitions && "transition-transform duration-[800ms] ease-out"
            )}
            style={{ bottom: "8px", transform: active ? "scaleY(1)" : "scaleY(0)" }}
          />
          <div className="relative flex flex-col gap-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={cn(
                  "flex gap-4",
                  animateTransitions && "transition-all duration-500 ease-out"
                )}
                style={{
                  transitionDelay: active ? `${i * 100}ms` : "0ms",
                  opacity: active ? 1 : 0,
                  transform: active ? "translateX(0)" : "translateX(-8px)",
                }}
              >
                <div className="flex w-4 shrink-0 justify-center pt-1">
                  <Dot highlight={step.highlight} />
                </div>
                <div className="pb-1">
                  <DayChip day={step.day} />
                  <p className="mt-2 text-sm font-semibold text-light-text">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-light-text/70">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal delay={2} className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-sm text-light-text/70">
            Timelines assume content arrives on schedule. If your photos take
            two weeks, the build takes two weeks. We will tell you exactly
            what we need up front.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
