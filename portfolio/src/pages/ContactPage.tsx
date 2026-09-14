import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Globe,
  LayoutDashboard,
  ListChecks,
  KeyRound,
  Zap,
  Smartphone,
  FileText,
  Puzzle,
  Send,
  ChevronDown,
  Clock,
  Globe2,
  WalletCards,
  Workflow,
  Wallet,
  SplitSquareHorizontal,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { ClientLoginButton } from '@/components/ClientLoginButton'
import { cn } from '@/lib/utils'

/** Shared shell for every FAQ/Contact card — compact padding, with a restrained hover lift
 *  (structural, not clickable). No fixed height here: FAQs opts into `lg:flex-1` to fill its
 *  column, the other three cards simply size to their (unchanged) content. */
const cardShellClass =
  'flex min-h-0 flex-col rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_10px_rgba(15,23,42,0.1),0_14px_28px_rgba(15,23,42,0.09)] hover:ring-1 hover:ring-[var(--card-border-accent)]/25'

const nestedRowClass = 'rounded-md border border-[var(--card-border-nested)]/35 bg-white'

/** Strong-green backplate title — replaces red card-title text on this page only. `self-start`
 *  keeps it hugging its own text instead of stretching full-width as a flex-col child. Static
 *  (non-interactive), per spec, so no hover treatment is applied. */
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="inline-block self-start rounded-md border border-[#0F6E52] bg-[#178A68] px-2.5 py-1 text-xs font-bold text-white shadow-[0_2px_6px_rgba(15,110,82,0.25)]">
      {children}
    </div>
  )
}

const projectOptions: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'web-app', label: 'Web App', icon: LayoutDashboard },
  { id: 'tracker', label: 'Personal Tracker', icon: ListChecks },
  { id: 'client-portal', label: 'Client Portal', icon: KeyRound },
  { id: 'automation', label: 'Automation', icon: Zap },
  { id: 'mobile-app', label: 'Mobile App', icon: Smartphone },
  { id: 'mockup', label: 'Free Mockup', icon: FileText },
  { id: 'custom', label: 'Custom Project', icon: Puzzle },
]

const paymentOptions: { id: string; label: string; helper: string; icon: LucideIcon }[] = [
  {
    id: 'full',
    label: 'Pay in Full',
    helper: 'Full amount before work begins.',
    icon: Wallet,
  },
  {
    id: 'half',
    label: '50/50 Payment',
    helper: '50% to begin, 50% after completion.',
    icon: SplitSquareHorizontal,
  },
]

const beforeYouReachOut: { label: string; value: string; icon: LucideIcon }[] = [
  { label: 'Response Time', value: 'Usually within 24 hours', icon: Clock },
  { label: 'Availability', value: 'Remote', icon: Globe2 },
  { label: 'Payment Options', value: 'Pay in full or 50/50', icon: WalletCards },
  { label: 'Project Process', value: 'Review → Clarify → Scope → Begin', icon: Workflow },
]

const whatHappensNext = [
  { number: '01', text: 'Review' },
  { number: '02', text: 'Clarify' },
  { number: '03', text: 'Scope & Next Steps' },
]

const intentToProjectId: Record<string, string> = {
  mockup: 'mockup',
  'web-app': 'web-app',
  tracker: 'tracker',
  project: 'custom',
}

interface FaqItem {
  id: string
  question: string
  answer: ReactNode
}

const faqItems: FaqItem[] = [
  {
    id: 'what-can-you-build',
    question: 'What can you build for me?',
    answer: (
      <p>
        I can help with professional websites, web applications, client portals, dashboards,
        personal trackers, automation concepts, and other custom digital projects. If your idea
        does not fit one of these categories, you can still send it to me and we can discuss what
        makes sense.
      </p>
    ),
  },
  {
    id: 'technical-knowledge',
    question: 'Do I need to understand technology first?',
    answer: (
      <p>
        No. You do not need to know technical terms or decide which technology should be used.
        Explain what you want to accomplish, and I can help translate the idea into a practical
        digital solution.
      </p>
    ),
  },
  {
    id: 'payments',
    question: 'How do payments work?',
    answer: (
      <div className="flex flex-col gap-1.5">
        <div>
          <p className="font-bold text-slate-800">Option 1 — Pay in Full</p>
          <p className="leading-snug text-slate-600">Pay the full agreed project amount before work begins.</p>
        </div>
        <div>
          <p className="font-bold text-slate-800">Option 2 — 50/50 Payment</p>
          <p className="leading-snug text-slate-600">
            Pay 50% to officially begin the project and the remaining 50% after the agreed work is
            completed.
          </p>
        </div>
        <div>
          <p className="font-bold text-slate-800">Payment Method</p>
          <p className="leading-snug text-slate-600">
            Direct bank payment, invoice/payment link, or another mutually agreed method that
            works for both sides.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'free-mockup',
    question: 'Can I request a free mockup?',
    answer: (
      <p>
        For suitable projects, I may prepare a simple visual mockup so you can better understand
        the proposed direction before moving forward. A mockup is not guaranteed for every inquiry
        and does not represent a complete finished project.
      </p>
    ),
  },
  {
    id: 'response-time',
    question: 'How soon will you respond?',
    answer: (
      <p>
        I usually respond within 24 hours. If I need more information about your request, I may
        ask a few simple questions before recommending the next step.
      </p>
    ),
  },
  {
    id: 'outside-philippines',
    question: 'Can you work with clients outside the Philippines?',
    answer: (
      <p>
        Yes. I work remotely and can communicate with clients in different locations and time
        zones. I am based in the Philippines, GMT+8.
      </p>
    ),
  },
  {
    id: 'after-you-send',
    question: 'What happens after I send my request?',
    answer: (
      <p>
        I review your message first. I may reply with questions or recommendations. If the
        project appears to be a good fit, we can then discuss the scope, expected work, timeline,
        payment option, and next steps.
      </p>
    ),
  },
]

/** Project-interest chip — default light-neutral/blue-border, pale-blue hover with a slight
 *  lift, strong blue fill with white text/icon when selected. */
function CategoryChip({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string
  icon: LucideIcon
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-md border px-2 py-1 text-[0.7rem] font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
        active
          ? 'border-[#1F6FEB] bg-[#1F6FEB] text-white shadow-[0_2px_8px_rgba(31,111,235,0.28)]'
          : 'border-[#1F6FEB]/30 bg-white text-slate-700 hover:-translate-y-px hover:border-[#1F6FEB]/60 hover:bg-blue-50 hover:shadow-[0_2px_6px_rgba(31,111,235,0.14)]',
      )}
    >
      <Icon className="h-3 w-3 shrink-0" />
      {label}
    </button>
  )
}

/** Payment-preference card — same default/hover/selected hierarchy as CategoryChip, with
 *  room for helper copy and an icon that turns white when selected. */
function PaymentOptionCard({
  label,
  helper,
  icon: Icon,
  active,
  onClick,
}: {
  label: string
  helper: string
  icon: LucideIcon
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center gap-2 rounded-md border px-2.5 py-2 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
        active
          ? 'border-[#1F6FEB] bg-[#1F6FEB] shadow-[0_4px_12px_rgba(31,111,235,0.3)]'
          : 'border-[#1F6FEB]/30 bg-white hover:-translate-y-px hover:bg-blue-50 hover:shadow-[0_4px_10px_rgba(15,23,42,0.08)]',
      )}
    >
      <span
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
          active ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#1F6FEB]',
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="min-w-0">
        <span className={cn('block text-xs font-semibold', active ? 'text-white' : 'text-slate-700')}>{label}</span>
        <span className={cn('block text-[0.65rem] leading-snug', active ? 'text-blue-50' : 'text-slate-500')}>
          {helper}
        </span>
      </span>
    </button>
  )
}

/** Inline-expanding accordion — clicking a question expands its answer directly beneath it
 *  (not in a separate viewer elsewhere), so it is unambiguous to a non-technical visitor which
 *  answer belongs to which question. The FAQ card now has an entire column's worth of height to
 *  work with (see the layout below), so even the longest answer expanding in place never pushes
 *  the page past the viewport. CSS grid-rows animates height without measuring, and respects
 *  prefers-reduced-motion automatically via the motion-reduce: variant. */
function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="flex flex-col divide-y divide-slate-200/70">
      {items.map((item, idx) => {
        const isOpen = openId === item.id
        const buttonId = `faq-button-${item.id}`
        const panelId = `faq-panel-${item.id}`

        return (
          <div key={item.id} className={cn('rounded-md transition-colors duration-200', isOpen && 'bg-[#F3F7FD]')}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId((v) => (v === item.id ? null : item.id))}
                className="group flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-left transition-colors duration-200 hover:bg-[#EEF3FB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <span className="flex min-w-0 items-baseline gap-2.5">
                  <span className="text-xs font-bold text-[#DC2626]">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-sm leading-snug font-semibold text-slate-800 transition-colors duration-200 group-hover:text-slate-900">
                    {item.question}
                  </span>
                </span>
                <span
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#1F6FEB] transition-all duration-200 group-hover:bg-blue-100',
                    isOpen && 'bg-[#1F6FEB] text-white',
                  )}
                >
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      'h-3 w-3 transition-transform duration-200 motion-reduce:transition-none',
                      isOpen && 'rotate-180',
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    'px-2 pt-0 pb-3 pl-[2.15rem] text-sm leading-relaxed text-slate-600 transition-opacity duration-200 motion-reduce:transition-none',
                    isOpen ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ContactPage() {
  const [searchParams] = useSearchParams()
  const intent = searchParams.get('intent')

  const [projectInterest, setProjectInterest] = useState<string | null>(
    () => intentToProjectId[intent ?? ''] ?? null,
  )
  const [paymentPreference, setPaymentPreference] = useState<string | null>(null)
  const [freeMockupRequested, setFreeMockupRequested] = useState(() => intent === 'mockup')
  const [errors, setErrors] = useState<{ name?: string; email?: string; details?: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const emailContext = intent === 'email'
  const emailInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (intent === 'message') textareaRef.current?.focus()
    if (intent === 'email') emailInputRef.current?.focus()
    // Only ever run this once, for the intent the page was opened with.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const details = (form.elements.namedItem('details') as HTMLTextAreaElement).value.trim()

    const nextErrors: typeof errors = {}
    if (!name) nextErrors.name = 'Please enter your name.'
    if (!email) nextErrors.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Please enter a valid email address.'
    if (!details) nextErrors.details = 'Please tell me a little about your idea.'

    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
  }

  const fieldBaseClass =
    'w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-100 focus:outline-none'
  const fieldNeutralClass = 'border-[#C7D2E0] focus:border-[#1F6FEB]'
  const fieldErrorClass = 'border-red-400 focus:border-red-400'

  return (
    <>
      {/* Page header — compact: eyebrow + heading + one-line supporting copy only */}
      <header className="relative overflow-hidden rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:px-6">
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

        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">FAQs / Contact</p>
            <h1 className="text-xl leading-[1.2] font-extrabold tracking-tight text-[#122c52] sm:text-2xl">
              Questions first. Your idea next.
            </h1>
            <p className="text-xs leading-snug text-slate-600 sm:text-sm">
              Find quick answers or tell me what you would like to build. You do not need
              technical terms.
            </p>
          </div>

          <ClientLoginButton />
        </div>
      </header>

      {/* Main FAQ / Contact workspace — two independent columns (not a row-locked grid): the
          left column gives FAQs nearly all of its height and Before You Reach Out just a
          compact strip; the right column (unchanged) stacks Your Project + Project
          Preferences. `lg:items-stretch` makes both columns match the taller one (the right
          column, whose content is fixed), so the FAQ card's `lg:flex-1` always resolves against
          a stable height no matter which question is expanded.

          Below `lg:`, both column wrappers switch to `display:contents` — they stop generating
          a box and their cards become direct items of this single-column grid, so `order-*` on
          each card controls the mobile/tablet stacking sequence independently of the desktop
          column grouping. No content is duplicated; the same four <section> elements just get
          reflowed by CSS at each breakpoint. */}
      <div className="mt-3 grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[42fr_58fr] lg:items-stretch lg:gap-5">
        {/* Left column — FAQs (tall) + Before You Reach Out (compact) */}
        <div className="contents lg:flex lg:flex-col lg:gap-5">
          {/* Card A — FAQs */}
          <section className={cn(cardShellClass, 'order-1 lg:order-none lg:flex-1')}>
            <SectionTitle>FAQs</SectionTitle>
            <div className="mt-2 min-h-0 flex-1 overflow-y-auto">
              <FaqAccordion items={faqItems} />
            </div>
          </section>

          {/* Card B — Before You Reach Out: compact, just tall enough to be visible */}
          <section className={cn(cardShellClass, 'order-3 lg:order-none')}>
            <SectionTitle>Before You Reach Out</SectionTitle>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {beforeYouReachOut.map((row) => (
                <div key={row.label} className={cn(nestedRowClass, 'flex items-center gap-2 p-1.5')}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#1F6FEB] text-white">
                    <row.icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.55rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
                      {row.label}
                    </p>
                    <p className="text-xs leading-snug font-semibold text-slate-800">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column — Your Project + Project Preferences (unchanged) */}
        <form onSubmit={handleSubmit} noValidate className="contents lg:flex lg:flex-col lg:gap-5">
          {/* Card C — Your Project */}
          <section className={cn(cardShellClass, 'order-2 lg:order-none')}>
            <SectionTitle>Your Project</SectionTitle>

            <div className="mt-2 flex flex-1 flex-col gap-2.5">
              {emailContext ? (
                <p className="text-xs text-slate-500 italic">
                  Prefer email? Fill in your email address below and describe your idea.
                </p>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold text-slate-700">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={cn(fieldBaseClass, errors.name ? fieldErrorClass : fieldNeutralClass)}
                    placeholder="Full name"
                  />
                  {errors.name ? (
                    <p id="contact-name-error" role="alert" className="mt-1 text-xs text-red-600">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    ref={emailInputRef}
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={cn(fieldBaseClass, errors.email ? fieldErrorClass : fieldNeutralClass)}
                    placeholder="you@example.com"
                  />
                  {errors.email ? (
                    <p id="contact-email-error" role="alert" className="mt-1 text-xs text-red-600">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Dominant field — the idea itself, grows to fill remaining card height */}
              <div className="flex flex-1 flex-col">
                <label htmlFor="contact-details" className="mb-1 block text-sm font-bold text-slate-800">
                  Tell me about your idea
                </label>
                <textarea
                  ref={textareaRef}
                  id="contact-details"
                  name="details"
                  aria-invalid={!!errors.details}
                  aria-describedby={errors.details ? 'contact-details-error' : undefined}
                  className={cn(
                    'w-full flex-1 resize-none rounded-md border bg-white px-3.5 py-2.5 text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-100 focus:outline-none',
                    errors.details ? fieldErrorClass : fieldNeutralClass,
                  )}
                  placeholder="What would you like to build, improve, or solve?"
                />
                {errors.details ? (
                  <p id="contact-details-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.details}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-slate-500">
                    No technical terms needed — explain it in your own words.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Card D — Project Preferences */}
          <section className={cn(cardShellClass, 'order-4 lg:order-none')}>
            <SectionTitle>Project Preferences</SectionTitle>

            <div className="mt-2 flex flex-1 flex-col justify-between gap-2.5">
              {/* Project interest */}
              <div>
                <p className="text-xs font-semibold text-slate-700">What are you interested in?</p>
                <div role="radiogroup" aria-label="Project interest" className="mt-1.5 flex flex-wrap gap-1.5">
                  {projectOptions.map((option) => (
                    <CategoryChip
                      key={option.id}
                      label={option.label}
                      icon={option.icon}
                      active={projectInterest === option.id}
                      onClick={() => setProjectInterest((v) => (v === option.id ? null : option.id))}
                    />
                  ))}
                </div>
              </div>

              {/* Payment preference */}
              <div>
                <p className="text-xs font-semibold text-slate-700">Payment Preference</p>
                <div
                  role="radiogroup"
                  aria-label="Payment preference"
                  className="mt-1.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2"
                >
                  {paymentOptions.map((option) => (
                    <PaymentOptionCard
                      key={option.id}
                      label={option.label}
                      helper={option.helper}
                      icon={option.icon}
                      active={paymentPreference === option.id}
                      onClick={() => setPaymentPreference((v) => (v === option.id ? null : option.id))}
                    />
                  ))}
                </div>
              </div>

              {/* Free mockup — nested row, clearly optional */}
              <label
                className={cn(
                  nestedRowClass,
                  'flex cursor-pointer items-start gap-2.5 p-2.5 transition-colors duration-200 hover:bg-blue-50/40',
                )}
              >
                <input
                  type="checkbox"
                  checked={freeMockupRequested}
                  onChange={(e) => setFreeMockupRequested(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                />
                <span className="min-w-0 text-xs text-slate-700">
                  I would like to request a free mockup if appropriate for my project.
                </span>
              </label>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1F6FEB] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.32)] transition-all duration-200 hover:-translate-y-[1.5px] hover:bg-[#1a5fc9] hover:shadow-[0_8px_20px_rgba(31,111,235,0.38)] active:translate-y-0 active:shadow-[0_4px_14px_rgba(31,111,235,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-auto"
                >
                  <Send className="h-4 w-4 shrink-0" />
                  Send My Request
                </button>
                {submitted ? (
                  <p className="mt-1.5 text-xs text-slate-500">
                    Contact submission is being prepared. You can also reach me directly by email
                    or WhatsApp.
                  </p>
                ) : null}
              </div>

              {/* What happens next — compact inline steps */}
              <div className={cn(nestedRowClass, 'p-2.5')}>
                <p className="mb-1.5 text-[0.6rem] font-bold tracking-[0.1em] text-[var(--card-border-nested)] uppercase">
                  What Happens Next
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  {whatHappensNext.map((step) => (
                    <div key={step.number} className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1F6FEB] text-[0.6rem] font-bold text-white">
                        {step.number}
                      </span>
                      <p className="text-xs font-medium text-slate-700">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>

      <footer className="flex flex-col items-center gap-1 py-2 text-center text-xs text-muted-foreground">
        <p>© 2024–2026 Alexis Sarip. All rights reserved.</p>
      </footer>
    </>
  )
}
