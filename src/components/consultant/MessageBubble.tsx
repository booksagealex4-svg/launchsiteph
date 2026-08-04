import { cn } from "@/lib/utils"
import type { ConsultantMessage } from "@/lib/consultant"

export function MessageBubble({ role, content }: ConsultantMessage) {
  const isUser = role === "user"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-[14px] px-4 py-2.5 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-surface text-foreground"
        )}
      >
        {content}
      </div>
    </div>
  )
}
