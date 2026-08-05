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
      aria-label="Chat with our Website Consultant"
      className={cn(
        "fixed right-5 bottom-5 z-40 flex h-14 items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-[0_0_24px_rgba(46,125,255,0.35)] transition-all duration-200 ease-out hover:bg-primary-hover md:right-8 md:bottom-8",
        shrunk ? "w-12 justify-center px-0" : "pr-5 pl-4"
      )}
    >
      <MessageCircle
        size={shrunk ? 20 : 22}
        strokeWidth={2}
        className="shrink-0"
        aria-hidden="true"
      />
      <span
        className={cn(
          "overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-200",
          shrunk ? "max-w-0 opacity-0" : "max-w-[140px] opacity-100"
        )}
      >
        Chat with me
      </span>
    </button>
  )
}
