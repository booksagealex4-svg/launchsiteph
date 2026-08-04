export interface TemplateSlide {
  slug: string
  name: string
  industry: string
  chips: [string, string, string]
  gradient: string
}

export const templates: TemplateSlide[] = [
  {
    slug: "meridian",
    name: "Meridian",
    industry: "Medical Clinic",
    chips: ["Appointment request", "Doctor bios", "Clinic hours"],
    gradient: "linear-gradient(135deg, #eaf2fb, #b9d4ef)",
  },
  {
    slug: "verdict",
    name: "Verdict",
    industry: "Law Firm",
    chips: ["Practice areas", "Attorney profiles", "Consultation form"],
    gradient: "linear-gradient(135deg, #16213f, #c9a227)",
  },
  {
    slug: "enamel",
    name: "Enamel",
    industry: "Dental Clinic",
    chips: ["Services grid", "Before/after gallery", "Booking"],
    gradient: "linear-gradient(135deg, #e7fff5, #ff8f72)",
  },
  {
    slug: "plateau",
    name: "Plateau",
    industry: "Architecture",
    chips: ["Project gallery", "Case studies", "Full-bleed imagery"],
    gradient: "linear-gradient(135deg, #f3f2ee, #3c3c3c)",
  },
  {
    slug: "ember",
    name: "Ember",
    industry: "Restaurant / Cafe",
    chips: ["Menu", "Reservations", "Photo gallery"],
    gradient: "linear-gradient(135deg, #2c1c13, #e9aa4c)",
  },
  {
    slug: "tidewater",
    name: "Tidewater",
    industry: "Resort / Hotel",
    chips: ["Room showcase", "Amenities", "Booking inquiry"],
    gradient: "linear-gradient(135deg, #e8dcc4, #0f5359)",
  },
  {
    slug: "ledger",
    name: "Ledger",
    industry: "Accounting / Financial",
    chips: ["Services", "Credentials", "Consultation"],
    gradient: "linear-gradient(135deg, #3f4d5a, #7faa8e)",
  },
  {
    slug: "anthem",
    name: "Anthem",
    industry: "Coach / Speaker",
    chips: ["Big typography", "Video embed", "Testimonials"],
    gradient: "linear-gradient(135deg, #121212, #ff3b5c)",
  },
]
