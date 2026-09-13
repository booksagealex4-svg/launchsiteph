import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { MoreVertical, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Shared visual primitives specific to the Admin dashboard's denser, data-oriented cards. */

export function KpiCard({ icon: Icon, label, tint = 'blue' }: { icon: LucideIcon; label: string; tint?: 'blue' | 'mint' | 'amber' }) {
  const tintClasses = {
    blue: 'border-[#93B4E8] bg-[#E6F0FF] text-[#1D4ED8]',
    mint: 'border-[#8FD4B4] bg-[#D9F3E8] text-[#0E8F5E]',
    amber: 'border-amber-300 bg-amber-50 text-amber-600',
  }
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-[var(--card-border-accent)] bg-[#F6F8FA] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)]">
      <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-md border', tintClasses[tint])}>
        <Icon className="h-[16px] w-[16px]" />
      </span>
      <p className="text-[0.65rem] leading-snug font-semibold tracking-[0.08em] text-slate-400 uppercase">{label}</p>
      <p className="text-xl font-extrabold text-slate-800">&mdash;</p>
      <p className="text-xs text-slate-400">Placeholder</p>
    </div>
  )
}

export function RangeTabs({ options, value, onChange }: { options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-md border border-slate-200 bg-slate-50 p-1">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
          className={cn(
            'rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
            value === opt ? 'bg-white text-[#1F6FEB] shadow-sm' : 'text-slate-500 hover:text-slate-700',
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

/** Static demo shape only — never fed real analytics data. */
export function TrafficChartPlaceholder() {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 320 120"
        preserveAspectRatio="none"
        className="h-32 w-full"
        role="img"
        aria-label="Sample website traffic chart, not real data"
      >
        <defs>
          <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F6FEB" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#1F6FEB" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon fill="url(#trafficFill)" points="0,90 40,80 80,85 120,60 160,68 200,45 240,55 280,35 320,42 320,120 0,120" />
        <polyline
          fill="none"
          stroke="#1F6FEB"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="0,90 40,80 80,85 120,60 160,68 200,45 240,55 280,35 320,42"
        />
      </svg>
      <span className="absolute top-0 right-0 rounded-full bg-slate-100 px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
        Sample data
      </span>
    </div>
  )
}

/** Static demo shape only — never fed real data. Generic version of the traffic chart, reused wherever a page needs its own labeled sample line chart. */
export function LineChartPlaceholder({ ariaLabel }: { ariaLabel: string }) {
  const gradientId = useId()
  return (
    <div className="relative">
      <svg viewBox="0 0 320 120" preserveAspectRatio="none" className="h-32 w-full" role="img" aria-label={ariaLabel}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F6FEB" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#1F6FEB" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon fill={`url(#${gradientId})`} points="0,90 40,80 80,85 120,60 160,68 200,45 240,55 280,35 320,42 320,120 0,120" />
        <polyline
          fill="none"
          stroke="#1F6FEB"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="0,90 40,80 80,85 120,60 160,68 200,45 240,55 280,35 320,42"
        />
      </svg>
      <span className="absolute top-0 right-0 rounded-full bg-slate-100 px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
        Sample data
      </span>
    </div>
  )
}

const revenueBars = [40, 55, 35, 60, 48, 65, 50]

/** Static demo shape only — never fed real revenue data. */
export function RevenueSparkline() {
  return (
    <div className="flex h-16 items-end gap-1.5" role="img" aria-label="Sample revenue trend, not real data">
      {revenueBars.map((height, i) => (
        <div key={i} className="flex-1 rounded-sm bg-blue-100" style={{ height: `${height}%` }} />
      ))}
    </div>
  )
}

const projectStages = [
  { label: 'Planning', color: 'bg-slate-300' },
  { label: 'Design', color: 'bg-blue-300' },
  { label: 'Review', color: 'bg-amber-300' },
  { label: 'Build', color: 'bg-[#1F6FEB]' },
  { label: 'Final Delivery', color: 'bg-[#1f9d7c]' },
]

/** Equal-width placeholder segments — deliberately no invented counts. */
export function StageDistributionBar() {
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {projectStages.map((stage) => (
          <div key={stage.label} className={cn('h-full flex-1', stage.color)} />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {projectStages.map((stage) => (
          <div key={stage.label} className="flex items-center gap-1.5">
            <span className={cn('h-2 w-2 shrink-0 rounded-full', stage.color)} />
            <span className="text-xs text-slate-500">{stage.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Generic labeled distribution bar — equal-width placeholder segments, deliberately no invented counts or percentages. */
export function SegmentBar({ segments }: { segments: { label: string; color: string }[] }) {
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {segments.map((segment) => (
          <div key={segment.label} className={cn('h-full flex-1', segment.color)} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-1.5">
            <span className={cn('h-2 w-2 shrink-0 rounded-full', segment.color)} />
            <span className="text-xs text-slate-500">{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Wider tone set than the Client Portal's StatusPill (adds slate, for Disabled-style states). Status is always paired with its own label text, never color alone. */
export function StatusBadge({ tone, children }: { tone: 'blue' | 'mint' | 'amber' | 'slate'; children: ReactNode }) {
  const toneClasses = {
    blue: 'bg-blue-50 text-[#1F6FEB]',
    mint: 'bg-[#eafaf4] text-[#1f9d7c]',
    amber: 'bg-amber-50 text-amber-700',
    slate: 'bg-slate-100 text-slate-500',
  }
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap', toneClasses[tone])}>
      {children}
    </span>
  )
}

export function TagChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
      {children}
    </span>
  )
}

export function ToggleChip({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onToggle}
      className={cn(
        'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
        active
          ? 'border-[#1F6FEB]/40 bg-blue-50 text-[#1F6FEB]'
          : 'border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-slate-700',
      )}
    >
      {label}
    </button>
  )
}

function useEscapeToClose(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])
}

/** Right-side panel on desktop, full-width on mobile. Shell only — Escape and backdrop click both close it. */
export function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEscapeToClose(open, onClose)
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button type="button" aria-label="Close panel" onClick={onClose} className="absolute inset-0 bg-slate-900/30" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex h-full w-full flex-col overflow-y-auto bg-white shadow-[0_16px_40px_rgba(15,23,42,0.16)] sm:w-[420px] lg:w-[460px]"
      >
        <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4">
          <p className="text-base font-bold text-slate-900">{title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col gap-5 p-5">{children}</div>
      </div>
    </div>
  )
}

/** Centered dialog. Shell only — Escape and backdrop click both close it. */
export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEscapeToClose(open, onClose)
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" aria-label="Close dialog" onClick={onClose} className="absolute inset-0 bg-slate-900/30" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex w-full max-w-[440px] flex-col gap-4 rounded-lg border border-[var(--card-border-accent)] bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.16)]"
      >
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-slate-900">{title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/** Compact "More" menu for secondary row actions — closes on outside click or Escape. */
export function RowActionsMenu({ actions, onAction }: { actions: string[]; onAction: (action: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More actions"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      {open ? (
        <div role="menu" className="absolute right-0 z-10 mt-1 w-44 overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
          {actions.map((action) => (
            <button
              key={action}
              type="button"
              role="menuitem"
              onClick={() => {
                onAction(action)
                setOpen(false)
              }}
              className="flex w-full items-center px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
            >
              {action}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
