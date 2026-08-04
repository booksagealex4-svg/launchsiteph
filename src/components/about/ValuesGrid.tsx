import { Reveal } from "@/components/shared/Reveal"

const values = [
  {
    title: "Transparent by default",
    body: "Published prices, written scope, fixed delivery dates. Nothing is negotiated in the dark.",
  },
  {
    title: "Fast, without being careless",
    body: "AI removes the repetitive work, not the review. Nothing ships that a person has not checked.",
  },
  {
    title: "Built to be handed over",
    body: "You own your domain, your content and your site. No lock-in.",
  },
]

export function ValuesGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
      {values.map((value, i) => (
        <Reveal key={value.title} delay={i}>
          <div className="h-full rounded-[14px] border border-border bg-surface p-6 md:p-8">
            <h3 className="text-foreground">{value.title}</h3>
            <p className="mt-2 text-muted-foreground">{value.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
