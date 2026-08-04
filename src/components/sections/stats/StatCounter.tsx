import { useEffect, useState } from "react"

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

interface StatCounterProps {
  value: number
  suffix?: string
  started: boolean
  prefersReducedMotion: boolean
  duration?: number
}

export function StatCounter({
  value,
  suffix = "",
  started,
  prefersReducedMotion,
  duration = 1200,
}: StatCounterProps) {
  const [display, setDisplay] = useState(prefersReducedMotion ? value : 0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(value)
      return
    }
    if (!started) return

    let rafId: number
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setDisplay(Math.round(easeOutCubic(progress) * value))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [started, prefersReducedMotion, value, duration])

  return (
    <span>
      {display}
      {suffix}
    </span>
  )
}
