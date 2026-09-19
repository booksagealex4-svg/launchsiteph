import { useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Globe, AppWindow, Activity, Boxes, Layers, Sparkles, Rocket, FileText, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MockupCarousel, type MockupSlide } from '@/components/projects/MockupCarousel'
import { HomeToolsMarquee } from '@/components/sections/HomeToolsMarquee'
import { cn } from '@/lib/utils'

const blueMint = ['#1F6FEB', '#1f9d7c', '#2563eb', '#0ea5e9', '#4f46e5', '#14b8a6']

/** Curated concept-mockup assets — same real files already committed under
 *  portfolio/public/mockups/services/ for the Services page. Reused here (not
 *  duplicated) for a selective, portfolio-style Concept Portfolio section. */
const mockupImage = {
  authorMaraEllison: '/mockups/services/author-mara-ellison.png',
  authorNathanVega: '/mockups/services/author-nathan-vega.png',
  authorDanielHarper: '/mockups/services/author-daniel-harper.png',
  authorOliveMeadow: '/mockups/services/author-olive-meadow.webp',
  authorEleanorGrant: '/mockups/services/author-eleanor-grant.webp',
  cafeBrewBloom: '/mockups/services/cafe-brew-bloom.png',
  restaurantSavoryTable: '/mockups/services/restaurant-savory-table.png',
  bakeryHearthCrumb: '/mockups/services/bakery-hearth-crumb.png',
  barberNorthline: '/mockups/services/barber-northline.png',
  realEstateCrestpoint: '/mockups/services/real-estate-crestpoint.png',
  automotiveApexAuto: '/mockups/services/automotive-apex-auto.png',
  medicalHarborClinic: '/mockups/services/medical-harbor-clinic.png',
  ecommerceMaisoncart: '/mockups/services/ecommerce-maisoncart.png',
  crmFlowdesk: '/mockups/services/crm-flowdesk.png',
  clientPortalProjectflow: '/mockups/services/client-portal-projectflow.png',
  automationAutobridge: '/mockups/services/automation-autobridge.png',
  socialSociallift: '/mockups/services/social-sociallift.png',
  webappDashboard01: '/mockups/services/webapp-dashboard-01.webp',
  webappClientManagement01: '/mockups/services/webapp-client-management-01.webp',
  webappBookingSystem01: '/mockups/services/webapp-booking-system-01.webp',
  webappBookingSystem02: '/mockups/services/webapp-booking-system-02.webp',
  webappInventory01: '/mockups/services/webapp-inventory-01.webp',
  webappMemberPortal01: '/mockups/services/webapp-member-portal-01.webp',
  webappMemberPortal02: '/mockups/services/webapp-member-portal-02.webp',
  webappAdminPortal01: '/mockups/services/webapp-admin-portal-01.webp',
  webappAdminPortal02: '/mockups/services/webapp-admin-portal-02.webp',
  trackerProject01: '/mockups/services/tracker-project-01.webp',
  trackerClientPortal01: '/mockups/services/tracker-client-portal-01.webp',
  trackerAuthorPortal01: '/mockups/services/tracker-author-portal-01.webp',
  trackerProgressDashboard01: '/mockups/services/tracker-progress-dashboard-01.webp',
} as const

interface RealProject {
  id: string
  title: string
  type: string
  description: string
  status: 'in-progress' | 'ready'
  thumbnail: string | null
  imageAlt: string
  category: 'website' | 'webapp'
  href: string
}

// Real, approved case studies (same three entries as the homepage). Each now has a
// dedicated local interface-concept preview under public/mockups/projects/current/ —
// an illustrative concept of the interface, not a screenshot of live functionality.
const realProjects: RealProject[] = [
  {
    id: 'ipa-author-directory',
    title: 'Author Directory',
    type: 'Author Directory / Web Platform',
    description:
      'A professional author and book discovery platform designed to make author profiles, books, and membership information easy to explore.',
    status: 'in-progress',
    thumbnail: '/mockups/projects/current/ipa-author-directory.svg',
    imageAlt: 'Interface concept preview of the Author Directory — an author discovery platform with profile cards and browsing',
    category: 'website',
    href: '/projects',
  },
  {
    id: 'ipa-book-depository',
    title: 'Book Depository',
    type: 'Book Discovery / Catalog Platform',
    description:
      'A digital book catalog designed to organize, showcase, and make published titles easier to discover through a clean and accessible browsing experience.',
    status: 'in-progress',
    thumbnail: '/mockups/projects/current/ipa-book-depository.svg',
    imageAlt: 'Interface concept preview of the Book Depository — a book catalog with browsing and filtering',
    category: 'website',
    href: '/projects',
  },
  {
    id: 'client-crm-portal',
    title: 'Client CRM Portal',
    type: 'CRM / Client Management Platform',
    description:
      'A client management workspace designed to organize contacts, projects, messages, files, payments, and progress updates in one clear and practical dashboard.',
    status: 'in-progress',
    thumbnail: '/mockups/projects/current/client-crm-portal.svg',
    imageAlt: 'Interface concept preview of the Client CRM Portal — a client management dashboard with workspace panels',
    category: 'webapp',
    href: '/projects',
  },
]

const statusLabel: Record<RealProject['status'], string> = {
  'in-progress': 'In Progress',
  ready: 'Current Project',
}

function realProjectSlide(project: RealProject, kind: MockupSlide['kind'], accent: string, variant: 1 | 2 | 3 | 4): MockupSlide {
  return {
    id: project.id,
    kind,
    variant,
    accent,
    label: project.title,
    title: project.title,
    type: project.type,
    description: project.description,
    badge: statusLabel[project.status],
    image: project.thumbnail ?? undefined,
    imageAlt: project.imageAlt,
  }
}

interface ConceptDefinition {
  id: string
  image: string
  imageAlt: string
  title: string
  type: string
  description: string
}

/** Curated concept mockups — illustrative sample concepts, not completed client work. Every
 *  slide built from these always shows the "Concept Mockup" trust badge (see MockupCarousel). */
const concepts: Record<string, ConceptDefinition> = {
  cafe: {
    id: 'concept-cafe',
    image: mockupImage.cafeBrewBloom,
    imageAlt: 'Concept mockup for a café website',
    title: 'Café Website Concept',
    type: 'Café / Menu / Reservations',
    description:
      'A warm, hospitality-focused website concept designed around menus, reservations, location details, and an inviting customer experience.',
  },
  realEstate: {
    id: 'concept-real-estate',
    image: mockupImage.realEstateCrestpoint,
    imageAlt: 'Concept mockup for a real estate website',
    title: 'Real Estate Website Concept',
    type: 'Real Estate / Listings / Agents',
    description:
      'A premium real estate website concept featuring property discovery, listings, agent visibility, neighborhood information, and clear inquiry paths.',
  },
  medical: {
    id: 'concept-medical',
    image: mockupImage.medicalHarborClinic,
    imageAlt: 'Concept mockup for a medical website',
    title: 'Medical Website Concept',
    type: 'Clinic / Services / Appointments',
    description:
      'A professional healthcare website concept focused on patient trust, service discovery, appointment access, and clear medical information.',
  },
  authorNathanVega: {
    id: 'concept-author-nathan-vega',
    image: mockupImage.authorNathanVega,
    imageAlt: 'Concept mockup for a fiction author website',
    title: 'Fiction Author Website Concept',
    type: 'Author / Books / Personal Brand',
    description:
      'An author website concept designed to showcase books, biography, events, and reader-facing information in one professional experience.',
  },
  authorDanielHarper: {
    id: 'concept-author-daniel-harper',
    image: mockupImage.authorDanielHarper,
    imageAlt: 'Concept mockup for a non-fiction author website',
    title: 'Non-Fiction Author Website Concept',
    type: 'Author / Books / Personal Brand',
    description:
      'An author website concept built around credibility, published work, media features, and clear ways for readers to connect.',
  },
  authorOliveMeadow: {
    id: 'concept-author-olive-meadow',
    image: mockupImage.authorOliveMeadow,
    imageAlt: "Concept mockup for a children's picture-book author website",
    title: "Children's Author Website Concept",
    type: 'Author / Books / Personal Brand',
    description:
      'A playful, illustrated author website concept designed around storybooks, characters, and family-friendly browsing.',
  },
  authorEleanorGrant: {
    id: 'concept-author-eleanor-grant',
    image: mockupImage.authorEleanorGrant,
    imageAlt: 'Concept mockup for a literary fiction author website',
    title: 'Literary Fiction Author Website Concept',
    type: 'Author / Books / Personal Brand',
    description: 'An elegant, editorial author website concept designed around long-form fiction and a personal author brand.',
  },
  webappDashboard: {
    id: 'concept-webapp-dashboard',
    image: mockupImage.webappDashboard01,
    imageAlt: 'Concept mockup for a business dashboard with goals, projects, and activity',
    title: 'Dashboard Concept',
    type: 'Dashboard / Analytics / Workflow',
    description:
      'A clear workspace concept for viewing important information, updates, tasks, and activity in one place.',
  },
  webappClientManagement: {
    id: 'concept-webapp-client-management',
    image: mockupImage.webappClientManagement01,
    imageAlt: 'Concept mockup for a client management dashboard',
    title: 'Client Management Concept',
    type: 'CRM / Leads / Client Management',
    description:
      'A practical client-management system concept for organizing contacts, projects, and communication in one dashboard.',
  },
  webappScheduling: {
    id: 'concept-webapp-scheduling',
    image: mockupImage.webappBookingSystem01,
    imageAlt: 'Concept mockup for a booking and scheduling platform',
    title: 'Scheduling Platform Concept',
    type: 'Scheduling / Appointments / Clients',
    description: 'A structured booking-system concept for appointments, schedules, availability, and customer requests.',
  },
  webappAdminPortal: {
    id: 'concept-webapp-admin-portal',
    image: mockupImage.webappAdminPortal01,
    imageAlt: 'Concept mockup for an admin dashboard with revenue and team workload',
    title: 'Admin Portal Concept',
    type: 'Admin / Analytics / Management',
    description: 'A centralized admin workspace concept for managing content, users, records, and site operations.',
  },
  trackerProject: {
    id: 'concept-tracker-project',
    image: mockupImage.trackerProject01,
    imageAlt: 'Concept mockup for a project tracking dashboard',
    title: 'Project Tracker Concept',
    type: 'Progress / Tasks / Updates',
    description: 'A simple workspace concept for following project stages, updates, tasks, and progress.',
  },
  trackerClientPortal: {
    id: 'concept-tracker-client-portal',
    image: mockupImage.trackerClientPortal01,
    imageAlt: 'Concept mockup for a client portal with milestones, files, and feedback',
    title: 'Client Portal Concept',
    type: 'Messages / Files / Reviews / Payments',
    description:
      'A private client-area concept for project updates, messages, files, reviews, and important information.',
  },
  trackerAuthorPortal: {
    id: 'concept-tracker-author-portal',
    image: mockupImage.trackerAuthorPortal01,
    imageAlt: 'Concept mockup for an author portal with book progress and reader messages',
    title: 'Author Portal Concept',
    type: 'Manuscripts / Events / Readers',
    description:
      'A dedicated workspace concept for authors to follow publishing-related projects, files, updates, and communication.',
  },
  trackerProgressDashboard: {
    id: 'concept-tracker-progress-dashboard',
    image: mockupImage.trackerProgressDashboard01,
    imageAlt: 'Concept mockup for a progress dashboard with goals and milestones',
    title: 'Progress Dashboard Concept',
    type: 'Milestones / Progress / Updates',
    description: 'A clear visual overview concept of project status, milestones, updates, and next steps.',
  },
  businessRestaurant: {
    id: 'concept-business-restaurant',
    image: mockupImage.restaurantSavoryTable,
    imageAlt: 'Concept mockup for a restaurant website',
    title: 'Restaurant Website Concept',
    type: 'Restaurant / Menu / Reservations',
    description: 'A professional restaurant website concept for menus, reservations, contact details, and location information.',
  },
  businessBakery: {
    id: 'concept-business-bakery',
    image: mockupImage.bakeryHearthCrumb,
    imageAlt: 'Concept mockup for a bakery website',
    title: 'Bakery Website Concept',
    type: 'Bakery / Products / Ordering',
    description: 'A warm, polished bakery website concept for products, custom orders, location details, and inquiries.',
  },
  businessBarber: {
    id: 'concept-business-barber',
    image: mockupImage.barberNorthline,
    imageAlt: 'Concept mockup for a barber shop website',
    title: 'Barber Shop Website Concept',
    type: 'Barber / Services / Booking',
    description: 'A modern service-business website concept for pricing, booking information, services, and contact details.',
  },
  businessAutomotive: {
    id: 'concept-business-automotive',
    image: mockupImage.automotiveApexAuto,
    imageAlt: 'Concept mockup for an automotive service website',
    title: 'Automotive Website Concept',
    type: 'Auto Care / Services / Scheduling',
    description: 'A professional automotive website concept for services, offerings, business information, and inquiries.',
  },
  customMemberPortal: {
    id: 'concept-custom-member-portal',
    image: mockupImage.webappMemberPortal01,
    imageAlt: 'Concept mockup for a member dashboard with programs and community highlights',
    title: 'Member Portal Concept',
    type: 'Portal / Files / Communication',
    description: 'A private member-space concept where members can access information, files, updates, and account features.',
  },
  customAdminManagement: {
    id: 'concept-custom-admin-management',
    image: mockupImage.webappAdminPortal02,
    imageAlt: 'Concept mockup for an admin dashboard with lead pipeline and project status',
    title: 'Admin Management Dashboard Concept',
    type: 'Admin / Analytics / Management',
    description: 'A custom operations-management concept for tracking leads, projects, payments, and team performance.',
  },
  automation: {
    id: 'concept-automation',
    image: mockupImage.automationAutobridge,
    imageAlt: 'Concept mockup for an automation platform',
    title: 'Automation Platform Concept',
    type: 'Automation / Integrations / Workflows',
    description:
      'An automation-platform concept designed around workflow automation, integrations, operational visibility, and scalable digital processes.',
  },
  social: {
    id: 'concept-social',
    image: mockupImage.socialSociallift,
    imageAlt: 'Concept mockup for a social media platform',
    title: 'Social Media Platform Concept',
    type: 'Content / Scheduling / Analytics',
    description:
      'A social media platform concept built around content planning, publishing, scheduling, analytics, and campaign visibility.',
  },
  otherInventory: {
    id: 'concept-other-inventory',
    image: mockupImage.webappInventory01,
    imageAlt: 'Concept mockup for an inventory management platform',
    title: 'Inventory Management Concept',
    type: 'Inventory / Stock / Warehouse',
    description: 'A simple inventory-system concept for organizing products, stock information, availability, and updates.',
  },
  otherBookingDashboard: {
    id: 'concept-other-booking-dashboard',
    image: mockupImage.webappBookingSystem02,
    imageAlt: "Concept mockup for a booking system dashboard with today's schedule",
    title: 'Booking Dashboard Concept',
    type: 'Scheduling / Appointments / Clients',
    description: 'A day-to-day scheduling concept for managing bookings, staff availability, and upcoming appointments.',
  },
  otherLearningPortal: {
    id: 'concept-other-learning-portal',
    image: mockupImage.webappMemberPortal02,
    imageAlt: 'Concept mockup for a member portal with course progress and resources',
    title: 'Learning Portal Concept',
    type: 'Portal / Files / Communication',
    description: 'A membership and learning-space concept for course progress, resources, and account information.',
  },
  otherOnlineShop: {
    id: 'concept-other-online-shop',
    image: mockupImage.ecommerceMaisoncart,
    imageAlt: 'Concept mockup for an online shop website',
    title: 'Online Shop Concept',
    type: 'E-Commerce / Products / Shopping',
    description: 'A product-focused online shop concept designed to make browsing, product information, and checkout clear.',
  },
}

function conceptSlide(concept: ConceptDefinition, kind: MockupSlide['kind'], accent: string): MockupSlide {
  return {
    id: concept.id,
    kind,
    variant: 1,
    accent,
    label: concept.title,
    title: concept.title,
    type: concept.type,
    description: concept.description,
    image: concept.image,
    imageAlt: concept.imageAlt,
  }
}

const [ipaAuthorDirectory, ipaBookDepository, clientCrmPortal] = realProjects

interface Category {
  id: string
  label: string
  icon: LucideIcon
  carouselLabel: string
  slides: MockupSlide[]
}

const categories: Category[] = [
  {
    id: 'website',
    label: 'Website',
    icon: Globe,
    carouselLabel: 'Website project previews',
    // Strong general website concepts, plus four distinct approved author-website
    // concepts. Author Directory / Book Depository live only in Current Projects now.
    slides: [
      conceptSlide(concepts.cafe, 'website', blueMint[0]),
      conceptSlide(concepts.realEstate, 'website', blueMint[1]),
      conceptSlide(concepts.medical, 'website', blueMint[2]),
      conceptSlide(concepts.authorNathanVega, 'website', blueMint[3]),
      conceptSlide(concepts.authorDanielHarper, 'website', blueMint[4]),
      conceptSlide(concepts.authorOliveMeadow, 'website', blueMint[5]),
      conceptSlide(concepts.authorEleanorGrant, 'website', blueMint[0]),
    ],
  },
  {
    id: 'webapp',
    label: 'Web App',
    icon: AppWindow,
    carouselLabel: 'Web app project previews',
    // Four approved Web App Creation concepts, plus the real, ongoing Client CRM
    // Portal (already shown in full in Current Projects above) at the end.
    slides: [
      conceptSlide(concepts.webappDashboard, 'dashboard', blueMint[0]),
      conceptSlide(concepts.webappClientManagement, 'dashboard', blueMint[1]),
      conceptSlide(concepts.webappScheduling, 'dashboard', blueMint[2]),
      conceptSlide(concepts.webappAdminPortal, 'dashboard', blueMint[3]),
      realProjectSlide(clientCrmPortal, 'dashboard', blueMint[4], 1),
    ],
  },
  {
    id: 'tracker',
    label: 'Personal Tracker',
    icon: Activity,
    carouselLabel: 'Personal tracker project previews',
    slides: [
      conceptSlide(concepts.trackerProject, 'dashboard', blueMint[5]),
      conceptSlide(concepts.trackerClientPortal, 'dashboard', blueMint[4]),
      conceptSlide(concepts.trackerAuthorPortal, 'dashboard', blueMint[3]),
      conceptSlide(concepts.trackerProgressDashboard, 'dashboard', blueMint[2]),
    ],
  },
  {
    id: 'business-website',
    label: 'Business Website',
    icon: Boxes,
    carouselLabel: 'Business website project previews',
    slides: [
      conceptSlide(concepts.businessRestaurant, 'generic', blueMint[0]),
      conceptSlide(concepts.businessBakery, 'generic', blueMint[1]),
      conceptSlide(concepts.businessBarber, 'generic', blueMint[2]),
      conceptSlide(concepts.businessAutomotive, 'generic', blueMint[3]),
    ],
  },
  {
    id: 'custom-project',
    label: 'Custom Digital Project',
    icon: Layers,
    carouselLabel: 'Custom digital project previews',
    slides: [
      conceptSlide(concepts.automation, 'generic', blueMint[0]),
      conceptSlide(concepts.social, 'generic', blueMint[1]),
      conceptSlide(concepts.customMemberPortal, 'generic', blueMint[2]),
      conceptSlide(concepts.customAdminManagement, 'generic', blueMint[3]),
    ],
  },
  {
    id: 'future-project',
    label: 'Other / Future Project',
    icon: Sparkles,
    carouselLabel: 'Other / future project previews',
    slides: [
      conceptSlide(concepts.otherInventory, 'generic', blueMint[4]),
      conceptSlide(concepts.otherBookingDashboard, 'generic', blueMint[5]),
      conceptSlide(concepts.otherLearningPortal, 'generic', blueMint[0]),
      conceptSlide(concepts.otherOnlineShop, 'website', blueMint[1]),
    ],
  },
]

function CategoryTabs({
  active,
  onChange,
  panelId,
}: {
  active: string
  onChange: (id: string) => void
  panelId: string
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  function focusAndSelect(idx: number) {
    const next = categories[((idx % categories.length) + categories.length) % categories.length]
    onChange(next.id)
    refs.current[next.id]?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      focusAndSelect(idx + 1)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      focusAndSelect(idx - 1)
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Project categories"
      aria-orientation="vertical"
      className="no-scrollbar flex min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0"
    >
      {categories.map((cat, idx) => {
        const isActive = cat.id === active
        return (
          <button
            key={cat.id}
            ref={(el) => {
              refs.current[cat.id] = el
            }}
            type="button"
            role="tab"
            id={`category-tab-${cat.id}`}
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(cat.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={cn(
              'flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-md border px-4 py-2.5 text-sm font-semibold transition-all duration-200',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
              isActive
                ? 'border-[#1F6FEB] bg-[#1F6FEB] text-white shadow-[0_4px_10px_rgba(31,111,235,0.25)]'
                : 'border-[#C7D2E0] bg-[#EEF3F9] text-slate-700 hover:border-[#9DB6D9] hover:bg-[#E1EBF7] hover:text-[#1F6FEB] focus-visible:border-[#9DB6D9] focus-visible:bg-[#E1EBF7]',
            )}
          >
            <cat.icon className="h-4 w-4 shrink-0" />
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}

/**
 * Future routing intent: both buttons point to /contact (a minimal
 * placeholder route today) carrying an `intent` param so the eventual
 * Contact form can preselect "project" vs "mockup". No form exists yet.
 */
function ProjectCTAs() {
  return (
    <div className="mt-4 flex flex-1 flex-col justify-end gap-2.5 lg:mt-6">
      <Link
        to="/contact?intent=project"
        className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#1F6FEB] to-[#0d9488] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(13,148,136,0.28)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(13,148,136,0.38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <Rocket className="h-4 w-4 shrink-0" />
        Start Your Project
      </Link>
      <Link
        to="/contact?intent=mockup"
        className="flex items-center justify-center gap-2 rounded-md border-[1.5px] border-[#0d9488]/50 bg-gradient-to-r from-[#eafaf4] to-[#eff6ff] px-4 py-2.5 text-sm font-semibold text-[#0f3d5f] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d9488] hover:from-[#dcf7ee] hover:to-[#e5eefe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <FileText className="h-4 w-4 shrink-0" />
        Request a Free Mockup
      </Link>
    </div>
  )
}

export function ProjectsPage() {
  const [activeId, setActiveId] = useState(categories[0].id)
  const active = categories.find((c) => c.id === activeId) ?? categories[0]
  const panelId = 'project-carousel-panel'

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
              Projects
            </span>
            <h1 className="mt-2 text-2xl leading-[1.15] font-extrabold tracking-tight text-[#122c52] sm:text-3xl lg:text-[2rem]">
              Work you can explore.
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-snug text-slate-600 lg:max-w-none lg:pr-6">
              A collection of websites, digital solutions, and creative builds presented as
              interactive case studies.
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

      {/* Current Projects — real, ongoing work, kept clearly separate from the concept
          portfolio below. Each card is its own single-slide carousel so it reuses the exact
          same enlarge/lightbox behavior, with an "In Progress" badge (not "Concept Mockup"). */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-5">
        <span className="inline-flex items-center rounded-md bg-[#128C4A] px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] whitespace-nowrap text-white uppercase shadow-[0_1px_2px_rgba(15,23,42,0.15)]">
          Current Projects
        </span>
        <p className="mt-1.5 text-sm text-slate-500">Ongoing work currently in development.</p>

        <div className="mt-3.5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MockupCarousel
            slides={[realProjectSlide(ipaAuthorDirectory, 'website', blueMint[0], 1)]}
            ariaLabel="Author Directory preview"
            chrome="realistic"
          />
          <MockupCarousel
            slides={[realProjectSlide(ipaBookDepository, 'website', blueMint[1], 2)]}
            ariaLabel="Book Depository preview"
            chrome="realistic"
          />
          <MockupCarousel
            slides={[realProjectSlide(clientCrmPortal, 'dashboard', blueMint[2], 1)]}
            ariaLabel="Client CRM Portal preview"
            chrome="realistic"
          />
        </div>
      </section>

      {/* Concept Portfolio — the existing category browser, now populated with curated real
          concept mockups (mixed with the current projects above where relevant) instead of
          abstract filler, for categories without a dedicated asset. */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-5">
        <span className="inline-flex items-center rounded-md bg-[#128C4A] px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] whitespace-nowrap text-white uppercase shadow-[0_1px_2px_rgba(15,23,42,0.15)]">
          Concept Portfolio
        </span>

        <div className="mt-3.5 grid gap-5 lg:grid-cols-[minmax(220px,1fr)_2.8fr] lg:items-stretch lg:gap-6">
          <div className="flex min-w-0 flex-col lg:h-full">
            <CategoryTabs active={activeId} onChange={setActiveId} panelId={panelId} />
            <ProjectCTAs />
          </div>

          <div id={panelId} role="tabpanel" aria-labelledby={`category-tab-${active.id}`} className="min-w-0">
            <MockupCarousel
              key={active.id}
              slides={active.slides}
              ariaLabel={active.carouselLabel}
              chrome="concept"
              autoplayInterval={2000}
            />
          </div>
        </div>
      </section>

      {/* Tools — reuses the exact approved homepage marquee component (same icons, colors, styling) */}
      <div className="mt-4">
        <HomeToolsMarquee />
      </div>
    </>
  )
}
