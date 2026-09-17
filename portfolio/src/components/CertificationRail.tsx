import type { LucideIcon } from 'lucide-react'
import { BadgeCheck, BrainCircuit, Megaphone, Handshake, Bot, ExternalLink } from 'lucide-react'
import type { Certification } from '@/data/certifications'

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

function CertCard({ cert }: { cert: Certification }) {
  const Icon = (cert.category && categoryIcons[cert.category]) || BadgeCheck

  return (
    <div className="relative flex flex-col gap-2.5 overflow-hidden rounded-lg border border-[var(--card-border-nested)]/40 bg-white p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1F6FEB]/60 hover:shadow-[0_8px_16px_rgba(15,23,42,0.08)]">
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#1F6FEB] to-[#0A66C2]"
        aria-hidden="true"
      />

      {/* Identity + credential-status badge */}
      <div className="flex items-start justify-between gap-2 pt-0.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#1F6FEB] text-white">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#eaf2fb] px-2 py-0.5 text-[0.58rem] font-bold whitespace-nowrap text-[#0A66C2] uppercase">
          <BadgeCheck className="h-3 w-3 shrink-0" />
          Verified Credential
        </span>
      </div>

      {/* Issuer identity + title */}
      <div>
        <p className="text-[0.58rem] font-semibold tracking-[0.08em] text-[#0A66C2] uppercase">LinkedIn Learning</p>
        <h3 className="mt-0.5 line-clamp-3 text-sm leading-snug font-bold text-[#122c52]">{cert.title}</h3>
      </div>

      {/* Completion metadata */}
      <div className="flex items-center gap-3 text-xs">
        <div className="min-w-0">
          <p className="text-[0.58rem] font-semibold text-slate-400 uppercase">Completed</p>
          <p className="truncate text-slate-700">{cert.date ?? 'To be added'}</p>
        </div>
        <span className="h-6 w-px shrink-0 bg-slate-200" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-[0.58rem] font-semibold text-slate-400 uppercase">Duration</p>
          <p className="truncate text-slate-700">{cert.duration ?? '—'}</p>
        </div>
      </div>

      {cert.skills?.length ? (
        <div className="flex flex-wrap gap-1.5">
          {cert.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#1F6FEB]/25 bg-blue-50 px-2 py-0.5 text-[0.62rem] text-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : null}

      {cert.certificateId ? (
        <p className="text-[0.58rem] text-slate-400">
          ID <span className="font-mono">{shortenId(cert.certificateId)}</span>
        </p>
      ) : null}

      {cert.credentialUrl ? (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-1.5 rounded-md bg-[#1F6FEB] px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] hover:shadow-[0_4px_10px_rgba(31,111,235,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          View Certificate
          <ExternalLink className="h-3 w-3 shrink-0" />
        </a>
      ) : null}
    </div>
  )
}

/** Compact, uniform 3-per-row credential grid — every card carries the same
 *  hierarchy and weight so the section reads as one consistent showcase. */
export function CertificationRail({ certifications }: { certifications: Certification[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {certifications.map((cert) => (
        <CertCard key={cert.id} cert={cert} />
      ))}
    </div>
  )
}
