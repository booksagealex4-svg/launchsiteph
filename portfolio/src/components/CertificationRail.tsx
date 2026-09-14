import { useRef } from 'react'
import { BadgeCheck, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
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
    const amount = (card?.offsetWidth ?? 320) + 12
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
            className="flex w-80 shrink-0 flex-col gap-3 rounded-lg border border-slate-300/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#0A66C2] text-white">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-[#eaf2fb] px-2 py-0.5 text-[0.6rem] font-semibold whitespace-nowrap text-[#0A66C2]">
                Verified Course
              </span>
            </div>

            <div>
              <p className="text-[0.6rem] font-semibold tracking-[0.08em] text-[#0A66C2] uppercase">{cert.issuer}</p>
              <p className="text-[0.65rem] text-slate-400">Course Completed</p>
            </div>

            <h3 className="text-sm leading-snug font-semibold text-slate-800">{cert.title}</h3>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
              <span>{cert.date ?? 'Credential details to be added'}</span>
              {cert.duration ? (
                <>
                  <span className="text-slate-300">·</span>
                  <span>{cert.duration}</span>
                </>
              ) : null}
            </div>

            {cert.skills?.length ? (
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[0.65rem] text-slate-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : null}

            {cert.certificateId ? (
              <p className="mt-auto break-all text-[0.6rem] leading-relaxed font-mono text-slate-400">
                Certificate ID: {cert.certificateId}
              </p>
            ) : null}

            {cert.credentialUrl ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-md border border-[#0A66C2]/40 bg-[#eaf2fb] px-3 py-2 text-xs font-semibold text-[#0A66C2] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0A66C2]/70 hover:bg-[#dbe9fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                View Certificate
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
