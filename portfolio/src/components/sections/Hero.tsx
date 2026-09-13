import { ClientLoginButton } from '@/components/ClientLoginButton'

export function Hero() {
  return (
    <header
      id="home"
      className="relative overflow-hidden rounded-lg border border-[var(--card-border-accent)] bg-white/55 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
    >
      {/* Original abstract line-art background — organic, subtle, slow, reduced-motion safe */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.2]"
        viewBox="0 0 1000 420"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g className="animate-hero-drift-a" stroke="#1F6FEB" strokeWidth="1.1" fill="none">
          <path d="M -100 60 C 120 -40, 260 140, 460 70 S 780 -30, 1120 90" />
          <path d="M -60 320 C 180 260, 300 400, 520 330 S 860 260, 1080 360" opacity="0.7" />
        </g>
        <g className="animate-hero-drift-b" stroke="#7fd8c4" strokeWidth="1.1" fill="none">
          <path d="M -80 180 C 160 260, 340 90, 600 190 S 900 300, 1100 170" />
        </g>
      </svg>

      {/* Top utility bar */}
      <div className="relative flex items-center justify-end px-6 pt-2 sm:px-8">
        <ClientLoginButton />
      </div>

      {/* Hero content — compact stacked hierarchy: eyebrow, headline, supporting line */}
      <div className="relative px-6 pt-1 pb-3 sm:px-8 sm:pb-3.5">
        <p className="text-[0.65rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">
          Personal Portfolio
        </p>
        <h1 className="mt-1 text-xl leading-tight font-extrabold tracking-tight text-[#122c52] sm:text-2xl lg:text-[1.6rem] lg:whitespace-nowrap">
          Build smarter. Create better.
        </h1>
        <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-slate-600 sm:text-sm lg:max-w-none lg:whitespace-nowrap">
          I create websites, digital experiences, and practical solutions designed to help ideas
          become something useful, professional, and lasting.
        </p>
      </div>
    </header>
  )
}
