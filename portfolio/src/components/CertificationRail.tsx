import type { LucideIcon } from 'lucide-react'
import { BadgeCheck, BrainCircuit, Megaphone, Handshake, Bot, ExternalLink } from 'lucide-react'
import type { Certification } from '@/data/certifications'
import { cn } from '@/lib/utils'

const categoryIcons: Record<string, LucideIcon> = {
  ai: BrainCircuit,
  marketing: Megaphone,
  sales: Handshake,
  productivity: Bot,
}

/** Shows a shortened certificate ID for scanability — the full value stays in the data file. */
function shortenId(id: string) {
  if (id.length <= 16) return id
  return `${id.slice(0, 8)}…${id.slice(-5)}`
}

function CertCard({ cert, featured }: { cert: Certification; featured?: boolean }) {
  const Icon = (cert.category && categoryIcons[cert.category]) || BadgeCheck

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-lg bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-px',
        featured
          ? 'border-2 border-[#1F6FEB]/55 hover:border-[#1F6FEB] hover:shadow-[0_10px_22px_rgba(31,111,235,0.14)] sm:p-5'
          : 'border border-[var(--card-border-nested)]/40 hover:border-[#1F6FEB]/60 hover:shadow-[0_8px_16px_rgba(15,23,42,0.08)]',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            'flex shrink-0 items-center justify-center rounded-md bg-[#1F6FEB] text-white',
            featured ? 'h-12 w-12' : 'h-9 w-9',
          )}
        >
          <Icon className={featured ? 'h-6 w-6' : 'h-[18px] w-[18px]'} />
        </span>
        <span className="rounded-full bg-[#eaf2fb] px-2 py-0.5 text-[0.6rem] font-semibold whitespace-nowrap text-[#0A66C2] uppercase">
          {featured ? 'Documented Credential' : 'Course Completed'}
        </span>
      </div>

      <div>
        <p className="text-[0.6rem] font-semibold tracking-[0.08em] text-[#0A66C2] uppercase">LinkedIn Learning</p>
        <h3 className={cn('mt-0.5 leading-snug font-semibold text-slate-800', featured ? 'text-base' : 'text-sm')}>
          {cert.title}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
        <div>
          <p className="text-[0.6rem] font-semibold text-slate-400 uppercase">Completed</p>
          <p className="text-slate-700">{cert.date ?? 'To be added'}</p>
        </div>
        <div>
          <p className="text-[0.6rem] font-semibold text-slate-400 uppercase">Duration</p>
          <p className="text-slate-700">{cert.duration ?? '—'}</p>
        </div>
      </div>

      {cert.skills?.length ? (
        <div className="flex flex-wrap gap-1.5">
          {cert.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#1F6FEB]/25 bg-blue-50 px-2 py-0.5 text-[0.65rem] text-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : null}

      {cert.certificateId ? (
        <p className="text-[0.6rem] text-slate-400">
          Certificate ID <span className="font-mono">{shortenId(cert.certificateId)}</span>
        </p>
      ) : null}

      {cert.credentialUrl ? (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-1.5 rounded-md border border-[#1F6FEB]/40 bg-[#eaf2fb] px-3 py-2 text-xs font-semibold text-[#1F6FEB] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1F6FEB]/70 hover:bg-[#dbe9fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          View Certificate
          <ExternalLink className="h-3 w-3 shrink-0" />
        </a>
      ) : null}
    </div>
  )
}

/**
 * Featured-plus-grid credential display — the first two entries (the ones called out as
 * "featured" in content) render as larger cards, the rest follow in a compact 2-column grid.
 * A responsive grid (not a scroll rail) so nothing needs horizontal scrolling on mobile.
 */
export function CertificationRail({ certifications }: { certifications: Certification[] }) {
  const [featured, rest] = [certifications.slice(0, 2), certifications.slice(2)]

  return (
    <div className="flex flex-col gap-4">
      {featured.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured.map((cert) => (
            <CertCard key={cert.id} cert={cert} featured />
          ))}
        </div>
      ) : null}

      {rest.length ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {rest.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
