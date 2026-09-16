import type { LucideIcon } from 'lucide-react'
import {
  ShieldCheck,
  MessageCircle,
  Eye,
  Palette,
  CheckCircle2,
  Search,
  PenTool,
  RefreshCw,
  PackageCheck,
  LayoutTemplate,
  KeyRound,
  ArrowUpRight,
  Rocket,
  FileText,
  Send,
  Quote,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ClientLoginButton } from '@/components/ClientLoginButton'
import { cn } from '@/lib/utils'

const expectItems: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: 'Clear Communication',
    desc: 'Regular updates and straightforward answers throughout the process.',
    icon: MessageCircle,
  },
  {
    title: 'Visible Progress',
    desc: "You'll see how the work is coming together at each stage.",
    icon: Eye,
  },
  {
    title: 'Thoughtful Design',
    desc: 'Every build is considered around how it will actually be used.',
    icon: Palette,
  },
  {
    title: 'Honest Delivery',
    desc: "What's agreed on is what gets delivered, on a timeline discussed upfront.",
    icon: CheckCircle2,
  },
]

const processSteps: { number: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    number: '01',
    title: 'Understand',
    desc: "We start by talking through what you need and who it's for.",
    icon: Search,
  },
  {
    number: '02',
    title: 'Design',
    desc: 'A direction takes shape, tailored to your goals and niche.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'Review',
    desc: 'You give feedback and adjustments are made until it feels right.',
    icon: RefreshCw,
  },
  {
    number: '04',
    title: 'Deliver',
    desc: 'The finished work is handed off, ready to use.',
    icon: PackageCheck,
  },
]

const proofItems: { label: string; icon: LucideIcon }[] = [
  { label: 'Project Preview', icon: LayoutTemplate },
  { label: 'Design Iteration', icon: Palette },
  { label: 'Client Portal Update', icon: KeyRound },
  { label: 'Final Delivery', icon: PackageCheck },
]

const trustAccents = ['#1F6FEB', '#1f9d7c', '#2563eb', '#0ea5e9']

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

function TrustCard({
  title,
  desc,
  icon,
  accent,
}: {
  title: string
  desc: string
  icon: LucideIcon
  accent: string
}) {
  return (
    <div className="relative flex flex-col gap-2.5 overflow-hidden rounded-lg border border-slate-300/70 bg-white p-4 pt-5 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06)]">
      <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} aria-hidden="true" />
      <IconChip icon={icon} />
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <p className="text-sm leading-snug text-slate-500">{desc}</p>
    </div>
  )
}

function StepCard({ number, title, desc, icon: Icon }: { number: string; title: string; desc: string; icon: LucideIcon }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-300/70 bg-white p-4 pt-5 text-center shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06)]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#1F6FEB] bg-white text-sm font-bold text-[#1F6FEB]">
        {number}
      </span>
      <span className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 shrink-0 text-[#1f9d7c]" />
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      </span>
      <p className="text-sm leading-snug text-slate-500">{desc}</p>
    </div>
  )
}

function ProofCard({ label, icon: Icon }: { label: string; icon: LucideIcon }) {
  return (
    <Link
      to="/projects"
      className="group flex flex-col overflow-hidden rounded-lg border border-slate-300/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      {/* Browser-chrome frame — same abstract placeholder language as the approved Projects/Services mockups */}
      <div className="flex items-center gap-1.5 border-b border-slate-300/70 bg-slate-50 px-3 py-1.5">
        <span className="h-[6px] w-[6px] rounded-full bg-slate-300" />
        <span className="h-[6px] w-[6px] rounded-full bg-slate-300" />
        <span className="h-[6px] w-[6px] rounded-full bg-slate-300" />
      </div>
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-slate-50 p-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-slate-300 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
          <Icon className="h-4 w-4" />
        </span>
        <div className="h-1.5 w-2/5 rounded-sm bg-slate-200" />
        <div className="h-1.5 w-1/4 rounded-sm bg-slate-200/60" />
      </div>
      <div className="flex items-center justify-between gap-2 px-3.5 py-3">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1F6FEB]" />
      </div>
    </Link>
  )
}

function EmptyTestimonialCard() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-300/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)]">
      <Quote className="h-5 w-5 text-blue-100" aria-hidden="true" />
      <div className="space-y-1.5">
        <div className="h-2 w-2/5 rounded-sm bg-slate-200" />
        <div className="h-1.5 w-1/3 rounded-sm bg-slate-100" />
      </div>
      <div className="space-y-1.5">
        <div className="h-2 w-full rounded-sm bg-slate-100" />
        <div className="h-2 w-4/5 rounded-sm bg-slate-100" />
      </div>
      <p className="text-sm leading-relaxed text-slate-500">
        Client feedback will appear here once received and approved for publication.
      </p>
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[0.65rem] font-semibold text-[#1F6FEB]">
        <ShieldCheck className="h-3 w-3" />
        Verified feedback only
      </span>
    </div>
  )
}

export function TestimonialsPage() {
  return (
    <>
      {/* Page header — same compact family as Projects/Services */}
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
            <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">
              Client Experience
            </p>
            <h1 className="mt-1 text-2xl leading-[1.15] font-extrabold tracking-tight text-[#122c52] sm:text-3xl lg:text-[2rem]">
              Trust is built through the work.
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-snug text-slate-600 lg:max-w-none lg:pr-6">
              I believe credibility should come from clear communication, thoughtful work, and
              real client feedback, never invented reviews.
            </p>
          </div>

          <ClientLoginButton />
        </div>
      </header>

      {/* Transparency note */}
      <section className="mt-4 rounded-lg border border-blue-200/70 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-5">
        <div className="flex items-start gap-3">
          <IconChip icon={ShieldCheck} />
          <div>
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Real feedback, when it&apos;s real.
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Client testimonials will be added only when genuine feedback is received and
              permission is given to publish it.
            </p>
          </div>
        </div>
      </section>

      {/* What You Can Expect */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-accent)] uppercase">
          What You Can Expect
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {expectItems.map((item, i) => (
            <TrustCard key={item.title} {...item} accent={trustAccents[i % trustAccents.length]} />
          ))}
        </div>
      </section>

      {/* How the Experience Works */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-accent)] uppercase">
          How the Experience Works
        </p>
        <div className="relative isolate mt-3">
          {/* Connecting progression line — visible only in the gaps between step markers on desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[12.5%] top-[40px] -z-10 hidden h-px bg-slate-200 lg:block"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Proof Through the Work */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-accent)] uppercase">
          Proof Through the Work
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proofItems.map((item) => (
            <ProofCard key={item.label} {...item} />
          ))}
        </div>
      </section>

      {/* Client Feedback — testimonial-ready empty state */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[var(--card-border-accent)] uppercase">
          Client Feedback
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <EmptyTestimonialCard />
          <EmptyTestimonialCard />
          <EmptyTestimonialCard />
        </div>
      </section>

      {/* Optional feedback submission CTA — a trust invitation, deliberately quieter than the project CTAs below */}
      <section className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#F1F5F7] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] sm:p-5">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Worked with me before?</h3>
            <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
              If you&apos;d like to share feedback about your experience, I&apos;d be grateful to
              hear it.
            </p>
          </div>
          <Link
            to="/contact?intent=message"
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-[#1F6FEB]/25 bg-white px-3.5 py-2 text-sm font-semibold text-[#1F6FEB] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1F6FEB]/50 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <Send className="h-3.5 w-3.5 shrink-0" />
            Share Feedback
          </Link>
        </div>
      </section>

      {/* Bottom CTA — same action concepts approved on Projects/Services */}
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
