import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Briefcase, PlayCircle, Eye, Hourglass, CheckCircle2 } from 'lucide-react'
import { CardShell, CardLabel, ProjectStepper } from '@/components/portal/PortalUI'
import { KpiCard, RangeTabs, ToggleChip, StatusBadge, Drawer, Modal, RowActionsMenu } from '@/components/admin/AdminUI'

interface ProjectRow {
  id: string
  name: string
  client: string
  clientEmail: string
  projectType: string
  status: 'Active' | 'On Hold' | 'Completed' | 'Needs Setup'
  stage: string
  nextAction: string
  attention: string
  lastActivity: string
}

const stages = ['Planning', 'Design', 'Review', 'Build', 'Final Delivery']

const projectRows: ProjectRow[] = [
  {
    id: 'p1',
    name: 'Project Placeholder 01',
    client: 'Client Placeholder 01',
    clientEmail: 'client01@example.com',
    projectType: 'Website',
    status: 'Active',
    stage: 'Design',
    nextAction: 'Prepare Preview',
    attention: 'Review Waiting',
    lastActivity: 'Placeholder',
  },
  {
    id: 'p2',
    name: 'Project Placeholder 02',
    client: 'Client Placeholder 02',
    clientEmail: 'client02@example.com',
    projectType: 'Portal',
    status: 'On Hold',
    stage: 'Planning',
    nextAction: 'Waiting for Client',
    attention: 'Client Response Needed',
    lastActivity: 'Placeholder',
  },
  {
    id: 'p3',
    name: 'Project Placeholder 03',
    client: 'Client Placeholder 03',
    clientEmail: 'client03@example.com',
    projectType: 'Website',
    status: 'Active',
    stage: 'Review',
    nextAction: 'Review Feedback',
    attention: 'Unread Message',
    lastActivity: 'Placeholder',
  },
  {
    id: 'p4',
    name: 'Project Placeholder 04',
    client: 'Client Placeholder 04',
    clientEmail: 'client04@example.com',
    projectType: 'Landing Page',
    status: 'Completed',
    stage: 'Final Delivery',
    nextAction: 'Finalize Delivery',
    attention: 'Payment Pending',
    lastActivity: 'Placeholder',
  },
  {
    id: 'p5',
    name: 'Project Placeholder 05',
    client: 'Client Placeholder 05',
    clientEmail: 'client05@example.com',
    projectType: 'Website',
    status: 'Active',
    stage: 'Build',
    nextAction: 'Send Update',
    attention: 'No Action Needed',
    lastActivity: 'Placeholder',
  },
]

const statusTone: Record<ProjectRow['status'], 'blue' | 'mint' | 'amber' | 'slate'> = {
  Active: 'mint',
  'On Hold': 'amber',
  Completed: 'blue',
  'Needs Setup': 'slate',
}

const stageTone: Record<string, 'blue' | 'mint' | 'amber' | 'slate'> = {
  Planning: 'slate',
  Design: 'blue',
  Review: 'amber',
  Build: 'blue',
  'Final Delivery': 'mint',
}

function attentionTone(attention: string): 'mint' | 'amber' {
  return attention === 'No Action Needed' ? 'mint' : 'amber'
}

const statusFilterOptions = ['All', 'Active', 'On Hold', 'Completed']
const stageFilterOptions = ['All', ...stages]
const attentionFilterOptions = ['Needs Review', 'Waiting on Client', 'New Message', 'Payment Pending']

const activityRows = [
  'Project update posted',
  'Client message received',
  'Review feedback submitted',
  'File uploaded',
  'Payment activity',
]

const clientOptions = ['Client Placeholder 01', 'Client Placeholder 02', 'Client Placeholder 03']
const projectTypeOptions = ['Website', 'Portal', 'Landing Page', 'Other']

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-800">{value}</span>
    </div>
  )
}

export function AdminProjectsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [stageFilter, setStageFilter] = useState('All')
  const [attentionFilters, setAttentionFilters] = useState<Set<string>>(new Set())
  const [selectedProject, setSelectedProject] = useState<ProjectRow | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [createMessage, setCreateMessage] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  function toggleAttentionFilter(option: string) {
    setAttentionFilters((prev) => {
      const next = new Set(prev)
      if (next.has(option)) next.delete(option)
      else next.add(option)
      return next
    })
  }

  function matchesAttentionFilters(row: ProjectRow) {
    if (attentionFilters.size === 0) return true
    const checks: Record<string, boolean> = {
      'Needs Review': row.attention.includes('Review'),
      'Waiting on Client': row.attention.includes('Client Response') || row.nextAction.includes('Waiting for Client'),
      'New Message': row.attention.includes('Message'),
      'Payment Pending': row.attention.includes('Payment'),
    }
    return [...attentionFilters].some((option) => checks[option])
  }

  const filteredRows = projectRows.filter((row) => {
    const query = search.trim().toLowerCase()
    const matchesSearch = query === '' || `${row.name} ${row.client}`.toLowerCase().includes(query)
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter
    const matchesStage = stageFilter === 'All' || row.stage === stageFilter
    return matchesSearch && matchesStatus && matchesStage && matchesAttentionFilters(row)
  })

  function handleRowAction(action: string, row: ProjectRow) {
    if (action === 'View Project') {
      setSelectedProject(row)
      return
    }
    setActionMessage(`${action} will be available once this workflow is connected.`)
  }

  function handleCreateSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setCreateMessage('Project creation will become available once project storage is connected.')
  }

  return (
    <>
      {/* Compact header */}
      <div className="flex flex-col gap-3 rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Projects</p>
          <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Project Management</h1>
          <p className="mt-0.5 max-w-[52ch] text-sm text-slate-600">
            Track every client project, current stage, next action, and recent activity.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setCreateOpen(true)
            setCreateMessage(null)
          }}
          className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[#1F6FEB] px-4 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <Plus className="h-4 w-4" />
          Create Project
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard icon={Briefcase} label="Total Projects" />
        <KpiCard icon={PlayCircle} label="Active Projects" tint="mint" />
        <KpiCard icon={Eye} label="Waiting for Review" tint="amber" />
        <KpiCard icon={Hourglass} label="Waiting on Client" tint="amber" />
        <KpiCard icon={CheckCircle2} label="Completed" />
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
              placeholder="Search projects"
              aria-label="Search projects"
              className="w-full rounded-md border border-slate-300/70 bg-white py-2.5 pr-3.5 pl-11 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Status</p>
            <RangeTabs options={statusFilterOptions} value={statusFilter} onChange={setStatusFilter} />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Stage</p>
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

      {/* Project list */}
      <CardShell>
        <div className="flex items-center justify-between gap-3">
          <CardLabel>Projects</CardLabel>
          <span className="text-xs text-slate-400">
            {filteredRows.length} of {projectRows.length} shown
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
                <th scope="col" className="px-1.5 py-2.5">Project</th>
                <th scope="col" className="px-1.5 py-2.5">Client</th>
                <th scope="col" className="px-1.5 py-2.5">Status</th>
                <th scope="col" className="px-1.5 py-2.5">Stage</th>
                <th scope="col" className="px-1.5 py-2.5">Next Action</th>
                <th scope="col" className="px-1.5 py-2.5">Attention</th>
                <th scope="col" className="px-1.5 py-2.5">Last Activity</th>
                <th scope="col" className="px-1.5 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td className="px-1.5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.name}</td>
                  <td className="px-1.5 py-3 whitespace-nowrap text-slate-500">{row.client}</td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={statusTone[row.status]}>{row.status}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={stageTone[row.stage]}>{row.stage}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3 whitespace-nowrap text-slate-600">{row.nextAction}</td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={attentionTone(row.attention)}>{row.attention}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3 whitespace-nowrap text-slate-400">{row.lastActivity}</td>
                  <td className="px-1.5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`View ${row.name}`}
                        onClick={() => handleRowAction('View Project', row)}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <Link
                        to="/admin/clients"
                        aria-label={`Open ${row.client}`}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <Briefcase className="h-4 w-4" />
                      </Link>
                      <RowActionsMenu
                        actions={['Post Update', 'Request Review', 'Send Message', 'Mark On Hold', 'Mark Complete']}
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
                  <p className="truncate text-sm text-slate-500">{row.client}</p>
                </div>
                <StatusBadge tone={statusTone[row.status]}>{row.status}</StatusBadge>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Stage</p>
                  <div className="mt-1">
                    <StatusBadge tone={stageTone[row.stage]}>{row.stage}</StatusBadge>
                  </div>
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Next Action</p>
                  <p className="mt-0.5 text-sm text-slate-700">{row.nextAction}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <StatusBadge tone={attentionTone(row.attention)}>{row.attention}</StatusBadge>
                <RowActionsMenu
                  actions={['Post Update', 'Request Review', 'Send Message', 'Mark On Hold', 'Mark Complete']}
                  onAction={(action) => handleRowAction(action, row)}
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleRowAction('View Project', row)}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  View Project
                </button>
                <Link
                  to="/admin/clients"
                  className="flex min-h-11 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Open Client
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredRows.length === 0 ? <p className="py-6 text-center text-sm text-slate-400">No projects match these filters.</p> : null}
      </CardShell>

      {/* Project detail drawer */}
      <Drawer open={selectedProject !== null} onClose={() => setSelectedProject(null)} title="Project Details">
        {selectedProject ? (
          <>
            <div>
              <CardLabel>Project Details</CardLabel>
              <div className="mt-3 flex flex-col gap-2.5">
                <DetailRow label="Project Name" value={selectedProject.name} />
                <DetailRow label="Client" value={selectedProject.client} />
                <DetailRow label="Project Type" value={selectedProject.projectType} />
                <DetailRow label="Status" value={selectedProject.status} />
                <DetailRow label="Current Stage" value={selectedProject.stage} />
                <DetailRow label="Next Action" value={selectedProject.nextAction} />
                <DetailRow label="Last Activity" value={selectedProject.lastActivity} />
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Project Progress</CardLabel>
              <div className="mt-3">
                <ProjectStepper currentIndex={stages.indexOf(selectedProject.stage)} />
              </div>
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
              <p className="mt-2 text-xs text-slate-400">Placeholder activity examples — not real project history.</p>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Client</CardLabel>
              <div className="mt-2.5 flex items-center justify-between gap-3 rounded-md bg-slate-50/60 px-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">{selectedProject.client}</p>
                  <p className="truncate text-sm text-slate-500">{selectedProject.clientEmail}</p>
                </div>
                <Link
                  to="/admin/clients"
                  className="flex min-h-9 shrink-0 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  View Client
                </Link>
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <label htmlFor="project-internal-notes">
                <CardLabel>Internal Notes</CardLabel>
              </label>
              <textarea
                id="project-internal-notes"
                rows={4}
                placeholder="Add a private note about this project."
                className="mt-2.5 w-full resize-y rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-slate-400">Only visible to admin.</p>
            </div>
          </>
        ) : null}
      </Drawer>

      {/* Create Project modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create Project">
        <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="create-project-name" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Project Name
            </label>
            <input
              id="create-project-name"
              type="text"
              placeholder="Project name"
              className="w-full rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="create-project-client" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Client
            </label>
            <select
              id="create-project-client"
              defaultValue=""
              className="w-full rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="" disabled>
                Select a client
              </option>
              {clientOptions.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="create-project-type" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Project Type
            </label>
            <select
              id="create-project-type"
              defaultValue={projectTypeOptions[0]}
              className="w-full rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              {projectTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="create-project-stage" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Starting Stage
            </label>
            <select
              id="create-project-stage"
              defaultValue={stages[0]}
              className="w-full rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="create-project-notes" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Project Notes <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="create-project-notes"
              rows={3}
              placeholder="Add any starting notes."
              className="w-full resize-y rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex min-h-11 items-center justify-center rounded-md bg-[#1F6FEB] px-4 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Create Project
          </button>
          {createMessage ? (
            <p role="status" className="text-sm text-slate-500">
              {createMessage}
            </p>
          ) : null}
        </form>
      </Modal>
    </>
  )
}
