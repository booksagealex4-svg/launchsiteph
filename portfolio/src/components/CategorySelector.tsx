import { useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectorCategory {
  id: string
  label: string
  icon: LucideIcon
}

/**
 * Shared vertical/horizontal-scroll category selector — same interaction
 * pattern and ARIA tab architecture approved on the Projects page, generalized
 * with a `categories` prop so each Services showcase section can run its own
 * independent instance. Does not touch the Projects page's own copy.
 */
export function CategorySelector({
  categories,
  active,
  onChange,
  panelId,
  ariaLabel,
}: {
  categories: SelectorCategory[]
  active: string
  onChange: (id: string) => void
  panelId: string
  ariaLabel: string
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  function focusAndSelect(idx: number) {
    const next = categories[((idx % categories.length) + categories.length) % categories.length]
    onChange(next.id)
    refs.current[next.id]?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      focusAndSelect(idx + 1)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      focusAndSelect(idx - 1)
    }
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation="vertical"
      className="no-scrollbar flex min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0"
    >
      {categories.map((cat, idx) => {
        const isActive = cat.id === active
        return (
          <button
            key={cat.id}
            ref={(el) => {
              refs.current[cat.id] = el
            }}
            type="button"
            role="tab"
            id={`${panelId}-tab-${cat.id}`}
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(cat.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={cn(
              'flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-md border px-4 py-2.5 text-sm font-semibold transition-all duration-200',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
              isActive
                ? 'border-[#1F6FEB] bg-[#1F6FEB] text-white shadow-[0_4px_10px_rgba(31,111,235,0.25)]'
                : 'border-slate-300/70 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB]',
            )}
          >
            <cat.icon className="h-4 w-4 shrink-0" />
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
