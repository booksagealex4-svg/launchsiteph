import { useEffect, useRef, useState } from 'react'
import { Eye, ChevronUp, ChevronDown, ArrowUp } from 'lucide-react'
import { useVisitorStats } from '@/lib/useVisitorStats'
import { cn } from '@/lib/utils'

function formatCount(value: number | null): string {
  return value === null ? '—' : value.toLocaleString()
}

/**
 * DEVELOPMENT / DEMO CONTENT ONLY — SHELL-R1 visual review phase.
 * Not real analytics. Does not touch useVisitorStats / the real data adapter.
 * Remove this override once real analytics data is connected.
 */
const DEMO_TOTAL_VISITS = 142

export function VisitorCounter() {
  const [expanded, setExpanded] = useState(false)
  const stats = useVisitorStats()
  const containerRef = useRef<HTMLDivElement>(null)
  const panelId = 'visitor-stats-panel'

  useEffect(() => {
    if (!expanded) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setExpanded(false)
    }
    function handlePointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [expanded])

  function handleBackToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    setExpanded(false)
  }

  return (
    <div ref={containerRef} className="fixed right-4 bottom-4 z-40 flex flex-col items-end">
      {/* Expanded utility panel */}
      <div
        id={panelId}
        role="region"
        aria-label="Visitor statistics"
        aria-hidden={!expanded}
        className={cn(
          'mb-2 w-60 origin-bottom-right rounded-lg border border-blue-100 bg-white p-4 shadow-[0_16px_32px_rgba(15,23,42,0.12)]',
          'transition-all duration-200 ease-out',
          expanded
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-1 scale-95 opacity-0',
        )}
      >
        <p className="text-[0.65rem] font-semibold tracking-[0.12em] text-[#1F6FEB] uppercase">
          Site Visits
        </p>

        <dl className="mt-3 flex flex-col gap-2">
          {[
            { label: 'Total visits', value: DEMO_TOTAL_VISITS },
            { label: 'Today', value: stats.todayVisits },
            { label: 'This week', value: stats.weekVisits },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <dt className="text-slate-500">{label}</dt>
              <dd className="font-semibold text-slate-800">
                {stats.isLoading ? '···' : formatCount(value)}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-3 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={handleBackToTop}
            tabIndex={expanded ? 0 : -1}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <ArrowUp className="h-4 w-4" />
            Back to top
          </button>
        </div>
      </div>

      {/* Collapsed pill */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={panelId}
        aria-label={`Site visits: ${stats.isLoading ? 'loading' : formatCount(DEMO_TOTAL_VISITS)}. ${expanded ? 'Collapse' : 'Expand'} visitor statistics.`}
        className="flex items-center gap-2 rounded-md bg-[#102A43] px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(16,42,67,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0d2238] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_4px_1px_rgba(239,68,68,0.7)]" />
        </span>
        <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="font-semibold">{stats.isLoading ? '···' : formatCount(DEMO_TOTAL_VISITS)}</span>
        <span className="text-white/85">visits</span>
        {expanded ? (
          <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
        ) : (
          <ChevronUp className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
