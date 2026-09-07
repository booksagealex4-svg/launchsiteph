import { useEffect, useRef, useState } from 'react'
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
  Sparkles,
  Mail,
} from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'
import { useSearchParams } from 'react-router-dom'
import { ClientLoginButton } from '@/components/ClientLoginButton'
import { cn } from '@/lib/utils'

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

const contactMethods: { label: string; value: string; icon: LucideIcon | typeof FaWhatsapp }[] = [
  { label: 'Email', value: 'Address to be added', icon: Mail },
  { label: 'LinkedIn', value: 'Profile link to be added', icon: FaLinkedinIn },
  { label: 'WhatsApp', value: 'Number to be added', icon: FaWhatsapp },
]

const nextSteps = [
  { number: '01', text: 'I review your message' },
  { number: '02', text: 'I reply within 24 hours' },
  { number: '03', text: 'We discuss the next step' },
]

const intentToProjectId: Record<string, string> = {
  mockup: 'mockup',
  'web-app': 'web-app',
  tracker: 'tracker',
  project: 'custom',
}

function IconChip({ icon: Icon }: { icon: LucideIcon | typeof FaWhatsapp }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#1F6FEB]">
      <Icon className="h-4 w-4" />
    </span>
  )
}

/** Soft, secondary utility chip — deliberately quieter than the site's tab-style selectors. */
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
        'flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
        active
          ? 'border-[#1F6FEB]/50 bg-blue-50 text-[#1F6FEB]'
          : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-slate-100',
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {label}
    </button>
  )
}

function MethodRow({ label, value, icon }: { label: string; value: string; icon: LucideIcon | typeof FaWhatsapp }) {
  return (
    <div className="flex items-center gap-2.5 py-2 first:pt-0 last:pb-0">
      <IconChip icon={icon} />
      <div className="min-w-0">
        <p className="text-[0.6rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">{label}</p>
        <p className="truncate text-sm text-slate-500 italic">{value}</p>
      </div>
    </div>
  )
}

export function ContactPage() {
  const [searchParams] = useSearchParams()
  const intent = searchParams.get('intent')

  const [projectInterest, setProjectInterest] = useState<string | null>(
    () => intentToProjectId[intent ?? ''] ?? null,
  )
  const [freeMockupRequested, setFreeMockupRequested] = useState(() => intent === 'mockup')
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
    setSubmitted(true)
  }

  return (
    <>
      {/* Page header — same compact family as Projects/Services/Testimonials/About */}
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
            <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Contact</p>
            <h1 className="mt-1 text-2xl leading-[1.15] font-extrabold tracking-tight text-[#122c52] sm:text-3xl lg:text-[2rem]">
              Tell me what you&apos;d like to build.
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-snug text-slate-600 lg:max-w-none lg:pr-6">
              Share your idea, choose the kind of project you&apos;re interested in, and
              I&apos;ll have a better picture of how I can help.
            </p>
          </div>

          <ClientLoginButton />
        </div>
      </header>

      {/* Main contact workspace */}
      <section className="mt-4 rounded-lg border border-slate-300 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] sm:p-5">
        <div className="grid gap-6 lg:grid-cols-[7fr_3fr]">
          {/* Left — simple, calm inquiry form */}
          <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-5">
            {emailContext ? (
              <p className="text-sm text-slate-500 italic">
                Prefer email? Fill in your email address below and describe your idea, and
                I&apos;ll reply directly.
              </p>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  className="w-full rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  ref={emailInputRef}
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="w-full rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Primary interaction — the idea itself */}
            <div>
              <label htmlFor="contact-details" className="mb-1.5 block text-base font-bold text-slate-800">
                Tell me about your idea
              </label>
              <textarea
                ref={textareaRef}
                id="contact-details"
                name="details"
                rows={7}
                className="w-full resize-y rounded-md border border-slate-300/70 bg-white px-4 py-3 text-base leading-relaxed text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                placeholder="Tell me what you would like to create, who it is for, or what problem you would like help solving."
              />
              <p className="mt-1.5 text-sm text-slate-500">
                You can describe your idea in your own words. Technical details are not required.
              </p>
            </div>

            {/* Optional, clearly secondary */}
            <div>
              <p className="text-sm font-semibold text-slate-700">What are you interested in?</p>
              <p className="mt-0.5 text-sm text-slate-500">
                Choose one if you already know. If you&apos;re not sure, you can leave this blank
                and simply describe your idea above.
              </p>
              <div role="radiogroup" aria-label="Project interest" className="mt-2.5 flex flex-wrap gap-2">
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

            {/* Free mockup — a single, simple checkbox row */}
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={freeMockupRequested}
                onChange={(e) => setFreeMockupRequested(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-800">I&apos;d like a free mockup</span>
                <span className="mt-0.5 block text-sm text-slate-500">
                  I can prepare an initial visual concept to help you see the direction before
                  moving forward.
                </span>
              </span>
            </label>

            <div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1F6FEB] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-auto"
              >
                <Send className="h-4 w-4 shrink-0" />
                Send My Request
              </button>
              {submitted ? (
                <p className="mt-2 text-sm text-slate-500">
                  Thanks. Your request is ready to be submitted once messaging is connected.
                </p>
              ) : null}
            </div>
          </form>

          {/* Right — quiet, supportive trust panel */}
          <div className="flex min-w-0 flex-col gap-4 rounded-lg border border-slate-300/70 bg-slate-50/60 p-4">
            <div>
              <p className="mb-1.5 text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">
                Get in Touch
              </p>
              <div className="flex flex-col gap-1.5 text-sm text-slate-600">
                <p className="font-semibold text-slate-800">Replies within 24 hours</p>
                <p>
                  Based in the Philippines
                  <br />
                  <span className="text-slate-400">GMT+8 (Philippine Time)</span>
                </p>
                <p>Available for remote collaboration</p>
              </div>
            </div>

            <div className="border-t border-slate-200/70 pt-4">
              <p className="mb-1 text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">
                Direct Contact
              </p>
              <div className="divide-y divide-slate-200/70">
                {contactMethods.map((method) => (
                  <MethodRow key={method.label} {...method} />
                ))}
              </div>
            </div>

            <div className="rounded-md border border-blue-200/70 bg-white p-3.5">
              <div className="flex items-start gap-2.5">
                <IconChip icon={Sparkles} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">Free Mockup Available</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                    Have an idea but want to see the direction first? You can request a free
                    initial mockup through the form.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200/70 pt-4">
              <p className="mb-2 text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">
                What Happens Next
              </p>
              <div className="flex flex-col gap-2.5">
                {nextSteps.map((step) => (
                  <div key={step.number} className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F6FEB] text-[0.65rem] font-bold text-white">
                      {step.number}
                    </span>
                    <p className="text-sm text-slate-600">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-center gap-1 py-3 text-center text-xs text-muted-foreground">
        <p>© Year Placeholder · Full Name Placeholder · All rights reserved</p>
      </footer>
    </>
  )
}
