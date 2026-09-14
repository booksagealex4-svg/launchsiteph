import { useState } from 'react'
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
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { CategorySelector, type SelectorCategory } from '@/components/CategorySelector'
import { ClientLoginButton } from '@/components/ClientLoginButton'
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

interface ShowcaseCategory extends SelectorCategory {
  slides: MockupSlide[]
}

/** Every slide in a category shares the same real, honest description for that service option. */
function withSlides(
  kind: MockupSlide['kind'],
  sectionType: string,
  items: { id: string; label: string; icon: LucideIcon; description: string }[],
  count: number,
): ShowcaseCategory[] {
  return items.map(({ id, label, icon, description }, i) => ({
    id,
    label,
    icon,
    slides: buildSlides(kind, label, blueMint[i % blueMint.length], count, { title: label, type: sectionType, description }),
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
    },
    {
      id: 'cafes',
      label: 'Cafes',
      icon: Coffee,
      description: 'Clean, inviting websites for menus, location details, opening hours, and customer information.',
    },
    {
      id: 'restaurants',
      label: 'Restaurants',
      icon: UtensilsCrossed,
      description: 'Professional restaurant sites for menus, reservations, contact details, and location information.',
    },
    {
      id: 'bakeries',
      label: 'Bakeries',
      icon: Cookie,
      description: 'Warm, polished websites for products, custom orders, location details, and inquiries.',
    },
    {
      id: 'barber-shops',
      label: 'Barber Shops',
      icon: Scissors,
      description: 'Modern service websites for pricing, booking information, services, and contact details.',
    },
    {
      id: 'real-estate',
      label: 'Real Estate',
      icon: Building2,
      description: 'Professional property-focused websites for listings, agent information, inquiries, and contact details.',
    },
    {
      id: 'doctors',
      label: 'Doctors',
      icon: Stethoscope,
      description: 'Clear, professional informational websites for services, clinic details, appointments, and patient guidance.',
    },
    {
      id: 'automotive',
      label: 'Automotive',
      icon: Car,
      description: 'Professional automotive websites for services, inventory or offerings, business information, and inquiries.',
    },
    {
      id: 'online-shops',
      label: 'Online Shops',
      icon: ShoppingBag,
      description: 'Product-focused websites designed to make browsing, product information, and customer actions clear.',
    },
    {
      id: 'other-business',
      label: 'Other Business',
      icon: Briefcase,
      description: 'Custom websites designed around the specific needs, audience, and goals of your business.',
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
    },
    {
      id: 'client-management',
      label: 'Client Management',
      icon: Users,
      description: 'A practical system for organizing client details, projects, communication, and progress.',
    },
    {
      id: 'booking-system',
      label: 'Booking System',
      icon: CalendarCheck,
      description: 'A structured booking experience for appointments, schedules, availability, and customer requests.',
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
    },
    {
      id: 'admin-panel',
      label: 'Admin Panel',
      icon: Settings,
      description: 'A centralized workspace for managing content, users, records, and important site operations.',
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
    },
    {
      id: 'client-portal',
      label: 'Client Portal',
      icon: KeyRound,
      description: 'A private client area for project updates, messages, files, reviews, and important information.',
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
    },
    {
      id: 'file-workspace',
      label: 'File Workspace',
      icon: FolderOpen,
      description: 'An organized area for accessing, reviewing, and sharing project-related files.',
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

const moreServices = [
  {
    name: 'Mobile App Creation',
    descriptor: 'Simple mobile-focused solutions designed around a specific workflow, service, or user need.',
    icon: Smartphone,
  },
  {
    name: 'Automation',
    descriptor: 'Practical workflow automation to reduce repetitive steps and make common tasks easier to manage.',
    icon: Zap,
  },
  {
    name: 'Social Media Solutions',
    descriptor: 'Digital support for organizing social media content, links, presentation, and online presence.',
    icon: Share2,
  },
  {
    name: 'Custom Digital Project',
    descriptor: 'A flexible option for ideas that do not fit neatly into a standard website, web app, or portal.',
    icon: Puzzle,
  },
]

function IconChip({ icon: Icon, tint = 'blue' }: { icon: LucideIcon; tint?: 'blue' | 'mint' }) {
  return (
    <span
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-md',
        tint === 'blue' ? 'bg-blue-50 text-[#1F6FEB]' : 'bg-[#eafaf4] text-[#1f9d7c]',
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
      <p className="text-xs font-semibold text-slate-700">Have a different idea?</p>
      <p className="mt-0.5 text-xs text-slate-500">
        Tell me what you have in mind, even if it does not fit one of the options above.
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
        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">{title}</h2>
          <p className="text-sm text-slate-500">{subtext}</p>
        </div>
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
            <MockupCarousel key={active.id} slides={active.slides} ariaLabel={`${title} — ${active.label} previews`} />
          </div>
          {rightFooter}
        </div>
      </div>
    </section>
  )
}

export function ServicesPage() {
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
            <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Services</p>
            <h1 className="mt-1 text-2xl leading-[1.15] font-extrabold tracking-tight text-[#122c52] sm:text-3xl lg:text-[2rem]">
              Solutions built around what you need.
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-snug text-slate-600 lg:max-w-none lg:pr-6">
              From websites and digital tools to custom client systems, explore the ways I can
              help bring an idea to life.
            </p>
          </div>

          <ClientLoginButton />
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
          {moreServices.map(({ name, descriptor, icon: Icon }) => (
            <Link
              key={name}
              to="/contact?intent=project"
              className="group flex items-center gap-3 rounded-md border border-slate-300/70 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <IconChip icon={Icon} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-slate-800">{name}</span>
                <span className="block text-xs text-slate-500">{descriptor}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1F6FEB]" />
            </Link>
          ))}
        </div>
      </section>

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
        <p>© 2024–2026 Alexis Sarip. All rights reserved.</p>
      </footer>
    </>
  )
}
