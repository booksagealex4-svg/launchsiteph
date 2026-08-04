import { Check, Minus } from "lucide-react"

const comparisonRows = [
  { agency: "30-90 days", us: "7-14 days from content handoff" },
  { agency: "PHP 40,000 and up", us: "From PHP 10,000" },
  { agency: "Multiple meetings", us: "One questionnaire, one call" },
  { agency: "Slow revision cycles", us: "AI-assisted revisions in hours" },
  { agency: "Quote on request", us: "Prices published openly" },
  { agency: "Traditional workflow", us: "AI plus human expertise" },
]

export function ComparisonTable() {
  return (
    <div>
      {/* Desktop / tablet: table */}
      <table className="hidden w-full border-separate border-spacing-0 overflow-hidden rounded-[14px] border border-border md:table">
        <thead>
          <tr>
            <th className="border-b border-border bg-surface px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
              Traditional agency
            </th>
            <th className="border-b border-border bg-surface px-6 py-4 text-left text-sm font-semibold text-primary">
              LaunchSite PH
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, i) => (
            <tr key={row.agency}>
              <td
                className={`px-6 py-4 text-sm text-muted-foreground ${i !== comparisonRows.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="flex items-center gap-2.5">
                  <Minus
                    size={16}
                    className="shrink-0 text-muted-foreground/50"
                    aria-hidden="true"
                  />
                  {row.agency}
                </span>
              </td>
              <td
                className={`bg-primary/5 px-6 py-4 text-sm text-foreground ${i !== comparisonRows.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="flex items-center gap-2.5">
                  <Check
                    size={16}
                    className="shrink-0 text-success"
                    aria-hidden="true"
                  />
                  {row.us}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: two stacked labelled blocks */}
      <div className="flex flex-col gap-6 md:hidden">
        <div className="rounded-[14px] border border-border bg-surface p-6">
          <p className="text-sm font-semibold text-muted-foreground">
            Traditional agency
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {comparisonRows.map((row) => (
              <li
                key={row.agency}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                <Minus
                  size={16}
                  className="shrink-0 text-muted-foreground/50"
                  aria-hidden="true"
                />
                {row.agency}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[14px] border border-primary/30 bg-surface p-6">
          <p className="text-sm font-semibold text-primary">LaunchSite PH</p>
          <ul className="mt-4 flex flex-col gap-3">
            {comparisonRows.map((row) => (
              <li
                key={row.us}
                className="flex items-center gap-2.5 text-sm text-foreground"
              >
                <Check
                  size={16}
                  className="shrink-0 text-success"
                  aria-hidden="true"
                />
                {row.us}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
