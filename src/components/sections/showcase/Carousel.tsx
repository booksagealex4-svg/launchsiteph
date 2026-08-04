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
import { templates } from "@/components/sections/showcase/data"
import { TemplateCard } from "@/components/sections/showcase/TemplateCard"

const AUTOPLAY_MS = 5000
const SWIPE_THRESHOLD = 50

export function Carousel() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const firstSlideRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const [index, setIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(templates.length - 1)
  const [slideStep, setSlideStep] = useState(0)
  const [paused, setPaused] = useState(false)

  const recalculate = useCallback(() => {
    const viewport = viewportRef.current
    const firstSlide = firstSlideRef.current
    if (!viewport || !firstSlide || !firstSlide.parentElement) return

    const rowStyles = getComputedStyle(firstSlide.parentElement)
    const gap = parseFloat(rowStyles.columnGap || rowStyles.gap || "0")
    const step = firstSlide.offsetWidth + gap
    const visible = Math.max(1, Math.floor((viewport.offsetWidth + gap) / step))

    setSlideStep(step)
    setMaxIndex(Math.max(0, templates.length - visible))
  }, [])

  useEffect(() => {
    recalculate()
    window.addEventListener("resize", recalculate)
    return () => window.removeEventListener("resize", recalculate)
  }, [recalculate])

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const goTo = useCallback(
    (next: number) => setIndex(Math.max(0, Math.min(maxIndex, next))),
    [maxIndex]
  )

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1))
  }, [maxIndex])

  useEffect(() => {
    if (prefersReducedMotion || paused || maxIndex === 0) return

    const id = setInterval(() => {
      if (document.hidden) return
      next()
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [prefersReducedMotion, paused, maxIndex, next])

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
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={viewportRef}
        role="region"
        aria-label="Template showcase"
        aria-live="polite"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="overflow-hidden rounded-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div
          className={cn(
            "flex gap-6 md:gap-8",
            !prefersReducedMotion && "transition-transform duration-500 ease-out"
          )}
          style={{ transform: `translateX(-${index * slideStep}px)` }}
        >
          {templates.map((template, i) => (
            <div
              key={template.slug}
              ref={i === 0 ? firstSlideRef : undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${templates.length}`}
              className="w-[85%] shrink-0 md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.333px)]"
            >
              <TemplateCard template={template} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous templates"
          onClick={prev}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-elevated"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-200",
                i === index ? "w-6 bg-primary" : "w-2 bg-border"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next templates"
          onClick={next}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-elevated"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
