import { useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Briefcase,
  Eye,
  FolderOpen,
  MessageCircle,
  CreditCard,
  User,
  LogOut,
  UserRound,
  ChevronRight,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface PortalNavItem {
  label: string
  icon: LucideIcon
  to?: string
}

/**
 * Client-facing shell nav — deliberately shorter than the full planned portal
 * IA. Requests exists as a future area but is intentionally left out of this
 * list so non-technical clients see only what matters day to day.
 */
const navItems: PortalNavItem[] = [
  { label: 'Overview', icon: LayoutDashboard, to: '/client-portal' },
  { label: 'Project', icon: Briefcase, to: '/client-portal/project' },
  { label: 'Reviews', icon: Eye, to: '/client-portal/reviews' },
  { label: 'Messages', icon: MessageCircle, to: '/client-portal/messages' },
  { label: 'Files', icon: FolderOpen, to: '/client-portal/files' },
  { label: 'Payments', icon: CreditCard, to: '/client-portal/payments' },
]

const bottomItems: PortalNavItem[] = [
  { label: 'Profile', icon: User, to: '/client-portal/profile' },
  { label: 'Log Out', icon: LogOut },
]

/** Shell-only nav row — real routes for these don't exist yet, so they render as inert, clearly "not yet available" controls rather than links to a blank page. */
function InertNavRow({ label, icon: Icon }: PortalNavItem) {
  return (
    <button
      type="button"
      disabled
      className="flex min-h-11 shrink-0 cursor-not-allowed items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-[0.875rem] font-medium text-slate-400 lg:w-full"
    >
      <Icon strokeWidth={2.25} className="h-[18px] w-[18px] shrink-0 text-slate-300" />
      <span className="whitespace-nowrap lg:whitespace-normal">{label}</span>
    </button>
  )
}

function ActiveNavRow({ label, icon: Icon, active }: { label: string; icon: LucideIcon; active: boolean }) {
  return (
    <span
      className={cn(
        'flex min-h-11 shrink-0 items-center gap-3 rounded-lg border px-3 py-2 text-[0.875rem] font-semibold transition-all duration-200 ease-out lg:w-full',
        active
          ? 'border-blue-100 bg-blue-50 text-[#1F6FEB]'
          : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900',
      )}
    >
      <Icon strokeWidth={2.25} className={cn('h-[18px] w-[18px] shrink-0', active ? 'text-[#1F6FEB]' : 'text-slate-500')} />
      <span className="whitespace-nowrap lg:whitespace-normal">{label}</span>
    </span>
  )
}

function NavEntry({ item, pathname }: { item: PortalNavItem; pathname: string }) {
  if (item.to) {
    return (
      <Link to={item.to} aria-current={pathname === item.to ? 'page' : undefined}>
        <ActiveNavRow label={item.label} icon={item.icon} active={pathname === item.to} />
      </Link>
    )
  }
  return <InertNavRow {...item} />
}

export function PortalSidebar() {
  const { pathname } = useLocation()
  const mobileNavRef = useRef<HTMLElement>(null)
  const [showScrollHint, setShowScrollHint] = useState(false)

  useEffect(() => {
    const nav = mobileNavRef.current
    if (!nav) return

    function updateHint() {
      const el = mobileNavRef.current
      if (!el) return
      setShowScrollHint(el.scrollWidth - el.clientWidth - el.scrollLeft > 4)
    }

    updateHint()
    nav.addEventListener('scroll', updateHint, { passive: true })
    window.addEventListener('resize', updateHint)
    return () => {
      nav.removeEventListener('scroll', updateHint)
      window.removeEventListener('resize', updateHint)
    }
  }, [])

  return (
    <aside
      className={cn(
        'shrink-0 border-b border-slate-300/70 bg-white',
        'lg:fixed lg:inset-y-4 lg:left-4 lg:w-[272px] lg:overflow-y-auto lg:rounded-lg lg:border lg:border-slate-300/70 lg:shadow-[0_1px_2px_rgba(15,23,42,0.05),0_16px_40px_rgba(15,23,42,0.09)]',
      )}
    >
      <div className="flex h-full flex-col px-5 pt-5 pb-4 lg:px-4">
        {/* Compact brand block */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400">
            <UserRound className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.6rem] font-semibold tracking-[0.14em] text-[#1F6FEB] uppercase">Private Workspace</p>
            <p className="truncate text-sm font-bold text-slate-900">Alex &middot; Client Portal</p>
          </div>
        </div>

        <div className="mt-4 h-px w-full bg-slate-200/80" />

        {/* Mobile/tablet — everything in one horizontal scroll row */}
        <div className="relative mt-3 lg:hidden">
          <nav ref={mobileNavRef} aria-label="Client portal" className="no-scrollbar flex gap-1 overflow-x-auto pb-1">
            {[...navItems, ...bottomItems].map((item) => (
              <NavEntry key={item.label} item={item} pathname={pathname} />
            ))}
          </nav>
          {/* Decorative scroll hint — fades out once there's nothing left to scroll to */}
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-end bg-gradient-to-l from-white via-white/90 to-transparent pb-1 transition-opacity duration-200',
              showScrollHint ? 'opacity-100' : 'opacity-0',
            )}
          >
            <ChevronRight className="mr-0.5 h-3.5 w-3.5 text-slate-300" strokeWidth={2.5} />
          </div>
        </div>

        {/* Desktop — main items fill the column, Profile/Log Out pinned at the bottom */}
        <nav aria-label="Client portal" className="mt-3 hidden flex-1 flex-col gap-0.5 lg:flex">
          {navItems.map((item) => (
            <NavEntry key={item.label} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="mt-3 hidden border-t border-slate-200/80 pt-3 lg:block">
          <div className="flex flex-col gap-0.5">
            {bottomItems.map((item) => (
              <NavEntry key={item.label} item={item} pathname={pathname} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
