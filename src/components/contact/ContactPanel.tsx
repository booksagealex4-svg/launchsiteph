import { Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MessengerIcon } from "@/components/shared/SocialIcons"
import { WhatsAppIcon } from "@/components/contact/WhatsAppIcon"
import {
  BUSINESS_EMAIL,
  BUSINESS_MOBILE_DISPLAY,
  BUSINESS_MOBILE_TEL,
  BUSINESS_MESSENGER_URL,
  BUSINESS_WHATSAPP_URL,
} from "@/lib/site"

const channels = [
  {
    icon: MessengerIcon,
    label: "Message on Messenger",
    href: BUSINESS_MESSENGER_URL,
    external: true,
  },
  {
    icon: WhatsAppIcon,
    label: "Message on WhatsApp",
    href: BUSINESS_WHATSAPP_URL,
    external: true,
  },
  {
    icon: Phone,
    label: BUSINESS_MOBILE_DISPLAY,
    href: `tel:${BUSINESS_MOBILE_TEL}`,
    external: false,
  },
  {
    icon: Mail,
    label: BUSINESS_EMAIL,
    href: `mailto:${BUSINESS_EMAIL}`,
    external: false,
  },
]

export function ContactPanel() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-foreground">Prefer to talk?</h2>
        <div className="mt-6 flex flex-col gap-3">
          {channels.map((channel) => {
            const content = (
              <>
                <channel.icon
                  className="shrink-0 text-primary"
                  size={20}
                  aria-hidden="true"
                />
                <span className="text-sm">{channel.label}</span>
              </>
            )

            return channel.href ? (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="flex min-h-14 items-center gap-3 rounded-[10px] border border-border px-4 py-3 text-foreground transition-colors duration-200 hover:bg-surface-elevated"
              >
                {content}
              </a>
            ) : (
              <div
                key={channel.label}
                className="flex min-h-14 items-center gap-3 rounded-[10px] border border-border px-4 py-3 text-muted-foreground"
              >
                {content}
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-[14px] border border-border bg-surface p-6">
        <p className="text-sm text-muted-foreground">
          Mon&ndash;Sat, 9AM&ndash;6PM PHT
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Cebu City, Philippines &mdash; we work with clients nationwide
        </p>
        <div className="mt-4">
          <Button asChild variant="secondary" className="w-full">
            <a href="#">Book a free 20-minute call</a>
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        No obligation. No sales pressure. If a cheaper package fits, we will
        say so.
      </p>
    </div>
  )
}
