import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { SiteMockup, type MockupVariant } from "@/components/shared/SiteMockup"

const CYCLE_VARIANTS: MockupVariant[] = ["cards", "gallery", "list", "video"]
const CYCLE_MS = 4000
const FADE_MS = 300

// Our own dark chrome, not a client palette — only the layout changes.
const MOCKUP_BACKGROUND = "#161a20"
const MOCKUP_ACCENT = "#2e7dff"
const MOCKUP_TEXT = "#e8ecf2"

function Screen({ variant, fading }: { variant: MockupVariant; fading: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-300 ease-out",
        fading ? "opacity-0" : "opacity-100"
      )}
    >
      <SiteMockup
        background={MOCKUP_BACKGROUND}
        accent={MOCKUP_ACCENT}
        text={MOCKUP_TEXT}
        variant={variant}
      />
    </div>
  )
}

function LaptopFrame({
  variant,
  fading,
}: {
  variant: MockupVariant
  fading: boolean
}) {
  return (
    <div className="w-full">
      <div className="rounded-[14px] border border-border bg-surface p-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-background">
          <Screen variant={variant} fading={fading} />
        </div>
      </div>
      <div className="mx-auto h-2 w-[70%] rounded-b-[10px] border border-t-0 border-border bg-surface-elevated" />
    </div>
  )
}

function PhoneFrame({
  variant,
  fading,
}: {
  variant: MockupVariant
  fading: boolean
}) {
  return (
    <div className="absolute -bottom-8 -left-6 w-[36%] rounded-[14px] border border-border bg-surface p-1.5 md:-bottom-10 md:-left-8">
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[10px] bg-background">
        <Screen variant={variant} fading={fading} />
      </div>
    </div>
  )
}

export function DeviceMockup() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return

    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const intervalId = setInterval(() => {
      if (document.hidden) return
      setFading(true)
      timeoutId = setTimeout(() => {
        setIndex((i) => (i + 1) % CYCLE_VARIANTS.length)
        setFading(false)
      }, FADE_MS)
    }, CYCLE_MS)

    return () => {
      clearInterval(intervalId)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [prefersReducedMotion])

  const variant = CYCLE_VARIANTS[index]

  return (
    <div className="relative mx-auto max-w-[420px] pb-10 pl-8 md:mx-0 md:max-w-none md:pl-10">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-[80px]"
      />
      <LaptopFrame variant={variant} fading={fading} />
      <PhoneFrame variant={variant} fading={fading} />
    </div>
  )
}
