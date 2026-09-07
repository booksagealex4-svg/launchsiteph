import type { LucideIcon } from 'lucide-react'
import { Home, FolderKanban, Briefcase, Quote, CircleUserRound, Send } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

type NavLink =
  | { label: string; icon: LucideIcon; to: string; href?: undefined }
  | { label: string; icon: LucideIcon; href: string; to?: undefined }

const navLinks: NavLink[] = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Projects', to: '/projects', icon: FolderKanban },
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
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      className="shrink-0"
      role="img"
      aria-label="Verified profile"
    >
      {/* Original scalloped seal silhouette — a generic 6-bump rounded polygon, not traced from any platform's badge artwork. */}
      <path
        d="M16.1,8.5 L14.4,11.9 L12.3,15.1 L8.5,15.3 L4.7,15.1 L2.6,11.9 L0.9,8.5 L2.6,5.1 L4.7,1.9 L8.5,1.7 L12.3,1.9 L14.4,5.1 Z"
        fill="#1656D8"
        stroke="#8FB6FF"
        strokeOpacity="0.45"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <path
        d="M5 8.75L7.35 11L12 6.2"
        stroke="white"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Sidebar() {
  const { pathname } = useLocation()

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
          {navLinks.map((item) => {
            const { label, icon: Icon } = item
            const active = item.to !== undefined ? pathname === item.to : false
            const itemClassName = cn(
              'group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-[0.875rem] font-medium tracking-[0.01em] transition-all duration-200 ease-out',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
              active
                ? 'border border-blue-100 bg-blue-50 font-semibold text-blue-700'
                : 'border border-transparent text-slate-500 hover:translate-x-0.5 hover:bg-slate-50 hover:text-slate-900',
            )
            const iconClassName = cn(
              'h-[18px] w-[18px] shrink-0 transition-colors',
              active ? 'text-blue-700' : 'text-slate-500 group-hover:text-blue-600',
            )

            if (item.to !== undefined) {
              return (
                <Link key={label} to={item.to} aria-current={active ? 'page' : undefined} className={itemClassName}>
                  <Icon strokeWidth={2.25} className={iconClassName} />
                  {label}
                </Link>
              )
            }

            return (
              <a key={label} href={item.href} className={itemClassName}>
                <Icon strokeWidth={2.25} className={iconClassName} />
                {label}
              </a>
            )
          })}
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
