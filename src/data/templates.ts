import type { Category } from "@/components/gallery/data"

export interface TemplateRecord {
  slug: string
  name: string
  industry: string
  category: Exclude<Category, "All">
  tagline: string
  description: string
  palette: [string, string, string]
  features: [string, string, string, string, string, string]
  sections: string[]
  recommendedPackage: "Launch" | "Momentum" | "Authority"
  deliveryRange: string
}

export const packagePrices: Record<TemplateRecord["recommendedPackage"], number> = {
  Launch: 10000,
  Momentum: 15000,
  Authority: 20000,
}

export const templates: TemplateRecord[] = [
  {
    slug: "meridian",
    name: "Meridian",
    industry: "Medical Clinic",
    category: "Healthcare",
    tagline: "Clinical and calm.",
    description:
      "A calm, credibility-first design for clinics and doctors. Credentials, services and clinic hours sit front and centre, with an appointment request that stays informational rather than promotional.",
    palette: ["#F5F9FF", "#3B82C4", "#E2E8F0"],
    features: [
      "Appointment request form",
      "Doctor bios and credentials",
      "Insurance and accreditation list",
      "Clinic hours and location map",
      "Services and specialties grid",
      "Mobile-first, fast on data",
    ],
    sections: [
      "Hero",
      "About the Clinic",
      "Doctor Bios",
      "Services",
      "Insurance & Accreditation",
      "Clinic Hours & Map",
      "Appointment Request",
      "Contact",
    ],
    recommendedPackage: "Momentum",
    deliveryRange: "7-10 days",
  },
  {
    slug: "verdict",
    name: "Verdict",
    industry: "Law Firm",
    category: "Professional Services",
    tagline: "Authoritative and restrained.",
    description:
      "Deep navy and warm gold signal trust without self-promotion, keeping copy focused on practice areas and credentials rather than client acquisition claims.",
    palette: ["#16213F", "#C9A227", "#F4EFE3"],
    features: [
      "Practice area breakdown",
      "Attorney profiles and credentials",
      "Consultation request form",
      "Bar admissions and affiliations",
      "Office hours and location",
      "Confidential contact channel",
    ],
    sections: [
      "Hero",
      "Practice Areas",
      "Attorney Profiles",
      "Credentials",
      "Consultation Form",
      "Office Location",
      "Contact",
    ],
    recommendedPackage: "Authority",
    deliveryRange: "10-14 days",
  },
  {
    slug: "enamel",
    name: "Enamel",
    industry: "Dental Clinic",
    category: "Healthcare",
    tagline: "Bright and reassuring.",
    description:
      "Mint and coral keep the tone approachable, with a before-and-after gallery and simple booking that make it easy to say yes.",
    palette: ["#F2FFFA", "#7FE3C4", "#FF8F72"],
    features: [
      "Services grid",
      "Before/after gallery",
      "Simple booking form",
      "Dentist bios",
      "Insurance accepted list",
      "Clinic hours and map",
    ],
    sections: [
      "Hero",
      "Services",
      "Before & After Gallery",
      "Dentist Bios",
      "Booking",
      "Insurance",
      "Contact",
    ],
    recommendedPackage: "Launch",
    deliveryRange: "5-7 days",
  },
  {
    slug: "plateau",
    name: "Plateau",
    industry: "Architecture / Interior Design",
    category: "Professional Services",
    tagline: "Minimal, image-led.",
    description:
      "Off-white and charcoal with thin rules let full-bleed project photography do the talking, organised into case studies rather than a portfolio grid.",
    palette: ["#F3F2EE", "#3C3C3C", "#B8B4AC"],
    features: [
      "Full-bleed project gallery",
      "Case studies with narrative",
      "Studio philosophy section",
      "Services breakdown",
      "Press and recognition",
      "Consultation request",
    ],
    sections: [
      "Hero",
      "Project Gallery",
      "Case Studies",
      "Studio",
      "Services",
      "Contact",
    ],
    recommendedPackage: "Authority",
    deliveryRange: "10-14 days",
  },
  {
    slug: "ember",
    name: "Ember",
    industry: "Restaurant / Cafe",
    category: "Hospitality",
    tagline: "Warm and appetite-driven.",
    description:
      "Warm dark tones and amber accents put food photography and the menu front and centre, with reservations one tap away.",
    palette: ["#2C1C13", "#E9AA4C", "#F5EBDD"],
    features: [
      "Menu with categories",
      "Reservation request",
      "Food photography gallery",
      "Hours and location",
      "Events and specials",
      "Click-to-call and Messenger",
    ],
    sections: [
      "Hero",
      "Menu",
      "Gallery",
      "Reservations",
      "Hours & Location",
      "Contact",
    ],
    recommendedPackage: "Momentum",
    deliveryRange: "7-10 days",
  },
  {
    slug: "tidewater",
    name: "Tidewater",
    industry: "Resort / Hotel",
    category: "Hospitality",
    tagline: "Calm and spacious.",
    description:
      "Sand and deep teal create a relaxed, spacious feel, with room showcases and amenities leading to a straightforward booking inquiry.",
    palette: ["#E8DCC4", "#0F5359", "#FBF9F3"],
    features: [
      "Room showcase",
      "Amenities overview",
      "Booking inquiry form",
      "Photo gallery",
      "Location and directions",
      "Guest reviews",
    ],
    sections: [
      "Hero",
      "Rooms",
      "Amenities",
      "Gallery",
      "Booking Inquiry",
      "Location",
      "Contact",
    ],
    recommendedPackage: "Authority",
    deliveryRange: "10-14 days",
  },
  {
    slug: "ledger",
    name: "Ledger",
    industry: "Accounting / Financial Advisory",
    category: "Professional Services",
    tagline: "Clear and credible.",
    description:
      "Slate and muted green keep the tone measured, pairing a services breakdown with credentials and a straightforward consultation request.",
    palette: ["#3F4D5A", "#7FAA8E", "#F4F6F5"],
    features: [
      "Services breakdown",
      "Credentials and certifications",
      "Consultation request form",
      "Fee transparency section",
      "FAQ section",
      "Office hours and location",
    ],
    sections: [
      "Hero",
      "Services",
      "Credentials",
      "Consultation Form",
      "FAQ",
      "Contact",
    ],
    recommendedPackage: "Momentum",
    deliveryRange: "7-10 days",
  },
  {
    slug: "anthem",
    name: "Anthem",
    industry: "Coach / Speaker / Personal Brand",
    category: "Personal Brand",
    tagline: "Bold typography and video.",
    description:
      "A single bold accent against dark backgrounds, built for big statements: video embeds, testimonials and one clear booking call to action.",
    palette: ["#121212", "#FF3B5C", "#F5F5F5"],
    features: [
      "Big bold typography",
      "Video embed",
      "Testimonials carousel",
      "Speaking topics and offers",
      "Booking call to action",
      "Newsletter signup",
    ],
    sections: [
      "Hero",
      "About",
      "Video",
      "Testimonials",
      "Offers",
      "Booking",
      "Contact",
    ],
    recommendedPackage: "Launch",
    deliveryRange: "5-7 days",
  },
]

export function getTemplateBySlug(slug: string) {
  return templates.find((t) => t.slug === slug)
}
