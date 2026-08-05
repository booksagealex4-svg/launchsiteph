import { Link } from "react-router-dom"

import { getReadableTextColor, templateMockupVariants } from "@/lib/mockup"
import { SiteMockup } from "@/components/shared/SiteMockup"
import type { TemplateSlide } from "@/components/sections/showcase/data"

export function TemplateCard({ template }: { template: TemplateSlide }) {
  return (
    <Link
      to={`/templates/${template.slug}`}
      className="group block rounded-[14px] border border-border bg-surface p-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-glow/30 hover:bg-surface-elevated"
    >
      <div className="overflow-hidden rounded-[10px] border border-border bg-background">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
        </div>
        <div className="aspect-[4/3]">
          <SiteMockup
            background={template.bg}
            accent={template.accent}
            text={getReadableTextColor(template.bg)}
            variant={templateMockupVariants[template.slug] ?? "cards"}
          />
        </div>
      </div>
      <div className="mt-4 px-1">
        <p className="font-heading font-semibold text-foreground">
          {template.name}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {template.industry}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {template.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-xs text-muted-foreground"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
