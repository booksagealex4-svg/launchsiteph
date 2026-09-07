import type { ComponentType } from 'react'
import { Bot, TerminalSquare, Code2, Palette } from 'lucide-react'
import { SiClaude, SiGithub, SiVercel, SiSupabase, SiReact, SiTypescript } from 'react-icons/si'
import { cn } from '@/lib/utils'

const tools: { name: string; icon: ComponentType<{ className?: string }>; tint: 'slate' | 'blue' | 'mint' }[] = [
  { name: 'ChatGPT', icon: Bot, tint: 'slate' },
  { name: 'Claude', icon: SiClaude, tint: 'blue' },
  { name: 'Claude Code', icon: TerminalSquare, tint: 'slate' },
  { name: 'VS Code', icon: Code2, tint: 'blue' },
  { name: 'GitHub', icon: SiGithub, tint: 'slate' },
  { name: 'Canva', icon: Palette, tint: 'mint' },
  { name: 'Vercel', icon: SiVercel, tint: 'slate' },
  { name: 'Supabase', icon: SiSupabase, tint: 'mint' },
  { name: 'React', icon: SiReact, tint: 'slate' },
  { name: 'TypeScript', icon: SiTypescript, tint: 'blue' },
]

const tintClass: Record<(typeof tools)[number]['tint'], string> = {
  slate: 'text-slate-500',
  blue: 'text-[#1F6FEB]',
  mint: 'text-[#1f9d7c]',
}

export function TechMarquee() {
  const items = [...tools, ...tools]

  return (
    <section
      aria-label="Tools I work with"
      className="marquee-track group relative flex flex-col overflow-hidden rounded-lg border border-slate-200/70 bg-white sm:flex-row sm:items-stretch"
    >
      {/* Static label area */}
      <div className="flex shrink-0 flex-col justify-center gap-1 border-b border-slate-200/50 px-6 py-4 sm:w-[188px] sm:border-r sm:border-b-0">
        <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-[#1F6FEB] uppercase">
          Daily Tools
        </p>
        <p className="text-sm font-semibold text-slate-800">Tools I Work With</p>
      </div>

      {/* Scrolling area */}
      <div className="relative flex-1 overflow-hidden py-4">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent"
          aria-hidden="true"
        />

        <div className="animate-marquee flex w-max items-center gap-10 px-2">
          {items.map(({ name, icon: Icon, tint }, i) => (
            <span key={`${name}-${i}`} className="flex items-center gap-2 whitespace-nowrap">
              <Icon className={cn('h-[18px] w-[18px] shrink-0', tintClass[tint])} />
              <span className="text-sm font-medium text-slate-700">{name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
