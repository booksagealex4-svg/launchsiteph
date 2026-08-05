import { Reveal } from "@/components/shared/Reveal"

const milestones = [
  {
    year: "2018–2020",
    title: "Visual Artist",
    body: "Far East Noble House Inc. — a foundation in visual design and creative production.",
  },
  {
    year: "2020–2024",
    title: "Advisor & Marketing Officer",
    body: "NDM Marketing Solutions — moved into strategy, brand advising and hands-on marketing.",
  },
  {
    year: "2024–2026",
    title: "Marketing Supervisor",
    body: "What Branding Solutions — led marketing execution and brand campaigns.",
  },
  {
    year: "Present",
    title: "Freelance Marketing, VA & Web Development",
    body: "Helping businesses promote and market themselves online — and launching LaunchSite PH.",
  },
]

export function CareerTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
      <div className="flex flex-col gap-8">
        {milestones.map((milestone, i) => (
          <Reveal key={milestone.year} delay={i} className="flex gap-4">
            <div className="flex w-4 shrink-0 justify-center pt-1">
              <span className="z-10 h-3 w-3 rounded-full border-2 border-primary bg-background" />
            </div>
            <div className="pb-1">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {milestone.year}
              </span>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {milestone.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {milestone.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
