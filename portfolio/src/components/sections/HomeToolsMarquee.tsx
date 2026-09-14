import type { ComponentType, CSSProperties } from 'react'
import { Bot, Code2, Palette } from 'lucide-react'
import { SiClaude, SiClaudecode, SiGithub, SiVercel, SiSupabase, SiReact, SiTypescript } from 'react-icons/si'

// Real brand logo + official brand hex (per simple-icons) wherever a licensed mark exists.
// OpenAI/ChatGPT, Canva, and VS Code have no freely-licensable mark in simple-icons (their
// trademarks aren't cleared for inclusion), so those three keep a generic icon — but every
// color below is still each brand's real, current hex, not an approximation.
const tools: { name: string; icon: ComponentType<{ className?: string; style?: CSSProperties }>; color: string }[] = [
  { name: 'ChatGPT', icon: Bot, color: '#000000' },
  { name: 'Claude', icon: SiClaude, color: '#D97757' },
  { name: 'Claude Code', icon: SiClaudecode, color: '#D97757' },
  { name: 'VS Code', icon: Code2, color: '#007ACC' },
  { name: 'GitHub', icon: SiGithub, color: '#24292f' },
  { name: 'Canva', icon: Palette, color: '#7d2ae8' },
  { name: 'Vercel', icon: SiVercel, color: '#111111' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ecf8e' },
  { name: 'React', icon: SiReact, color: '#149eca' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
]

/**
 * Homepage-only tools marquee: one unified rounded strip — a fixed label
 * section on the left and the moving track on the right, separated by a
 * thin divider so they read as one component, not two floating cards. Kept
 * separate from the shared `TechMarquee` (used by /projects and /about).
 */
export function HomeToolsMarquee() {
  const items = [...tools, ...tools]

  return (
    <section
      aria-label="Tools I work with"
      className="marquee-track flex items-stretch overflow-hidden rounded-lg border border-[var(--card-border-accent)] bg-[#EEF4F8]"
    >
      <div className="flex shrink-0 flex-col justify-center gap-0.5 border-r border-[#E8B4B4] px-5 py-2.5 sm:w-[168px]">
        <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-[#1F6FEB] uppercase">Daily Tools</p>
        <p className="text-sm font-semibold text-[#111827]">Tools I Work With</p>
      </div>

      <div className="relative min-w-0 flex-1 p-1.5">
        <div className="relative h-full overflow-hidden rounded-md border border-[var(--card-border-accent)] bg-white py-2.5">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent"
            aria-hidden="true"
          />

          <div className="animate-marquee flex w-max items-stretch divide-x divide-[#E8B4B4]">
            {items.map(({ name, icon: Icon, color }, i) => (
              <span key={`${name}-${i}`} className="flex items-center gap-2 px-5 whitespace-nowrap">
                <Icon className="h-[18px] w-[18px] shrink-0" style={{ color }} />
                <span className="text-sm font-semibold text-[#111827]">{name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
