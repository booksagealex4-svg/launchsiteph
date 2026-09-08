import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, MessageCircle, Mail, Users2, CalendarClock, ArrowDownLeft, ArrowUpRight, Eye, Briefcase } from 'lucide-react'
import { CardShell, CardLabel } from '@/components/portal/PortalUI'
import { KpiCard, RangeTabs, ToggleChip, StatusBadge, Drawer, RowActionsMenu } from '@/components/admin/AdminUI'

interface ConversationRow {
  id: string
  client: string
  clientEmail: string
  project: string
  latestMessage: string
  status: 'Unread' | 'Needs Reply' | 'Replied'
  direction: 'From Client' | 'From Admin'
  attention: string
  lastActivity: string
  type: 'Review Related' | 'Project Update' | 'General Message'
}

const conversationRows: ConversationRow[] = [
  {
    id: 'm1',
    client: 'Client Placeholder 01',
    clientEmail: 'client01@example.com',
    project: 'Project Placeholder 01',
    latestMessage: 'Message preview placeholder will appear here.',
    status: 'Unread',
    direction: 'From Client',
    attention: 'Reply Needed',
    lastActivity: 'Placeholder',
    type: 'Review Related',
  },
  {
    id: 'm2',
    client: 'Client Placeholder 02',
    clientEmail: 'client02@example.com',
    project: 'Project Placeholder 02',
    latestMessage: 'Message preview placeholder will appear here.',
    status: 'Needs Reply',
    direction: 'From Client',
    attention: 'Client Waiting',
    lastActivity: 'Placeholder',
    type: 'Project Update',
  },
  {
    id: 'm3',
    client: 'Client Placeholder 03',
    clientEmail: 'client03@example.com',
    project: 'Project Placeholder 03',
    latestMessage: 'Message preview placeholder will appear here.',
    status: 'Replied',
    direction: 'From Admin',
    attention: 'No Action Needed',
    lastActivity: 'Placeholder',
    type: 'General Message',
  },
  {
    id: 'm4',
    client: 'Client Placeholder 04',
    clientEmail: 'client04@example.com',
    project: 'Project Placeholder 04',
    latestMessage: 'Message preview placeholder will appear here.',
    status: 'Needs Reply',
    direction: 'From Client',
    attention: 'Review Question',
    lastActivity: 'Placeholder',
    type: 'Review Related',
  },
  {
    id: 'm5',
    client: 'Client Placeholder 05',
    clientEmail: 'client05@example.com',
    project: 'Project Placeholder 05',
    latestMessage: 'Message preview placeholder will appear here.',
    status: 'Unread',
    direction: 'From Client',
    attention: 'Project Question',
    lastActivity: 'Placeholder',
    type: 'Project Update',
  },
]

const statusTone: Record<ConversationRow['status'], 'blue' | 'mint' | 'amber' | 'slate'> = {
  Unread: 'amber',
  'Needs Reply': 'amber',
  Replied: 'mint',
}

function attentionTone(attention: string): 'mint' | 'amber' {
  return attention === 'No Action Needed' ? 'mint' : 'amber'
}

const statusFilterOptions = ['All', 'Unread', 'Needs Reply', 'Replied']
const projectFilterOptions = ['All Projects', ...Array.from(new Set(conversationRows.map((row) => row.project)))]
const typeFilterOptions = ['Review Related', 'Project Update', 'General Message']

const relatedActivityRows = ['Project update', 'Review request', 'File activity', 'Payment activity']

const threadMessages = [
  { from: 'From Client', text: 'Message placeholder from client.' },
  { from: 'From Admin', text: 'Message placeholder from admin.' },
  { from: 'From Client', text: 'Message placeholder from client.' },
]

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-800">{value}</span>
    </div>
  )
}

export function AdminMessagesPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [projectFilter, setProjectFilter] = useState('All Projects')
  const [typeFilters, setTypeFilters] = useState<Set<string>>(new Set())
  const [selectedConversation, setSelectedConversation] = useState<ConversationRow | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const [replyMessage, setReplyMessage] = useState<string | null>(null)

  function toggleTypeFilter(option: string) {
    setTypeFilters((prev) => {
      const next = new Set(prev)
      if (next.has(option)) next.delete(option)
      else next.add(option)
      return next
    })
  }

  const filteredRows = conversationRows.filter((row) => {
    const query = search.trim().toLowerCase()
    const matchesSearch = query === '' || `${row.client} ${row.project} ${row.latestMessage}`.toLowerCase().includes(query)
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter
    const matchesProject = projectFilter === 'All Projects' || row.project === projectFilter
    const matchesType = typeFilters.size === 0 || typeFilters.has(row.type)
    return matchesSearch && matchesStatus && matchesProject && matchesType
  })

  function handleRowAction(action: string, row: ConversationRow) {
    if (action === 'Open Conversation') {
      setSelectedConversation(row)
      setReplyMessage(null)
      return
    }
    if (action === 'Open Project') {
      navigate('/admin/projects')
      return
    }
    setActionMessage(`${action} will be available once this workflow is connected.`)
  }

  function handleReplySubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setReplyMessage('Reply sending will become available once messaging is connected.')
  }

  return (
    <>
      {/* Compact header */}
      <div className="rounded-lg border border-slate-300/60 bg-[#fdfbf7] px-5 py-4">
        <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Messages</p>
        <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Client Messages</h1>
        <p className="mt-0.5 max-w-[52ch] text-sm text-slate-600">
          Track client conversations, unread messages, and follow-up activity from one place.
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard icon={Mail} label="Unread Messages" tint="amber" />
        <KpiCard icon={MessageCircle} label="Needs Reply" tint="amber" />
        <KpiCard icon={Users2} label="Active Conversations" />
        <KpiCard icon={CalendarClock} label="Messages Today" tint="mint" />
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
              placeholder="Search conversations"
              aria-label="Search conversations"
              className="w-full rounded-md border border-slate-300/70 bg-white py-2.5 pr-3.5 pl-11 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Status</p>
            <RangeTabs options={statusFilterOptions} value={statusFilter} onChange={setStatusFilter} />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Project</p>
            <RangeTabs options={projectFilterOptions} value={projectFilter} onChange={setProjectFilter} />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Type</p>
            <div className="flex flex-wrap items-center gap-2">
              {typeFilterOptions.map((option) => (
                <ToggleChip key={option} label={option} active={typeFilters.has(option)} onToggle={() => toggleTypeFilter(option)} />
              ))}
            </div>
          </div>
        </div>
      </CardShell>

      {/* Conversation list */}
      <CardShell>
        <div className="flex items-center justify-between gap-3">
          <CardLabel>Conversations</CardLabel>
          <span className="text-xs text-slate-400">
            {filteredRows.length} of {conversationRows.length} shown
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
              <col className="w-[12%]" />
              <col className="w-[11%]" />
              <col className="w-[20%]" />
              <col className="w-[12%]" />
              <col className="w-[10%]" />
              <col className="w-[15%]" />
              <col className="w-[8%]" />
              <col className="w-[12%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-slate-200 text-left text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
                <th scope="col" className="px-1.5 py-2.5">Client</th>
                <th scope="col" className="px-1.5 py-2.5">Project</th>
                <th scope="col" className="px-1.5 py-2.5">Latest Message</th>
                <th scope="col" className="px-1.5 py-2.5">Status</th>
                <th scope="col" className="px-1.5 py-2.5">Direction</th>
                <th scope="col" className="px-1.5 py-2.5">Attention</th>
                <th scope="col" className="px-1.5 py-2.5">Last Activity</th>
                <th scope="col" className="px-1.5 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td title={row.client} className="truncate px-1.5 py-3 font-semibold text-slate-800">{row.client}</td>
                  <td title={row.project} className="truncate px-1.5 py-3 text-slate-500">{row.project}</td>
                  <td title={row.latestMessage} className="truncate px-1.5 py-3 text-slate-600">{row.latestMessage}</td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={statusTone[row.status]}>{row.status}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                      {row.direction === 'From Client' ? (
                        <ArrowDownLeft className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      )}
                      {row.direction}
                    </span>
                  </td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={attentionTone(row.attention)}>{row.attention}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3 whitespace-nowrap text-slate-400">{row.lastActivity}</td>
                  <td className="px-1.5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`Open conversation with ${row.client}`}
                        onClick={() => handleRowAction('Open Conversation', row)}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <Link
                        to="/admin/clients"
                        aria-label={`Open ${row.client}`}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <RowActionsMenu
                        actions={['Open Project', 'Mark as Read', 'Send Update']}
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
                  <p className="truncate text-sm font-bold text-slate-900">{row.client}</p>
                  <p className="truncate text-sm text-slate-500">{row.project}</p>
                </div>
                <StatusBadge tone={statusTone[row.status]}>{row.status}</StatusBadge>
              </div>
              <p className="mt-2.5 truncate text-sm text-slate-600">{row.latestMessage}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                  {row.direction === 'From Client' ? (
                    <ArrowDownLeft className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  )}
                  {row.direction}
                </span>
                <StatusBadge tone={attentionTone(row.attention)}>{row.attention}</StatusBadge>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-400">Last activity: {row.lastActivity}</span>
                <RowActionsMenu
                  actions={['Open Project', 'Mark as Read', 'Send Update']}
                  onAction={(action) => handleRowAction(action, row)}
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleRowAction('Open Conversation', row)}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Open Conversation
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

        {filteredRows.length === 0 ? <p className="py-6 text-center text-sm text-slate-400">No conversations match these filters.</p> : null}
      </CardShell>

      {/* Conversation drawer */}
      <Drawer open={selectedConversation !== null} onClose={() => setSelectedConversation(null)} title="Conversation">
        {selectedConversation ? (
          <>
            <div>
              <CardLabel>Conversation</CardLabel>
              <div className="mt-3 flex flex-col gap-2.5">
                <DetailRow label="Client" value={selectedConversation.client} />
                <DetailRow label="Project" value={selectedConversation.project} />
                <DetailRow label="Status" value={selectedConversation.status} />
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Message Thread</CardLabel>
              <div className="mt-2.5 flex flex-col gap-2.5">
                {threadMessages.map((message, i) => (
                  <div
                    key={i}
                    className={
                      message.from === 'From Admin'
                        ? 'rounded-lg border border-blue-100 bg-blue-50/60 p-3 sm:max-w-[85%]'
                        : 'rounded-lg border border-slate-200 bg-white p-3 sm:ml-auto sm:max-w-[85%]'
                    }
                  >
                    <p
                      className={
                        message.from === 'From Admin'
                          ? 'text-[0.65rem] font-bold tracking-[0.1em] text-[#1F6FEB] uppercase'
                          : 'text-[0.65rem] font-bold tracking-[0.1em] text-slate-400 uppercase'
                      }
                    >
                      {message.from}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{message.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Related Activity</CardLabel>
              <div className="mt-2.5 flex flex-col gap-2">
                {relatedActivityRows.map((text) => (
                  <div key={text} className="rounded-md bg-slate-50/60 px-3 py-2 text-sm text-slate-600">
                    {text}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-400">Placeholder context — not real activity history.</p>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Client &amp; Project</CardLabel>
              <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
                <Link
                  to="/admin/clients"
                  className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <Eye className="h-4 w-4" />
                  View Client
                </Link>
                <Link
                  to="/admin/projects"
                  className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <Briefcase className="h-4 w-4" />
                  View Project
                </Link>
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <form onSubmit={handleReplySubmit} className="flex flex-col gap-2">
                <label htmlFor="admin-reply">
                  <CardLabel>Reply</CardLabel>
                </label>
                <textarea
                  id="admin-reply"
                  rows={4}
                  placeholder="Write a reply..."
                  className="mt-1 w-full resize-y rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
                <p className="text-xs text-slate-400">Your reply will be sent to the client once messaging is connected.</p>
                <button
                  type="submit"
                  className="mt-1 flex min-h-11 items-center justify-center rounded-md bg-[#1F6FEB] px-4 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Send Reply
                </button>
                {replyMessage ? (
                  <p role="status" className="text-sm text-slate-500">
                    {replyMessage}
                  </p>
                ) : null}
              </form>
            </div>
          </>
        ) : null}
      </Drawer>
    </>
  )
}
