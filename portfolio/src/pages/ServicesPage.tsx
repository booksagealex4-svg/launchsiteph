import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  Coffee,
  UtensilsCrossed,
  Cookie,
  Scissors,
  Building2,
  Stethoscope,
  Car,
  ShoppingBag,
  Briefcase,
  LayoutDashboard,
  Users,
  CalendarCheck,
  Package,
  IdCard,
  Settings,
  ListChecks,
  KeyRound,
  BookUser,
  TrendingUp,
  FolderOpen,
  Sliders,
  Smartphone,
  Zap,
  Share2,
  Puzzle,
  Globe,
  Rocket,
  FileText,
  ArrowUpRight,
  Send,
  Code2,
  Expand,
  X,
  Mail,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { CategorySelector, type SelectorCategory } from '@/components/CategorySelector'
import { MockupCarousel, type MockupSlide } from '@/components/projects/MockupCarousel'
import { cn } from '@/lib/utils'

function buildSlides(
  kind: MockupSlide['kind'],
  prefix: string,
  accent: string,
  count: number,
  caption?: { title: string; type: string; description: string },
): MockupSlide[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    kind,
    variant: (((i % 4) + 1) as 1 | 2 | 3 | 4),
    accent,
    label: `${prefix} preview ${i + 1}`,
    ...caption,
  }))
}

const blueMint = ['#1F6FEB', '#1f9d7c', '#2563eb', '#0ea5e9', '#4f46e5', '#14b8a6']

/** Real, generated concept-mockup assets — see portfolio/public/mockups/services/. These are
 *  illustrative sample concepts, not completed client projects; every caption that uses one
 *  says "Concept Mockup" explicitly (see MockupCarousel). */
const mockupImage = {
  authorNathanVega: '/mockups/services/author-nathan-vega.png',
  authorDanielHarper: '/mockups/services/author-daniel-harper.png',
  cafeAuroraCafe: '/mockups/services/cafe-aurora-cafe.png',
  cafeNoirRoast: '/mockups/services/cafe-noir-roast.png',
  restaurantSavoryTable: '/mockups/services/restaurant-savory-table.png',
  restaurantEmberFork: '/mockups/services/restaurant-ember-fork.png',
  bakeryHearthCrumb: '/mockups/services/bakery-hearth-crumb.png',
  bakeryGoldenCrumb: '/mockups/services/bakery-golden-crumb.png',
  barberNorthline: '/mockups/services/barber-northline.png',
  barberCutCollective: '/mockups/services/barber-cut-collective.png',
  realEstateCrestpoint: '/mockups/services/real-estate-crestpoint.png',
  realEstateHorizonHomes: '/mockups/services/real-estate-horizon-homes.png',
  medicalHarborClinic: '/mockups/services/medical-harbor-clinic.png',
  medicalRiverside: '/mockups/services/doctor-riverside-medical.png',
  automotiveApexAuto: '/mockups/services/automotive-apex-auto.png',
  automotiveDrivecraftAuto: '/mockups/services/automotive-drivecraft-auto.png',
  ecommerceMaisoncart: '/mockups/services/ecommerce-maisoncart.png',
  onlineShopNovaMarket: '/mockups/services/online-shop-nova-market.png',
  crmFlowdesk: '/mockups/services/crm-flowdesk.png',
  bookingSchedulesync: '/mockups/services/booking-schedulesync.png',
  clientPortalProjectflow: '/mockups/services/client-portal-projectflow.png',
  personalTrackerDailypath: '/mockups/services/personal-tracker-dailypath.png',
  automationAutobridge: '/mockups/services/automation-autobridge.png',
  socialSociallift: '/mockups/services/social-sociallift.png',
  customTailoredSystems: '/mockups/services/custom-tailored-systems.png',
} as const

interface ConceptImage {
  src: string
  alt: string
  previewTitle: string
  previewType: string
}

interface ShowcaseCategory extends SelectorCategory {
  slides: MockupSlide[]
}

/** Categories with a real `image` get a single real concept-mockup slide (visible immediately,
 *  no extra clicks); a category with `images` instead gets one real slide per entry (used for
 *  Authors, which carries two concept sites); categories without either keep the existing
 *  abstract filler slides unchanged. */
function withSlides(
  kind: MockupSlide['kind'],
  sectionType: string,
  items: { id: string; label: string; icon: LucideIcon; description: string; image?: ConceptImage; images?: ConceptImage[] }[],
  count: number,
): ShowcaseCategory[] {
  return items.map(({ id, label, icon, description, image, images }, i) => ({
    id,
    label,
    icon,
    slides: images
      ? images.map((img, si) => ({
          id: `${id}-concept-${si}`,
          kind,
          variant: ((si % 4) + 1) as 1 | 2 | 3 | 4,
          accent: blueMint[i % blueMint.length],
          label: `${label} concept preview ${si + 1}`,
          title: img.previewTitle,
          type: img.previewType,
          description,
          image: img.src,
          imageAlt: img.alt,
        }))
      : image
        ? [
            {
              id: `${id}-concept`,
              kind,
              variant: 1,
              accent: blueMint[i % blueMint.length],
              label: `${label} concept preview`,
              title: image.previewTitle,
              type: image.previewType,
              description,
              image: image.src,
              imageAlt: image.alt,
            },
          ]
        : buildSlides(kind, label, blueMint[i % blueMint.length], count, { title: label, type: sectionType, description }),
  }))
}

const websiteCategories = withSlides(
  'website',
  'Website',
  [
    {
      id: 'authors',
      label: 'Authors',
      icon: BookOpen,
      description: 'Professional author websites for books, biography, media, events, and reader information.',
      images: [
        {
          src: mockupImage.authorNathanVega,
          alt: 'Concept mockup for a fiction author website',
          previewTitle: 'Fiction Author Website Concept',
          previewType: 'Author / Books / Personal Brand',
        },
        {
          src: mockupImage.authorDanielHarper,
          alt: 'Concept mockup for a non-fiction author website',
          previewTitle: 'Non-Fiction Author Website Concept',
          previewType: 'Author / Books / Personal Brand',
        },
      ],
    },
    {
      id: 'cafes',
      label: 'Cafes',
      icon: Coffee,
      description: 'Clean, inviting websites for menus, location details, opening hours, and customer information.',
      images: [
        {
          src: mockupImage.cafeAuroraCafe,
          alt: 'Concept mockup for a warm, bakery-style café website',
          previewTitle: 'Café Website Concept — Warm & Inviting',
          previewType: 'Café / Menu / Reservations',
        },
        {
          src: mockupImage.cafeNoirRoast,
          alt: 'Concept mockup for a dark, specialty-coffee café website',
          previewTitle: 'Café Website Concept — Bold & Modern',
          previewType: 'Café / Menu / Reservations',
        },
      ],
    },
    {
      id: 'restaurants',
      label: 'Restaurants',
      icon: UtensilsCrossed,
      description: 'Professional restaurant sites for menus, reservations, contact details, and location information.',
      images: [
        {
          src: mockupImage.restaurantSavoryTable,
          alt: 'Concept mockup for a casual dining restaurant website',
          previewTitle: 'Restaurant Website Concept — Casual Dining',
          previewType: 'Restaurant / Menu / Reservations',
        },
        {
          src: mockupImage.restaurantEmberFork,
          alt: 'Concept mockup for an upscale restaurant website',
          previewTitle: 'Restaurant Website Concept — Fine Dining',
          previewType: 'Restaurant / Menu / Reservations',
        },
      ],
    },
    {
      id: 'bakeries',
      label: 'Bakeries',
      icon: Cookie,
      description: 'Warm, polished websites for products, custom orders, location details, and inquiries.',
      images: [
        {
          src: mockupImage.bakeryHearthCrumb,
          alt: 'Concept mockup for a bakery website',
          previewTitle: 'Bakery Website Concept',
          previewType: 'Bakery / Products / Ordering',
        },
        {
          src: mockupImage.bakeryGoldenCrumb,
          alt: 'Concept mockup for an artisan bakery website',
          previewTitle: 'Bakery Website Concept — Artisan Bakery',
          previewType: 'Bakery / Menu / Online Ordering',
        },
      ],
    },
    {
      id: 'barber-shops',
      label: 'Barber Shops',
      icon: Scissors,
      description: 'Modern service websites for pricing, booking information, services, and contact details.',
      images: [
        {
          src: mockupImage.barberNorthline,
          alt: 'Concept mockup for a barber shop website',
          previewTitle: 'Barber Shop Website Concept',
          previewType: 'Barber / Services / Booking',
        },
        {
          src: mockupImage.barberCutCollective,
          alt: 'Concept mockup for a premium barbershop website',
          previewTitle: 'Barbershop Website Concept — Premium Grooming',
          previewType: 'Services / Appointments / Grooming',
        },
      ],
    },
    {
      id: 'real-estate',
      label: 'Real Estate',
      icon: Building2,
      description: 'Professional property-focused websites for listings, agent information, inquiries, and contact details.',
      images: [
        {
          src: mockupImage.realEstateCrestpoint,
          alt: 'Concept mockup for a real estate website',
          previewTitle: 'Real Estate Website Concept',
          previewType: 'Real Estate / Listings / Agents',
        },
        {
          src: mockupImage.realEstateHorizonHomes,
          alt: 'Concept mockup for a luxury real estate website',
          previewTitle: 'Real Estate Website Concept — Luxury Homes',
          previewType: 'Properties / Listings / Consultation',
        },
      ],
    },
    {
      id: 'doctors',
      label: 'Doctors',
      icon: Stethoscope,
      description: 'Clear, professional informational websites for services, clinic details, appointments, and patient guidance.',
      images: [
        {
          src: mockupImage.medicalHarborClinic,
          alt: 'Concept mockup for a medical clinic website',
          previewTitle: 'Medical Website Concept',
          previewType: 'Clinic / Services / Appointments',
        },
        {
          src: mockupImage.medicalRiverside,
          alt: 'Concept mockup for a medical care website',
          previewTitle: 'Medical Website Concept — Patient Care',
          previewType: 'Healthcare / Services / Appointments',
        },
      ],
    },
    {
      id: 'automotive',
      label: 'Automotive',
      icon: Car,
      description: 'Professional automotive websites for services, inventory or offerings, business information, and inquiries.',
      images: [
        {
          src: mockupImage.automotiveApexAuto,
          alt: 'Concept mockup for an automotive service website',
          previewTitle: 'Automotive Website Concept',
          previewType: 'Auto Care / Services / Scheduling',
        },
        {
          src: mockupImage.automotiveDrivecraftAuto,
          alt: 'Concept mockup for a premium automotive dealership website',
          previewTitle: 'Automotive Website Concept — Premium Dealership',
          previewType: 'Inventory / Services / Test Drives',
        },
      ],
    },
    {
      id: 'online-shops',
      label: 'Online Shops',
      icon: ShoppingBag,
      description: 'Product-focused websites designed to make browsing, product information, and customer actions clear.',
      images: [
        {
          src: mockupImage.ecommerceMaisoncart,
          alt: 'Concept mockup for an online shop website',
          previewTitle: 'Online Shop Concept',
          previewType: 'E-Commerce / Products / Shopping',
        },
        {
          src: mockupImage.onlineShopNovaMarket,
          alt: 'Concept mockup for a lifestyle online store website',
          previewTitle: 'Online Shop Website Concept — Lifestyle Store',
          previewType: 'E-Commerce / Products / Shopping',
        },
      ],
    },
    {
      id: 'other-business',
      label: 'Other Business',
      icon: Briefcase,
      description: 'Custom websites designed around the specific needs, audience, and goals of your business.',
      images: [
        {
          src: mockupImage.cafeAuroraCafe,
          alt: 'Concept mockup for a café business website',
          previewTitle: 'Café Business Website Concept',
          previewType: 'Café / Menu / Reservations',
        },
        {
          src: mockupImage.restaurantEmberFork,
          alt: 'Concept mockup for a restaurant business website',
          previewTitle: 'Restaurant Business Website Concept',
          previewType: 'Restaurant / Menu / Reservations',
        },
        {
          src: mockupImage.bakeryGoldenCrumb,
          alt: 'Concept mockup for a bakery business website',
          previewTitle: 'Bakery Business Website Concept',
          previewType: 'Bakery / Products / Ordering',
        },
        {
          src: mockupImage.barberCutCollective,
          alt: 'Concept mockup for a barbershop business website',
          previewTitle: 'Barbershop Business Website Concept',
          previewType: 'Barbershop / Services / Appointments',
        },
        {
          src: mockupImage.realEstateHorizonHomes,
          alt: 'Concept mockup for a real estate business website',
          previewTitle: 'Real Estate Business Website Concept',
          previewType: 'Properties / Listings / Consultation',
        },
        {
          src: mockupImage.onlineShopNovaMarket,
          alt: 'Concept mockup for an online shop business website',
          previewTitle: 'Online Shop Business Website Concept',
          previewType: 'E-Commerce / Products / Shopping',
        },
      ],
    },
  ],
  7,
)

const webAppCategories = withSlides(
  'dashboard',
  'Web App',
  [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'A clear workspace for viewing important information, updates, tasks, and activity in one place.',
      image: {
        src: mockupImage.crmFlowdesk,
        alt: 'Concept mockup for a business dashboard',
        previewTitle: 'Business Dashboard Concept',
        previewType: 'Dashboard / Analytics / Workflow',
      },
    },
    {
      id: 'client-management',
      label: 'Client Management',
      icon: Users,
      description: 'A practical system for organizing client details, projects, communication, and progress.',
      image: {
        src: mockupImage.crmFlowdesk,
        alt: 'Concept mockup for a CRM dashboard',
        previewTitle: 'CRM Platform Concept',
        previewType: 'CRM / Leads / Client Management',
      },
    },
    {
      id: 'booking-system',
      label: 'Booking System',
      icon: CalendarCheck,
      description: 'A structured booking experience for appointments, schedules, availability, and customer requests.',
      image: {
        src: mockupImage.bookingSchedulesync,
        alt: 'Concept mockup for a booking system',
        previewTitle: 'Booking System Concept',
        previewType: 'Scheduling / Appointments / Clients',
      },
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: Package,
      description: 'A simple way to organize products, stock information, availability, and updates.',
    },
    {
      id: 'member-portal',
      label: 'Member Portal',
      icon: IdCard,
      description: 'A private online space where members can access information, files, updates, and account features.',
      image: {
        src: mockupImage.clientPortalProjectflow,
        alt: 'Concept mockup for a member portal',
        previewTitle: 'Member Portal Concept',
        previewType: 'Portal / Files / Communication',
      },
    },
    {
      id: 'admin-panel',
      label: 'Admin Panel',
      icon: Settings,
      description: 'A centralized workspace for managing content, users, records, and important site operations.',
      image: {
        src: mockupImage.crmFlowdesk,
        alt: 'Concept mockup for an admin dashboard',
        previewTitle: 'Admin Dashboard Concept',
        previewType: 'Admin / Analytics / Management',
      },
    },
  ],
  6,
)

const trackerCategories = withSlides(
  'dashboard',
  'Client Workspace',
  [
    {
      id: 'project-tracker',
      label: 'Project Tracker',
      icon: ListChecks,
      description: 'A simple workspace for following project stages, updates, tasks, and progress.',
      image: {
        src: mockupImage.clientPortalProjectflow,
        alt: 'Concept mockup for a project tracker',
        previewTitle: 'Project Tracker Concept',
        previewType: 'Progress / Tasks / Updates',
      },
    },
    {
      id: 'client-portal',
      label: 'Client Portal',
      icon: KeyRound,
      description: 'A private client area for project updates, messages, files, reviews, and important information.',
      image: {
        src: mockupImage.clientPortalProjectflow,
        alt: 'Concept mockup for a client portal',
        previewTitle: 'Client Portal Concept',
        previewType: 'Messages / Files / Reviews / Payments',
      },
    },
    {
      id: 'author-portal',
      label: 'Author Portal',
      icon: BookUser,
      description: 'A dedicated workspace for authors to follow publishing-related projects, files, updates, and communication.',
    },
    {
      id: 'progress-dashboard',
      label: 'Progress Dashboard',
      icon: TrendingUp,
      description: 'A clear visual overview of project status, milestones, updates, and next steps.',
      image: {
        src: mockupImage.clientPortalProjectflow,
        alt: 'Concept mockup for a progress dashboard',
        previewTitle: 'Progress Dashboard Concept',
        previewType: 'Milestones / Progress / Updates',
      },
    },
    {
      id: 'file-workspace',
      label: 'File Workspace',
      icon: FolderOpen,
      description: 'An organized area for accessing, reviewing, and sharing project-related files.',
      image: {
        src: mockupImage.clientPortalProjectflow,
        alt: 'Concept mockup for a file workspace',
        previewTitle: 'File Workspace Concept',
        previewType: 'Files / Reviews / Collaboration',
      },
    },
    {
      id: 'custom-tracker',
      label: 'Custom Tracker',
      icon: Sliders,
      description: 'A tailored tracking workspace designed around the specific workflow or information you need.',
    },
  ],
  6,
)

interface MoreService {
  name: string
  descriptor: string
  icon: LucideIcon
  image?: ConceptImage
}

const moreServices: MoreService[] = [
  {
    name: 'Mobile App Creation',
    descriptor: 'Simple mobile-focused solutions designed around a specific workflow, service, or user need.',
    icon: Smartphone,
    image: {
      src: mockupImage.personalTrackerDailypath,
      alt: 'Concept mockup for a mobile app',
      previewTitle: 'Mobile App Concept',
      previewType: 'Habits / Progress / Mobile Experience',
    },
  },
  {
    name: 'Automation',
    descriptor: 'Practical workflow automation to reduce repetitive steps and make common tasks easier to manage.',
    icon: Zap,
    image: {
      src: mockupImage.automationAutobridge,
      alt: 'Concept mockup for an automation platform',
      previewTitle: 'Automation Platform Concept',
      previewType: 'Automation / Integrations / Workflows',
    },
  },
  {
    name: 'Social Media Solutions',
    descriptor: 'Digital support for organizing social media content, links, presentation, and online presence.',
    icon: Share2,
    image: {
      src: mockupImage.socialSociallift,
      alt: 'Concept mockup for a social media management platform',
      previewTitle: 'Social Media Platform Concept',
      previewType: 'Content / Scheduling / Analytics',
    },
  },
  {
    name: 'Custom Digital Project',
    descriptor: 'A flexible option for ideas that do not fit neatly into a standard website, web app, or portal.',
    icon: Puzzle,
    image: {
      src: mockupImage.customTailoredSystems,
      alt: 'Concept mockup for a custom digital system',
      previewTitle: 'Custom Digital System Concept',
      previewType: 'Custom / Digital / Tailored Solution',
    },
  },
]

function IconChip({ icon: Icon, tint = 'blue' }: { icon: LucideIcon; tint?: 'blue' | 'mint' }) {
  return (
    <span
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white shadow-[0_1px_2px_rgba(15,23,42,0.15)]',
        tint === 'blue' ? 'bg-[#1F6FEB]' : 'bg-[#0d9488]',
      )}
    >
      <Icon className="h-[18px] w-[18px]" />
    </span>
  )
}

/**
 * Compact non-functional inquiry bar for niches not covered by the selector
 * list — sits directly beneath the carousel, sharing its exact width.
 */
function WebsiteIdeaBar() {
  const [value, setValue] = useState('')
  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5">
        <p className="text-xs font-semibold text-slate-700">Already have an idea in mind?</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#0d9488] px-2.5 py-1 text-[0.65rem] font-bold tracking-wide text-white uppercase shadow-[0_2px_6px_rgba(13,148,136,0.35)] ring-1 ring-[#0d9488]/20">
          Free Mockup
        </span>
      </div>
      <p className="mt-0.5 text-xs text-slate-500">
        Describe it below and I&apos;ll put together a sample mockup based on your idea — no cost, no obligation.
      </p>
      <div className="mt-2 flex items-center gap-1.5 rounded-md border border-slate-300/70 bg-white p-1 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] transition-colors duration-200 focus-within:border-blue-300">
        <label htmlFor="website-idea-input" className="sr-only">
          Describe the website you have in mind
        </label>
        <input
          id="website-idea-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Describe the website idea you have in mind…"
          className="min-w-0 flex-1 bg-transparent px-2.5 py-1.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
        <button
          type="button"
          aria-label="Send message"
          className="flex shrink-0 items-center gap-1.5 rounded-md bg-gradient-to-r from-[#1F6FEB] to-[#0d9488] px-3.5 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(13,148,136,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <Send className="h-3.5 w-3.5" />
          Send
        </button>
      </div>
    </div>
  )
}

/** Shared visual treatment for the single action CTA beneath a showcase selector column. */
function ServiceCTA({ to, icon: Icon, children }: { to: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="mt-4 flex flex-1 flex-col justify-end lg:mt-6">
      <Link
        to={to}
        className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#1F6FEB] to-[#0d9488] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(13,148,136,0.28)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(13,148,136,0.38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <Icon className="h-4 w-4 shrink-0" />
        {children}
      </Link>
    </div>
  )
}

function ServiceShowcase({
  icon,
  tint = 'blue',
  title,
  subtext,
  categories,
  footer,
  rightFooter,
}: {
  icon: LucideIcon
  tint?: 'blue' | 'mint'
  title: string
  subtext: string
  categories: ShowcaseCategory[]
  footer?: ReactNode
  rightFooter?: ReactNode
}) {
  const [activeId, setActiveId] = useState(categories[0].id)
  const active = categories.find((c) => c.id === activeId) ?? categories[0]
  const panelId = `showcase-${title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <section className="rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-5">
      <div className="flex items-center gap-2.5">
        <IconChip icon={icon} tint={tint} />
        <span className="inline-flex items-center rounded-md bg-[#128C4A] px-3 py-1.5 text-sm font-bold text-white shadow-[0_1px_2px_rgba(15,23,42,0.15)] sm:text-base">
          {title}
        </span>
      </div>
      <div className="mt-3 rounded-md border border-[#BFDCF3] bg-[#EAF3FC] px-3 py-2.5">
        <p className="text-sm leading-relaxed text-slate-700">{subtext}</p>
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(220px,1fr)_2.8fr] lg:items-stretch lg:gap-6">
        <div className="flex min-w-0 flex-col lg:h-full">
          <CategorySelector
            categories={categories}
            active={activeId}
            onChange={setActiveId}
            panelId={panelId}
            ariaLabel={`${title} categories`}
          />
          {footer}
        </div>

        <div className="flex min-w-0 flex-col gap-2.5">
          <div id={panelId} role="tabpanel" aria-labelledby={`${panelId}-tab-${active.id}`} className="min-w-0">
            <MockupCarousel
              key={active.id}
              slides={active.slides}
              ariaLabel={`${title} — ${active.label} previews`}
              chrome="concept"
              autoplayInterval={2000}
              strongLabel
            />
          </div>
          {rightFooter}
        </div>
      </div>
    </section>
  )
}

export function ServicesPage() {
  const [expandedMoreService, setExpandedMoreService] = useState<MoreService | null>(null)

  useEffect(() => {
    if (!expandedMoreService) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setExpandedMoreService(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [expandedMoreService])

  return (
    <>
      {/* Page header */}
      <header className="relative overflow-hidden rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:px-6 sm:py-4">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.2]"
          viewBox="0 0 1000 140"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <g className="animate-hero-drift-a" stroke="#1F6FEB" strokeWidth="1.1" fill="none">
            <path d="M -100 20 C 120 -20, 260 60, 460 25 S 780 -10, 1120 30" />
          </g>
          <g className="animate-hero-drift-b" stroke="#7fd8c4" strokeWidth="1.1" fill="none">
            <path d="M -80 80 C 160 110, 340 40, 600 85 S 900 130, 1100 75" />
          </g>
        </svg>

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-md bg-[#128C4A] px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] whitespace-nowrap text-white uppercase shadow-[0_1px_2px_rgba(15,23,42,0.15)]">
              Services
            </span>
            <h1 className="mt-2 text-2xl leading-[1.15] font-extrabold tracking-tight text-[#122c52] sm:text-3xl lg:text-[2rem]">
              Solutions built around what you need.
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-snug text-slate-600 lg:max-w-none lg:pr-6">
              From websites and digital tools to custom client systems, explore the ways I can
              help bring an idea to life.
            </p>
          </div>

          <Link
            to="/contact?intent=message"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#1F6FEB] px-3 py-1.5 text-[0.8rem] font-semibold whitespace-nowrap text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] hover:shadow-[0_6px_14px_rgba(31,111,235,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6FEB]"
          >
            <Mail className="h-[14px] w-[14px]" />
            Contact Me
          </Link>
        </div>
      </header>

      {/* Interactive showcase workspace */}
      <div className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#e9f1fb] p-3 shadow-[0_2px_4px_rgba(15,23,42,0.04),0_16px_32px_rgba(15,23,42,0.05)] sm:p-4">
        <div className="flex flex-col gap-4">
          <ServiceShowcase
            icon={Globe}
            title="Advanced Website Design"
            subtext="Professional, responsive websites designed around your business, audience, and goals — with clear navigation, polished layouts, and an easy user experience."
            categories={websiteCategories}
            rightFooter={<WebsiteIdeaBar />}
          />
          <ServiceShowcase
            icon={LayoutDashboard}
            tint="mint"
            title="Web App Creation"
            subtext="Custom web-based tools designed to help organize information, simplify workflows, and make everyday business tasks easier to manage."
            categories={webAppCategories}
            footer={
              <ServiceCTA to="/contact?intent=web-app" icon={Code2}>
                Start Your Web App
              </ServiceCTA>
            }
          />
          <ServiceShowcase
            icon={KeyRound}
            title="Personal Tracker / Client Portal"
            subtext="Private, easy-to-use workspaces that help clients and teams follow progress, access files, review updates, and stay organized."
            categories={trackerCategories}
            footer={
              <ServiceCTA to="/contact?intent=tracker" icon={Rocket}>
                Start Your Tracker
              </ServiceCTA>
            }
          />
        </div>
      </div>

      {/* More Ways I Can Help */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-accent)] uppercase">More Ways I Can Help</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {moreServices.map((service) => {
            const { name, descriptor, icon: Icon, image } = service
            return (
              <div
                key={name}
                className="group relative flex items-center gap-3 rounded-md border border-slate-300/70 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06)]"
              >
                {image ? (
                  <button
                    type="button"
                    onClick={() => setExpandedMoreService(service)}
                    aria-label={`Enlarge preview: ${image.previewTitle}`}
                    className="relative z-10 h-11 w-11 shrink-0 overflow-hidden rounded-md border border-[var(--card-border-nested)]/50 bg-slate-50 transition-colors duration-200 hover:border-[var(--card-border-nested)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover object-top" />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900/0 transition-colors duration-200 group-hover:bg-slate-900/10">
                      <Expand className="h-3.5 w-3.5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </span>
                  </button>
                ) : (
                  <IconChip icon={Icon} />
                )}
                <Link
                  to="/contact?intent=project"
                  className="static min-w-0 flex-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:outline-none"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  <span className="block text-sm font-semibold text-slate-800">{name}</span>
                  <span className="block text-xs text-slate-500">{descriptor}</span>
                </Link>
                <ArrowUpRight className="pointer-events-none h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1F6FEB]" />
              </div>
            )
          })}
        </div>
      </section>

      {/* Enlarged preview for "More Ways I Can Help" — same visual language as MockupCarousel's
          lightbox (title/label header, Concept Mockup trust note, object-contain image, Escape
          to close), kept as a small local modal since this grid isn't a carousel. */}
      {expandedMoreService?.image && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged preview: ${expandedMoreService.image.previewTitle}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6"
          onClick={() => setExpandedMoreService(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
              <span className="min-w-0">
                <span className="block text-[0.6rem] font-semibold tracking-wide text-[#1F6FEB] uppercase">
                  Concept Mockup
                </span>
                <span className="block truncate text-sm font-semibold text-slate-800">
                  {expandedMoreService.image.previewTitle}
                </span>
                <span className="block truncate text-xs text-slate-500">{expandedMoreService.image.previewType}</span>
              </span>
              <button
                type="button"
                onClick={() => setExpandedMoreService(null)}
                aria-label="Close enlarged preview"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-slate-200 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="aspect-video bg-slate-50">
              <img
                src={expandedMoreService.image.src}
                alt={expandedMoreService.image.alt}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="border-t border-slate-200 px-4 py-3 text-sm leading-relaxed text-slate-600">
              {expandedMoreService.descriptor}
            </p>
          </div>
        </div>
      )}

      {/* Bottom CTA — same action concepts approved on Projects */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-slate-500">Have an idea in mind? Let&apos;s bring it to life.</p>
          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
            <Link
              to="/contact?intent=project"
              className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#1F6FEB] to-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(13,148,136,0.28)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(13,148,136,0.38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <Rocket className="h-4 w-4 shrink-0" />
              Start Your Project
            </Link>
            <Link
              to="/contact?intent=mockup"
              className="flex items-center justify-center gap-2 rounded-md border-[1.5px] border-[#0d9488]/50 bg-gradient-to-r from-[#eafaf4] to-[#eff6ff] px-5 py-2.5 text-sm font-semibold text-[#0f3d5f] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d9488] hover:from-[#dcf7ee] hover:to-[#e5eefe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <FileText className="h-4 w-4 shrink-0" />
              Request a Free Mockup
            </Link>
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-center gap-1 py-3 text-center text-xs text-muted-foreground">
        <p>© 2026 Alexis Sarip. All rights reserved.</p>
      </footer>
    </>
  )
}
