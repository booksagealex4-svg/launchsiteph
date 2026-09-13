import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  Search,
  Download,
  LogIn,
  MessageCircle,
  Eye,
  Briefcase,
  FileText,
  CreditCard,
  Target,
  Settings,
  Bell,
  AlertTriangle,
  UserCheck,
  ShieldCheck,
} from 'lucide-react'
import { IconChip, CardShell, CardLabel } from '@/components/portal/PortalUI'
import { KpiCard, RangeTabs, ToggleChip, StatusBadge, Drawer } from '@/components/admin/AdminUI'

type ActivityType =
  | 'Client Login'
  | 'Message'
  | 'Review'
  | 'Project Update'
  | 'File'
  | 'Payment'
  | 'Lead'
  | 'Admin Action'
  | 'Notification'

interface ActivityRow {
  id: string
  type: ActivityType
  description: string
  actor: 'Client' | 'Admin' | 'System'
  client?: string
  project?: string
  attention: 'Needs Attention' | 'Informational' | 'Completed'
  time: string
}

const activityRows: ActivityRow[] = [
  {
    id: 'a1',
    type: 'Client Login',
    description: 'Client signed in',
    actor: 'Client',
    client: 'Client Placeholder 01',
    attention: 'Informational',
    time: 'Time Placeholder',
  },
  {
    id: 'a2',
    type: 'Message',
    description: 'Client sent a message',
    actor: 'Client',
    client: 'Client Placeholder 02',
    project: 'Project Placeholder 02',
    attention: 'Needs Attention',
    time: 'Time Placeholder',
  },
  {
    id: 'a3',
    type: 'Review',
    description: 'Review feedback submitted',
    actor: 'Client',
    client: 'Client Placeholder 03',
    project: 'Project Placeholder 03',
    attention: 'Needs Attention',
    time: 'Time Placeholder',
  },
  {
    id: 'a4',
    type: 'Project Update',
    description: 'Project update posted',
    actor: 'Admin',
    client: 'Client Placeholder 04',
    project: 'Project Placeholder 04',
    attention: 'Completed',
    time: 'Time Placeholder',
  },
  {
    id: 'a5',
    type: 'File',
    description: 'File activity',
    actor: 'Client',
    client: 'Client Placeholder 05',
    project: 'Project Placeholder 05',
    attention: 'Informational',
    time: 'Time Placeholder',
  },
  {
    id: 'a6',
    type: 'Payment',
    description: 'Payment activity',
    actor: 'System',
    client: 'Client Placeholder 01',
    attention: 'Needs Attention',
    time: 'Time Placeholder',
  },
  {
    id: 'a7',
    type: 'Lead',
    description: 'New lead received',
    actor: 'System',
    attention: 'Needs Attention',
    time: 'Time Placeholder',
  },
  {
    id: 'a8',
    type: 'Admin Action',
    description: 'Admin updated project',
    actor: 'Admin',
    project: 'Project Placeholder 02',
    attention: 'Completed',
    time: 'Time Placeholder',
  },
  {
    id: 'a9',
    type: 'Notification',
    description: 'Notification activity',
    actor: 'System',
    attention: 'Informational',
    time: 'Time Placeholder',
  },
]

const typeIcon: Record<ActivityType, LucideIcon> = {
  'Client Login': LogIn,
  Message: MessageCircle,
  Review: Eye,
  'Project Update': Briefcase,
  File: FileText,
  Payment: CreditCard,
  Lead: Target,
  'Admin Action': Settings,
  Notification: Bell,
}

const actorTone: Record<ActivityRow['actor'], 'blue' | 'mint' | 'slate'> = {
  Client: 'blue',
  Admin: 'mint',
  System: 'slate',
}

const attentionTone: Record<ActivityRow['attention'], 'amber' | 'slate' | 'mint'> = {
  'Needs Attention': 'amber',
  Informational: 'slate',
  Completed: 'mint',
}

const typeFilterOptions: ('All' | ActivityType)[] = [
  'All',
  'Client Login',
  'Message',
  'Review',
  'Project Update',
  'File',
  'Payment',
  'Lead',
  'Admin Action',
  'Notification',
]

const actorFilterOptions = ['All', 'Client', 'Admin', 'System']
const attentionFilterOptions: ActivityRow['attention'][] = ['Needs Attention', 'Informational', 'Completed']

const relatedLinksByType: Record<ActivityType, { label: string; to: string }[]> = {
  'Client Login': [{ label: 'View Client', to: '/admin/clients' }],
  Message: [
    { label: 'View Message', to: '/admin/messages' },
    { label: 'View Client', to: '/admin/clients' },
  ],
  Review: [
    { label: 'View Review', to: '/admin/reviews' },
    { label: 'View Client', to: '/admin/clients' },
    { label: 'View Project', to: '/admin/projects' },
  ],
  'Project Update': [
    { label: 'View Project', to: '/admin/projects' },
    { label: 'View Client', to: '/admin/clients' },
  ],
  File: [
    { label: 'View Client', to: '/admin/clients' },
    { label: 'View Project', to: '/admin/projects' },
  ],
  Payment: [
    { label: 'View Payment', to: '/admin/payments' },
    { label: 'View Client', to: '/admin/clients' },
  ],
  Lead: [{ label: 'View Lead', to: '/admin/leads' }],
  'Admin Action': [{ label: 'View Project', to: '/admin/projects' }],
  Notification: [],
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-800">{value}</span>
    </div>
  )
}

function TechDetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-medium text-slate-500">{value}</span>
    </div>
  )
}

export function AdminActivityPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'All' | ActivityType>('All')
  const [actorFilter, setActorFilter] = useState('All')
  const [attentionFilters, setAttentionFilters] = useState<Set<ActivityRow['attention']>>(new Set())
  const [selectedActivity, setSelectedActivity] = useState<ActivityRow | null>(null)
  const [exportMessage, setExportMessage] = useState<string | null>(null)

  function toggleAttentionFilter(option: ActivityRow['attention']) {
    setAttentionFilters((prev) => {
      const next = new Set(prev)
      if (next.has(option)) next.delete(option)
      else next.add(option)
      return next
    })
  }

  const filteredRows = activityRows.filter((row) => {
    const query = search.trim().toLowerCase()
    const matchesSearch =
      query === '' || `${row.description} ${row.client ?? ''} ${row.project ?? ''}`.toLowerCase().includes(query)
    const matchesType = typeFilter === 'All' || row.type === typeFilter
    const matchesActor = actorFilter === 'All' || row.actor === actorFilter
    const matchesAttention = attentionFilters.size === 0 || attentionFilters.has(row.attention)
    return matchesSearch && matchesType && matchesActor && matchesAttention
  })

  return (
    <>
      {/* Compact header */}
      <div className="flex flex-col gap-3 rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Activity</p>
          <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Activity Center</h1>
          <p className="mt-0.5 max-w-[52ch] text-sm text-slate-600">
            Track important activity across clients, projects, messages, reviews, leads, files, payments, and admin actions.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExportMessage('Activity export will become available once tracking is connected.')}
          className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300/70 bg-white px-4 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <Download className="h-4 w-4" />
          Export Activity
        </button>
      </div>

      {exportMessage ? (
        <p role="status" className="rounded-md border border-blue-100 bg-blue-50/60 px-3 py-2 text-sm text-slate-600">
          {exportMessage}
        </p>
      ) : null}

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard icon={UserCheck} label="Activity Today" />
        <KpiCard icon={AlertTriangle} label="Needs Attention" tint="amber" />
        <KpiCard icon={LogIn} label="Client Actions" tint="blue" />
        <KpiCard icon={ShieldCheck} label="Admin Actions" tint="mint" />
        <KpiCard icon={Settings} label="System Events" />
      </div>

      {/* Search + filter bar */}
      <CardShell>
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search activity"
              aria-label="Search activity"
              className="w-full rounded-md border border-slate-300/70 bg-white py-2.5 pr-3.5 pl-11 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Type</p>
            <RangeTabs options={typeFilterOptions} value={typeFilter} onChange={(v) => setTypeFilter(v as 'All' | ActivityType)} />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Actor</p>
            <RangeTabs options={actorFilterOptions} value={actorFilter} onChange={setActorFilter} />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Attention</p>
            <div className="flex flex-wrap items-center gap-2">
              {attentionFilterOptions.map((option) => (
                <ToggleChip key={option} label={option} active={attentionFilters.has(option)} onToggle={() => toggleAttentionFilter(option)} />
              ))}
            </div>
          </div>
        </div>
      </CardShell>

      {/* Activity timeline */}
      <CardShell>
        <div className="flex items-center justify-between gap-3">
          <CardLabel>Activity Timeline</CardLabel>
          <span className="text-xs text-slate-400">
            {filteredRows.length} of {activityRows.length} shown
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-400">Placeholder activity examples — not real tracked events.</p>

        <div className="mt-3 flex flex-col gap-3">
          {filteredRows.map((row) => (
            <div key={row.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <IconChip icon={typeIcon[row.type]} tint={row.actor === 'Admin' ? 'mint' : 'blue'} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">{row.type}</p>
                      <StatusBadge tone={actorTone[row.actor]}>{row.actor}</StatusBadge>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{row.description}</p>
                    {row.client || row.project ? (
                      <p className="mt-1 truncate text-xs text-slate-400">
                        {row.client}
                        {row.client && row.project ? ' · ' : ''}
                        {row.project}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex shrink-0 flex-row items-center gap-2 sm:flex-col sm:items-end">
                  <StatusBadge tone={attentionTone[row.attention]}>{row.attention}</StatusBadge>
                  <span className="text-xs text-slate-400">{row.time}</span>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedActivity(row)}
                  className="flex min-h-9 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-xs font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRows.length === 0 ? <p className="py-6 text-center text-sm text-slate-400">No activity matches these filters.</p> : null}
      </CardShell>

      {/* Activity detail drawer */}
      <Drawer open={selectedActivity !== null} onClose={() => setSelectedActivity(null)} title="Activity Details">
        {selectedActivity ? (
          <>
            <div>
              <CardLabel>Activity Details</CardLabel>
              <div className="mt-3 flex flex-col gap-2.5">
                <DetailRow label="Type" value={selectedActivity.type} />
                <DetailRow label="Actor" value={selectedActivity.actor} />
                <DetailRow label="Client" value={selectedActivity.client ?? 'Not applicable'} />
                <DetailRow label="Project" value={selectedActivity.project ?? 'Not applicable'} />
                <DetailRow label="Status" value={selectedActivity.attention} />
                <DetailRow label="Occurred" value={selectedActivity.time} />
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Details</CardLabel>
              <p className="mt-2 rounded-md bg-slate-50/60 px-3 py-2.5 text-sm text-slate-600">
                Activity details will appear here once system tracking is connected.
              </p>
            </div>

            {relatedLinksByType[selectedActivity.type].length > 0 ? (
              <div className="border-t border-slate-200/80 pt-4">
                <CardLabel>Related</CardLabel>
                <div className="mt-2.5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {relatedLinksByType[selectedActivity.type].map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="flex min-h-10 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="border-t border-slate-200/80 pt-4">
              <p className="text-[0.65rem] font-bold tracking-[0.12em] text-slate-400 uppercase">Technical Details</p>
              <div className="mt-2.5 flex flex-col gap-2 rounded-md bg-slate-50/60 px-3 py-2.5">
                <TechDetailRow label="Event ID" value="Placeholder" />
                <TechDetailRow label="Source" value="Placeholder" />
                <TechDetailRow label="Session" value="Placeholder" />
                <TechDetailRow label="IP / Region" value="Not collected" />
                <TechDetailRow label="User Agent" value="Placeholder" />
              </div>
            </div>
          </>
        ) : null}
      </Drawer>
    </>
  )
}
