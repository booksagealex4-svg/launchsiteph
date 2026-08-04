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
  gradient: string
}

export const galleryTemplates: GalleryTemplate[] = [
  {
    slug: "meridian",
    name: "Meridian",
    category: "Healthcare",
    description:
      "Clinical and calm. Credentials, services and clinic hours, front and centre.",
    gradient: "linear-gradient(135deg, #eaf2fb, #b9d4ef)",
  },
  {
    slug: "enamel",
    name: "Enamel",
    category: "Healthcare",
    description:
      "Bright and reassuring, with a before-and-after gallery and simple booking.",
    gradient: "linear-gradient(135deg, #e7fff5, #ff8f72)",
  },
  {
    slug: "verdict",
    name: "Verdict",
    category: "Professional Services",
    description:
      "Authoritative and restrained. Practice areas, attorney profiles, consultation form.",
    gradient: "linear-gradient(135deg, #16213f, #c9a227)",
  },
  {
    slug: "ledger",
    name: "Ledger",
    category: "Professional Services",
    description:
      "Clear and credible. Services, qualifications and a consultation request.",
    gradient: "linear-gradient(135deg, #3f4d5a, #7faa8e)",
  },
  {
    slug: "plateau",
    name: "Plateau",
    category: "Professional Services",
    description: "Minimal, image-led. Your projects do the talking.",
    gradient: "linear-gradient(135deg, #f3f2ee, #3c3c3c)",
  },
  {
    slug: "ember",
    name: "Ember",
    category: "Hospitality",
    description: "Warm and appetite-driven. Menu, photography, reservations.",
    gradient: "linear-gradient(135deg, #2c1c13, #e9aa4c)",
  },
  {
    slug: "tidewater",
    name: "Tidewater",
    category: "Hospitality",
    description: "Calm and spacious. Rooms, amenities, booking inquiry.",
    gradient: "linear-gradient(135deg, #e8dcc4, #0f5359)",
  },
  {
    slug: "anthem",
    name: "Anthem",
    category: "Personal Brand",
    description:
      "Bold typography and video. Built for coaches, speakers and consultants.",
    gradient: "linear-gradient(135deg, #121212, #ff3b5c)",
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
