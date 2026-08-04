import { Check } from "lucide-react"

export function WhatsIncluded({ sections }: { sections: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
      {sections.map((section) => (
        <div key={section} className="flex items-center gap-2.5">
          <Check
            className="shrink-0 text-success"
            size={18}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="text-sm text-foreground">{section}</span>
        </div>
      ))}
    </div>
  )
}
