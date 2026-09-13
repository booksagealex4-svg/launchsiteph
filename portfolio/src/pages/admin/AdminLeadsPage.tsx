import { useState } from 'react'
import { Search, Target, Hourglass, CheckCircle2, UserCheck, ImagePlus, Eye, MessageCircle } from 'lucide-react'
import { CardShell, CardLabel } from '@/components/portal/PortalUI'
import { KpiCard, RangeTabs, ToggleChip, StatusBadge, Drawer, RowActionsMenu } from '@/components/admin/AdminUI'

interface LeadRow {
  id: string
  name: string
  email: string
  phone: string
  source: 'Contact Form' | 'Free Mockup' | 'Project Inquiry' | 'Direct Email'
  interest: string
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Closed'
  followUp: string
  lastActivity: string
}

const leadRows: LeadRow[] = [
  {
    id: 'l1',
    name: 'Lead Placeholder 01',
    email: 'lead01@example.com',
    phone: 'Placeholder',
    source: 'Contact Form',
    interest: 'Website',
    status: 'New',
    followUp: 'Needs Follow-Up',
    lastActivity: 'Placeholder',
  },
  {
    id: 'l2',
    name: 'Lead Placeholder 02',
    email: 'lead02@example.com',
    phone: 'Placeholder',
    source: 'Free Mockup',
    interest: 'Web App',
    status: 'Contacted',
    followUp: 'Waiting for Reply',
    lastActivity: 'Placeholder',
  },
  {
    id: 'l3',
    name: 'Lead Placeholder 03',
    email: 'lead03@example.com',
    phone: 'Placeholder',
    source: 'Project Inquiry',
    interest: 'Client Portal',
    status: 'Qualified',
    followUp: 'Follow-Up Later',
    lastActivity: 'Placeholder',
  },
  {
    id: 'l4',
    name: 'Lead Placeholder 04',
    email: 'lead04@example.com',
    phone: 'Placeholder',
    source: 'Direct Email',
    interest: 'Automation',
    status: 'Converted',
    followUp: 'No Action Needed',
    lastActivity: 'Placeholder',
  },
  {
    id: 'l5',
    name: 'Lead Placeholder 05',
    email: 'lead05@example.com',
    phone: 'Placeholder',
    source: 'Free Mockup',
    interest: 'Custom Project',
    status: 'Closed',
    followUp: 'No Action Needed',
    lastActivity: 'Placeholder',
  },
]

const statusTone: Record<LeadRow['status'], 'blue' | 'mint' | 'amber' | 'slate'> = {
  New: 'blue',
  Contacted: 'amber',
  Qualified: 'mint',
  Converted: 'mint',
  Closed: 'slate',
}

function followUpTone(followUp: string): 'mint' | 'amber' {
  return followUp === 'No Action Needed' ? 'mint' : 'amber'
}

const statusFilterOptions = ['All', 'New', 'Contacted', 'Qualified', 'Converted', 'Closed']
const sourceFilterOptions = ['All Sources', 'Contact Form', 'Free Mockup', 'Project Inquiry', 'Direct Email']
const interestFilterOptions = ['Website', 'Web App', 'Client Portal', 'Personal Tracker', 'Automation', 'Mobile App', 'Custom Project']

const activityRows = ['Inquiry received', 'Follow-up sent', 'Lead replied', 'Mockup requested', 'Lead qualified']

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-800">{value}</span>
    </div>
  )
}

export function AdminLeadsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sourceFilter, setSourceFilter] = useState('All Sources')
  const [interestFilters, setInterestFilters] = useState<Set<string>>(new Set())
  const [selectedLead, setSelectedLead] = useState<LeadRow | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const [drawerMessage, setDrawerMessage] = useState<string | null>(null)

  function toggleInterestFilter(option: string) {
    setInterestFilters((prev) => {
      const next = new Set(prev)
      if (next.has(option)) next.delete(option)
      else next.add(option)
      return next
    })
  }

  const filteredRows = leadRows.filter((row) => {
    const query = search.trim().toLowerCase()
    const matchesSearch = query === '' || `${row.name} ${row.email} ${row.interest}`.toLowerCase().includes(query)
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter
    const matchesSource = sourceFilter === 'All Sources' || row.source === sourceFilter
    const matchesInterest = interestFilters.size === 0 || interestFilters.has(row.interest)
    return matchesSearch && matchesStatus && matchesSource && matchesInterest
  })

  function handleRowAction(action: string, row: LeadRow) {
    if (action === 'View Lead') {
      setSelectedLead(row)
      setDrawerMessage(null)
      return
    }
    if (action === 'Contact Lead') {
      setActionMessage('Lead communication will become available once messaging/email is connected.')
      return
    }
    setActionMessage(`${action} will be available once this workflow is connected.`)
  }

  function handleDrawerAction(action: string) {
    if (action === 'Contact Lead') {
      setDrawerMessage('Lead communication will become available once messaging/email is connected.')
      return
    }
    setDrawerMessage(`${action} will be available once this workflow is connected.`)
  }

  return (
    <>
      {/* Compact header */}
      <div className="rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-4">
        <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Leads</p>
        <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Lead Management</h1>
        <p className="mt-0.5 max-w-[52ch] text-sm text-slate-600">
          Track inquiries, free mockup requests, follow-ups, and potential new clients from one place.
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard icon={Target} label="New Leads" tint="blue" />
        <KpiCard icon={Hourglass} label="Needs Follow-Up" tint="amber" />
        <KpiCard icon={UserCheck} label="Qualified" tint="mint" />
        <KpiCard icon={CheckCircle2} label="Converted" tint="mint" />
        <KpiCard icon={ImagePlus} label="Free Mockup Requests" />
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
              placeholder="Search leads"
              aria-label="Search leads"
              className="w-full rounded-md border border-slate-300/70 bg-white py-2.5 pr-3.5 pl-11 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Status</p>
            <RangeTabs options={statusFilterOptions} value={statusFilter} onChange={setStatusFilter} />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Source</p>
            <RangeTabs options={sourceFilterOptions} value={sourceFilter} onChange={setSourceFilter} />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Interest</p>
            <div className="flex flex-wrap items-center gap-2">
              {interestFilterOptions.map((option) => (
                <ToggleChip key={option} label={option} active={interestFilters.has(option)} onToggle={() => toggleInterestFilter(option)} />
              ))}
            </div>
          </div>
        </div>
      </CardShell>

      {/* Leads list */}
      <CardShell>
        <div className="flex items-center justify-between gap-3">
          <CardLabel>Leads</CardLabel>
          <span className="text-xs text-slate-400">
            {filteredRows.length} of {leadRows.length} shown
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
              <col className="w-[14%]" />
              <col className="w-[15%]" />
              <col className="w-[13%]" />
              <col className="w-[13%]" />
              <col className="w-[10%]" />
              <col className="w-[15%]" />
              <col className="w-[8%]" />
              <col className="w-[12%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-slate-200 text-left text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
                <th scope="col" className="px-1.5 py-2.5">Lead</th>
                <th scope="col" className="px-1.5 py-2.5">Contact</th>
                <th scope="col" className="px-1.5 py-2.5">Source</th>
                <th scope="col" className="px-1.5 py-2.5">Interest</th>
                <th scope="col" className="px-1.5 py-2.5">Status</th>
                <th scope="col" className="px-1.5 py-2.5">Follow-Up</th>
                <th scope="col" className="px-1.5 py-2.5">Last Activity</th>
                <th scope="col" className="px-1.5 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td title={row.name} className="truncate px-1.5 py-3 font-semibold text-slate-800">{row.name}</td>
                  <td title={row.email} className="truncate px-1.5 py-3 text-slate-500">{row.email}</td>
                  <td title={row.source} className="truncate px-1.5 py-3 text-slate-600">{row.source}</td>
                  <td title={row.interest} className="truncate px-1.5 py-3 text-slate-600">{row.interest}</td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={statusTone[row.status]}>{row.status}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={followUpTone(row.followUp)}>{row.followUp}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3 whitespace-nowrap text-slate-400">{row.lastActivity}</td>
                  <td className="px-1.5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`View ${row.name}`}
                        onClick={() => handleRowAction('View Lead', row)}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Contact ${row.name}`}
                        onClick={() => handleRowAction('Contact Lead', row)}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <RowActionsMenu
                        actions={['Mark Contacted', 'Mark Qualified', 'Convert to Client', 'Create Project', 'Close Lead']}
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
                  <p className="truncate text-sm text-slate-500">{row.email}</p>
                </div>
                <StatusBadge tone={statusTone[row.status]}>{row.status}</StatusBadge>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Source</p>
                  <p className="mt-0.5 text-sm text-slate-700">{row.source}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Interest</p>
                  <p className="mt-0.5 text-sm text-slate-700">{row.interest}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <StatusBadge tone={followUpTone(row.followUp)}>{row.followUp}</StatusBadge>
                <RowActionsMenu
                  actions={['Mark Contacted', 'Mark Qualified', 'Convert to Client', 'Create Project', 'Close Lead']}
                  onAction={(action) => handleRowAction(action, row)}
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleRowAction('View Lead', row)}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  View Lead
                </button>
                <button
                  type="button"
                  onClick={() => handleRowAction('Contact Lead', row)}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Contact Lead
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRows.length === 0 ? <p className="py-6 text-center text-sm text-slate-400">No leads match these filters.</p> : null}
      </CardShell>

      {/* Lead detail drawer */}
      <Drawer open={selectedLead !== null} onClose={() => setSelectedLead(null)} title="Lead Details">
        {selectedLead ? (
          <>
            <div>
              <CardLabel>Lead Details</CardLabel>
              <div className="mt-3 flex flex-col gap-2.5">
                <DetailRow label="Name" value={selectedLead.name} />
                <DetailRow label="Email" value={selectedLead.email} />
                <DetailRow label="Phone" value={selectedLead.phone} />
                <DetailRow label="Source" value={selectedLead.source} />
                <DetailRow label="Project Interest" value={selectedLead.interest} />
                <DetailRow label="Status" value={selectedLead.status} />
                <DetailRow label="Last Activity" value={selectedLead.lastActivity} />
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Inquiry</CardLabel>
              <p className="mt-2 rounded-md bg-slate-50/60 px-3 py-2.5 text-sm text-slate-600">
                Inquiry message placeholder will appear here.
              </p>
            </div>

            {selectedLead.source === 'Free Mockup' ? (
              <div className="border-t border-slate-200/80 pt-4">
                <CardLabel>Free Mockup Request</CardLabel>
                <div className="mt-2.5 flex flex-col gap-2.5">
                  <DetailRow label="Requested" value="Yes" />
                  <DetailRow label="Project Type" value="Placeholder" />
                </div>
                <p className="mt-2 rounded-md bg-slate-50/60 px-3 py-2.5 text-sm text-slate-600">
                  Mockup request details will appear here.
                </p>
              </div>
            ) : null}

            <div className="border-t border-slate-200/80 pt-4">
              <label htmlFor="lead-followup-notes">
                <CardLabel>Follow-Up Notes</CardLabel>
              </label>
              <textarea
                id="lead-followup-notes"
                rows={4}
                placeholder="Add a private note about this lead."
                className="mt-2.5 w-full resize-y rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-slate-400">Only visible to admin.</p>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Recent Activity</CardLabel>
              <div className="mt-2.5 flex flex-col gap-2">
                {activityRows.map((text) => (
                  <div key={text} className="rounded-md bg-slate-50/60 px-3 py-2 text-sm text-slate-600">
                    {text}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-400">Placeholder activity examples — not real lead history.</p>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Lead Actions</CardLabel>
              <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleDrawerAction('Contact Lead')}
                  className="flex min-h-11 items-center justify-center rounded-md bg-[#1F6FEB] px-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Contact Lead
                </button>
                <button
                  type="button"
                  onClick={() => handleDrawerAction('Mark Qualified')}
                  className="flex min-h-11 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Mark Qualified
                </button>
                <button
                  type="button"
                  onClick={() => handleDrawerAction('Convert to Client')}
                  className="flex min-h-11 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Convert to Client
                </button>
                <button
                  type="button"
                  onClick={() => handleDrawerAction('Create Project')}
                  className="flex min-h-11 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Create Project
                </button>
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
