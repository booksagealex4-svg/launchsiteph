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
    desc: 'I believe digital experiences should be easy to understand, even for people who are not highly technical.',
    icon: Eye,
  },
  {
    title: 'Practicality',
    desc: 'I focus on solutions that are useful, manageable, and relevant to the real needs of the project.',
    icon: Hammer,
  },
  {
    title: 'Communication',
    desc: 'Clear updates and straightforward communication help projects stay organized and reduce confusion.',
    icon: MessageCircle,
  },
  {
    title: 'Consistency',
    desc: 'I value clean structure, dependable design systems, and experiences that feel intentional from beginning to end.',
    icon: ShieldCheck,
  },
]

const workSteps: { number: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    number: '01',
    title: 'Understand the Goal',
    desc: 'Start by understanding what the project needs to accomplish and who will use it.',
    icon: Ear,
  },
  {
    number: '02',
    title: 'Plan the Experience',
    desc: 'Organize the information, layout, navigation, and key actions before adding unnecessary complexity.',
    icon: ClipboardList,
  },
  {
    number: '03',
    title: 'Build and Refine',
    desc: 'Create the solution step by step, review the experience, and improve details as the project develops.',
    icon: Hammer,
  },
  {
    number: '04',
    title: 'Keep It Clear',
    desc: 'Present progress, feedback, and next steps in a way that is easy to follow.',
    icon: Sparkles,
  },
]

const strengthItems: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: 'Professional Website Design',
    desc: "Clean, responsive websites designed around the client's audience and goals.",
    icon: Globe,
  },
  {
    title: 'Web App & Portal Concepts',
    desc: 'Practical dashboards, client portals, trackers, and web-based management tools.',
    icon: KeyRound,
  },
  {
    title: 'Clear User Experience',
    desc: 'Layouts and navigation designed to be understandable and easy to use.',
    icon: Layers,
  },
  {
    title: 'Organized Project Communication',
    desc: 'A structured approach to updates, revisions, files, and project progress.',
    icon: MessageCircle,
  },
  {
    title: 'Digital Problem-Solving',
    desc: 'A practical approach to turning ideas or workflow problems into usable digital solutions.',
    icon: Workflow,
  },
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
    <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-accent)] uppercase">
            Multidisciplinary Freelancer
          </p>
          <h2 className="text-xl leading-snug font-extrabold text-slate-900 sm:text-2xl">
            Hi, I&apos;m Alex.
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            I&apos;m Alexis Sarip, a freelance digital creator and web developer based in the
            Philippines. I build professional websites, web applications, client portals, and
            practical digital systems designed to make information easier to understand, manage,
            and use.
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            My work combines visual design, user experience, and practical problem-solving. I
            focus on creating digital experiences that feel clear, organized, professional, and
            approachable — especially for clients who may not be highly technical.
          </p>

          <div className="mt-2 border-t border-slate-200/70 pt-3">
            <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-accent)] uppercase">
              More About Me
            </p>
            <p className="mt-1.5 text-[0.8rem] leading-relaxed text-slate-500">
              My background includes several years of work in book publishing, client
              communication, project coordination, digital design, and production support. Over
              time, I became increasingly involved in building websites, online tools, and
              digital workflows that could make everyday work simpler and more organized.
            </p>
            <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-500">
              Today, I continue to combine those experiences through freelance digital work —
              helping turn ideas into useful websites, portals, dashboards, and online experiences
              that are easier for people to navigate and understand.
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col rounded-lg border border-[var(--card-border-nested)] bg-[#F1F5F7] p-4">
          <p className="mb-1 text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-nested)] uppercase">
            Working Context
          </p>
          <div className="divide-y divide-slate-200/70">
            <TrustRow
              label="Certified Skills"
              value="LinkedIn Learning"
              micro="AI and digital skills training"
              icon={Award}
            />
            <TrustRow label="Replies" value="Usually within 24 hours" icon={Reply} />
            <TrustRow label="Availability" value="Remote" icon={Globe2} />
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
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-accent)] uppercase">
          LinkedIn Learning
        </p>
        <h2 className="mt-1 text-lg font-extrabold text-slate-900 sm:text-xl">
          Professional Learning &amp; Certifications
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Documented LinkedIn Learning course completions covering artificial intelligence,
          digital marketing, sales strategy, productivity, and practical digital workflows.
        </p>
        <div className="mt-4">
          <CertificationRail certifications={certifications} />
        </div>
      </section>

      {/* What I Value */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-accent)] uppercase">What I Value</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {valueItems.map((item) => (
            <ValueCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* How I Work */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-accent)] uppercase">How I Work</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workSteps.map((step) => (
            <WorkStepCard key={step.number} {...step} />
          ))}
        </div>
      </section>

      {/* Tools & Capabilities — reuses the exact approved homepage marquee */}
      <section className="mt-4">
        <p className="mb-3 text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-accent)] uppercase">
          Tools &amp; Capabilities
        </p>
        <TechMarquee />
      </section>

      {/* What I Can Bring to a Project */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-accent)] uppercase">
          What I Can Bring to a Project
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {strengthItems.map((item) => (
            <StrengthCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* Personal note — small editorial card, no fake quote styling */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F1F5F7] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] sm:p-5">
        <div className="flex items-start gap-3">
          <IconChip icon={PenLine} tint="mint" />
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
