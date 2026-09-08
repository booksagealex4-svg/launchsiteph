import { FileText, Download, UploadCloud } from 'lucide-react'
import { IconChip, StatusPill, CardShell, CardLabel } from '@/components/portal/PortalUI'

const filesFromMe: { name: string; descriptor: string; highlight?: string }[] = [
  { name: 'File Placeholder 01', descriptor: 'Project File', highlight: 'Ready to View' },
  { name: 'File Placeholder 02', descriptor: 'Project File' },
  { name: 'File Placeholder 03', descriptor: 'Project File' },
]

const filesFromYou = [
  { name: 'Client File Placeholder 01', descriptor: 'Client File' },
  { name: 'Client File Placeholder 02', descriptor: 'Client File' },
]

function FileRow({ name, descriptor, highlight }: { name: string; descriptor: string; highlight?: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
      <IconChip icon={FileText} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold text-slate-800">{name}</p>
          {highlight ? <StatusPill tone="blue">{highlight}</StatusPill> : null}
        </div>
        <p className="text-xs text-slate-400">{descriptor}</p>
      </div>
      <button
        type="button"
        aria-label={`Download ${name}, placeholder, not yet functional`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-300 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <Download className="h-4 w-4" />
      </button>
    </div>
  )
}

export function PortalFilesPage() {
  return (
    <>
      {/* Compact header */}
      <div className="rounded-lg border border-slate-300/60 bg-[#fdfbf7] px-5 py-4">
        <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Files</p>
        <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Project Files</h1>
        <p className="mt-0.5 text-sm text-slate-600">View the important files connected to your project.</p>
      </div>

      {/* Files From Me — primary, carries the most visual weight */}
      <CardShell>
        <CardLabel>Files From Me</CardLabel>
        <div className="mt-2.5 divide-y divide-slate-200/70">
          {filesFromMe.map((file) => (
            <FileRow key={file.name} {...file} />
          ))}
        </div>
      </CardShell>

      {/* Files From You — simpler, lighter treatment */}
      <div className="rounded-lg border border-slate-200 p-4 sm:p-5">
        <CardLabel>Files From You</CardLabel>
        <div className="mt-2.5 divide-y divide-slate-200/70">
          {filesFromYou.map((file) => (
            <FileRow key={file.name} {...file} />
          ))}
        </div>
      </div>

      {/* Upload direction — lightest, lowest priority */}
      <div className="flex flex-col items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <IconChip icon={UploadCloud} tint="mint" />
          <div>
            <p className="text-sm font-semibold text-slate-800">Need to send me a file?</p>
            <p className="mt-0.5 text-sm text-slate-500">
              You&apos;ll be able to send project files here once uploads are connected.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300/70 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-auto"
        >
          Upload File
        </button>
      </div>
    </>
  )
}
