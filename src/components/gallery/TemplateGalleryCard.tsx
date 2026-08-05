import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import {
  getReadableTextColor,
  templateMockupVariants,
  templateIndustryIcon,
  genericMockupIcon,
} from "@/lib/mockup"
import { SiteMockup } from "@/components/shared/SiteMockup"
import type { GalleryTemplate } from "@/components/gallery/data"

export function TemplateGalleryCard({
  template,
}: {
  template: GalleryTemplate
}) {
  return (
    <Link
      to={`/templates/${template.slug}`}
      className="group block h-full rounded-[14px] border border-border bg-surface p-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-glow/30 hover:bg-surface-elevated"
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
            icon={templateIndustryIcon[template.slug] ?? genericMockupIcon}
          />
        </div>
      </div>
      <div className="mt-4 px-1 pb-1">
        <p className="font-heading font-semibold text-foreground">
          {template.name}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {template.category}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {template.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          View template
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  )
}
