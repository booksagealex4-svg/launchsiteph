import { Check } from "lucide-react"

const carePlanItems = [
  "Hosting and domain renewal handled",
  "Weekly backups",
  "Security and dependency updates",
  "Uptime monitoring",
  "2 content changes per month",
  "Priority response within 1 business day",
]

export function CarePlanPanel() {
  return (
    <div className="rounded-[14px] border border-border bg-surface p-8 md:p-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-foreground">Care Plan</h3>
        <p className="text-muted-foreground">
          <span className="font-heading text-2xl font-bold text-foreground">
            PHP 1,500
          </span>{" "}
          / month &mdash; optional, offered at handover
        </p>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {carePlanItems.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check
              className="mt-0.5 shrink-0 text-success"
              size={18}
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
