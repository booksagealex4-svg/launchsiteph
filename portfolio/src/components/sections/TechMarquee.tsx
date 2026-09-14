import type { ComponentType, CSSProperties } from 'react'
import { Bot, TerminalSquare, Code2, Palette } from 'lucide-react'
import { SiClaude, SiGithub, SiVercel, SiSupabase, SiReact, SiTypescript } from 'react-icons/si'

const tools: { name: string; icon: ComponentType<{ className?: string; style?: CSSProperties }>; color: string }[] = [
  { name: 'ChatGPT', icon: Bot, color: '#10a37f' },
  { name: 'Claude', icon: SiClaude, color: '#7c3aed' },
  { name: 'Claude Code', icon: TerminalSquare, color: '#4f46e5' },
  { name: 'VS Code', icon: Code2, color: '#0098ff' },
  { name: 'GitHub', icon: SiGithub, color: '#24292f' },
  { name: 'Canva', icon: Palette, color: '#7d2ae8' },
  { name: 'Vercel', icon: SiVercel, color: '#111111' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ecf8e' },
  { name: 'React', icon: SiReact, color: '#149eca' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
]

export function TechMarquee() {
  const items = [...tools, ...tools]

  return (
    <section
      aria-label="Tools I work with"
      className="marquee-track group relative flex flex-col overflow-hidden rounded-lg border border-[#B8C6D5] bg-[#F7F9FB] sm:flex-row sm:items-stretch"
    >
      {/* Static label area — visually distinct surface from the scrolling track */}
      <div className="flex shrink-0 flex-col justify-center gap-1 border-b border-[#B8C6D5] bg-[#F1F5F7] px-6 py-4 sm:w-[188px] sm:border-r sm:border-b-0">
        <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-[#1F6FEB] uppercase">
          Daily Tools
        </p>
        <p className="text-sm font-semibold text-slate-800">Tools I Work With</p>
      </div>

      {/* Inner framed tool track */}
      <div className="relative min-w-0 flex-1 p-2 sm:p-3">
        <div className="relative overflow-hidden rounded-md border border-[#B8C6D5] bg-[#EEF3F6] py-3.5">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#EEF3F6] to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#EEF3F6] to-transparent"
            aria-hidden="true"
          />

          <div className="animate-marquee flex w-max items-stretch divide-x divide-[#C7D2DD]">
            {items.map(({ name, icon: Icon, color }, i) => (
              <span key={`${name}-${i}`} className="flex items-center gap-2 px-5 whitespace-nowrap">
                <Icon className="h-[18px] w-[18px] shrink-0" style={{ color }} />
                <span className="text-sm font-semibold text-[#172033]">{name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
