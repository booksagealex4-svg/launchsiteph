import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { certificates } from "@/data/certificates"

const AUTOPLAY_MS = 5000
const SWIPE_THRESHOLD = 50

export function CertificateCarousel() {
  const touchStartX = useRef<number | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const maxIndex = certificates.length - 1
  const hasMultiple = certificates.length > 1

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1))
  }, [maxIndex])

  useEffect(() => {
    if (prefersReducedMotion || paused || !hasMultiple) return

    const id = setInterval(() => {
      if (document.hidden) return
      next()
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [prefersReducedMotion, paused, hasMultiple, next])

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) next()
      else prev()
    }
    touchStartX.current = null
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      next()
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      prev()
    }
  }

  return (
    <div>
      <h2 className="text-foreground">Certifications</h2>
      <div
        className="relative mx-auto mt-6 max-w-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          role="region"
          aria-label="Certifications"
          aria-live="polite"
          tabIndex={hasMultiple ? 0 : undefined}
          onKeyDown={hasMultiple ? onKeyDown : undefined}
          onTouchStart={hasMultiple ? onTouchStart : undefined}
          onTouchEnd={hasMultiple ? onTouchEnd : undefined}
          className="overflow-hidden rounded-[14px] border border-border bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div
            className={cn(
              "flex",
              !prefersReducedMotion && "transition-transform duration-500 ease-out"
            )}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {certificates.map((cert, i) => (
              <div
                key={cert.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${certificates.length}`}
                className="w-full shrink-0 p-3"
              >
                <img
                  src={cert.image}
                  alt={cert.alt}
                  width={900}
                  height={694}
                  loading="lazy"
                  className="w-full rounded-[10px] border border-border"
                />
              </div>
            ))}
          </div>
        </div>

        {hasMultiple && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous certificate"
              onClick={prev}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-elevated"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {certificates.map((cert, i) => (
                <button
                  key={cert.title}
                  type="button"
                  aria-label={`Go to certificate ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-200",
                    i === index ? "w-6 bg-primary" : "w-2 bg-border"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next certificate"
              onClick={next}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-elevated"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
