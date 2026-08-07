import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import { Seo } from "@/components/shared/Seo"
import { TemplateGallery } from "@/components/gallery/TemplateGallery"
import { AvailableOnRequest } from "@/components/gallery/AvailableOnRequest"

export default function Templates() {
  return (
    <div className="py-14 md:py-20">
      <Seo
        title="Website Templates for Philippine Businesses | LaunchSite PH"
        description="Eight flagship website templates for clinics, law firms, restaurants, hotels and more — each adapted to your branding, content and industry."
        path="/templates"
      />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h1 className="text-foreground">
            Templates Built Around How Your Industry Sells.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Eight flagship designs, each adapted to your branding, content
            and services. Do not see your industry? We adapt the closest
            one.
          </p>
        </Reveal>

        <div className="mt-12">
          <TemplateGallery />
        </div>

        <Reveal className="mt-16">
          <AvailableOnRequest />
        </Reveal>

        <Reveal className="mt-8">
          <div className="rounded-[14px] border border-border bg-surface p-8 text-center md:p-10">
            <h3 className="text-foreground">
              Not sure which fits? Tell us what you do and we will recommend
              one.
            </h3>
            <div className="mt-6">
              <Button asChild>
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
