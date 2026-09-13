import { Bell, UserRound, FileText, Download, MessageCircle, History, Monitor, ArrowRight } from 'lucide-react'
import { IconChip, StatusPill, CardShell, CardLabel, ProjectStepper } from '@/components/portal/PortalUI'

const currentStageIndex = 1 // Design

const recentFiles = ['File Placeholder 01', 'File Placeholder 02', 'File Placeholder 03']

export function PortalOverviewPage() {
  return (
    <>
      {/* Compact top bar */}
      <div className="flex items-center justify-between rounded-lg border border-[var(--card-border-accent)] bg-white px-4 py-2.5">
        <p className="text-sm font-semibold text-slate-700">Portal Overview</p>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400" aria-label="Notifications placeholder">
            <Bell className="h-4 w-4" />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400" aria-label="Profile avatar placeholder">
            <UserRound className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Welcome header */}
      <div className="flex flex-col gap-3 rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Welcome back, Client Name</h1>
          <p className="mt-0.5 text-sm text-slate-600">Here&apos;s the latest update on your project.</p>
        </div>
        <StatusPill tone="blue">Project Status: In Progress</StatusPill>
      </div>

      {/* Top row — Current Project (dominant) + Next Step */}
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <CardShell>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardLabel>Current Project</CardLabel>
              <h2 className="mt-1 text-lg font-bold text-slate-900">Project Name Placeholder</h2>
              <p className="text-sm text-slate-500">Website / Digital Project Placeholder</p>
            </div>
            <StatusPill tone="blue">In Progress</StatusPill>
          </div>
          <div className="mt-5">
            <ProjectStepper currentIndex={currentStageIndex} />
          </div>
        </CardShell>

        <CardShell className="flex flex-col border-blue-200/70 bg-blue-50/40">
          <CardLabel>Your Next Step</CardLabel>
          <p className="mt-1.5 text-sm font-semibold text-slate-800">Review the latest homepage preview.</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            A new design preview is ready for your feedback.
          </p>
          <a
            href="#ready-for-review"
            className="mt-4 flex items-center justify-center gap-2 rounded-md bg-[#1F6FEB] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Review Preview
            <ArrowRight className="h-4 w-4 shrink-0" />
          </a>
        </CardShell>
      </div>

      {/* Middle row — Ready for Review + Latest Update, in that priority order */}
      <div className="grid gap-4 lg:grid-cols-2">
        <CardShell id="ready-for-review">
          <div className="flex items-start justify-between gap-3">
            <CardLabel>Ready for Review</CardLabel>
            <StatusPill tone="amber">Waiting for Review</StatusPill>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-300">
              <Monitor className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800">Homepage Preview</p>
              <p className="text-sm text-slate-500">Initial design concept for your review</p>
            </div>
          </div>
          <a
            href="#"
            className="mt-4 flex items-center justify-center gap-2 rounded-md border border-[#1F6FEB]/40 bg-white px-4 py-2 text-sm font-semibold text-[#1F6FEB] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            View &amp; Respond
          </a>
        </CardShell>

        <CardShell>
          <div className="flex items-start gap-3">
            <IconChip icon={History} tint="mint" />
            <div className="min-w-0">
              <CardLabel>Latest Update</CardLabel>
              <p className="mt-1 text-sm font-semibold text-slate-800">Homepage layout updated</p>
              <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                The latest homepage revision has been prepared and is ready for review.
              </p>
              <p className="mt-1.5 text-xs text-slate-400">Updated recently</p>
            </div>
          </div>
        </CardShell>
      </div>

      {/* Bottom row — Messages + Recent Files, given more room to breathe now that Requests is gone */}
      <div className="grid gap-4 lg:grid-cols-2">
        <CardShell>
          <div className="flex items-start justify-between gap-2">
            <CardLabel>Messages</CardLabel>
            <StatusPill tone="blue">1 new update</StatusPill>
          </div>
          <div className="mt-2.5 flex items-start gap-2.5">
            <IconChip icon={MessageCircle} tint="mint" />
            <p className="min-w-0 text-sm text-slate-600">You have a new project update.</p>
          </div>
          <a
            href="#"
            className="mt-4 flex items-center justify-center gap-2 rounded-md border border-slate-300/70 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Open Messages
          </a>
        </CardShell>

        <CardShell>
          <CardLabel>Recent Files</CardLabel>
          <div className="mt-2.5 divide-y divide-slate-200/70">
            {recentFiles.map((file) => (
              <div key={file} className="flex items-center gap-2.5 py-2 first:pt-0 last:pb-0">
                <IconChip icon={FileText} />
                <p className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">{file}</p>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-300" aria-label="Download placeholder, not yet functional">
                  <Download className="h-4 w-4" />
                </span>
              </div>
            ))}
          </div>
        </CardShell>
      </div>
    </>
  )
}
