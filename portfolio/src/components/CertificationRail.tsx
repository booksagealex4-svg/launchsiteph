import { useRef } from 'react'
import { Award, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Certification } from '@/data/certifications'

/**
 * Quiet, manual-scroll credential rail — deliberately calmer than the
 * autoplaying Projects/Services mockup carousels (no autoplay, no crossfade).
 * Reusable so a future homepage Credentials section can read the same
 * certifications data without duplicating this component.
 */
export function CertificationRail({ certifications }: { certifications: Certification[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-cert-card]')
    const amount = (card?.offsetWidth ?? 260) + 12
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * amount, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className="relative">
      {/* Controls sit above the track (not bottom-right) so they never collide with the fixed visitor-counter pill */}
      <div className="mb-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Scroll certifications left"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300/70 bg-white text-slate-500 transition-all duration-200 hover:border-blue-200 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Scroll certifications right"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300/70 bg-white text-slate-500 transition-all duration-200 hover:border-blue-200 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={trackRef}
        role="list"
        aria-label="LinkedIn Learning certifications"
        className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pb-1"
      >
        {certifications.map((cert) => (
          <div
            key={cert.id}
            data-cert-card
            role="listitem"
            className="flex w-64 shrink-0 flex-col gap-2.5 rounded-lg border border-slate-300/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#0A66C2]">
                <Award className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[0.6rem] font-semibold tracking-[0.08em] text-[#0A66C2] uppercase">
                {cert.issuer}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">{cert.title}</h3>
            <p className="text-xs text-slate-500">{cert.date ?? 'Credential details to be added'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
