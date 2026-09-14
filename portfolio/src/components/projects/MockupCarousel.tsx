import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X, Expand, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MockupSlide {
  id: string
  kind: 'website' | 'dashboard' | 'generic'
  variant: 1 | 2 | 3 | 4
  accent: string
  label: string
  /** Present only for real, named projects — abstract filler slides omit these. */
  title?: string
  type?: string
  description?: string
  /** Real generated concept-mockup image — when set, replaces the abstract MiniMockup
   *  render entirely (thumbnail + enlarged view) and shows a "Concept Mockup" trust badge. */
  image?: string
  imageAlt?: string
  /** Overrides the default "Concept Mockup" badge text/tone — e.g. "In Progress" for a real
   *  project that doesn't have a generated concept image. Shown even without `image`. */
  badge?: string
}

/**
 * Abstract placeholder "website/dashboard" mockup — built entirely from divs,
 * not a real screenshot or external image. Varies by kind/variant/accent so a
 * row of slides reads as visually distinct without inventing real content.
 */
function MiniMockup({ slide, large = false }: { slide: MockupSlide; large?: boolean }) {
  const { kind, variant, accent } = slide
  const barH = large ? 'h-3' : 'h-1.5'
  const lineH = large ? 'h-2.5' : 'h-1.5'

  if (kind === 'generic') {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-slate-200 bg-slate-50 p-4">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-md"
          style={{ backgroundColor: `${accent}1a`, color: accent }}
        >
          <Layers className={large ? 'h-5 w-5' : 'h-4 w-4'} />
        </span>
        <div className="h-1.5 w-2/5 rounded-sm bg-slate-200" />
        <div className="h-1.5 w-1/4 rounded-sm bg-slate-100" />
      </div>
    )
  }

  if (kind === 'dashboard') {
    return (
      <div className="flex h-full w-full">
        <div className="flex w-[22%] shrink-0 flex-col gap-2 border-r border-slate-200 bg-slate-50 p-2">
          <div className={cn('rounded-sm', barH)} style={{ backgroundColor: accent, width: '70%' }} />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={cn('rounded-sm bg-slate-200', lineH)} style={{ width: `${80 - i * 8}%` }} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-2.5">
          {variant === 1 && (
            <>
              <div className="grid grid-cols-3 gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-sm border border-slate-200 bg-white p-1.5">
                    <div className={cn('mb-1 rounded-sm', lineH)} style={{ backgroundColor: accent, opacity: 0.7, width: '60%' }} />
                    <div className="h-1 w-full rounded-sm bg-slate-100" />
                  </div>
                ))}
              </div>
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-2 w-full rounded-sm bg-slate-100" />
              ))}
            </>
          )}
          {variant === 2 && (
            <>
              <div className="flex flex-1 items-end gap-1 rounded-sm border border-slate-200 bg-white p-2">
                {[40, 65, 50, 80, 60, 90, 45].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{ height: `${h}%`, backgroundColor: accent, opacity: 0.35 + i * 0.07 }}
                  />
                ))}
              </div>
              <div className="h-2 w-2/3 rounded-sm bg-slate-100" />
            </>
          )}
          {variant === 3 && (
            <>
              <div className="grid grid-cols-3 gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-sm border border-slate-200 bg-white p-1.5">
                    <div className="h-1 w-1/2 rounded-sm bg-slate-200" />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col gap-1 rounded-sm border border-slate-200 bg-white p-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: accent, opacity: 0.6 }} />
                    <div className="h-1.5 flex-1 rounded-sm bg-slate-100" />
                  </div>
                ))}
              </div>
            </>
          )}
          {variant === 4 && (
            <div className="grid flex-1 grid-cols-3 gap-1.5">
              {[0, 1, 2].map((col) => (
                <div key={col} className="flex flex-col gap-1.5 rounded-sm border border-slate-200 bg-white p-1.5">
                  <div className="h-1.5 w-1/2 rounded-sm bg-slate-200" />
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="h-4 w-full rounded-sm"
                      style={{ backgroundColor: accent, opacity: 0.12 + col * 0.05 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Website homepage mockups
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-slate-200 px-3 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
        <div className="h-1.5 w-10 rounded-sm bg-slate-200" />
        <div className="ml-auto flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1.5 w-6 rounded-sm bg-slate-100" />
          ))}
        </div>
      </div>

      {variant === 1 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center">
          <div className={cn('rounded-sm bg-slate-200', large ? 'h-4 w-3/5' : 'h-2 w-3/5')} />
          <div className="h-1.5 w-2/5 rounded-sm bg-slate-100" />
          <div className="mt-1 rounded-sm px-3 py-1" style={{ backgroundColor: accent }}>
            <div className="h-1.5 w-8 rounded-sm bg-white/80" />
          </div>
        </div>
      )}

      {variant === 2 && (
        <div className="flex flex-1 items-center gap-3 p-3">
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-4/5 rounded-sm bg-slate-200" />
            <div className="h-2 w-3/5 rounded-sm bg-slate-200" />
            <div className="h-1.5 w-2/3 rounded-sm bg-slate-100" />
            <div className="mt-1.5 h-2 w-10 rounded-sm" style={{ backgroundColor: accent }} />
          </div>
          <div className="h-full w-[34%] shrink-0 rounded-sm" style={{ backgroundColor: accent, opacity: 0.18 }} />
        </div>
      )}

      {variant === 3 && (
        <div className="flex flex-1 flex-col">
          <div className="flex-1 rounded-sm" style={{ backgroundColor: accent, opacity: 0.16 }} />
          <div className="flex items-center justify-between px-3 py-2">
            <div className="h-1.5 w-1/3 rounded-sm bg-slate-200" />
            <div className="h-1.5 w-8 rounded-sm" style={{ backgroundColor: accent }} />
          </div>
        </div>
      )}

      {variant === 4 && (
        <div className="flex flex-1 flex-col gap-2 p-3">
          <div className="h-1.5 w-1/3 rounded-sm bg-slate-200" />
          <div className="grid flex-1 grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-sm" style={{ backgroundColor: accent, opacity: 0.15 + i * 0.08 }} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function MockupCarousel({ slides, ariaLabel }: { slides: MockupSlide[]; ariaLabel: string }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [fading, setFading] = useState(false)
  const [expandedSlide, setExpandedSlide] = useState<MockupSlide | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const prevSlidesRef = useRef(slides)

  // Category changed (new slides array) — reset to the first slide with a brief crossfade.
  useEffect(() => {
    if (prevSlidesRef.current === slides) return
    prevSlidesRef.current = slides
    setFading(true)
    const t = window.setTimeout(() => {
      setIndex(0)
      setFading(false)
    }, 160)
    return () => window.clearTimeout(t)
  }, [slides])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || paused || expandedSlide) return

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [paused, expandedSlide, slides.length])

  useEffect(() => {
    if (!expandedSlide) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeExpanded()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedSlide])

  function goTo(i: number) {
    setIndex(((i % slides.length) + slides.length) % slides.length)
  }

  function openExpanded(slide: MockupSlide, e: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = e.currentTarget
    setExpandedSlide(slide)
  }

  function closeExpanded() {
    setExpandedSlide(null)
    triggerRef.current?.focus()
  }

  return (
    <div
      className="relative min-w-0 overflow-hidden rounded-md border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3 py-1.5">
        <span className="h-[6px] w-[6px] rounded-full bg-slate-300" />
        <span className="h-[6px] w-[6px] rounded-full bg-slate-300" />
        <span className="h-[6px] w-[6px] rounded-full bg-slate-300" />
      </div>

      <div className="relative aspect-[16/8] min-w-0 overflow-hidden bg-slate-50" role="group" aria-label={ariaLabel}>
        <div
          className={cn('flex h-full w-full min-w-0 transition-opacity duration-150 ease-out', fading ? 'opacity-0' : 'opacity-100')}
        >
          <div
            className="flex h-full w-full min-w-0 shrink-0 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={slide.id} className="h-full w-full shrink-0 p-1.5" aria-hidden={i !== index}>
                <button
                  type="button"
                  onClick={(e) => openExpanded(slide, e)}
                  aria-label={
                    slide.title
                      ? `Enlarge preview: ${slide.title} — ${slide.type}`
                      : `Enlarge preview: ${slide.label}`
                  }
                  tabIndex={i === index ? 0 : -1}
                  className={cn(
                    'group relative h-full w-full overflow-hidden rounded-sm border bg-white transition-shadow duration-200 hover:shadow-[0_4px_14px_rgba(15,23,42,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
                    slide.image
                      ? 'border-[var(--card-border-nested)]/50 hover:border-[var(--card-border-nested)]'
                      : 'border-slate-200',
                  )}
                >
                  {slide.image ? (
                    <img
                      src={slide.image}
                      alt={slide.imageAlt ?? ''}
                      loading="lazy"
                      className="h-full w-full bg-slate-50 object-cover object-top"
                    />
                  ) : (
                    <MiniMockup slide={slide} />
                  )}
                  {(slide.image || slide.badge) && (
                    <span
                      className={cn(
                        'pointer-events-none absolute top-1.5 left-1.5 rounded-full px-2 py-0.5 text-[0.55rem] font-semibold tracking-wide uppercase shadow-sm',
                        slide.badge ? 'bg-[#eafaf4] text-[#1f9d7c]' : 'bg-white/90 text-slate-600',
                      )}
                    >
                      {slide.badge ?? 'Concept Mockup'}
                    </span>
                  )}
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900/0 transition-colors duration-200 group-hover:bg-slate-900/5">
                    <span className="flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-xs font-medium text-slate-600 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                      <Expand className="h-3.5 w-3.5" />
                      Preview larger
                    </span>
                  </span>
                  {slide.title && (
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col border-t border-slate-200 bg-white/92 px-2.5 py-1.5 text-left backdrop-blur-sm">
                      <span className="truncate text-xs font-semibold text-slate-800">{slide.title}</span>
                      <span className="truncate text-[0.65rem] text-slate-500">{slide.type}</span>
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous preview"
          className="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition-all duration-200 hover:border-blue-200 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next preview"
          className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition-all duration-200 hover:border-blue-200 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 py-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to preview ${i + 1}`}
            aria-current={i === index}
            className={cn(
              'h-1.5 rounded-full transition-all duration-200',
              i === index ? 'w-5 bg-[#1F6FEB]' : 'w-1.5 bg-slate-200 hover:bg-slate-300',
            )}
          />
        ))}
      </div>

      {/* Enlarged in-page preview */}
      {expandedSlide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            expandedSlide.title
              ? `Enlarged preview: ${expandedSlide.title} — ${expandedSlide.type}`
              : `Enlarged preview: ${expandedSlide.label}`
          }
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6"
          onClick={closeExpanded}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
              {expandedSlide.title ? (
                <span className="min-w-0">
                  {(expandedSlide.image || expandedSlide.badge) && (
                    <span
                      className={cn(
                        'block text-[0.6rem] font-semibold tracking-wide uppercase',
                        expandedSlide.badge ? 'text-[#1f9d7c]' : 'text-[#1F6FEB]',
                      )}
                    >
                      {expandedSlide.badge ?? 'Concept Mockup'}
                    </span>
                  )}
                  <span className="block truncate text-sm font-semibold text-slate-800">{expandedSlide.title}</span>
                  <span className="block truncate text-xs text-slate-500">{expandedSlide.type}</span>
                </span>
              ) : (
                <span className="text-sm font-medium text-slate-600">{expandedSlide.label}</span>
              )}
              <button
                type="button"
                onClick={closeExpanded}
                aria-label="Close enlarged preview"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-slate-200 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="aspect-video bg-slate-50">
              {expandedSlide.image ? (
                <img
                  src={expandedSlide.image}
                  alt={expandedSlide.imageAlt ?? ''}
                  className="h-full w-full object-contain"
                />
              ) : (
                <MiniMockup slide={expandedSlide} large />
              )}
            </div>
            {expandedSlide.description && (
              <p className="border-t border-slate-200 px-4 py-3 text-sm leading-relaxed text-slate-600">
                {expandedSlide.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
