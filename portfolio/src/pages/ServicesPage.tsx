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

function buildSlides(kind: MockupSlide['kind'], prefix: string, accent: string, count: number): MockupSlide[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    kind,
    variant: (((i % 4) + 1) as 1 | 2 | 3 | 4),
    accent,
    label: `${prefix} preview ${i + 1}`,
  }))
}

const blueMint = ['#1F6FEB', '#1f9d7c', '#2563eb', '#0ea5e9', '#4f46e5', '#14b8a6']

interface ShowcaseCategory extends SelectorCategory {
  slides: MockupSlide[]
}

function withSlides(
  kind: MockupSlide['kind'],
  items: { id: string; label: string; icon: LucideIcon }[],
  count: number,
): ShowcaseCategory[] {
  return items.map((item, i) => ({
    ...item,
    slides: buildSlides(kind, item.label, blueMint[i % blueMint.length], count),
  }))
}

const websiteCategories = withSlides(
  'website',
  [
    { id: 'authors', label: 'Authors', icon: BookOpen },
    { id: 'cafes', label: 'Cafes', icon: Coffee },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { id: 'bakeries', label: 'Bakeries', icon: Cookie },
    { id: 'barber-shops', label: 'Barber Shops', icon: Scissors },
    { id: 'real-estate', label: 'Real Estate', icon: Building2 },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'automotive', label: 'Automotive', icon: Car },
    { id: 'online-shops', label: 'Online Shops', icon: ShoppingBag },
    { id: 'other-business', label: 'Other Business', icon: Briefcase },
  ],
  7,
)

const webAppCategories = withSlides(
  'dashboard',
  [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'client-management', label: 'Client Management', icon: Users },
    { id: 'booking-system', label: 'Booking System', icon: CalendarCheck },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'member-portal', label: 'Member Portal', icon: IdCard },
    { id: 'admin-panel', label: 'Admin Panel', icon: Settings },
  ],
  6,
)

const trackerCategories = withSlides(
  'dashboard',
  [
    { id: 'project-tracker', label: 'Project Tracker', icon: ListChecks },
    { id: 'client-portal', label: 'Client Portal', icon: KeyRound },
    { id: 'author-portal', label: 'Author Portal', icon: BookUser },
    { id: 'progress-dashboard', label: 'Progress Dashboard', icon: TrendingUp },
    { id: 'file-workspace', label: 'File Workspace', icon: FolderOpen },
    { id: 'custom-tracker', label: 'Custom Tracker', icon: Sliders },
  ],
  6,
)

const moreServices = [
  { name: 'Mobile App Creation', descriptor: 'Short descriptor placeholder', icon: Smartphone },
  { name: 'Automation', descriptor: 'Short descriptor placeholder', icon: Zap },
  { name: 'Social Media Solutions', descriptor: 'Short descriptor placeholder', icon: Share2 },
  { name: 'Custom Digital Project', descriptor: 'Short descriptor placeholder', icon: Puzzle },
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
    <div className="flex items-center gap-1.5 rounded-md border border-slate-300/70 bg-white p-1 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] transition-colors duration-200 focus-within:border-blue-300">
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
    <section className="rounded-lg border border-slate-300 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-5">
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
      <header className="relative overflow-hidden rounded-lg border border-slate-300/60 bg-[#fdfbf7] px-5 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:px-6 sm:py-4">
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
      <div className="mt-4 rounded-lg border border-slate-300/80 bg-[#e9f1fb] p-3 shadow-[0_2px_4px_rgba(15,23,42,0.04),0_16px_32px_rgba(15,23,42,0.05)] sm:p-4">
        <div className="flex flex-col gap-4">
          <ServiceShowcase
            icon={Globe}
            title="Advanced Website Design"
            subtext="Polished homepage builds tailored to your niche."
            categories={websiteCategories}
            rightFooter={<WebsiteIdeaBar />}
          />
          <ServiceShowcase
            icon={LayoutDashboard}
            tint="mint"
            title="Web App Creation"
            subtext="Interfaces and tools built around how your business runs."
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
            subtext="A private workspace for clients to follow progress and stay updated."
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
      <section className="mt-4 rounded-lg border border-slate-300 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">More Ways I Can Help</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {moreServices.map(({ name, descriptor, icon: Icon }) => (
            <a
              key={name}
              href="#"
              className="group flex items-center gap-3 rounded-md border border-slate-300/70 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <IconChip icon={Icon} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-slate-800">{name}</span>
                <span className="block text-xs text-slate-500">{descriptor}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1F6FEB]" />
            </a>
          ))}
        </div>
      </section>

      {/* Bottom CTA — same action concepts approved on Projects */}
      <section className="mt-4 rounded-lg border border-slate-300 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-6">
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
        <p>© Year Placeholder · Full Name Placeholder · All rights reserved</p>
      </footer>
    </>
  )
}
