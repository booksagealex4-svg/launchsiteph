import { Link } from "react-router-dom"

import { Logo } from "@/components/shared/Logo"
import { FacebookIcon, MessengerIcon } from "@/components/shared/SocialIcons"
import { BUSINESS_EMAIL, BUSINESS_MOBILE_DISPLAY, BUSINESS_MOBILE_TEL } from "@/lib/site"

const serviceLinks = [
  { to: "/templates", label: "Templates" },
  { to: "/pricing", label: "Pricing" },
  { to: "/process", label: "Process" },
  { to: "/pricing", label: "Care Plans" },
  { to: "/referral", label: "Referral Program" },
]

const companyLinks = [
  { to: "/about", label: "About" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
  { to: "/pricing", label: "FAQ" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-[30ch] text-sm text-muted-foreground">
              Professional websites powered by AI and crafted by humans.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-border text-muted-foreground transition-colors hover:border-primary-glow/30 hover:text-foreground"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="Messenger"
                className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-border text-muted-foreground transition-colors hover:border-primary-glow/30 hover:text-foreground"
              >
                <MessengerIcon />
              </a>
            </div>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold text-foreground">
              Services
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold text-foreground">
              Company
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold text-foreground">
              Get in touch
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="transition-colors hover:text-foreground"
                >
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS_MOBILE_TEL}`}
                  className="transition-colors hover:text-foreground"
                >
                  {BUSINESS_MOBILE_DISPLAY}
                </a>
              </li>
              <li>Cebu City, Philippines</li>
              <li>Mon&ndash;Sat, 9AM&ndash;6PM PHT</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} LaunchSite PH. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link to="/refund-policy" className="transition-colors hover:text-foreground">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
