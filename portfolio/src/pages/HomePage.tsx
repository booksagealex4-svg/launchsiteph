import { Hero } from '@/components/sections/Hero'
import { HomeToolsMarquee } from '@/components/sections/HomeToolsMarquee'
import { BentoGrid } from '@/components/sections/BentoGrid'

export function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <div className="mt-3">
        <HomeToolsMarquee />
      </div>

      <div className="mt-4 rounded-lg border border-[var(--card-border-accent)] bg-[#e9f1fb] p-3 pb-4 shadow-[0_2px_4px_rgba(15,23,42,0.04),0_16px_32px_rgba(15,23,42,0.05)] sm:p-4 sm:pb-5">
        <BentoGrid />
      </div>

      <footer className="flex flex-col items-center gap-1 py-3 text-center text-xs text-muted-foreground">
        <p>© 2024–2026 Alexis Sarip. All rights reserved.</p>
      </footer>
    </div>
  )
}
