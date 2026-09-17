import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Award,
  MapPin,
  Video,
  Eye,
  ShieldCheck,
  Ear,
  ClipboardList,
  Hammer,
  Sparkles,
  Globe,
  Layers,
  KeyRound,
  Workflow,
  PenLine,
  Rocket,
  FileText,
  MessageCircle,
  Mail,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { CertificationRail } from '@/components/CertificationRail'
import { certifications } from '@/data/certifications'
import { cn } from '@/lib/utils'

const valueItems: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: 'Clarity',
    desc: 'Easy to understand, even for non-technical users.',
    icon: Eye,
  },
  {
    title: 'Practicality',
    desc: 'Useful, manageable solutions that fit real needs.',
    icon: Hammer,
  },
  {
    title: 'Communication',
    desc: 'Clear updates that keep projects on track.',
    icon: MessageCircle,
  },
  {
    title: 'Consistency',
    desc: 'Clean structure and intentional design throughout.',
    icon: ShieldCheck,
  },
]

const workSteps: { number: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    number: '01',
    title: 'Understand the Goal',
    desc: 'What the project needs to accomplish, and for whom.',
    icon: Ear,
  },
  {
    number: '02',
    title: 'Plan the Experience',
    desc: 'Organize layout, navigation, and key actions first.',
    icon: ClipboardList,
  },
  {
    number: '03',
    title: 'Build and Refine',
    desc: 'Build step by step, then review and improve.',
    icon: Hammer,
  },
  {
    number: '04',
    title: 'Keep It Clear',
    desc: 'Progress and next steps that are easy to follow.',
    icon: Sparkles,
  },
]

const strengthItems: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: 'Professional Website Design',
    desc: 'Clean, responsive sites built around your audience.',
    icon: Globe,
  },
  {
    title: 'Web App & Portal Concepts',
    desc: 'Dashboards, portals, and management tools.',
    icon: KeyRound,
  },
  {
    title: 'Clear User Experience',
    desc: 'Layouts that are simple and easy to use.',
    icon: Layers,
  },
  {
    title: 'Organized Communication',
    desc: 'Structured updates, files, and progress tracking.',
    icon: MessageCircle,
  },
  {
    title: 'Digital Problem-Solving',
    desc: 'Turning ideas into practical digital solutions.',
    icon: Workflow,
  },
]

/** Approved strong-icon language: solid blue backplate, white icon. */
function IconChip({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#1F6FEB] text-white">
      <Icon className="h-[18px] w-[18px]" />
    </span>
  )
}

/** Compact green/white section-title badge, used consistently for every remaining
 *  card heading on the About page. */
function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-[#128C4A] px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] text-white uppercase shadow-[0_1px_2px_rgba(15,23,42,0.15)]">
      {children}
    </span>
  )
}

/** Compact mini-item — small solid-blue icon, bold title, one short supporting line. */
function ValueCard({ title, desc, icon }: { title: string; desc: string; icon: LucideIcon }) {
  return (
    <div className="flex items-start gap-2.5 rounded-md border border-slate-200/70 bg-white p-2.5 transition-all duration-200 hover:border-blue-200">
      <IconChip icon={icon} />
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        <p className="text-xs leading-snug text-slate-500">{desc}</p>
      </div>
    </div>
  )
}

/** Compact numbered step — deliberately distinct from the Testimonials process cards. */
function WorkStepCard({ number, title, desc, icon: Icon }: { number: string; title: string; desc: string; icon: LucideIcon }) {
  return (
    <div className="flex items-start gap-2.5 rounded-md border border-slate-200/70 bg-white p-2.5 transition-all duration-200 hover:border-blue-200">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1F6FEB] text-xs font-bold text-white">
        {number}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5 shrink-0 text-[#1f9d7c]" />
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        </div>
        <p className="text-xs leading-snug text-slate-500">{desc}</p>
      </div>
    </div>
  )
}

function StrengthCard({ title, desc, icon }: { title: string; desc: string; icon: LucideIcon }) {
  return (
    <div className="flex items-start gap-2.5 rounded-md border border-slate-200/70 bg-white p-2.5 transition-all duration-200 hover:border-blue-200">
      <IconChip icon={icon} />
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        <p className="text-xs leading-snug text-slate-500">{desc}</p>
      </div>
    </div>
  )
}

/** Compact info-strip item — small solid-blue icon, micro-label, single-line value. */
function InfoRow({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: LucideIcon
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={cn('flex min-w-0 items-start gap-2', className)}>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#1F6FEB] text-white">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-[0.58rem] font-semibold tracking-[0.08em] whitespace-nowrap text-slate-400 uppercase">{label}</p>
        <p className="text-xs font-semibold whitespace-nowrap text-slate-700">{value}</p>
      </div>
    </div>
  )
}

/** Single unified About card — portrait, a short bio, and a compact
 *  certification/location/consultation/contact info strip, all in one composition. */
function AboutHeroCard() {
  return (
    <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <img
          src="/about-alex-portrait.png"
          alt="Alex, freelance digital creator"
          className="h-28 w-28 shrink-0 rounded-lg object-cover object-top shadow-[0_1px_2px_rgba(15,23,42,0.1)] sm:h-32 sm:w-32"
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm leading-relaxed text-slate-600">
            Hi, I&apos;m Alex! Founder of{' '}
            <a
              href="https://launchsiteph.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1F6FEB] underline decoration-[#1F6FEB]/30 underline-offset-2 transition-colors duration-200 hover:text-[#1a5fc9] hover:decoration-[#1F6FEB]"
            >
              LaunchSite PH
            </a>
            .
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
            I&apos;m a self-taught digital creator and web developer based in the Philippines,
            with several years of experience working with clients, including authors and
            publishing professionals. I use web development, AI, and practical digital tools to
            turn ideas into clear, useful solutions. I value continuous learning, hard work, clear
            communication, and building digital experiences that genuinely help people.
          </p>
        </div>
      </div>

      {/* Compact info strip — Certification/Location/Live Consultation flow as one
          continuous line, with clear breathing room before the CTA on the far right. */}
      <div className="mt-4 flex flex-col gap-3 border-t border-slate-200/70 pt-3.5 lg:flex-row lg:items-center lg:gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-5 sm:gap-y-2.5 lg:flex-1 xl:flex-nowrap xl:items-center xl:divide-x xl:divide-slate-200">
          <InfoRow icon={Award} label="Certification" value="LinkedIn Learning" />
          <InfoRow icon={MapPin} label="Location" value="Philippines · GMT+8" className="xl:pl-5" />
          <InfoRow
            icon={Video}
            label="Live Consultation"
            value="Available for phone and video project discussions"
            className="xl:pl-5"
          />
        </div>
        <Link
          to="/contact?intent=message"
          className="inline-flex items-center justify-center gap-1.5 self-start rounded-md bg-[#1F6FEB] px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] hover:shadow-[0_4px_10px_rgba(31,111,235,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 lg:ml-4 lg:shrink-0"
        >
          <MessageCircle className="h-3.5 w-3.5 shrink-0" />
          Send Me a Message
        </Link>
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <>
      {/* Page header — same compact family as Projects/Services/Testimonials */}
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
              About
            </span>
            <h1 className="mt-2 text-2xl leading-[1.15] font-extrabold tracking-tight text-[#122c52] sm:text-3xl lg:text-[2rem]">
              A little about the person behind the work.
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-snug text-slate-600 lg:max-w-none lg:pr-6">
              I build digital experiences with a focus on clarity, usefulness, and thoughtful
              execution.
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

      {/* Main About hero card */}
      <AboutHeroCard />

      {/* Certifications */}
      <section className="mt-3 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <SectionBadge>Certifications</SectionBadge>
        <p className="mt-2 text-sm text-slate-500">
          Professional learning and verified LinkedIn Learning credentials supporting my digital
          work.
        </p>
        <div className="mt-3">
          <CertificationRail certifications={certifications} />
        </div>
      </section>

      {/* What I Value */}
      <section className="mt-3 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-3.5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <SectionBadge>What I Value</SectionBadge>
        <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {valueItems.map((item) => (
            <ValueCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* How I Work */}
      <section className="mt-3 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-3.5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <SectionBadge>How I Work</SectionBadge>
        <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {workSteps.map((step) => (
            <WorkStepCard key={step.number} {...step} />
          ))}
        </div>
      </section>

      {/* What I Can Bring to a Project */}
      <section className="mt-3 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-3.5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <SectionBadge>What I Can Bring</SectionBadge>
        <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {strengthItems.map((item) => (
            <StrengthCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* Personal note — small editorial card, no fake quote styling */}
      <section className="mt-3 rounded-lg border border-[var(--card-border-accent)] bg-[#F1F5F7] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)]">
        <div className="flex items-start gap-3">
          <IconChip icon={PenLine} />
          <div>
            <h3 className="text-sm font-bold text-slate-900">A simple approach.</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              I enjoy projects where design and practical problem-solving come together. I
              don&apos;t believe every digital solution needs to be complicated. Often, the best
              experience is the one that makes things easier, clearer, and more comfortable for
              the people using it.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA — same action concepts approved on Projects/Services/Testimonials */}
      <section className="mt-3 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-5">
        <div className="flex flex-col items-center gap-3 text-center">
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
