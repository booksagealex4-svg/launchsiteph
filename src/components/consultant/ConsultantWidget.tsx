import { useState } from "react"

import { getConsultantReply, type ConsultantMessage } from "@/lib/consultant"
import { ConsultantButton } from "@/components/consultant/ConsultantButton"
import { ConsultantPanel } from "@/components/consultant/ConsultantPanel"

const OPENING_MESSAGE =
  "Hi — I can explain our packages, timelines and process, or help you pick a template. What do you do?"

export function ConsultantWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ConsultantMessage[]>([
    { role: "assistant", content: OPENING_MESSAGE },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const nextMessages: ConsultantMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ]
    setMessages(nextMessages)
    setInputValue("")
    setIsTyping(true)

    const reply = await getConsultantReply(nextMessages)

    setIsTyping(false)
    setMessages((prev) => [...prev, { role: "assistant", content: reply }])
  }

  return (
    <>
      {!open && <ConsultantButton onClick={() => setOpen(true)} />}
      {open && (
        <ConsultantPanel
          messages={messages}
          isTyping={isTyping}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={() => sendMessage(inputValue)}
          onSuggestedClick={(question) => sendMessage(question)}
          onClose={() => setOpen(false)}
          showSuggestions={messages.length === 1}
        />
      )}
    </>
  )
}
