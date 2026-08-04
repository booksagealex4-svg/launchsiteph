import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"

import { cn } from "@/lib/utils"

export function ConsultantButton({ onClick }: { onClick: () => void }) {
  const [shrunk, setShrunk] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY
      setShrunk(currentY > lastY && currentY > 100)
      lastY = currentY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open Website Consultant"
      className={cn(
        "fixed right-5 bottom-5 z-40 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_24px_rgba(46,125,255,0.35)] transition-all duration-200 ease-out hover:bg-primary-hover md:right-8 md:bottom-8",
        shrunk ? "h-12 w-12" : "h-14 w-14"
      )}
    >
      <MessageCircle
        size={shrunk ? 20 : 24}
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  )
}
