import { Link, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import { Seo } from "@/components/shared/Seo"
import { TemplateGalleryCard } from "@/components/gallery/TemplateGalleryCard"
import type { GalleryTemplate } from "@/components/gallery/data"
import { PaletteSwatches } from "@/components/template-detail/PaletteSwatches"
import { DevicePreviewSwitcher } from "@/components/template-detail/DevicePreviewSwitcher"
import { FeaturesGrid } from "@/components/template-detail/FeaturesGrid"
import { WhatsIncluded } from "@/components/template-detail/WhatsIncluded"
import {
  getTemplateBySlug,
  packagePrices,
  templates,
  type TemplateRecord,
} from "@/data/templates"

function toGalleryTemplate(t: TemplateRecord): GalleryTemplate {
  return {
    slug: t.slug,
    name: t.name,
    category: t.category,
    description: t.tagline,
    bg: t.palette[0],
    accent: t.palette[1],
  }
}

function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 text-center md:px-8">
      <Seo
        title="Template not found | LaunchSite PH"
        description="We couldn't find that template."
        path="/templates"
        noindex
      />
      <h1 className="text-foreground">Template not found</h1>
      <p className="mx-auto mt-4 text-muted-foreground">
        We couldn&apos;t find that template. It may have been renamed or
        retired.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link to="/templates">Back to templates</Link>
        </Button>
      </div>
    </div>
  )
}

export default function TemplateDetail() {
  const { slug } = useParams<{ slug: string }>()
  const template = slug ? getTemplateBySlug(slug) : undefined

  if (!template) {
    return <NotFound />
  }

  const related = templates
    .filter((t) => t.category === template.category && t.slug !== template.slug)
    .slice(0, 3)

  const price = packagePrices[template.recommendedPackage]

  return (
    <div className="py-14 md:py-20">
      <Seo
        title={`${template.name} Template for ${template.industry} | LaunchSite PH`}
        description={`${template.tagline} ${template.description}`}
        path={`/templates/${template.slug}`}
      />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/templates" className="hover:text-foreground">
                Templates
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {template.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs text-muted-foreground">
              {template.industry}
            </span>
            <h1 className="mt-4 text-foreground">{template.name}</h1>
            <p className="mt-3 text-lg font-medium text-foreground">
              {template.tagline}
            </p>
            <p className="mt-3 text-muted-foreground">
              {template.description}
            </p>

            <div className="mt-6">
              <PaletteSwatches palette={template.palette} />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild>
                <Link
                  to={`/contact?template=${encodeURIComponent(template.name)}`}
                >
                  Start with this template
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/templates">See all templates</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <DevicePreviewSwitcher
              palette={template.palette}
              slug={template.slug}
              name={template.name}
            />
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <h2 className="text-foreground">What this template includes</h2>
          <div className="mt-8">
            <FeaturesGrid features={template.features} />
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="text-foreground">Page sections</h2>
          <div className="mt-8 rounded-[14px] border border-border bg-surface p-6 md:p-8">
            <WhatsIncluded sections={template.sections} />
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <div className="flex flex-col gap-4 rounded-[14px] border border-border bg-surface p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <p className="text-foreground">
              Recommended package:{" "}
              <span className="font-semibold text-primary">
                {template.recommendedPackage}
              </span>{" "}
              &mdash; from PHP {price.toLocaleString()} &mdash; delivered in{" "}
              {template.deliveryRange} from content handoff.
            </p>
            <Button asChild variant="secondary" className="shrink-0">
              <Link to="/pricing">See pricing</Link>
            </Button>
          </div>
        </Reveal>

        {related.length > 0 && (
          <Reveal className="mt-16">
            <h2 className="text-foreground">Related templates</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {related.map((t) => (
                <TemplateGalleryCard
                  key={t.slug}
                  template={toGalleryTemplate(t)}
                />
              ))}
            </div>
          </Reveal>
        )}

        <Reveal className="mt-16">
          <div className="rounded-[14px] border border-border bg-surface p-8 text-center md:p-10">
            <h3 className="text-foreground">
              Want this adapted to your brand?
            </h3>
            <div className="mt-6">
              <Button asChild>
                <Link
                  to={`/contact?template=${encodeURIComponent(template.name)}`}
                >
                  Get a Free Quote
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
