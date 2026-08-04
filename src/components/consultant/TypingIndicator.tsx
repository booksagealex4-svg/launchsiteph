import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export function TypingIndicator() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-[14px] border border-border bg-surface px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full bg-muted-foreground",
              !prefersReducedMotion && "animate-bounce"
            )}
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
