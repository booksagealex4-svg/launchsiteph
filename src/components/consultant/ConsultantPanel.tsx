import { useEffect, useRef, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Send, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { MessageBubble } from "@/components/consultant/MessageBubble"
import { TypingIndicator } from "@/components/consultant/TypingIndicator"
import type { ConsultantMessage } from "@/lib/consultant"

const SUGGESTED_QUESTIONS = [
  "How much does a website cost?",
  "How long does it take?",
  "Which template fits my business?",
  "What do I need to provide?",
]

interface ConsultantPanelProps {
  messages: ConsultantMessage[]
  isTyping: boolean
  inputValue: string
  onInputChange: (value: string) => void
  onSend: () => void
  onSuggestedClick: (question: string) => void
  onClose: () => void
  showSuggestions: boolean
}

export function ConsultantPanel({
  messages,
  isTyping,
  inputValue,
  onInputChange,
  onSend,
  onSuggestedClick,
  onClose,
  showSuggestions,
}: ConsultantPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = scrollRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [messages, isTyping])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSend()
  }

  return (
    <div
      role="dialog"
      aria-label="Website Consultant"
      className="fixed inset-0 z-50 flex flex-col bg-background md:inset-auto md:right-5 md:bottom-24 md:h-[32rem] md:w-[380px] md:rounded-[14px] md:border md:border-border md:bg-surface lg:right-8"
    >
      <div className="flex items-center justify-between border-b border-border p-4">
        <div>
          <p className="font-heading font-semibold text-foreground">
            Website Consultant
          </p>
          <p className="text-xs text-success">Usually replies instantly</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center rounded-[10px] text-muted-foreground transition-colors hover:bg-surface-elevated"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((message, i) => (
          <MessageBubble key={i} role={message.role} content={message.content} />
        ))}
        {isTyping && <TypingIndicator />}

        {showSuggestions && !isTyping && (
          <div className="mt-1 flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => onSuggestedClick(question)}
                className="rounded-full border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </div>

      <Link
        to="/contact"
        className="border-t border-border px-4 py-2 text-center text-xs text-primary hover:underline"
      >
        Talk to a human &rarr;
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border p-4"
      >
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type a message..."
          aria-label="Message"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          aria-label="Send message"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-primary text-primary-foreground transition-colors hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50"
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
