import { useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Globe, AppWindow, Activity, Boxes, Layers, Sparkles, Rocket, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MockupCarousel, type MockupSlide } from '@/components/projects/MockupCarousel'
import { TechMarquee } from '@/components/sections/TechMarquee'
import { ClientLoginButton } from '@/components/ClientLoginButton'
import { cn } from '@/lib/utils'

function buildSlides(kind: MockupSlide['kind'], prefix: string, accents: string[], count: number): MockupSlide[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    kind,
    variant: (((i % 4) + 1) as 1 | 2 | 3 | 4),
    accent: accents[i % accents.length],
    label: `${prefix} preview ${i + 1}`,
  }))
}

const blueMint = ['#1F6FEB', '#1f9d7c', '#2563eb', '#0ea5e9', '#4f46e5', '#14b8a6']

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
    slides: buildSlides('website', 'Website', blueMint, 7),
  },
  {
    id: 'webapp',
    label: 'Web App',
    icon: AppWindow,
    carouselLabel: 'Web app project previews',
    slides: buildSlides('dashboard', 'Web app', blueMint, 6),
  },
  {
    id: 'tracker',
    label: 'Personal Tracker',
    icon: Activity,
    carouselLabel: 'Personal tracker project previews',
    slides: buildSlides('dashboard', 'Personal tracker', [...blueMint].reverse(), 6),
  },
  {
    id: 'type04',
    label: 'Project Type 04',
    icon: Boxes,
    carouselLabel: 'Project Type 04 previews',
    slides: buildSlides('generic', 'Project Type 04', ['#1F6FEB'], 5),
  },
  {
    id: 'type05',
    label: 'Project Type 05',
    icon: Layers,
    carouselLabel: 'Project Type 05 previews',
    slides: buildSlides('generic', 'Project Type 05', ['#1f9d7c'], 5),
  },
  {
    id: 'type06',
    label: 'Project Type 06',
    icon: Sparkles,
    carouselLabel: 'Project Type 06 previews',
    slides: buildSlides('generic', 'Project Type 06', ['#4f46e5'], 5),
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
                : 'border-slate-300/70 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB]',
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
            <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Projects</p>
            <h1 className="mt-1 text-2xl leading-[1.15] font-extrabold tracking-tight text-[#122c52] sm:text-3xl lg:text-[2rem]">
              Work you can explore.
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-snug text-slate-600 lg:max-w-none lg:pr-6">
              A collection of websites, digital solutions, and creative builds presented as
              interactive case studies.
            </p>
          </div>

          <ClientLoginButton />
        </div>
      </header>

      {/* Primary interactive showcase */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(220px,1fr)_2.8fr] lg:items-stretch lg:gap-6">
          <div className="flex min-w-0 flex-col lg:h-full">
            <CategoryTabs active={activeId} onChange={setActiveId} panelId={panelId} />
            <ProjectCTAs />
          </div>

          <div id={panelId} role="tabpanel" aria-labelledby={`category-tab-${active.id}`} className="min-w-0">
            <MockupCarousel key={active.id} slides={active.slides} ariaLabel={active.carouselLabel} />
          </div>
        </div>
      </section>

      {/* Tools — reuses the exact approved homepage marquee component */}
      <div className="mt-4">
        <TechMarquee />
      </div>
    </>
  )
}
