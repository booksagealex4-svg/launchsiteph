/**
 * Placeholder route only — prevents a blank page when the Projects-page CTAs
 * link here. The real Contact page (form, intent-based preselection from
 * ?intent=project / ?intent=mockup) is a future ticket, not built yet.
 */
export function ContactPage() {
  return (
    <header className="relative overflow-hidden rounded-lg border border-slate-300/60 bg-[#fdfbf7] px-6 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:px-8 sm:py-7">
      <p className="text-[0.65rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Contact</p>
      <h1 className="mt-2 text-4xl leading-[1.08] font-extrabold tracking-tight text-[#122c52] sm:text-5xl lg:text-[3rem]">
        Let's build something.
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
        This page is coming soon.
      </p>
    </header>
  )
}
