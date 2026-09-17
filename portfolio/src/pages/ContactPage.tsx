import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Send, ChevronDown, Mail, ArrowUpRight } from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

/** Shared shell for the page's three main cards — red outer border, off-white surface,
 *  restrained hover lift (structural, not clickable). FAQs opts into `lg:h-full` to match
 *  the combined height of the two stacked right-side cards. */
const cardShellClass =
  'flex min-h-0 flex-col rounded-lg border border-[var(--card-border-accent)] bg-[#F7F9FB] p-4 shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_10px_rgba(15,23,42,0.1),0_14px_28px_rgba(15,23,42,0.09)] hover:ring-1 hover:ring-[var(--card-border-accent)]/25'

/** Strong-green backplate title, used for every card heading on this page. `self-start`
 *  keeps it hugging its own text instead of stretching full-width as a flex-col child. */
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="inline-block self-start rounded-md bg-[#128C4A] px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] text-white uppercase shadow-[0_1px_2px_rgba(15,23,42,0.15)]">
      {children}
    </div>
  )
}

const serviceOptions = [
  'Website Design',
  'Web App',
  'Client Portal / Personal Tracker',
  'Automation',
  'Social Media Solution',
  'Custom Digital Project',
  'Other',
]

interface FaqItem {
  id: string
  question: string
  answer: ReactNode
}

/** The questions a potential client actually needs before reaching out — the full process
 *  is already explained on the How It Works page, so answers here stay short and do not
 *  repeat it step by step. */
const faqItems: FaqItem[] = [
  {
    id: 'services',
    question: 'What services do you offer?',
    answer: (
      <p>
        I build websites, web apps, client portals, personal trackers, and other custom
        digital projects. If your idea does not fit neatly into one of these, you can still
        send it to me and we can discuss what makes sense.
      </p>
    ),
  },
  {
    id: 'free-mockup',
    question: 'Can I request a free mockup?',
    answer: (
      <p>
        Yes. For suitable projects, I can prepare a free concept mockup so you can see my
        approach before deciding whether to move forward.
      </p>
    ),
  },
  {
    id: 'process',
    question: 'How does the process work?',
    answer: (
      <p>
        We talk about your idea, I may prepare a free mockup, we review it together, and no
        official project begins until we both agree on the scope and details.
      </p>
    ),
  },
  {
    id: 'talk',
    question: 'Can we talk by phone or video call?',
    answer: (
      <p>
        Yes. We can communicate by email, WhatsApp, phone call, or video call — whichever is
        easiest for you.
      </p>
    ),
  },
  {
    id: 'timeline',
    question: 'How long does a project usually take?',
    answer: (
      <p>
        It depends on the scope and complexity of the project. Once we agree on the details, I
        will share a clear timeline before work officially begins.
      </p>
    ),
  },
  {
    id: 'remote',
    question: 'Do you work with clients outside the Philippines?',
    answer: (
      <p>
        Yes. I work remotely with clients in different locations and time zones. I am based in
        the Philippines, GMT+8.
      </p>
    ),
  },
  {
    id: 'payments',
    question: 'How do payments work?',
    answer: (
      <p>
        You can pay the full amount before work begins, or split it 50% to start and 50% after
        completion. Payment details are agreed on before the project officially starts.
      </p>
    ),
  },
  {
    id: 'changes',
    question: 'Can I request changes during the project?',
    answer: (
      <p>
        Yes. We review the work together as it develops, and adjustments can be discussed based
        on what we agreed on for the project.
      </p>
    ),
  },
  {
    id: 'what-to-send',
    question: 'What do I need to send before we begin?',
    answer: (
      <p>
        Just a clear description of what you want to build. Examples or references are helpful,
        but not required to get started.
      </p>
    ),
  },
  {
    id: 'get-started',
    question: 'How do I get started?',
    answer: (
      <p>
        Send me your idea using the form on this page, or reach out directly by email or
        WhatsApp. We will talk it through before anything begins.
      </p>
    ),
  },
]

/** Inline-expanding accordion — only one answer open at a time, animated with CSS grid-rows
 *  so no measuring is needed. Global `prefers-reduced-motion` handling (see index.css)
 *  disables the transition automatically. */
function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item) => {
        const isOpen = openId === item.id
        const buttonId = `faq-button-${item.id}`
        const panelId = `faq-panel-${item.id}`

        return (
          <div
            key={item.id}
            className={cn(
              'rounded-md border bg-white transition-all duration-200 hover:-translate-y-px hover:border-[var(--card-border-nested)]/60 hover:shadow-[0_3px_8px_rgba(15,23,42,0.06)]',
              isOpen
                ? 'border-[var(--card-border-nested)]/70 bg-[#F3F7FD] shadow-[0_1px_2px_rgba(15,23,42,0.04)]'
                : 'border-[var(--card-border-nested)]/30',
            )}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId((v) => (v === item.id ? null : item.id))}
                className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <span className={cn('text-sm leading-snug text-slate-800', isOpen ? 'font-bold' : 'font-semibold')}>
                  {item.question}
                </span>
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#1F6FEB] transition-all duration-200',
                    isOpen && 'bg-[#1F6FEB] text-white',
                  )}
                >
                  <ChevronDown
                    aria-hidden="true"
                    className={cn('h-3.5 w-3.5 transition-transform duration-200', isOpen && 'rotate-180')}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn('grid transition-[grid-template-rows] duration-200 ease-out', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
            >
              <div className="overflow-hidden">
                <div className="px-3 pt-0 pb-2.5 text-sm leading-relaxed text-slate-600">{item.answer}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Icon backplates use each brand's real solid color with a white glyph — the same
// treatment approved on the Home page Contact card.
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

export function ContactPage() {
  const [errors, setErrors] = useState<{ name?: string; email?: string; service?: string; message?: string }>({})
  const [submitted, setSubmitted] = useState(false)

  const fieldBaseClass =
    'w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-100 focus:outline-none'
  const fieldNeutralClass = 'border-[#C7D2E0] focus:border-[#1F6FEB]'
  const fieldErrorClass = 'border-red-400 focus:border-red-400'

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('contact-name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('contact-email') as HTMLInputElement).value.trim()
    const service = (form.elements.namedItem('contact-service') as HTMLSelectElement).value
    const message = (form.elements.namedItem('contact-message') as HTMLTextAreaElement).value.trim()

    const nextErrors: typeof errors = {}
    if (!name) nextErrors.name = 'Please enter your name.'
    if (!email) nextErrors.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Please enter a valid email address.'
    if (!service) nextErrors.service = 'Please select a service.'
    if (!message) nextErrors.message = 'Please tell me a little about your idea.'

    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
  }

  return (
    <>
      {/* Three-card workspace — FAQ card fills the left column; the form and contact-info
          cards stack on the right so both sides visually balance. No page header: the
          card layout begins directly inside the main region's own padding. */}
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[54fr_46fr] lg:items-stretch lg:gap-5">
        {/* Card 1 — FAQs */}
        <section className={cn(cardShellClass, 'lg:h-full')}>
          <SectionTitle>FAQs</SectionTitle>
          <div className="mt-2.5 flex min-h-0 flex-1 flex-col justify-center">
            <FaqAccordion items={faqItems} />
          </div>
        </section>

        {/* Right column — inquiry form + contact information */}
        <div className="contents lg:flex lg:flex-col lg:gap-5">
          {/* Card 2 — Send Your Idea */}
          <form onSubmit={handleSubmit} noValidate className={cn(cardShellClass, 'order-1 lg:order-none')}>
            <SectionTitle>Send Your Idea</SectionTitle>
            <div className="mt-2.5 flex flex-col gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1 block text-sm font-semibold text-slate-700">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="contact-name"
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
                  <label htmlFor="contact-email" className="mb-1 block text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="contact-email"
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

              <div>
                <label htmlFor="contact-service" className="mb-1 block text-sm font-semibold text-slate-700">
                  Service
                </label>
                <select
                  id="contact-service"
                  name="contact-service"
                  defaultValue=""
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? 'contact-service-error' : undefined}
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
                  <p id="contact-service-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.service}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1 block text-sm font-semibold text-slate-700">
                  Message / Project Idea
                </label>
                <textarea
                  id="contact-message"
                  name="contact-message"
                  rows={3}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-helper'}
                  className={cn('resize-none', fieldBaseClass, errors.message ? fieldErrorClass : fieldNeutralClass)}
                />
                {errors.message ? (
                  <p id="contact-message-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.message}
                  </p>
                ) : (
                  <p id="contact-message-helper" className="mt-1 text-xs text-slate-500">
                    Tell me what you want to build and anything important you want included.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1F6FEB] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.32)] transition-all duration-200 hover:-translate-y-[1.5px] hover:bg-[#1a5fc9] hover:shadow-[0_8px_20px_rgba(31,111,235,0.38)] active:translate-y-0 active:shadow-[0_4px_14px_rgba(31,111,235,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-auto"
              >
                <Send className="h-4 w-4 shrink-0" />
                Send My Request
              </button>
              {submitted ? (
                <p className="text-xs text-slate-500">
                  Your message form is ready, but message delivery will be connected when the site
                  contact system is activated.
                </p>
              ) : null}
            </div>
          </form>

          {/* Card 3 — Contact Information */}
          <section className={cn(cardShellClass, 'order-2 lg:order-none')}>
            <SectionTitle>Contact Information</SectionTitle>
            <div className="mt-2.5 flex flex-col gap-2">
              {contactMethods.map((method) => (
                <ContactRow key={method.label} {...method} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className="flex flex-col items-center gap-1 py-3 text-center text-xs text-muted-foreground">
        <p>© 2026 Alexis Sarip. All rights reserved.</p>
      </footer>
    </>
  )
}
