import {
  Stethoscope,
  Scale,
  SmilePlus,
  PencilRuler,
  ChefHat,
  Palmtree,
  Calculator,
  Mic,
  Store,
  type LucideIcon,
} from "lucide-react"

import type { MockupVariant } from "@/components/shared/SiteMockup"

// A subject-matter icon per template, standing in for real photography in
// the hero photo panel and content cards — enough to read as "a real
// clinic" or "a real restaurant" rather than an abstract colored shape.
export const templateIndustryIcon: Record<string, LucideIcon> = {
  meridian: Stethoscope,
  verdict: Scale,
  enamel: SmilePlus,
  plateau: PencilRuler,
  ember: ChefHat,
  tidewater: Palmtree,
  ledger: Calculator,
  anthem: Mic,
}

// Used by the homepage hero device mockup, which isn't tied to any one
// template — a generic "real business online" mark.
export const genericMockupIcon: LucideIcon = Store

export function getReadableTextColor(bgHex: string): string {
  const hex = bgHex.replace("#", "")
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? "#1a1f26" : "#f2f4f7"
}

// Content-section style per template, matching each template's signature
// feature (industries-and-templates.md).
export const templateMockupVariants: Record<string, MockupVariant> = {
  meridian: "cards", // appointment request, doctor bios, insurance list
  verdict: "cards", // practice areas, attorney profiles, consultation form
  enamel: "gallery", // services grid, before/after gallery, booking
  plateau: "gallery", // full-bleed project gallery, case studies
  ember: "list", // menu, food photography, reservations
  tidewater: "gallery", // room showcase, amenities, booking inquiry
  ledger: "cards", // services, credentials, calculator
  anthem: "video", // big typography, video embed, testimonials
}
