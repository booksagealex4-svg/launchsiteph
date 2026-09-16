import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

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

      {/* Top utility bar — Personal Portfolio badge (left) balances Contact Me (right) */}
      <div className="relative flex flex-wrap items-center justify-between gap-2 px-6 pt-3 sm:px-8">
        <span className="inline-flex shrink-0 items-center rounded-md bg-[#128C4A] px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] whitespace-nowrap text-white uppercase shadow-[0_1px_2px_rgba(15,23,42,0.15)]">
          Personal Portfolio
        </span>
        <Link
          to="/contact?intent=message"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#1F6FEB] px-3 py-1.5 text-[0.8rem] font-semibold whitespace-nowrap text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] hover:shadow-[0_6px_14px_rgba(31,111,235,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6FEB]"
        >
          <Mail className="h-[14px] w-[14px]" />
          Contact Me
        </Link>
      </div>

      {/* Hero content — headline + supporting line, tightened now that the eyebrow moved to the top bar */}
      <div className="relative px-6 pt-1.5 pb-3 sm:px-8 sm:pb-3.5">
        <h1 className="text-xl leading-tight font-extrabold tracking-tight text-[#122c52] sm:text-2xl lg:text-[1.6rem] lg:whitespace-nowrap">
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
