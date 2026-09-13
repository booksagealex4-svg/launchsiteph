import { useRef, useState } from 'react'
import { Monitor, Check, RotateCcw, MessageCircle, History } from 'lucide-react'
import { IconChip, StatusPill, CardShell, CardLabel } from '@/components/portal/PortalUI'

const nextSteps = [
  'You review the latest work',
  'You send feedback or approve it',
  'I review your response',
  'I prepare the next update if needed',
]

export function PortalReviewsPage() {
  const [feedbackSent, setFeedbackSent] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleRequestChanges() {
    textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    textareaRef.current?.focus()
  }

  function handleSendFeedback(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFeedbackSent(true)
  }

  return (
    <>
      {/* Compact header */}
      <div className="rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-4">
        <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Reviews</p>
        <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Review Your Project</h1>
        <p className="mt-0.5 text-sm text-slate-600">
          View the latest work, share your feedback, and let me know if any changes are needed.
        </p>
      </div>

      {/* Review status summary */}
      <div className="flex flex-col gap-2 rounded-lg border border-[var(--card-border-accent)] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardLabel>Ready for Review</CardLabel>
          <p className="mt-1 text-sm font-semibold text-slate-800">Project Preview Placeholder</p>
        </div>
        <StatusPill tone="amber">Waiting for Your Feedback</StatusPill>
      </div>

      {/* Main preview — dominant */}
      <CardShell>
        <CardLabel>Latest Project Preview</CardLabel>
        <p className="mt-0.5 text-sm text-slate-500">This is the latest version prepared for your review.</p>
        <div className="mt-4 flex aspect-video w-full items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-300">
          <Monitor className="h-12 w-12" />
        </div>
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#1F6FEB] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <Check className="h-4 w-4 shrink-0" />
            Approve
          </button>
          <button
            type="button"
            onClick={handleRequestChanges}
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-slate-300/70 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <RotateCcw className="h-4 w-4 shrink-0" />
            Request Changes
          </button>
        </div>
      </CardShell>

      {/* Feedback */}
      <CardShell>
        <form onSubmit={handleSendFeedback} className="flex flex-col gap-2">
          <label htmlFor="review-feedback" className="text-sm font-semibold text-slate-700">
            Your Feedback
          </label>
          <textarea
            ref={textareaRef}
            id="review-feedback"
            name="feedback"
            rows={5}
            className="w-full resize-y rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            placeholder="Tell me what you like, what you would like changed, or anything you want me to review."
          />
          <p className="text-sm text-slate-500">You can write your feedback in your own words.</p>
          <div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1F6FEB] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-auto"
            >
              Send Feedback
            </button>
            {feedbackSent ? (
              <p className="mt-2 text-sm text-slate-500">
                Thanks. Your feedback is ready to be sent once messaging is connected.
              </p>
            ) : null}
          </div>
        </form>
      </CardShell>

      {/* What happens next */}
      <CardShell>
        <CardLabel>What Happens Next</CardLabel>
        <ol className="mt-2.5 flex flex-col gap-2.5">
          {nextSteps.map((step, i) => (
            <li key={step} className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[0.7rem] font-bold text-slate-500">
                {i + 1}
              </span>
              <p className="text-sm text-slate-700">{step}</p>
            </li>
          ))}
        </ol>
      </CardShell>

      {/* Previous Reviews + Message shortcut */}
      <div className="grid gap-4 lg:grid-cols-2">
        <CardShell>
          <div className="flex items-start gap-3">
            <IconChip icon={History} tint="mint" />
            <div className="min-w-0">
              <CardLabel>Previous Reviews</CardLabel>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Previous review activity will appear here.
              </p>
            </div>
          </div>
        </CardShell>

        <CardShell className="flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <IconChip icon={MessageCircle} tint="mint" />
            <p className="text-sm font-semibold text-slate-800">Have a question about this review?</p>
          </div>
          <a
            href="#"
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300/70 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-auto"
          >
            Message Me
          </a>
        </CardShell>
      </div>
    </>
  )
}
