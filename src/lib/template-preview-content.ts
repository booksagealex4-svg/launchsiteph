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

import meridianHero from "@/assets/templates/meridian-hero.jpg"
import verdictHero from "@/assets/templates/verdict-hero.jpg"
import enamelHero from "@/assets/templates/enamel-hero.jpg"
import plateauHero from "@/assets/templates/plateau-hero.jpg"
import emberHero from "@/assets/templates/ember-hero.jpg"
import tidewaterHero from "@/assets/templates/tidewater-hero.jpg"
import ledgerHero from "@/assets/templates/ledger-hero.jpg"
import anthemHero from "@/assets/templates/anthem-hero.jpg"
import sarisariHero from "@/assets/templates/sarisari-hero.jpg"

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
// without an entry here fall back to the icon-based SiteMockup.
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
  verdict: {
    badge: "Law Firm",
    headline: ["Your rights,", "protected."],
    subtext:
      "Experienced attorneys and a clear path forward — consultations start with a conversation.",
    primaryCta: "Free Consultation",
    secondaryCta: "Practice Areas",
    pages: ["Home", "Practice Areas", "Attorneys", "Credentials", "Contact"],
    heroImage: verdictHero,
    bg: "#16213F",
    text: "#F4EFE3",
    accent: "#C9A227",
    icon: Scale,
  },
  enamel: {
    badge: "Dental Clinic",
    headline: ["A brighter smile,", "starts here."],
    subtext:
      "Gentle, modern dentistry for the whole family — booking made easy.",
    primaryCta: "Book Appointment",
    secondaryCta: "Our Services",
    pages: ["Home", "Services", "Gallery", "Dentists", "Contact"],
    heroImage: enamelHero,
    bg: "#F2FFFA",
    text: "#173A33",
    accent: "#FF8F72",
    icon: SmilePlus,
  },
  plateau: {
    badge: "Architecture & Interior Design",
    headline: ["Spaces designed", "with intention."],
    subtext:
      "Full-bleed project photography and case studies — let the work speak first.",
    primaryCta: "View Projects",
    secondaryCta: "Our Studio",
    pages: ["Home", "Projects", "Case Studies", "Studio", "Contact"],
    heroImage: plateauHero,
    bg: "#F3F2EE",
    text: "#2A2A28",
    accent: "#3C3C3C",
    icon: PencilRuler,
  },
  ember: {
    badge: "Restaurant & Cafe",
    headline: ["Good food,", "good mood."],
    subtext:
      "Fresh ingredients and a warm atmosphere — reservations one tap away.",
    primaryCta: "Reserve a Table",
    secondaryCta: "View Menu",
    pages: ["Home", "Menu", "Gallery", "Reservations", "Contact"],
    heroImage: emberHero,
    bg: "#2C1C13",
    text: "#F5EBDD",
    accent: "#E9AA4C",
    icon: ChefHat,
  },
  tidewater: {
    badge: "Resort & Hotel",
    headline: ["Escape, relax,", "enjoy paradise."],
    subtext:
      "Stunning views and unforgettable stays — booking inquiries made simple.",
    primaryCta: "Book Your Stay",
    secondaryCta: "Explore Rooms",
    pages: ["Home", "Rooms", "Amenities", "Gallery", "Contact"],
    heroImage: tidewaterHero,
    bg: "#E8DCC4",
    text: "#20302C",
    accent: "#0F5359",
    icon: Palmtree,
  },
  ledger: {
    badge: "Accounting & Financial Advisory",
    headline: ["Your finances,", "our expertise."],
    subtext:
      "Clear, credible guidance for your business and personal finances.",
    primaryCta: "Free Consultation",
    secondaryCta: "Our Services",
    pages: ["Home", "Services", "Credentials", "FAQ", "Contact"],
    heroImage: ledgerHero,
    bg: "#3F4D5A",
    text: "#F4F6F5",
    accent: "#7FAA8E",
    icon: Calculator,
  },
  anthem: {
    badge: "Coach & Speaker",
    headline: ["Inspire change,", "live your best life."],
    subtext:
      "Coaching, speaking and guidance to help you unlock your potential.",
    primaryCta: "Work With Me",
    secondaryCta: "Watch My Story",
    pages: ["Home", "About", "Speaking", "Testimonials", "Contact"],
    heroImage: anthemHero,
    bg: "#121212",
    text: "#F5F5F5",
    accent: "#FF3B5C",
    icon: Mic,
  },
}

// Sari-sari store / local retail preview — used only in the homepage hero
// carousel, not a purchasable template slug. CTAs stay inquiry-based (no
// "shop now" or cart) to match the no-payment-gateway, inquiries-only
// positioning of the business itself.
const sarisariPreview: TemplatePreviewContent = {
  badge: "Sari-Sari Store",
  headline: ["Tapat na serbisyo,", "for every suki."],
  subtext:
    "A modern site for your sari-sari store or neighborhood shop — friendly, fast and unmistakably local.",
  primaryCta: "Get a Free Quote",
  secondaryCta: "Our Products",
  pages: ["Home", "About Us", "Products", "Services", "Contact Us"],
  heroImage: sarisariHero,
  bg: "#FDF8F0",
  text: "#1B2A4A",
  accent: "#CE1126",
  icon: Store,
}

// Rotation shown in the homepage hero device mockup. Each entry pairs a
// demo business name with real photo + copy content, cycled with a
// crossfade in DeviceMockup.
export const heroShowcaseContent: { name: string; content: TemplatePreviewContent }[] = [
  { name: "Tindahan", content: sarisariPreview },
  { name: "Meridian", content: templatePreviewContent.meridian! },
  { name: "Ember", content: templatePreviewContent.ember! },
  { name: "Anthem", content: templatePreviewContent.anthem! },
]
