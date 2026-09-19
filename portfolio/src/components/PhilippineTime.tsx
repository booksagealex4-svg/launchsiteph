import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Manila',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})

function getPhilippineTime(): string {
  return timeFormatter.format(new Date())
}

/**
 * Purely informational, non-interactive. pointer-events-none on the root
 * keeps this fixed-position widget from ever intercepting clicks on page
 * content beneath it (a real production bug the previous VisitorCounter had).
 */
export function PhilippineTime() {
  const [time, setTime] = useState(getPhilippineTime)

  useEffect(() => {
    const id = window.setInterval(() => setTime(getPhilippineTime()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      role="group"
      aria-label={`Current time in the Philippines: ${time}`}
      className="pointer-events-none fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-md border border-[#BFD7F4] bg-[#EDF5FF]/90 px-3 py-2 text-xs shadow-[0_8px_20px_rgba(16,42,67,0.12)] backdrop-blur-sm"
    >
      <Clock className="h-3.5 w-3.5 shrink-0 text-[#1F6FEB]" aria-hidden="true" />
      <span className="flex items-baseline gap-1.5 whitespace-nowrap">
        <span className="font-semibold tracking-[0.08em] text-[#1F6FEB] uppercase">PH Time</span>
        <span className="font-semibold text-[#102A43]">{time}</span>
        <span className="hidden text-[0.65rem] font-medium text-[#7C93B3] sm:inline">GMT+8</span>
      </span>
    </div>
  )
}
