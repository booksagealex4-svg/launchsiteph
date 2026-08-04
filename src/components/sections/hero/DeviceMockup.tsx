import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

const VARIANT_COUNT = 4
const CYCLE_MS = 4000
const FADE_MS = 300

function WireframeScreen({ variant }: { variant: number }) {
  switch (variant) {
    case 1:
      return (
        <div className="flex h-full w-full flex-col gap-2 p-3">
          <div className="flex items-center justify-between">
            <div className="h-2 w-10 rounded-[10px] bg-primary/40" />
            <div className="flex gap-1">
              <div className="h-2 w-4 rounded-[10px] bg-surface-elevated" />
              <div className="h-2 w-4 rounded-[10px] bg-surface-elevated" />
              <div className="h-2 w-4 rounded-[10px] bg-surface-elevated" />
            </div>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2">
            <div className="col-span-2 rounded-[10px] border border-border bg-surface-elevated" />
            <div className="flex flex-col gap-2">
              <div className="flex-1 rounded-[10px] bg-primary/20" />
              <div className="flex-1 rounded-[10px] bg-surface-elevated" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-3 flex-1 rounded-[10px] bg-surface-elevated" />
            <div className="h-3 flex-1 rounded-[10px] bg-surface-elevated" />
            <div className="h-3 flex-1 rounded-[10px] bg-surface-elevated" />
          </div>
        </div>
      )
    case 2:
      return (
        <div className="flex h-full w-full flex-col items-center gap-2 p-3">
          <div className="h-2 w-2 rounded-full bg-primary/50" />
          <div className="h-2 w-16 rounded-[10px] bg-surface-elevated" />
          <div className="h-1.5 w-24 rounded-[10px] bg-border" />
          <div className="mt-2 grid w-full flex-1 grid-cols-3 gap-2">
            <div className="rounded-[10px] border border-border" />
            <div className="rounded-[10px] border border-border" />
            <div className="rounded-[10px] border border-border" />
          </div>
        </div>
      )
    case 3:
      return (
        <div className="flex h-full w-full flex-col gap-2 p-3">
          <div className="h-2 w-12 rounded-[10px] bg-surface-elevated" />
          <div className="grid flex-1 grid-cols-2 gap-2">
            <div className="rounded-[10px] bg-surface-elevated" />
            <div className="rounded-[10px] bg-surface-elevated" />
            <div className="rounded-[10px] bg-surface-elevated" />
            <div className="rounded-[10px] bg-primary/20" />
          </div>
          <div className="h-3 w-full rounded-[10px] bg-primary/40" />
        </div>
      )
    default:
      return (
        <div className="flex h-full w-full flex-col gap-2 p-3">
          <div className="h-2 w-8 rounded-[10px] bg-surface-elevated" />
          <div className="flex-1 rounded-[10px] bg-primary/25" />
          <div className="flex gap-2">
            <div className="h-3 flex-1 rounded-[10px] bg-surface-elevated" />
            <div className="h-3 w-10 rounded-[10px] bg-primary/40" />
          </div>
        </div>
      )
  }
}

function Screen({ variant, fading }: { variant: number; fading: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-300 ease-out",
        fading ? "opacity-0" : "opacity-100"
      )}
    >
      <WireframeScreen variant={variant} />
    </div>
  )
}

function LaptopFrame({ variant, fading }: { variant: number; fading: boolean }) {
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

function PhoneFrame({ variant, fading }: { variant: number; fading: boolean }) {
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
  const [variant, setVariant] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return

    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const intervalId = setInterval(() => {
      if (document.hidden) return
      setFading(true)
      timeoutId = setTimeout(() => {
        setVariant((v) => (v + 1) % VARIANT_COUNT)
        setFading(false)
      }, FADE_MS)
    }, CYCLE_MS)

    return () => {
      clearInterval(intervalId)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [prefersReducedMotion])

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
