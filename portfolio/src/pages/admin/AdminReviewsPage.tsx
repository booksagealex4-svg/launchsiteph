import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Eye, MessageCircle, CheckCircle2, Hourglass, AlertTriangle, Briefcase, Monitor } from 'lucide-react'
import { CardShell, CardLabel } from '@/components/portal/PortalUI'
import { KpiCard, RangeTabs, ToggleChip, StatusBadge, Drawer, RowActionsMenu } from '@/components/admin/AdminUI'

interface ReviewRow {
  id: string
  name: string
  client: string
  clientEmail: string
  project: string
  status: 'Waiting for Client' | 'Feedback Received' | 'Revision Requested' | 'Approved'
  feedback: string
  attention: string
  stage: string
  lastActivity: string
}

const reviewRows: ReviewRow[] = [
  {
    id: 'r1',
    name: 'Review Placeholder 01',
    client: 'Client Placeholder 01',
    clientEmail: 'client01@example.com',
    project: 'Project Placeholder 01',
    status: 'Waiting for Client',
    feedback: 'No Feedback Yet',
    attention: 'Client Response Needed',
    stage: 'Design',
    lastActivity: 'Placeholder',
  },
  {
    id: 'r2',
    name: 'Review Placeholder 02',
    client: 'Client Placeholder 02',
    clientEmail: 'client02@example.com',
    project: 'Project Placeholder 02',
    status: 'Feedback Received',
    feedback: 'Feedback Submitted',
    attention: 'Review Feedback',
    stage: 'Review',
    lastActivity: 'Placeholder',
  },
  {
    id: 'r3',
    name: 'Review Placeholder 03',
    client: 'Client Placeholder 03',
    clientEmail: 'client03@example.com',
    project: 'Project Placeholder 03',
    status: 'Revision Requested',
    feedback: 'Changes Requested',
    attention: 'Prepare Revision',
    stage: 'Build',
    lastActivity: 'Placeholder',
  },
  {
    id: 'r4',
    name: 'Review Placeholder 04',
    client: 'Client Placeholder 04',
    clientEmail: 'client04@example.com',
    project: 'Project Placeholder 04',
    status: 'Approved',
    feedback: 'Approved',
    attention: 'Ready to Close',
    stage: 'Final Delivery',
    lastActivity: 'Placeholder',
  },
  {
    id: 'r5',
    name: 'Review Placeholder 05',
    client: 'Client Placeholder 05',
    clientEmail: 'client05@example.com',
    project: 'Project Placeholder 05',
    status: 'Feedback Received',
    feedback: 'Feedback Submitted',
    attention: 'No Action Needed',
    stage: 'Review',
    lastActivity: 'Placeholder',
  },
]

const statusTone: Record<ReviewRow['status'], 'blue' | 'mint' | 'amber' | 'slate'> = {
  'Waiting for Client': 'amber',
  'Feedback Received': 'blue',
  'Revision Requested': 'amber',
  Approved: 'mint',
}

const feedbackTone: Record<string, 'blue' | 'mint' | 'amber' | 'slate'> = {
  'No Feedback Yet': 'slate',
  'Feedback Submitted': 'blue',
  'Changes Requested': 'amber',
  Approved: 'mint',
}

function attentionTone(attention: string): 'mint' | 'amber' {
  return attention === 'No Action Needed' ? 'mint' : 'amber'
}

const statusFilterOptions = ['All', 'Waiting for Client', 'Feedback Received', 'Revision Requested', 'Approved']
const stageFilterOptions = ['All', 'Design', 'Review', 'Build', 'Final Delivery']
const attentionFilterOptions = ['Needs Response', 'Needs Revision', 'Ready to Close', 'No Action Needed']

const activityRows = ['Review requested', 'Client viewed preview', 'Feedback submitted', 'Revision requested', 'Approval activity']

const quickReviewActions = ['Message Client', 'Request Review', 'Prepare Revision', 'Mark Complete']

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-800">{value}</span>
    </div>
  )
}

export function AdminReviewsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [stageFilter, setStageFilter] = useState('All')
  const [attentionFilters, setAttentionFilters] = useState<Set<string>>(new Set())
  const [selectedReview, setSelectedReview] = useState<ReviewRow | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const [drawerMessage, setDrawerMessage] = useState<string | null>(null)

  function toggleAttentionFilter(option: string) {
    setAttentionFilters((prev) => {
      const next = new Set(prev)
      if (next.has(option)) next.delete(option)
      else next.add(option)
      return next
    })
  }

  function matchesAttentionFilters(row: ReviewRow) {
    if (attentionFilters.size === 0) return true
    const checks: Record<string, boolean> = {
      'Needs Response': row.attention.includes('Response'),
      'Needs Revision': row.attention.includes('Revision'),
      'Ready to Close': row.attention.includes('Ready to Close'),
      'No Action Needed': row.attention === 'No Action Needed',
    }
    return [...attentionFilters].some((option) => checks[option])
  }

  const filteredRows = reviewRows.filter((row) => {
    const query = search.trim().toLowerCase()
    const matchesSearch = query === '' || `${row.name} ${row.client} ${row.project}`.toLowerCase().includes(query)
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter
    const matchesStage = stageFilter === 'All' || row.stage === stageFilter
    return matchesSearch && matchesStatus && matchesStage && matchesAttentionFilters(row)
  })

  function handleRowAction(action: string, row: ReviewRow) {
    if (action === 'View Review') {
      setSelectedReview(row)
      setDrawerMessage(null)
      return
    }
    setActionMessage(`${action} will be available once this workflow is connected.`)
  }

  function handleDrawerAction(action: string) {
    setDrawerMessage(`${action} will be available once this workflow is connected.`)
  }

  return (
    <>
      {/* Compact header */}
      <div className="rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-4">
        <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Reviews</p>
        <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Review Management</h1>
        <p className="mt-0.5 max-w-[52ch] text-sm text-slate-600">
          Track client reviews, feedback, revision requests, approvals, and follow-up actions.
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard icon={Hourglass} label="Waiting for Client" tint="amber" />
        <KpiCard icon={MessageCircle} label="Feedback Received" />
        <KpiCard icon={AlertTriangle} label="Revision Requested" tint="amber" />
        <KpiCard icon={CheckCircle2} label="Approved" tint="mint" />
        <KpiCard icon={AlertTriangle} label="Needs Attention" tint="amber" />
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
              placeholder="Search reviews"
              aria-label="Search reviews"
              className="w-full rounded-md border border-slate-300/70 bg-white py-2.5 pr-3.5 pl-11 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Status</p>
            <RangeTabs options={statusFilterOptions} value={statusFilter} onChange={setStatusFilter} />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Project Stage</p>
            <RangeTabs options={stageFilterOptions} value={stageFilter} onChange={setStageFilter} />
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

      {/* Reviews list */}
      <CardShell>
        <div className="flex items-center justify-between gap-3">
          <CardLabel>Reviews</CardLabel>
          <span className="text-xs text-slate-400">
            {filteredRows.length} of {reviewRows.length} shown
          </span>
        </div>

        {actionMessage ? (
          <p role="status" className="mt-3 rounded-md border border-blue-100 bg-blue-50/60 px-3 py-2 text-sm text-slate-600">
            {actionMessage}
          </p>
        ) : null}

        {/* Desktop table */}
        <div className="mt-3 hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[780px] table-fixed border-collapse text-sm">
            <colgroup>
              <col className="w-[11%]" />
              <col className="w-[10%]" />
              <col className="w-[10%]" />
              <col className="w-[15%]" />
              <col className="w-[14%]" />
              <col className="w-[18%]" />
              <col className="w-[8%]" />
              <col className="w-[14%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-slate-200 text-left text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
                <th scope="col" className="px-1.5 py-2.5">Review</th>
                <th scope="col" className="px-1.5 py-2.5">Client</th>
                <th scope="col" className="px-1.5 py-2.5">Project</th>
                <th scope="col" className="px-1.5 py-2.5">Status</th>
                <th scope="col" className="px-1.5 py-2.5">Feedback</th>
                <th scope="col" className="px-1.5 py-2.5">Attention</th>
                <th scope="col" className="px-1.5 py-2.5">Last Activity</th>
                <th scope="col" className="px-1.5 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td title={row.name} className="truncate px-1.5 py-3 font-semibold text-slate-800">{row.name}</td>
                  <td title={row.client} className="truncate px-1.5 py-3 text-slate-500">{row.client}</td>
                  <td title={row.project} className="truncate px-1.5 py-3 text-slate-600">{row.project}</td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={statusTone[row.status]}>{row.status}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={feedbackTone[row.feedback]}>{row.feedback}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={attentionTone(row.attention)}>{row.attention}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3 whitespace-nowrap text-slate-400">{row.lastActivity}</td>
                  <td className="px-1.5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`View ${row.name}`}
                        onClick={() => handleRowAction('View Review', row)}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <Link
                        to="/admin/projects"
                        aria-label={`Open ${row.project}`}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <Briefcase className="h-4 w-4" />
                      </Link>
                      <RowActionsMenu
                        actions={['Message Client', 'Request Follow-Up', 'Mark Ready to Close']}
                        onAction={(action) => handleRowAction(action, row)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/tablet — stacked cards */}
        <div className="mt-3 flex flex-col gap-3 lg:hidden">
          {filteredRows.map((row) => (
            <div key={row.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">{row.name}</p>
                  <p className="truncate text-sm text-slate-500">
                    {row.client} &middot; {row.project}
                  </p>
                </div>
                <StatusBadge tone={statusTone[row.status]}>{row.status}</StatusBadge>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Feedback</p>
                  <div className="mt-1">
                    <StatusBadge tone={feedbackTone[row.feedback]}>{row.feedback}</StatusBadge>
                  </div>
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Attention</p>
                  <div className="mt-1">
                    <StatusBadge tone={attentionTone(row.attention)}>{row.attention}</StatusBadge>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-400">Last activity: {row.lastActivity}</span>
                <RowActionsMenu
                  actions={['Message Client', 'Request Follow-Up', 'Mark Ready to Close']}
                  onAction={(action) => handleRowAction(action, row)}
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleRowAction('View Review', row)}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  View Review
                </button>
                <Link
                  to="/admin/projects"
                  className="flex min-h-11 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Open Project
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredRows.length === 0 ? <p className="py-6 text-center text-sm text-slate-400">No reviews match these filters.</p> : null}
      </CardShell>

      {/* Review detail drawer */}
      <Drawer open={selectedReview !== null} onClose={() => setSelectedReview(null)} title="Review Details">
        {selectedReview ? (
          <>
            <div>
              <CardLabel>Review Details</CardLabel>
              <div className="mt-3 flex flex-col gap-2.5">
                <DetailRow label="Review" value={selectedReview.name} />
                <DetailRow label="Client" value={selectedReview.client} />
                <DetailRow label="Project" value={selectedReview.project} />
                <DetailRow label="Status" value={selectedReview.status} />
                <DetailRow label="Project Stage" value={selectedReview.stage} />
                <DetailRow label="Last Activity" value={selectedReview.lastActivity} />
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Project Preview</CardLabel>
              <div className="mt-2.5 flex h-28 w-full items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-300">
                <Monitor className="h-8 w-8" />
              </div>
              <button
                type="button"
                onClick={() => handleDrawerAction('Open Preview')}
                className="mt-2.5 flex min-h-10 w-full items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Open Preview
              </button>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Client Feedback</CardLabel>
              <p className="mt-2 rounded-md bg-slate-50/60 px-3 py-2.5 text-sm text-slate-600">
                {selectedReview.status === 'Waiting for Client' ? 'No feedback submitted yet.' : 'Feedback placeholder will appear here.'}
              </p>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Revision Request</CardLabel>
              <p className="mt-2 rounded-md bg-slate-50/60 px-3 py-2.5 text-sm text-slate-600">Requested changes will appear here.</p>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <label htmlFor="review-admin-response">
                <CardLabel>Admin Response</CardLabel>
              </label>
              <textarea
                id="review-admin-response"
                rows={4}
                placeholder="Add an internal response or follow-up note."
                className="mt-2.5 w-full resize-y rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-slate-400">Only visible to admin until messaging is connected.</p>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Recent Review Activity</CardLabel>
              <div className="mt-2.5 flex flex-col gap-2">
                {activityRows.map((text) => (
                  <div key={text} className="rounded-md bg-slate-50/60 px-3 py-2 text-sm text-slate-600">
                    {text}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-400">Placeholder activity examples — not real review history.</p>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Client &amp; Project</CardLabel>
              <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
                <Link
                  to="/admin/clients"
                  className="flex min-h-10 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  View Client
                </Link>
                <Link
                  to="/admin/projects"
                  className="flex min-h-10 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  View Project
                </Link>
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Quick Review Actions</CardLabel>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {quickReviewActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handleDrawerAction(action)}
                    className="flex min-h-10 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    {action}
                  </button>
                ))}
              </div>
              {drawerMessage ? (
                <p role="status" className="mt-2.5 text-sm text-slate-500">
                  {drawerMessage}
                </p>
              ) : null}
            </div>
          </>
        ) : null}
      </Drawer>
    </>
  )
}
