import { Check } from "lucide-react"

export function FeaturesGrid({ features }: { features: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature}
          className="flex items-center gap-3 rounded-[14px] border border-border bg-surface p-4"
        >
          <Check
            className="shrink-0 text-primary-glow"
            size={20}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="text-sm text-foreground">{feature}</span>
        </div>
      ))}
    </div>
  )
}
