import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Award,
  Briefcase,
  Clock,
  Compass,
  Globe2,
  MapPin,
  Reply,
  Eye,
  ShieldCheck,
  Palette,
  TrendingUp,
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
import { ClientLoginButton } from '@/components/ClientLoginButton'
import { TechMarquee } from '@/components/sections/TechMarquee'
import { CertificationRail } from '@/components/CertificationRail'
import { certifications } from '@/data/certifications'
import { cn } from '@/lib/utils'

const profileDetails: { label: string; value: string; icon: LucideIcon }[] = [
  { label: 'Role', value: 'Freelancer', icon: Briefcase },
  { label: 'Base', value: 'Philippines', icon: MapPin },
  { label: 'Timezone', value: 'GMT+8', icon: Clock },
  { label: 'Focus', value: 'Digital Experiences', icon: Compass },
]

const valueItems: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: 'Clarity',
    desc: 'Ideas and updates are communicated in plain, straightforward terms.',
    icon: Eye,
  },
  {
    title: 'Reliability',
    desc: 'Timelines and commitments are treated as things to be kept.',
    icon: ShieldCheck,
  },
  {
    title: 'Thoughtful Design',
    desc: 'Every decision is weighed against how the work will actually be used.',
    icon: Palette,
  },
  {
    title: 'Continuous Improvement',
    desc: 'Skills and process are refined project after project.',
    icon: TrendingUp,
  },
]

const workSteps: { number: string; title: string; desc: string; icon: LucideIcon }[] = [
  { number: '01', title: 'Listen', desc: 'Understanding what you need before proposing how to build it.', icon: Ear },
  { number: '02', title: 'Plan', desc: 'Mapping the approach so there are no surprises along the way.', icon: ClipboardList },
  { number: '03', title: 'Build', desc: 'Turning the plan into a working, polished result.', icon: Hammer },
  { number: '04', title: 'Refine', desc: 'Adjusting based on feedback until it feels right.', icon: Sparkles },
]

const strengthItems: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: 'Web Design', desc: 'Clean, professional homepage builds tailored to a niche.', icon: Globe },
  { title: 'Interactive Prototypes', desc: 'Clickable previews that show an idea before it is built.', icon: Layers },
  { title: 'Client Portals', desc: 'Private workspaces for clients to track progress.', icon: KeyRound },
  { title: 'Digital Workflows', desc: 'Practical tools and systems built around how a business runs.', icon: Workflow },
]

function IconChip({
  icon: Icon,
  tint = 'blue',
  size = 'md',
}: {
  icon: LucideIcon
  tint?: 'blue' | 'mint'
  size?: 'sm' | 'md'
}) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-md',
        size === 'sm' ? 'h-7 w-7' : 'h-9 w-9',
        tint === 'blue' ? 'bg-blue-50 text-[#1F6FEB]' : 'bg-[#eafaf4] text-[#1f9d7c]',
      )}
    >
      <Icon className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-[18px] w-[18px]'} />
    </span>
  )
}

function DetailCard({ label, value, icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-300/70 bg-white p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)]">
      <IconChip icon={icon} tint="mint" />
      <div className="min-w-0">
        <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  )
}

function ValueCard({ title, desc, icon }: { title: string; desc: string; icon: LucideIcon }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-slate-300/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06)]">
      <IconChip icon={icon} />
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <p className="text-sm leading-snug text-slate-500">{desc}</p>
    </div>
  )
}

/** Left-aligned, filled-marker variant — deliberately distinct from the Testimonials process cards. */
function WorkStepCard({ number, title, desc, icon: Icon }: { number: string; title: string; desc: string; icon: LucideIcon }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-slate-300/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1F6FEB] text-xs font-bold text-white">
          {number}
        </span>
        <Icon className="h-4 w-4 shrink-0 text-[#1f9d7c]" />
      </div>
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <p className="text-sm leading-snug text-slate-500">{desc}</p>
    </div>
  )
}

/** Local-JS-only Philippine time readout — no external API, updates on an interval. */
function useLocalTimeString(timeZone: string) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  return now.toLocaleTimeString('en-US', { timeZone, hour: 'numeric', minute: '2-digit' })
}

/** Compact credibility-panel row — icon, micro-label, strong value, optional supporting caption. */
function TrustRow({
  label,
  value,
  micro,
  icon,
}: {
  label: string
  value: ReactNode
  micro?: ReactNode
  icon: LucideIcon
}) {
  return (
    <div className="flex items-start gap-2.5 py-2.5 first:pt-0 last:pb-0">
      <IconChip icon={icon} tint="mint" size="sm" />
      <div className="min-w-0">
        <p className="text-[0.6rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">{label}</p>
        <p className="text-sm font-semibold text-slate-800">{value}</p>
        {micro ? <p className="mt-0.5 text-xs text-slate-500">{micro}</p> : null}
      </div>
    </div>
  )
}

function StrengthCard({ title, desc, icon }: { title: string; desc: string; icon: LucideIcon }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-300/70 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06)]">
      <IconChip icon={icon} />
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <p className="mt-0.5 text-sm leading-snug text-slate-500">{desc}</p>
      </div>
    </div>
  )
}

function AboutHeroCard() {
  const philippineTime = useLocalTimeString('Asia/Manila')

  return (
    <section className="mt-4 rounded-lg border border-slate-300 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">
            Multidisciplinary Freelancer
          </p>
          <h2 className="text-xl leading-snug font-extrabold text-slate-900 sm:text-2xl">
            Hi, I&apos;m Alex.
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            I&apos;m a freelancer based in the Philippines with a broad interest in building
            useful digital experiences. My work spans websites, web apps, client portals,
            trackers, digital workflows, automation, and creative projects.
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            I enjoy working across different parts of a project, from planning and visual
            design to implementation, refinement, and client-facing tools. Rather than focusing
            on only one discipline, I bring together multiple skills to help turn ideas into
            practical, polished digital experiences.
          </p>

          <div className="mt-2 border-t border-slate-200/70 pt-3">
            <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">
              More About Me
            </p>
            <p className="mt-1.5 text-[0.8rem] leading-relaxed text-slate-500">
              I enjoy learning how different digital tools, systems, and creative processes work
              together. That curiosity is a big part of how I approach projects. I like
              understanding the full picture, not just one piece of it.
            </p>
            <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-500">
              I&apos;m also comfortable adapting to different types of work and client needs.
              Whether the project involves design, development, digital organization, or
              something more custom, I like finding practical ways to turn an idea into something
              clear, useful, and presentable.
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col rounded-lg border border-slate-300/70 bg-slate-50/60 p-4">
          <p className="mb-1 text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">
            Working Context
          </p>
          <div className="divide-y divide-slate-200/70">
            <TrustRow
              label="Certified Skills"
              value="LinkedIn Learning certified"
              micro="AI and digital skills"
              icon={Award}
            />
            <TrustRow label="Response Time" value="Replies within 24 hours" icon={Reply} />
            <TrustRow
              label="Remote Work"
              value="Available across time zones"
              micro="Remote collaboration welcome"
              icon={Globe2}
            />
            <TrustRow
              label="Location"
              value={
                <>
                  Philippines <span className="font-normal text-slate-400">· GMT+8</span>
                </>
              }
              micro={`${philippineTime} local time`}
              icon={MapPin}
            />
          </div>

          <div className="mt-3 flex flex-1 flex-col justify-center border-t border-slate-200/70 pt-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                to="/contact?intent=message"
                className="group flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#1F6FEB] px-3 py-2 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] hover:shadow-[0_6px_14px_rgba(31,111,235,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                Send Me a Message
              </Link>
              <Link
                to="/contact?intent=email"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[#1F6FEB]/40 bg-white px-3 py-2 text-xs font-semibold text-[#1F6FEB] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1F6FEB]/70 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                Email Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick profile details */}
      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {profileDetails.map((item) => (
          <DetailCard key={item.label} {...item} />
        ))}
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <>
      {/* Page header — same compact family as Projects/Services/Testimonials */}
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
            <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">About</p>
            <h1 className="mt-1 text-2xl leading-[1.15] font-extrabold tracking-tight text-[#122c52] sm:text-3xl lg:text-[2rem]">
              A little about the person behind the work.
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-snug text-slate-600 lg:max-w-none lg:pr-6">
              I build digital experiences with a focus on clarity, usefulness, and thoughtful
              execution.
            </p>
          </div>

          <ClientLoginButton />
        </div>
      </header>

      {/* Main About hero card */}
      <AboutHeroCard />

      {/* Certifications */}
      <section className="mt-4 rounded-lg border border-slate-300 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">Certifications</p>
        <p className="mt-0.5 text-sm text-slate-500">Continuous learning through LinkedIn Learning.</p>
        <div className="mt-3">
          <CertificationRail certifications={certifications} />
        </div>
      </section>

      {/* What I Value */}
      <section className="mt-4 rounded-lg border border-slate-300 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">What I Value</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {valueItems.map((item) => (
            <ValueCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* How I Work */}
      <section className="mt-4 rounded-lg border border-slate-300 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">How I Work</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workSteps.map((step) => (
            <WorkStepCard key={step.number} {...step} />
          ))}
        </div>
      </section>

      {/* Tools & Capabilities — reuses the exact approved homepage marquee */}
      <section className="mt-4">
        <p className="mb-3 text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">
          Tools &amp; Capabilities
        </p>
        <TechMarquee />
      </section>

      {/* What I Can Bring to a Project */}
      <section className="mt-4 rounded-lg border border-slate-300 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">
          What I Can Bring to a Project
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {strengthItems.map((item) => (
            <StrengthCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* Personal note — small editorial card, no fake quote styling */}
      <section className="mt-4 rounded-lg border border-slate-300/70 bg-[#f7fafc] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] sm:p-5">
        <div className="flex items-start gap-3">
          <IconChip icon={PenLine} tint="mint" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">A simple approach.</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Good work should be clear, useful, and easy to understand, both for the client and
              the people who will eventually use it.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA — same action concepts approved on Projects/Services/Testimonials */}
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
