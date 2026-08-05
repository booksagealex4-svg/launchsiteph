import { Stethoscope, type LucideIcon } from "lucide-react"

import meridianHero from "@/assets/templates/meridian-hero.jpg"

export interface TemplatePreviewContent {
  badge: string
  headline: [string, string]
  subtext: string
  primaryCta: string
  secondaryCta: string
  pages: [string, string, string, string, string]
  heroImage: string
  bg: string
  text: string
  accent: string
  icon: LucideIcon
}

// Real photo + real copy previews, keyed by template slug. Templates
// without an entry here fall back to the icon-based SiteMockup — this is
// filled in incrementally, one template at a time.
export const templatePreviewContent: Partial<Record<string, TemplatePreviewContent>> = {
  meridian: {
    badge: "Medical Clinic",
    headline: ["Compassionate care,", "modern medicine."],
    subtext:
      "Experienced physicians and a calm, modern clinic — appointments made simple.",
    primaryCta: "Book Appointment",
    secondaryCta: "Our Services",
    pages: ["Home", "About", "Doctors", "Services", "Contact"],
    heroImage: meridianHero,
    bg: "#F5F9FF",
    text: "#1B2733",
    accent: "#3B82C4",
    icon: Stethoscope,
  },
}
