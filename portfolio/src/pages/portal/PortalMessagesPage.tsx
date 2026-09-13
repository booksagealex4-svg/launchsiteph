import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { IconChip, CardShell, CardLabel } from '@/components/portal/PortalUI'

export function PortalMessagesPage() {
  const [messageSent, setMessageSent] = useState(false)

  function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessageSent(true)
  }

  return (
    <>
      {/* Compact header */}
      <div className="rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-4">
        <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Messages</p>
        <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Project Messages</h1>
        <p className="mt-0.5 text-sm text-slate-600">
          Read project updates, ask questions, and reply directly here.
        </p>
      </div>

      {/* Latest activity — small context row */}
      <div className="flex items-center gap-3 rounded-lg border border-[var(--card-border-accent)] bg-white px-5 py-4">
        <IconChip icon={MessageCircle} tint="mint" />
        <div className="min-w-0">
          <CardLabel>Latest Activity</CardLabel>
          <p className="mt-0.5 text-sm text-slate-600">A new project update will appear here when available.</p>
        </div>
      </div>

      {/* Conversation area */}
      <CardShell>
        <CardLabel>Conversation</CardLabel>
        <div className="mt-3 flex flex-col gap-3">
          <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-4 sm:max-w-[80%]">
            <p className="text-[0.65rem] font-bold tracking-[0.1em] text-[#1F6FEB] uppercase">From Alex</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">Project update placeholder</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">A new project update will appear here.</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 sm:ml-auto sm:max-w-[80%]">
            <p className="text-[0.65rem] font-bold tracking-[0.1em] text-slate-400 uppercase">From You</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">Your reply will appear here.</p>
          </div>
        </div>
      </CardShell>

      {/* Reply area */}
      <CardShell>
        <form onSubmit={handleSend} className="flex flex-col gap-2">
          <label htmlFor="message-reply" className="text-sm font-semibold text-slate-700">
            Write a Reply
          </label>
          <textarea
            id="message-reply"
            name="reply"
            rows={5}
            className="w-full resize-y rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            placeholder="Type your message here."
          />
          <p className="text-sm text-slate-500">
            You can ask a question, share feedback, or send an update in your own words.
          </p>
          <div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1F6FEB] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-auto"
            >
              Send Message
            </button>
            {messageSent ? (
              <p className="mt-2 text-sm text-slate-500">
                Your message is ready to be sent once messaging is connected.
              </p>
            ) : null}
          </div>
        </form>
      </CardShell>
    </>
  )
}
