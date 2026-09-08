import { Compass, History, MessageCircle, FileText } from 'lucide-react'
import { IconChip, StatusPill, CardShell, CardLabel, ProjectStepper } from '@/components/portal/PortalUI'

const currentStageIndex = 1 // Design

const nextSteps = [
  'Review the latest design',
  'Share your feedback',
  'Revisions are prepared if needed',
  'Project moves to the next stage',
]

export function PortalProjectPage() {
  return (
    <>
      {/* Compact header */}
      <div className="rounded-lg border border-slate-300/60 bg-[#fdfbf7] px-5 py-4">
        <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Project</p>
        <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Your Project</h1>
        <p className="mt-0.5 text-sm text-slate-600">Everything important about your project, in one place.</p>
      </div>

      {/* Project Summary + Progress — dominant card */}
      <CardShell>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardLabel>Project Summary</CardLabel>
            <h2 className="mt-1 text-lg font-bold text-slate-900">Project Name Placeholder</h2>
            <p className="text-sm text-slate-500">Project Type Placeholder</p>
          </div>
          <StatusPill tone="blue">In Progress</StatusPill>
        </div>
        <div className="mt-5">
          <ProjectStepper currentIndex={currentStageIndex} />
        </div>
      </CardShell>

      {/* Current Stage + Waiting on You */}
      <div className="grid gap-4 lg:grid-cols-2">
        <CardShell className="flex flex-col">
          <div className="flex items-start gap-3">
            <IconChip icon={Compass} />
            <div className="min-w-0">
              <CardLabel>Current Stage</CardLabel>
              <p className="mt-1 text-base font-bold text-slate-900">Design</p>
              <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                The current work is focused on preparing and refining the project design before
                review.
              </p>
            </div>
          </div>
        </CardShell>

        <CardShell className="flex flex-col border-blue-200/70 bg-blue-50/40">
          <CardLabel>Waiting on You</CardLabel>
          <p className="mt-1.5 text-sm font-semibold text-slate-800">Review the latest preview.</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            A new design preview is ready for your feedback.
          </p>
          <a
            href="#"
            className="mt-4 flex items-center justify-center gap-2 rounded-md bg-[#1F6FEB] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Review Project
          </a>
        </CardShell>
      </div>

      {/* Latest Update + What Happens Next */}
      <div className="grid gap-4 lg:grid-cols-2">
        <CardShell>
          <div className="flex items-start gap-3">
            <IconChip icon={History} tint="mint" />
            <div className="min-w-0">
              <CardLabel>Latest Update</CardLabel>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                A new design update is ready for review.
              </p>
            </div>
          </div>
        </CardShell>

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
      </div>

      {/* Project Notes + Message shortcut */}
      <div className="grid gap-4 lg:grid-cols-2">
        <CardShell>
          <div className="flex items-start gap-3">
            <IconChip icon={FileText} />
            <div className="min-w-0">
              <CardLabel>Project Notes</CardLabel>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Important project notes will appear here.
              </p>
            </div>
          </div>
        </CardShell>

        <CardShell className="flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <IconChip icon={MessageCircle} tint="mint" />
            <p className="text-sm font-semibold text-slate-800">Have a question?</p>
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
