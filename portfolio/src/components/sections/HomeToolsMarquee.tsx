import type { ComponentType, CSSProperties } from 'react'
import { SiClaude, SiClaudecode, SiGithub, SiVercel, SiSupabase, SiReact, SiTypescript } from 'react-icons/si'
import { OpenAiIcon, CanvaIcon, VsCodeIcon } from '@/components/icons/BrandIcons'

// Real brand logo + official brand hex (per simple-icons) for every tool. OpenAI/ChatGPT
// and Canva use locally-stored brand marks (see components/icons/BrandIcons.tsx) because
// the installed react-icons/si snapshot has no licensed glyph for them; VS Code has no
// simple-icons entry at all, so it uses the official multi-tone mark from Devicon
// (public/icons/vscode.svg) instead of a generic substitute.
const tools: { name: string; icon: ComponentType<{ className?: string; style?: CSSProperties }>; color?: string }[] = [
  { name: 'ChatGPT', icon: OpenAiIcon, color: '#412991' },
  { name: 'Claude', icon: SiClaude, color: '#D97757' },
  { name: 'Claude Code', icon: SiClaudecode, color: '#D97757' },
  { name: 'VS Code', icon: VsCodeIcon },
  { name: 'GitHub', icon: SiGithub, color: '#181717' },
  { name: 'Canva', icon: CanvaIcon, color: '#00C4CC' },
  { name: 'Vercel', icon: SiVercel, color: '#000000' },
  { name: 'Supabase', icon: SiSupabase, color: '#3FCF8E' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
]

/**
 * Tools marquee with the approved icon/color treatment: one unified rounded
 * strip — a fixed label section on the left and the moving track on the
 * right, separated by a thin divider so they read as one component, not two
 * floating cards. Used on the homepage and the Projects page. Kept separate
 * from the older `TechMarquee` (still used by /about) pending its own refresh.
 */
export function HomeToolsMarquee() {
  const items = [...tools, ...tools]

  return (
    <section
      aria-label="Tools I work with"
      className="marquee-track flex items-stretch overflow-hidden rounded-lg border border-[var(--card-border-accent)] bg-[#EEF4F8]"
    >
      <div className="flex shrink-0 flex-col justify-center gap-0.5 border-r border-[#E8B4B4] px-5 py-2.5 sm:w-[168px]">
        <p className="text-[0.62rem] font-bold tracking-[0.14em] text-[#128C4A] uppercase">Daily Tools</p>
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
