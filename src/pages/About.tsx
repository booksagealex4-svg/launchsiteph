import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import { Seo } from "@/components/shared/Seo"
import { ValuesGrid } from "@/components/about/ValuesGrid"
import { ToolsStrip } from "@/components/about/ToolsStrip"
import alexPortrait from "@/assets/alex-portrait.jpg"

export default function About() {
  return (
    <div className="py-14 md:py-20">
      <Seo
        title="About — You're Hiring a Person, Not an Agency | LaunchSite PH"
        description="Meet the person behind LaunchSite PH: 6 years in publishing and creative production, now building AI-assisted websites for Philippine professionals."
        path="/about"
      />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h1 className="mx-auto max-w-3xl text-center text-foreground">
            You Are Hiring a Person, Not an Agency.
          </h1>
        </Reveal>

        <div className="mt-8">
          <Reveal delay={1}>
            <div className="relative mx-auto mb-6 w-full max-w-xs md:float-right md:ml-10 md:w-72">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-[80px]"
              />
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[14px] border border-border bg-surface">
                <img
                  src={alexPortrait}
                  alt="Alex, founder of LaunchSite PH"
                  width={800}
                  height={800}
                  loading="eager"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <p className="mt-4 text-center text-lg font-semibold text-foreground">
                Alex S.
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Web Designer | AI Solutions Specialist | Creative Publishing
                Professional
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p className="text-muted-foreground">
              With over 6 years of experience in the book publishing industry
              and 3 years as a visual artist, I specialize in creating
              professional digital experiences that help authors,
              professionals, and businesses establish a strong online
              presence.
            </p>
            <p className="mt-4 text-muted-foreground">
              Throughout my publishing career, I have worked closely with
              authors from first-time writers to established professionals,
              managing creative production and promotional campaigns. My
              experience includes book cover design, author branding,
              marketing materials, websites, promotional graphics, and
              digital content that support successful book launches and
              long-term author visibility.
            </p>
            <p className="mt-4 text-muted-foreground">
              I specialize in building modern, responsive websites for
              professionals, business owners, medical practitioners,
              authors, and entrepreneurs who want a premium online presence
              without the traditional agency price tag. By combining years
              of creative experience with today&apos;s most advanced
              AI-assisted development tools, I&apos;m able to deliver
              polished, high-quality websites faster and more affordably.
            </p>
            <p className="mt-4 text-muted-foreground">
              My approach is simple: create websites that are clean, modern,
              fast, user-friendly, and designed to build credibility. Every
              project is tailored to reflect the client&apos;s brand while
              focusing on performance, functionality, and long-term value.
            </p>
            <p className="mt-4 text-muted-foreground">
              Whether it&apos;s a professional portfolio, business website,
              author platform, or custom web solution, my goal is to help
              clients stand out through thoughtful design, strategic
              planning, and innovative technology.
            </p>
          </Reveal>

          <div className="clear-both" />
        </div>

        <Reveal className="mt-16 md:mt-20">
          <div className="mx-auto max-w-3xl rounded-[14px] border border-border bg-surface p-8 text-center md:p-10">
            <h2 className="text-foreground">Why solo is a feature</h2>
            <p className="mx-auto mt-3 text-muted-foreground">
              No account manager. No handoffs between departments. You talk
              to the person building your site, from the first message to
              launch day.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 md:mt-20">
          <ValuesGrid />
        </div>

        <Reveal className="mt-16 md:mt-20">
          <ToolsStrip />
        </Reveal>

        <Reveal className="mt-16">
          <div className="rounded-[14px] border border-border bg-surface p-8 text-center md:p-10">
            <h3 className="text-foreground">
              Tell me what you do. I will tell you what it costs.
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
