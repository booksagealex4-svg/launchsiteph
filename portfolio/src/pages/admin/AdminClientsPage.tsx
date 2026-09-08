import { useState, type FormEvent } from 'react'
import { Plus, Search, Users, UserCheck, Mail, AlertTriangle, Eye, MessageCircle } from 'lucide-react'
import { CardShell, CardLabel } from '@/components/portal/PortalUI'
import { KpiCard, RangeTabs, ToggleChip, StatusBadge, TagChip, Drawer, Modal, RowActionsMenu } from '@/components/admin/AdminUI'

interface ClientRow {
  id: string
  name: string
  email: string
  phone: string
  status: 'Active' | 'Pending Invite' | 'Disabled' | 'Needs Setup'
  project: string
  stage: string
  lastActivity: string
  attention: string
  tags: string[]
}

const clientRows: ClientRow[] = [
  {
    id: 'c1',
    name: 'Client Placeholder 01',
    email: 'client01@example.com',
    phone: 'Placeholder',
    status: 'Active',
    project: 'Project Placeholder',
    stage: 'Design',
    lastActivity: 'Placeholder',
    attention: '1 Unread Message',
    tags: ['Website', 'Priority'],
  },
  {
    id: 'c2',
    name: 'Client Placeholder 02',
    email: 'client02@example.com',
    phone: 'Placeholder',
    status: 'Pending Invite',
    project: 'Project Placeholder',
    stage: 'Planning',
    lastActivity: 'Placeholder',
    attention: 'No Action Needed',
    tags: ['Author'],
  },
  {
    id: 'c3',
    name: 'Client Placeholder 03',
    email: 'client03@example.com',
    phone: 'Placeholder',
    status: 'Active',
    project: 'Project Placeholder',
    stage: 'Review',
    lastActivity: 'Placeholder',
    attention: 'Review Waiting',
    tags: ['Website'],
  },
  {
    id: 'c4',
    name: 'Client Placeholder 04',
    email: 'client04@example.com',
    phone: 'Placeholder',
    status: 'Disabled',
    project: 'Project Placeholder',
    stage: 'Final Delivery',
    lastActivity: 'Placeholder',
    attention: 'Payment Pending',
    tags: ['Priority'],
  },
  {
    id: 'c5',
    name: 'Client Placeholder 05',
    email: 'client05@example.com',
    phone: 'Placeholder',
    status: 'Needs Setup',
    project: 'Project Placeholder',
    stage: 'Build',
    lastActivity: 'Placeholder',
    attention: 'No Action Needed',
    tags: ['Author', 'Website'],
  },
]

const statusTone: Record<ClientRow['status'], 'blue' | 'mint' | 'amber' | 'slate'> = {
  Active: 'mint',
  'Pending Invite': 'amber',
  Disabled: 'slate',
  'Needs Setup': 'blue',
}

function attentionTone(attention: string): 'mint' | 'amber' {
  return attention === 'No Action Needed' ? 'mint' : 'amber'
}

const statusFilterOptions = ['All', 'Active', 'Pending Invite', 'Disabled']
const attentionFilterOptions = ['Has Unread Activity', 'Needs Review', 'Payment Pending']

const activityRows = [
  'Message activity placeholder',
  'Review activity placeholder',
  'File activity placeholder',
  'Payment activity placeholder',
]

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-800">{value}</span>
    </div>
  )
}

export function AdminClientsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [attentionFilters, setAttentionFilters] = useState<Set<string>>(new Set())
  const [selectedClient, setSelectedClient] = useState<ClientRow | null>(null)
  const [addClientOpen, setAddClientOpen] = useState(false)
  const [addClientMessage, setAddClientMessage] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  function toggleAttentionFilter(option: string) {
    setAttentionFilters((prev) => {
      const next = new Set(prev)
      if (next.has(option)) next.delete(option)
      else next.add(option)
      return next
    })
  }

  function matchesAttentionFilters(row: ClientRow) {
    if (attentionFilters.size === 0) return true
    const checks: Record<string, boolean> = {
      'Has Unread Activity': row.attention.includes('Unread'),
      'Needs Review': row.attention.includes('Review'),
      'Payment Pending': row.attention.includes('Payment'),
    }
    return [...attentionFilters].some((option) => checks[option])
  }

  const filteredRows = clientRows.filter((row) => {
    const query = search.trim().toLowerCase()
    const matchesSearch = query === '' || `${row.name} ${row.email}`.toLowerCase().includes(query)
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter
    return matchesSearch && matchesStatus && matchesAttentionFilters(row)
  })

  function handleRowAction(action: string, row: ClientRow) {
    if (action === 'View Client') {
      setSelectedClient(row)
      return
    }
    setActionMessage(`${action} will be available once this workflow is connected.`)
  }

  function handleAddClientSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAddClientMessage('Client creation will become available once CRM storage is connected.')
  }

  return (
    <>
      {/* Compact header */}
      <div className="flex flex-col gap-3 rounded-lg border border-slate-300/60 bg-[#fdfbf7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Clients</p>
          <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Client CRM</h1>
          <p className="mt-0.5 max-w-[52ch] text-sm text-slate-600">
            Track client accounts, project activity, communication, and access from one place.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setAddClientOpen(true)
            setAddClientMessage(null)
          }}
          className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[#1F6FEB] px-4 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard icon={Users} label="Total Clients" />
        <KpiCard icon={UserCheck} label="Active Clients" tint="mint" />
        <KpiCard icon={Mail} label="Pending Invitations" tint="amber" />
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
              placeholder="Search clients"
              aria-label="Search clients"
              className="w-full rounded-md border border-slate-300/70 bg-white py-2.5 pr-3.5 pl-11 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <RangeTabs options={statusFilterOptions} value={statusFilter} onChange={setStatusFilter} />
          <div className="flex flex-wrap items-center gap-2">
            {attentionFilterOptions.map((option) => (
              <ToggleChip key={option} label={option} active={attentionFilters.has(option)} onToggle={() => toggleAttentionFilter(option)} />
            ))}
          </div>
        </div>
      </CardShell>

      {/* Client list */}
      <CardShell>
        <div className="flex items-center justify-between gap-3">
          <CardLabel>Clients</CardLabel>
          <span className="text-xs text-slate-400">
            {filteredRows.length} of {clientRows.length} shown
          </span>
        </div>

        {actionMessage ? (
          <p role="status" className="mt-3 rounded-md border border-blue-100 bg-blue-50/60 px-3 py-2 text-sm text-slate-600">
            {actionMessage}
          </p>
        ) : null}

        {/* Desktop table */}
        <div className="mt-3 hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[780px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
                <th scope="col" className="px-1.5 py-2.5">Client</th>
                <th scope="col" className="px-1.5 py-2.5">Contact</th>
                <th scope="col" className="px-1.5 py-2.5">Account Status</th>
                <th scope="col" className="px-1.5 py-2.5">Project</th>
                <th scope="col" className="px-1.5 py-2.5">Stage</th>
                <th scope="col" className="px-1.5 py-2.5">Last Activity</th>
                <th scope="col" className="px-1.5 py-2.5">Attention</th>
                <th scope="col" className="px-1.5 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td className="px-1.5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.name}</td>
                  <td className="px-1.5 py-3 whitespace-nowrap text-slate-500">{row.email}</td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={statusTone[row.status]}>{row.status}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3 whitespace-nowrap text-slate-600">{row.project}</td>
                  <td className="px-1.5 py-3 whitespace-nowrap text-slate-600">{row.stage}</td>
                  <td className="px-1.5 py-3 whitespace-nowrap text-slate-400">{row.lastActivity}</td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={attentionTone(row.attention)}>{row.attention}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`View ${row.name}`}
                        onClick={() => handleRowAction('View Client', row)}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Message ${row.name}`}
                        onClick={() => handleRowAction('Message', row)}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <RowActionsMenu
                        actions={['Create Project', 'Resend Invite', 'Disable Access']}
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
                  <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Project</p>
                  <p className="mt-0.5 text-sm text-slate-700">{row.project}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Stage</p>
                  <p className="mt-0.5 text-sm text-slate-700">{row.stage}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <StatusBadge tone={attentionTone(row.attention)}>{row.attention}</StatusBadge>
                <RowActionsMenu
                  actions={['Create Project', 'Resend Invite', 'Disable Access']}
                  onAction={(action) => handleRowAction(action, row)}
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleRowAction('View Client', row)}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  View Client
                </button>
                <button
                  type="button"
                  onClick={() => handleRowAction('Message', row)}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRows.length === 0 ? <p className="py-6 text-center text-sm text-slate-400">No clients match these filters.</p> : null}
      </CardShell>

      {/* Client detail drawer */}
      <Drawer open={selectedClient !== null} onClose={() => setSelectedClient(null)} title="Client Profile">
        {selectedClient ? (
          <>
            <div>
              <CardLabel>Client Profile</CardLabel>
              <div className="mt-3 flex flex-col gap-2.5">
                <DetailRow label="Name" value={selectedClient.name} />
                <DetailRow label="Email" value={selectedClient.email} />
                <DetailRow label="Phone" value={selectedClient.phone} />
                <DetailRow label="Account Status" value={selectedClient.status} />
                <DetailRow label="Portal Access" value="Placeholder" />
                <DetailRow label="Linked Project" value={selectedClient.project} />
                <DetailRow label="Current Stage" value={selectedClient.stage} />
                <DetailRow label="Last Activity" value={selectedClient.lastActivity} />
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Activity</CardLabel>
              <div className="mt-2.5 flex flex-col gap-2">
                {activityRows.map((text) => (
                  <div key={text} className="rounded-md bg-slate-50/60 px-3 py-2 text-sm text-slate-600">
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Client Tags</CardLabel>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {selectedClient.tags.map((tag) => (
                  <TagChip key={tag}>{tag}</TagChip>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-400">Placeholder tags — for future segmentation and filtering.</p>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <label htmlFor="client-internal-notes">
                <CardLabel>Internal Notes</CardLabel>
              </label>
              <textarea
                id="client-internal-notes"
                rows={4}
                placeholder="Add a private note about this client."
                className="mt-2.5 w-full resize-y rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-slate-400">Only visible to admin.</p>
            </div>
          </>
        ) : null}
      </Drawer>

      {/* Add Client modal */}
      <Modal open={addClientOpen} onClose={() => setAddClientOpen(false)} title="Add Client">
        <form onSubmit={handleAddClientSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="add-client-name" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Name
            </label>
            <input
              id="add-client-name"
              type="text"
              autoComplete="name"
              placeholder="Client name"
              className="w-full rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="add-client-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              id="add-client-email"
              type="email"
              autoComplete="email"
              placeholder="client@example.com"
              className="w-full rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="add-client-phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Phone <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              id="add-client-phone"
              type="tel"
              autoComplete="tel"
              placeholder="Phone number"
              className="w-full rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-600">
            <input
              type="checkbox"
              defaultChecked
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            />
            Send portal invite later
          </label>
          <button
            type="submit"
            className="flex min-h-11 items-center justify-center rounded-md bg-[#1F6FEB] px-4 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Create Client
          </button>
          {addClientMessage ? (
            <p role="status" className="text-sm text-slate-500">
              {addClientMessage}
            </p>
          ) : null}
        </form>
      </Modal>
    </>
  )
}
