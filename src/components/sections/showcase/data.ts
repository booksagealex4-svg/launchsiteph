export interface TemplateSlide {
  slug: string
  name: string
  industry: string
  chips: [string, string, string]
  bg: string
  accent: string
}

export const templates: TemplateSlide[] = [
  {
    slug: "meridian",
    name: "Meridian",
    industry: "Medical Clinic",
    chips: ["Appointment request", "Doctor bios", "Clinic hours"],
    bg: "#eaf2fb",
    accent: "#3b82c4",
  },
  {
    slug: "verdict",
    name: "Verdict",
    industry: "Law Firm",
    chips: ["Practice areas", "Attorney profiles", "Consultation form"],
    bg: "#16213f",
    accent: "#c9a227",
  },
  {
    slug: "enamel",
    name: "Enamel",
    industry: "Dental Clinic",
    chips: ["Services grid", "Before/after gallery", "Booking"],
    bg: "#e7fff5",
    accent: "#ff8f72",
  },
  {
    slug: "plateau",
    name: "Plateau",
    industry: "Architecture",
    chips: ["Project gallery", "Case studies", "Full-bleed imagery"],
    bg: "#f3f2ee",
    accent: "#8a8680",
  },
  {
    slug: "ember",
    name: "Ember",
    industry: "Restaurant / Cafe",
    chips: ["Menu", "Reservations", "Photo gallery"],
    bg: "#2c1c13",
    accent: "#e9aa4c",
  },
  {
    slug: "tidewater",
    name: "Tidewater",
    industry: "Resort / Hotel",
    chips: ["Room showcase", "Amenities", "Booking inquiry"],
    bg: "#e8dcc4",
    accent: "#0f5359",
  },
  {
    slug: "ledger",
    name: "Ledger",
    industry: "Accounting / Financial",
    chips: ["Services", "Credentials", "Consultation"],
    bg: "#3f4d5a",
    accent: "#7faa8e",
  },
  {
    slug: "anthem",
    name: "Anthem",
    industry: "Coach / Speaker",
    chips: ["Big typography", "Video embed", "Testimonials"],
    bg: "#121212",
    accent: "#ff3b5c",
  },
]
