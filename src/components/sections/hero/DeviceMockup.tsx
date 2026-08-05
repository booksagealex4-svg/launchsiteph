import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { heroShowcaseContent } from "@/lib/template-preview-content"
import { TemplateHeroMockup } from "@/components/shared/TemplateHeroMockup"

const CYCLE_MS = 5000
const TRANSITION_MS = 700

function Layer({
  index,
  phase,
}: {
  index: number
  phase: "static" | "enter" | "exit" | "settled"
}) {
  const { name, content } = heroShowcaseContent[index]
  return (
    <div
      className={cn(
        "absolute inset-0 ease-out",
        phase !== "enter" && "transition-[opacity,transform]",
        phase === "static" && "opacity-100",
        phase === "enter" && "translate-y-2 scale-[0.97] opacity-0 duration-0",
        phase === "settled" &&
          "translate-y-0 scale-100 opacity-100 duration-700",
        phase === "exit" && "scale-[1.03] opacity-0 duration-700"
      )}
    >
      <TemplateHeroMockup name={name} content={content} eager={phase === "static"} />
    </div>
  )
}

function Screens({
  index,
  prevIndex,
  settled,
}: {
  index: number
  prevIndex: number | null
  settled: boolean
}) {
  if (prevIndex === null) {
    return <Layer index={index} phase="static" />
  }
  return (
    <>
      <Layer index={prevIndex} phase={settled ? "exit" : "static"} />
      <Layer index={index} phase={settled ? "settled" : "enter"} />
    </>
  )
}

function LaptopFrame({
  index,
  prevIndex,
  settled,
}: {
  index: number
  prevIndex: number | null
  settled: boolean
}) {
  return (
    <div className="w-full">
      <div className="rounded-[14px] border border-border bg-surface p-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-background">
          <Screens index={index} prevIndex={prevIndex} settled={settled} />
        </div>
      </div>
      <div className="mx-auto h-2 w-[70%] rounded-b-[10px] border border-t-0 border-border bg-surface-elevated" />
    </div>
  )
}

function PhoneFrame({
  index,
  prevIndex,
  settled,
}: {
  index: number
  prevIndex: number | null
  settled: boolean
}) {
  return (
    <div className="absolute -bottom-8 -left-6 w-[36%] rounded-[14px] border border-border bg-surface p-1.5 md:-bottom-10 md:-left-8">
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[10px] bg-background">
        <Screens index={index} prevIndex={prevIndex} settled={settled} />
      </div>
    </div>
  )
}

export function DeviceMockup() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return

    const intervalId = setInterval(() => {
      if (document.hidden) return
      setPrevIndex(index)
      setSettled(false)
      setIndex((index + 1) % heroShowcaseContent.length)
    }, CYCLE_MS)

    return () => clearInterval(intervalId)
  }, [prefersReducedMotion, index])

  useEffect(() => {
    if (prevIndex === null) return

    const raf = requestAnimationFrame(() => setSettled(true))
    const timeout = setTimeout(() => setPrevIndex(null), TRANSITION_MS)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
    }
  }, [prevIndex])

  return (
    <div className="relative mx-auto max-w-[420px] pb-10 pl-8 md:mx-0 md:max-w-none md:pl-10">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-[80px]"
      />
      <LaptopFrame index={index} prevIndex={prevIndex} settled={settled} />
      <PhoneFrame index={index} prevIndex={prevIndex} settled={settled} />
    </div>
  )
}
