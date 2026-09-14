import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Home, FolderKanban, Briefcase, Quote, CircleUserRound, Send } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

type NavLink =
  | { label: string; icon: LucideIcon; to: string; href?: undefined }
  | { label: string; icon: LucideIcon; href: string; to?: undefined }

const navLinks: NavLink[] = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Projects', to: '/projects', icon: FolderKanban },
  { label: 'Services', to: '/services', icon: Briefcase },
  { label: 'Testimonials', to: '/testimonials', icon: Quote },
  { label: 'About', to: '/about', icon: CircleUserRound },
  { label: 'FAQs / Contact', to: '/contact', icon: Send },
]

const socials = [
  {
    label: 'Visit Alexis Sarip on LinkedIn',
    href: 'https://www.linkedin.com/in/alexis-sarip-a46442428/',
    icon: FaLinkedinIn,
    external: true,
    color: '#0A66C2',
    tint: '#EAF3FC',
  },
  {
    label: 'Message Alexis Sarip on WhatsApp',
    href: 'https://wa.me/639096439567',
    icon: FaWhatsapp,
    external: true,
    color: '#25D366',
    tint: '#EAFBF1',
  },
  {
    label: 'Email Alexis Sarip',
    href: 'mailto:booksage.alex5@gmail.com',
    icon: FaEnvelope,
    external: false,
    color: '#EA4335',
    tint: '#FDECEA',
  },
]

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside
      className={cn(
        'shrink-0 border-b border-[var(--card-border-accent)] bg-[rgba(245,250,250,0.82)] backdrop-blur-sm',
        'lg:fixed lg:inset-y-4 lg:left-4 lg:w-[320px] lg:overflow-y-auto lg:rounded-lg lg:border lg:border-[var(--card-border-accent)] lg:shadow-[0_1px_2px_rgba(15,23,42,0.05),0_16px_40px_rgba(15,23,42,0.09)]',
      )}
    >
      <div className="flex h-full flex-col px-7 pt-7 pb-5">
        {/* Identity */}
        <div className="flex flex-col items-center text-center">
          <div className="relative h-[104px] w-[104px] shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 lg:h-[136px] lg:w-[136px]">
            <img
              src="/alexis-sarip-profile.png"
              alt="Alexis Sarip"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <h1 className="text-lg font-semibold text-slate-900">Alexis Sarip</h1>
            <img src="/alexis-verified-badge.png" alt="Verified" className="h-5 w-5 shrink-0 object-contain" />
          </div>
          <p className="mt-0.5 text-sm text-slate-500">@alexisbuilds</p>
        </div>

        {/* Social icons */}
        <div className="mt-4 flex items-center justify-center gap-2.5">
          {socials.map(({ label, href, icon: Icon, external, color, tint }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              style={{ '--brand': color, '--brand-tint': tint } as CSSProperties}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border border-[#B7C6D6] bg-white',
                'transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--brand)] hover:bg-[var(--brand-tint)] hover:shadow-[0_4px_10px_rgba(15,23,42,0.14)]',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
              )}
            >
              <Icon className="h-4 w-4" style={{ color }} />
            </a>
          ))}
        </div>

        <div className="mt-5 h-px w-full bg-[#C8D2DC]" />

        {/* Nav links */}
        <nav aria-label="Primary" className="mt-3 flex flex-1 flex-col gap-0.5">
          {navLinks.map((item) => {
            const { label, icon: Icon } = item
            const active = item.to !== undefined ? pathname === item.to : false
            const itemClassName = cn(
              'group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-[0.875rem] font-medium tracking-[0.01em] transition-all duration-200 ease-out',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
              active
                ? 'border border-transparent bg-[#1F6FEB] font-semibold text-white shadow-[0_4px_12px_rgba(31,111,235,0.3)]'
                : 'border border-transparent text-slate-600 hover:-translate-y-0.5 hover:bg-[#1F6FEB] hover:text-white hover:shadow-[0_4px_12px_rgba(31,111,235,0.25)]',
            )
            const iconClassName = cn(
              'h-[18px] w-[18px] shrink-0 transition-colors',
              active ? 'text-white' : 'text-slate-500 group-hover:text-white',
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

        <div className="mt-5 border-t border-[#C8D2DC] pt-3 text-center">
          <p className="text-[0.7rem] tracking-wide text-slate-500">
            © 2024–2026 Alexis Sarip. All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  )
}
