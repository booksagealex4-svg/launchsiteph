import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Shared visual primitives for the Client Portal — kept in one place so every portal page (Overview, Project, and later Reviews/Messages/Files) stays visually identical without copy-pasting. */

export function IconChip({ icon: Icon, tint = 'blue' }: { icon: LucideIcon; tint?: 'blue' | 'mint' | 'amber' }) {
  const tintClasses = {
    blue: 'bg-blue-50 text-[#1F6FEB]',
    mint: 'bg-[#eafaf4] text-[#1f9d7c]',
    amber: 'bg-amber-50 text-amber-600',
  }
  return (
    <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-md', tintClasses[tint])}>
      <Icon className="h-[18px] w-[18px]" />
    </span>
  )
}

export function StatusPill({ tone, children }: { tone: 'blue' | 'mint' | 'amber'; children: ReactNode }) {
  const toneClasses = {
    blue: 'bg-blue-50 text-[#1F6FEB]',
    mint: 'bg-[#eafaf4] text-[#1f9d7c]',
    amber: 'bg-amber-50 text-amber-700',
  }
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', toneClasses[tone])}>
      {children}
    </span>
  )
}

export function CardShell({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section
      id={id}
      className={cn(
        'rounded-lg border border-slate-300/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] sm:p-5',
        className,
      )}
    >
      {children}
    </section>
  )
}

export function CardLabel({ children }: { children: ReactNode }) {
  return <p className="text-[0.65rem] font-bold tracking-[0.12em] text-[#1F6FEB] uppercase">{children}</p>
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
        checked ? 'border-[#1F6FEB] bg-[#1F6FEB]' : 'border-slate-300 bg-slate-200',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200',
          checked ? 'translate-x-[22px]' : 'translate-x-[3px]',
        )}
      />
    </button>
  )
}

const projectStages = ['Planning', 'Design', 'Review', 'Build', 'Final Delivery']

export function ProjectStepper({ currentIndex, stages = projectStages }: { currentIndex: number; stages?: string[] }) {
  return (
    <>
      {/* Desktop / tablet — horizontal stepper */}
      <div className="hidden items-start sm:flex">
        {stages.map((stage, i) => {
          const isDone = i < currentIndex
          const isCurrent = i === currentIndex
          return (
            <div key={stage} className="flex flex-1 items-start last:flex-none">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold',
                    isDone
                      ? 'border-[#1f9d7c] bg-[#1f9d7c] text-white'
                      : isCurrent
                        ? 'border-[#1F6FEB] bg-[#1F6FEB] text-white'
                        : 'border-slate-300 bg-white text-slate-400',
                  )}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span
                  className={cn(
                    'text-xs whitespace-nowrap',
                    isCurrent ? 'font-semibold text-slate-800' : isDone ? 'text-slate-600' : 'text-slate-400',
                  )}
                >
                  {stage}
                </span>
              </div>
              {i < stages.length - 1 ? (
                <div className={cn('mt-3.5 h-0.5 flex-1', isDone ? 'bg-[#1f9d7c]' : 'bg-slate-200')} />
              ) : null}
            </div>
          )
        })}
      </div>

      {/* Mobile — compact vertical list */}
      <div className="flex flex-col gap-2 sm:hidden">
        {stages.map((stage, i) => {
          const isDone = i < currentIndex
          const isCurrent = i === currentIndex
          return (
            <div key={stage} className="flex items-center gap-2.5">
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[0.65rem] font-bold',
                  isDone
                    ? 'border-[#1f9d7c] bg-[#1f9d7c] text-white'
                    : isCurrent
                      ? 'border-[#1F6FEB] bg-[#1F6FEB] text-white'
                      : 'border-slate-300 bg-white text-slate-400',
                )}
              >
                {isDone ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <span className={cn('text-sm', isCurrent ? 'font-semibold text-slate-800' : isDone ? 'text-slate-600' : 'text-slate-400')}>
                {stage}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}
