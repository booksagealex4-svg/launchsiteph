import { Home, FolderKanban, Briefcase, Quote, CircleUserRound, Send } from 'lucide-react'
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '#home', icon: Home, active: true },
  { label: 'Projects', href: '#projects', icon: FolderKanban },
  { label: 'Services', href: '#services', icon: Briefcase },
  { label: 'Testimonials', href: '#testimonials', icon: Quote },
  { label: 'About', href: '#about', icon: CircleUserRound },
  { label: 'Contact', href: '#contact', icon: Send },
]

const socials = [
  { label: 'Facebook', href: '#', icon: FaFacebookF },
  { label: 'LinkedIn', href: '#', icon: FaLinkedinIn },
  { label: 'WhatsApp', href: '#', icon: FaWhatsapp },
  { label: 'Email', href: '#', icon: FaEnvelope },
]

function VerifiedBadge() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
      role="img"
      aria-label="Verified profile"
    >
      <circle cx="8" cy="8" r="8" className="fill-blue-600" />
      <path
        d="M4.75 8.15L6.9 10.3L11.25 5.7"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Sidebar() {
  return (
    <aside
      className={cn(
        'shrink-0 border-b border-slate-300/70 bg-[#fdfcfa]',
        'lg:fixed lg:inset-y-4 lg:left-4 lg:w-[320px] lg:overflow-y-auto lg:rounded-lg lg:border lg:border-slate-300/70 lg:shadow-[0_1px_2px_rgba(15,23,42,0.05),0_16px_40px_rgba(15,23,42,0.09)]',
      )}
    >
      <div className="flex h-full flex-col px-7 pt-7 pb-5">
        {/* Identity */}
        <div className="flex flex-col items-center text-center">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 lg:h-28 lg:w-28">
            <div
              className="flex h-full w-full items-center justify-center text-[0.65rem] font-medium tracking-wide text-slate-500 uppercase"
              aria-label="Profile photo placeholder"
            >
              Photo
            </div>
            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <h1 className="text-lg font-semibold text-slate-900">Full Name</h1>
            <VerifiedBadge />
          </div>
          <p className="mt-0.5 text-sm text-slate-500">@username</p>
        </div>

        {/* Social icons */}
        <div className="mt-4 flex items-center justify-center gap-2.5">
          {socials.map(({ label, href, icon: Icon }, i) => (
            <a
              key={i}
              href={href}
              aria-label={label}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600',
                'transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-[0_4px_10px_rgba(37,99,235,0.15)]',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
              )}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="mt-5 h-px w-full bg-slate-200/80" />

        {/* Nav links */}
        <nav aria-label="Primary" className="mt-3 flex flex-1 flex-col gap-0.5">
          {navLinks.map(({ label, href, icon: Icon, active }) => (
            <a
              key={label}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-[0.875rem] font-medium tracking-[0.01em] transition-all duration-200 ease-out',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
                active
                  ? 'border border-blue-100 bg-blue-50 font-semibold text-blue-700'
                  : 'border border-transparent text-slate-500 hover:translate-x-0.5 hover:bg-slate-50 hover:text-slate-900',
              )}
            >
              <Icon
                strokeWidth={2.25}
                className={cn(
                  'h-[18px] w-[18px] shrink-0 transition-colors',
                  active ? 'text-blue-700' : 'text-slate-500 group-hover:text-blue-600',
                )}
              />
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-5 border-t border-slate-200/80 pt-3 text-center">
          <p className="text-[0.7rem] tracking-wide text-slate-500">
            © 2026 Full Name. All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  )
}
