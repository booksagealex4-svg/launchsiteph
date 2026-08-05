export const categories = [
  "All",
  "Healthcare",
  "Professional Services",
  "Hospitality",
  "Personal Brand",
] as const

export type Category = (typeof categories)[number]

export interface GalleryTemplate {
  slug: string
  name: string
  category: Exclude<Category, "All">
  description: string
  bg: string
  accent: string
}

export const galleryTemplates: GalleryTemplate[] = [
  {
    slug: "meridian",
    name: "Meridian",
    category: "Healthcare",
    description:
      "Clinical and calm. Credentials, services and clinic hours, front and centre.",
    bg: "#eaf2fb",
    accent: "#3b82c4",
  },
  {
    slug: "enamel",
    name: "Enamel",
    category: "Healthcare",
    description:
      "Bright and reassuring, with a before-and-after gallery and simple booking.",
    bg: "#e7fff5",
    accent: "#ff8f72",
  },
  {
    slug: "verdict",
    name: "Verdict",
    category: "Professional Services",
    description:
      "Authoritative and restrained. Practice areas, attorney profiles, consultation form.",
    bg: "#16213f",
    accent: "#c9a227",
  },
  {
    slug: "ledger",
    name: "Ledger",
    category: "Professional Services",
    description:
      "Clear and credible. Services, qualifications and a consultation request.",
    bg: "#3f4d5a",
    accent: "#7faa8e",
  },
  {
    slug: "plateau",
    name: "Plateau",
    category: "Professional Services",
    description: "Minimal, image-led. Your projects do the talking.",
    bg: "#f3f2ee",
    accent: "#8a8680",
  },
  {
    slug: "ember",
    name: "Ember",
    category: "Hospitality",
    description: "Warm and appetite-driven. Menu, photography, reservations.",
    bg: "#2c1c13",
    accent: "#e9aa4c",
  },
  {
    slug: "tidewater",
    name: "Tidewater",
    category: "Hospitality",
    description: "Calm and spacious. Rooms, amenities, booking inquiry.",
    bg: "#e8dcc4",
    accent: "#0f5359",
  },
  {
    slug: "anthem",
    name: "Anthem",
    category: "Personal Brand",
    description:
      "Bold typography and video. Built for coaches, speakers and consultants.",
    bg: "#121212",
    accent: "#ff3b5c",
  },
]

export const availableOnRequest = [
  "Real Estate",
  "Insurance",
  "Veterinary",
  "Beauty and Derma Clinics",
  "Salons",
  "Gyms and Fitness",
  "Schools",
  "Churches",
  "Construction",
  "Car Dealerships",
  "Photography",
  "Medical Laboratories",
  "Consultants",
  "Event Services",
  "Travel Agencies",
]
