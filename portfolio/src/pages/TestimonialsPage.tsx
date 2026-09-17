import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  MessageSquare,
  Send,
  MessageCircle,
  FileText,
  RefreshCw,
  Handshake,
  PackageCheck,
  Mail,
  Phone,
  Video,
  ArrowUpRight,
} from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const processSteps: {
  number: string
  title: string
  desc: string
  icon: LucideIcon
  highlight?: boolean
}[] = [
  { number: '1', title: 'Send Your Idea', desc: 'Tell me what you want to build and what you need help with.', icon: Send },
  { number: '2', title: "Let's Discuss It", desc: 'We can talk by email, phone, WhatsApp, or video call to make sure I understand your idea.', icon: MessageCircle },
  {
    number: '3',
    title: 'Free Concept Mockup',
    desc: 'If you already have an idea, I can prepare a sample mockup so you can see how I might approach your project.',
    icon: FileText,
    highlight: true,
  },
  { number: '4', title: 'Review the Mockup', desc: 'We review the concept together and discuss what you like, what needs changing, and what the final project should include.', icon: RefreshCw },
  {
    number: '5',
    title: 'We Agree First',
    desc: 'No official project begins until we have discussed the scope, expectations, and important details, and both sides agree to move forward.',
    icon: Handshake,
    highlight: true,
  },
  { number: '6', title: 'Build, Review, Deliver', desc: 'Once we agree to move forward, I build the project, keep you updated, review changes with you, and deliver the approved final work.', icon: PackageCheck },
]

const talkItems: { label: string; desc: string; icon: LucideIcon }[] = [
  { label: 'Email', desc: 'Send project details', icon: Mail },
  { label: 'WhatsApp', desc: 'Quick project conversation', icon: MessageCircle },
  { label: 'Phone Call', desc: 'Direct discussion', icon: Phone },
  { label: 'Video Call', desc: 'Face-to-face project discussion online', icon: Video },
]

const serviceOptions = [
  'Website',
  'Web App',
  'Client Portal',
  'Personal Tracker',
  'Business Website',
  'Custom Digital Project',
  'Other',
]

// Icon backplates use each brand's real solid color with a white glyph, matching the
// approved Home-page Contact card treatment exactly.
const contactMethods: {
  label: string
  action: string
  href: string
  icon: LucideIcon | typeof FaWhatsapp
  bg: string
  hoverBg: string
  hoverBorder: string
}[] = [
  {
    label: 'Email',
    action: 'Message Me',
    href: 'mailto:booksage.alex5@gmail.com',
    icon: Mail,
    bg: '#E14F45',
    hoverBg: '#FDF1EF',
    hoverBorder: '#F3C7BD',
  },
  {
    label: 'WhatsApp',
    action: 'Start a Chat',
    href: 'https://wa.me/639096439567',
    icon: FaWhatsapp,
    bg: '#25D366',
    hoverBg: '#EAFBF1',
    hoverBorder: '#BEEAD1',
  },
  {
    label: 'LinkedIn',
    action: 'View Profile',
    href: 'https://www.linkedin.com/in/alexis-sarip-a46442428/',
    icon: FaLinkedinIn,
    bg: '#0A66C2',
    hoverBg: '#EAF3FC',
    hoverBorder: '#BFDCF3',
  },
]

/** Approved strong-icon language: solid blue backplate, white icon. */
function IconChip({ icon: Icon, size = 'md' }: { icon: LucideIcon; size?: 'md' | 'sm' }) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-md bg-[#1F6FEB] text-white',
        size === 'md' ? 'h-9 w-9' : 'h-8 w-8',
      )}
    >
      <Icon className={size === 'md' ? 'h-[18px] w-[18px]' : 'h-4 w-4'} />
    </span>
  )
}

/** Compact green/white section-title badge, used consistently for every card heading on this page. */
function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-[#128C4A] px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] text-white uppercase shadow-[0_1px_2px_rgba(15,23,42,0.15)]">
      {children}
    </span>
  )
}

function StepCard({ number, title, desc, icon, highlight }: { number: string; title: string; desc: string; icon: LucideIcon; highlight?: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1.5 rounded-md border bg-white p-3.5 text-center transition-all duration-200 hover:-translate-y-0.5',
        highlight
          ? 'border-[#1F6FEB]/50 bg-blue-50/30 shadow-[0_1px_2px_rgba(15,23,42,0.05)] hover:border-[#1F6FEB]/70 hover:shadow-[0_4px_10px_rgba(15,23,42,0.08)]'
          : 'border-[var(--card-border-nested)]/40 hover:border-[var(--card-border-nested)]/70 hover:shadow-[0_4px_10px_rgba(15,23,42,0.06)]',
      )}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1F6FEB] text-[0.65rem] font-bold text-white">
        {number}
      </span>
      <IconChip icon={icon} />
      <h3 className="text-sm font-bold text-slate-800">{title}</h3>
      <p className="text-xs leading-snug text-slate-500">{desc}</p>
    </div>
  )
}

function TalkItem({ label, desc, icon }: { label: string; desc: string; icon: LucideIcon }) {
  return (
    <div className="flex items-center gap-2.5 rounded-md border border-[var(--card-border-nested)]/40 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--card-border-nested)]/70 hover:shadow-[0_4px_10px_rgba(15,23,42,0.06)]">
      <IconChip icon={icon} />
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-800">{label}</p>
        <p className="text-xs leading-snug text-slate-500">{desc}</p>
      </div>
    </div>
  )
}

/** Clickable contact row — same brand-color icon + hover-tint treatment approved on the
 *  Home page Contact card, reused here so both pages share one visual language. */
function ContactRow({
  label,
  action,
  href,
  icon: Icon,
  bg,
  hoverBg,
  hoverBorder,
}: {
  label: string
  action: string
  href: string
  icon: LucideIcon | typeof FaWhatsapp
  bg: string
  hoverBg: string
  hoverBorder: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={`${label} — ${action}`}
      style={{ '--hover-bg': hoverBg, '--hover-border': hoverBorder } as CSSProperties}
      className="group/row flex items-center gap-3 rounded-md border border-[var(--card-border-nested)]/40 bg-white px-3 py-2.5 transition-all duration-200 ease-out hover:-translate-y-px hover:border-[var(--hover-border)] hover:bg-[var(--hover-bg)] hover:shadow-[0_3px_8px_rgba(15,23,42,0.08)] focus-visible:-translate-y-px focus-visible:border-[var(--hover-border)] focus-visible:bg-[var(--hover-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white shadow-[0_1px_2px_rgba(15,23,42,0.15)]"
        style={{ backgroundColor: bg }}
      >
        <Icon className="h-[15px] w-[15px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.65rem] font-medium tracking-wide text-slate-500 uppercase">{label}</span>
        <span className="block truncate text-sm font-semibold text-slate-800 transition-colors duration-200 group-hover/row:text-slate-900">
          {action}
        </span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-all duration-200 ease-out group-hover/row:translate-x-1 group-hover/row:text-slate-600" />
    </a>
  )
}

export function TestimonialsPage() {
  const [errors, setErrors] = useState<{ name?: string; email?: string; service?: string; idea?: string }>({})
  const [submitted, setSubmitted] = useState(false)

  const fieldBaseClass =
    'w-full rounded-md border bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-100 focus:outline-none'
  const fieldNeutralClass = 'border-[#C7D2E0] focus:border-[#1F6FEB]'
  const fieldErrorClass = 'border-red-400 focus:border-red-400'

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('idea-name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('idea-email') as HTMLInputElement).value.trim()
    const service = (form.elements.namedItem('idea-service') as HTMLSelectElement).value
    const idea = (form.elements.namedItem('idea-message') as HTMLTextAreaElement).value.trim()

    const nextErrors: typeof errors = {}
    if (!name) nextErrors.name = 'Please enter your name.'
    if (!email) nextErrors.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Please enter a valid email address.'
    if (!service) nextErrors.service = 'Please select a service.'
    if (!idea) nextErrors.idea = 'Please tell me about your project idea.'

    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
  }

  return (
    <>
      {/* Page header — same compact family as Projects/Services/About */}
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
              How It Works
            </span>
            <h1 className="mt-2 text-2xl leading-[1.15] font-extrabold tracking-tight text-[#122c52] sm:text-3xl lg:text-[2rem]">
              Trust is built through the work.
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-snug text-slate-600 lg:max-w-none lg:pr-6">
              See how we can discuss your idea, review a free concept mockup, and agree on the
              project before any official work begins.
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

      {/* Compact project-start strip */}
      <section className="mt-3 rounded-lg border border-[var(--card-border-accent)] bg-white p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_10px_rgba(15,23,42,0.08)] sm:p-4">
        <div className="flex items-center gap-3">
          <IconChip icon={MessageSquare} />
          <div className="min-w-0">
            <h2 className="text-[0.65rem] font-bold tracking-[0.12em] text-slate-800 uppercase">
              Start With a Conversation
            </h2>
            <p className="text-sm leading-snug text-slate-600">
              You can contact me by email, phone, WhatsApp, or video call so we can talk about
              your idea before anything begins.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works — main process */}
      <section className="mt-3 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-3.5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <SectionBadge>How It Works</SectionBadge>
        <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </section>

      {/* Ways We Can Talk */}
      <section className="mt-3 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-3.5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)]">
        <SectionBadge>Ways We Can Talk</SectionBadge>
        <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {talkItems.map((item) => (
            <TalkItem key={item.label} {...item} />
          ))}
        </div>
      </section>

      {/* Have an Idea Already? — free mockup explanation + simple inquiry form */}
      <section className="mt-3 rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-3.5 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-4">
        <SectionBadge>Have an Idea Already?</SectionBadge>
        <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start">
          {/* Left — free mockup explanation + direct contact information */}
          <div className="flex flex-col gap-3">
            <div className="rounded-md border border-[var(--card-border-nested)]/40 bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--card-border-nested)]/70 hover:shadow-[0_4px_10px_rgba(15,23,42,0.06)]">
              <div className="flex items-start gap-3">
                <IconChip icon={FileText} />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-800">Want to test my approach first?</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Send me your idea and I can prepare a free concept mockup so you can see how I
                    understand your project before deciding whether to move forward.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-md border border-[var(--card-border-nested)]/40 bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--card-border-nested)]/70 hover:shadow-[0_4px_10px_rgba(15,23,42,0.06)]">
              <div className="flex items-start gap-3">
                <IconChip icon={Handshake} />
                <p className="text-sm leading-relaxed text-slate-600">
                  No official project begins until we have discussed the work and both sides
                  agree.
                </p>
              </div>
            </div>

            {/* Direct contact — same brand-color hover language approved on the Home page */}
            <div className="flex flex-col gap-2">
              {contactMethods.map((method) => (
                <ContactRow key={method.label} {...method} />
              ))}
            </div>
          </div>

          {/* Right — simple inquiry form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-md border border-[var(--card-border-nested)]/40 bg-white p-3.5"
          >
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="idea-name" className="mb-1 block text-sm font-semibold text-slate-700">
                  Name
                </label>
                <input
                  id="idea-name"
                  type="text"
                  name="idea-name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'idea-name-error' : undefined}
                  className={cn(fieldBaseClass, errors.name ? fieldErrorClass : fieldNeutralClass)}
                  placeholder="Full name"
                />
                {errors.name ? (
                  <p id="idea-name-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="idea-email" className="mb-1 block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  id="idea-email"
                  type="email"
                  name="idea-email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'idea-email-error' : undefined}
                  className={cn(fieldBaseClass, errors.email ? fieldErrorClass : fieldNeutralClass)}
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p id="idea-email-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="idea-service" className="mb-1 block text-sm font-semibold text-slate-700">
                  Service
                </label>
                <select
                  id="idea-service"
                  name="idea-service"
                  defaultValue=""
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? 'idea-service-error' : undefined}
                  className={cn(fieldBaseClass, errors.service ? fieldErrorClass : fieldNeutralClass)}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.service ? (
                  <p id="idea-service-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.service}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="idea-message" className="mb-1 block text-sm font-semibold text-slate-700">
                  Message / Project Idea
                </label>
                <textarea
                  id="idea-message"
                  name="idea-message"
                  rows={3}
                  aria-invalid={!!errors.idea}
                  aria-describedby={errors.idea ? 'idea-message-error' : 'idea-message-helper'}
                  className={cn('resize-none', fieldBaseClass, errors.idea ? fieldErrorClass : fieldNeutralClass)}
                />
                {errors.idea ? (
                  <p id="idea-message-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.idea}
                  </p>
                ) : (
                  <p id="idea-message-helper" className="mt-1 text-xs text-slate-500">
                    Tell me what you want to build, what it is for, and anything you want included
                    in the mockup.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1F6FEB] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.32)] transition-all duration-200 hover:-translate-y-[1.5px] hover:bg-[#1a5fc9] hover:shadow-[0_8px_20px_rgba(31,111,235,0.38)] active:translate-y-0 active:shadow-[0_4px_14px_rgba(31,111,235,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <Send className="h-4 w-4 shrink-0" />
                Send My Idea
              </button>
              {submitted ? (
                <p className="text-xs text-slate-500">
                  Your message form is ready, but message delivery will be connected when the site
                  contact system is activated.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </section>

      <footer className="flex flex-col items-center gap-1 py-3 text-center text-xs text-muted-foreground">
        <p>© 2026 Alexis Sarip. All rights reserved.</p>
      </footer>
    </>
  )
}
