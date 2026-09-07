import { Sidebar } from '@/components/layout/Sidebar'
import { Hero } from '@/components/sections/Hero'
import { TechMarquee } from '@/components/sections/TechMarquee'
import { BentoGrid } from '@/components/sections/BentoGrid'
import { VisitorCounter } from '@/components/VisitorCounter'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="flex flex-col gap-4 p-4 lg:ml-[352px]">
        <Hero />
        <TechMarquee />

        <div className="rounded-lg border border-slate-300/60 bg-[#e9f1fb] p-3 shadow-[0_2px_4px_rgba(15,23,42,0.04),0_16px_32px_rgba(15,23,42,0.05)] sm:p-4">
          <BentoGrid />
        </div>

        <footer className="mt-2 flex flex-col items-center gap-1 py-6 text-center text-xs text-muted-foreground">
          <p>© Year Placeholder · Full Name Placeholder · All rights reserved</p>
        </footer>
      </main>

      <VisitorCounter />
    </div>
  )
}

export default App
