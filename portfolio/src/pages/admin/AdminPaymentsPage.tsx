import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Wallet, Hourglass, CheckCircle2, Clock, AlertTriangle, Eye, ExternalLink } from 'lucide-react'
import { CardShell, CardLabel } from '@/components/portal/PortalUI'
import { KpiCard, RangeTabs, ToggleChip, StatusBadge, Drawer, RowActionsMenu, LineChartPlaceholder } from '@/components/admin/AdminUI'
import { cn } from '@/lib/utils'

interface PaymentRow {
  id: string
  client: string
  project: string
  paymentFor: string
  method: 'PayPal' | 'Wise' | 'Gumroad'
  status: 'Pending' | 'Paid' | 'Overdue' | 'Cancelled'
  attention: string
  lastActivity: string
}

const paymentRows: PaymentRow[] = [
  {
    id: 'pay1',
    client: 'Client Placeholder 01',
    project: 'Project Placeholder 01',
    paymentFor: 'Service / Project Placeholder',
    method: 'PayPal',
    status: 'Pending',
    attention: 'Payment Due',
    lastActivity: 'Placeholder',
  },
  {
    id: 'pay2',
    client: 'Client Placeholder 02',
    project: 'Project Placeholder 02',
    paymentFor: 'Service / Project Placeholder',
    method: 'Wise',
    status: 'Paid',
    attention: 'No Action Needed',
    lastActivity: 'Placeholder',
  },
  {
    id: 'pay3',
    client: 'Client Placeholder 03',
    project: 'Project Placeholder 03',
    paymentFor: 'Service / Project Placeholder',
    method: 'PayPal',
    status: 'Overdue',
    attention: 'Overdue',
    lastActivity: 'Placeholder',
  },
  {
    id: 'pay4',
    client: 'Client Placeholder 04',
    project: 'Project Placeholder 04',
    paymentFor: 'Service / Project Placeholder',
    method: 'Gumroad',
    status: 'Paid',
    attention: 'Receipt Needed',
    lastActivity: 'Placeholder',
  },
  {
    id: 'pay5',
    client: 'Client Placeholder 05',
    project: 'Project Placeholder 05',
    paymentFor: 'Service / Project Placeholder',
    method: 'Wise',
    status: 'Pending',
    attention: 'Needs Follow-Up',
    lastActivity: 'Placeholder',
  },
]

const statusTone: Record<PaymentRow['status'], 'blue' | 'mint' | 'amber' | 'slate'> = {
  Pending: 'amber',
  Paid: 'mint',
  Overdue: 'amber',
  Cancelled: 'slate',
}

function attentionTone(attention: string): 'mint' | 'amber' {
  return attention === 'No Action Needed' ? 'mint' : 'amber'
}

const statusFilterOptions = ['All', 'Pending', 'Paid', 'Overdue']
const methodFilterOptions = ['All Methods', 'PayPal', 'Wise', 'Gumroad']
const attentionFilterOptions = ['Needs Follow-Up', 'Payment Due', 'Overdue', 'No Action Needed']
const revenueRangeOptions = ['7 Days', '30 Days', '90 Days', '12 Months']

const paymentStatusSegments = [
  { label: 'Pending', color: 'bg-amber-300' },
  { label: 'Paid', color: 'bg-[#1f9d7c]' },
  { label: 'Overdue', color: 'bg-[#1F6FEB]' },
  { label: 'Cancelled', color: 'bg-slate-300' },
]

const revenueBreakdownSegments = [
  { label: 'Website', color: 'bg-[#1F6FEB]' },
  { label: 'Web App', color: 'bg-blue-300' },
  { label: 'Client Portal', color: 'bg-[#1f9d7c]' },
  { label: 'Personal Tracker', color: 'bg-amber-300' },
  { label: 'Other Services', color: 'bg-slate-300' },
]

function SegmentBar({ segments }: { segments: { label: string; color: string }[] }) {
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {segments.map((segment) => (
          <div key={segment.label} className={cn('h-full flex-1', segment.color)} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-1.5">
            <span className={cn('h-2 w-2 shrink-0 rounded-full', segment.color)} />
            <span className="text-xs text-slate-500">{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const activityRows = ['Payment request created', 'Client opened checkout', 'Payment status updated', 'Receipt activity']

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-800">{value}</span>
    </div>
  )
}

export function AdminPaymentsPage() {
  const navigate = useNavigate()
  const [revenueRange, setRevenueRange] = useState('30 Days')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [methodFilter, setMethodFilter] = useState('All Methods')
  const [attentionFilters, setAttentionFilters] = useState<Set<string>>(new Set())
  const [selectedPayment, setSelectedPayment] = useState<PaymentRow | null>(null)
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

  const filteredRows = paymentRows.filter((row) => {
    const query = search.trim().toLowerCase()
    const matchesSearch = query === '' || `${row.client} ${row.project} ${row.paymentFor}`.toLowerCase().includes(query)
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter
    const matchesMethod = methodFilter === 'All Methods' || row.method === methodFilter
    const matchesAttention = attentionFilters.size === 0 || attentionFilters.has(row.attention)
    return matchesSearch && matchesStatus && matchesMethod && matchesAttention
  })

  function handleRowAction(action: string, row: PaymentRow) {
    if (action === 'View Payment') {
      setSelectedPayment(row)
      setDrawerMessage(null)
      return
    }
    if (action === 'Open Project') {
      navigate('/admin/projects')
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
        <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Payments</p>
        <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Payments &amp; Revenue</h1>
        <p className="mt-0.5 max-w-[52ch] text-sm text-slate-600">
          Track client payments, outstanding balances, payment status, and revenue from one place.
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard icon={Wallet} label="Revenue This Month" tint="mint" />
        <KpiCard icon={Hourglass} label="Outstanding" tint="amber" />
        <KpiCard icon={CheckCircle2} label="Paid" tint="mint" />
        <KpiCard icon={Clock} label="Pending Payments" tint="amber" />
        <KpiCard icon={AlertTriangle} label="Overdue" tint="amber" />
      </div>

      {/* Revenue Trend + Payment Status Overview */}
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <CardShell>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardLabel>Revenue Trend</CardLabel>
            <RangeTabs options={revenueRangeOptions} value={revenueRange} onChange={setRevenueRange} />
          </div>
          <div className="mt-4">
            <LineChartPlaceholder ariaLabel="Sample revenue trend chart, not real data" />
          </div>
          <p className="mt-2 text-xs text-slate-400">Sample chart shape — payment analytics connection pending.</p>
        </CardShell>

        <CardShell>
          <CardLabel>Payment Status</CardLabel>
          <div className="mt-4">
            <SegmentBar segments={paymentStatusSegments} />
          </div>
          <p className="mt-3 text-xs text-slate-400">Placeholder distribution — live counts pending.</p>
        </CardShell>
      </div>

      {/* Revenue Breakdown */}
      <CardShell>
        <div className="flex items-center justify-between gap-3">
          <CardLabel>Revenue Breakdown</CardLabel>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
            Sample data
          </span>
        </div>
        <div className="mt-4">
          <SegmentBar segments={revenueBreakdownSegments} />
        </div>
        <p className="mt-3 text-xs text-slate-400">Sample visual segments only — no real totals or percentages.</p>
      </CardShell>

      {/* Search + filter bar */}
      <CardShell>
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search payments"
              aria-label="Search payments"
              className="w-full rounded-md border border-slate-300/70 bg-white py-2.5 pr-3.5 pl-11 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Status</p>
            <RangeTabs options={statusFilterOptions} value={statusFilter} onChange={setStatusFilter} />
          </div>
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Payment Method</p>
            <RangeTabs options={methodFilterOptions} value={methodFilter} onChange={setMethodFilter} />
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

      {/* Payments list */}
      <CardShell>
        <div className="flex items-center justify-between gap-3">
          <CardLabel>Payments</CardLabel>
          <span className="text-xs text-slate-400">
            {filteredRows.length} of {paymentRows.length} shown
          </span>
        </div>

        {actionMessage ? (
          <p role="status" className="mt-3 rounded-md border border-blue-100 bg-blue-50/60 px-3 py-2 text-sm text-slate-600">
            {actionMessage}
          </p>
        ) : null}

        {/* Desktop table */}
        <div className="mt-3 hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[820px] table-fixed border-collapse text-sm">
            <colgroup>
              <col className="w-[12%]" />
              <col className="w-[11%]" />
              <col className="w-[14%]" />
              <col className="w-[8%]" />
              <col className="w-[9%]" />
              <col className="w-[10%]" />
              <col className="w-[14%]" />
              <col className="w-[8%]" />
              <col className="w-[14%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-slate-200 text-left text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
                <th scope="col" className="px-1.5 py-2.5">Client</th>
                <th scope="col" className="px-1.5 py-2.5">Project</th>
                <th scope="col" className="px-1.5 py-2.5">Payment For</th>
                <th scope="col" className="px-1.5 py-2.5">Amount</th>
                <th scope="col" className="px-1.5 py-2.5">Method</th>
                <th scope="col" className="px-1.5 py-2.5">Status</th>
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
                  <td title={row.paymentFor} className="truncate px-1.5 py-3 text-slate-600">{row.paymentFor}</td>
                  <td className="px-1.5 py-3 text-slate-400">&mdash;</td>
                  <td className="px-1.5 py-3 whitespace-nowrap text-slate-600">{row.method}</td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={statusTone[row.status]}>{row.status}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3">
                    <StatusBadge tone={attentionTone(row.attention)}>{row.attention}</StatusBadge>
                  </td>
                  <td className="px-1.5 py-3 whitespace-nowrap text-slate-400">{row.lastActivity}</td>
                  <td className="px-1.5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`View payment for ${row.client}`}
                        onClick={() => handleRowAction('View Payment', row)}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <Link
                        to="/admin/clients"
                        aria-label={`Open ${row.client}`}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-blue-50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <RowActionsMenu
                        actions={['Open Project', 'Send Payment Reminder', 'Mark as Paid', 'Copy Payment Link', 'View Receipt']}
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
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Amount</p>
                  <p className="mt-0.5 text-sm text-slate-700">&mdash;</p>
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Method</p>
                  <p className="mt-0.5 text-sm text-slate-700">{row.method}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <StatusBadge tone={attentionTone(row.attention)}>{row.attention}</StatusBadge>
                <RowActionsMenu
                  actions={['Open Project', 'Send Payment Reminder', 'Mark as Paid', 'Copy Payment Link', 'View Receipt']}
                  onAction={(action) => handleRowAction(action, row)}
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleRowAction('View Payment', row)}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  View Payment
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

        {filteredRows.length === 0 ? <p className="py-6 text-center text-sm text-slate-400">No payments match these filters.</p> : null}
      </CardShell>

      {/* Payment detail drawer */}
      <Drawer open={selectedPayment !== null} onClose={() => setSelectedPayment(null)} title="Payment Details">
        {selectedPayment ? (
          <>
            <div>
              <CardLabel>Payment Details</CardLabel>
              <div className="mt-3 flex flex-col gap-2.5">
                <DetailRow label="Client" value={selectedPayment.client} />
                <DetailRow label="Project" value={selectedPayment.project} />
                <DetailRow label="Payment For" value={selectedPayment.paymentFor} />
                <DetailRow label="Amount" value="Amount Placeholder" />
                <DetailRow label="Method" value={selectedPayment.method} />
                <DetailRow label="Status" value={selectedPayment.status} />
                <DetailRow label="Last Activity" value={selectedPayment.lastActivity} />
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Client Checkout</CardLabel>
              <div className="mt-2.5 flex flex-col gap-2.5">
                <DetailRow label="Payment Link" value="Not connected" />
                <DetailRow label="Selected Provider" value={selectedPayment.method} />
                <DetailRow label="Portal Status" value={selectedPayment.status} />
                <DetailRow label="External Provider Status" value="Not connected" />
              </div>
              <button
                type="button"
                onClick={() => handleDrawerAction('Open Payment Setup')}
                className="mt-3 flex min-h-10 w-full items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Open Payment Setup
              </button>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <label htmlFor="payment-internal-notes">
                <CardLabel>Internal Notes</CardLabel>
              </label>
              <textarea
                id="payment-internal-notes"
                rows={4}
                placeholder="Add a private note about this payment."
                className="mt-2.5 w-full resize-y rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-slate-400">Only visible to admin.</p>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Recent Payment Activity</CardLabel>
              <div className="mt-2.5 flex flex-col gap-2">
                {activityRows.map((text) => (
                  <div key={text} className="rounded-md bg-slate-50/60 px-3 py-2 text-sm text-slate-600">
                    {text}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-400">Placeholder activity examples — not real payment history.</p>
            </div>

            <div className="border-t border-slate-200/80 pt-4">
              <CardLabel>Quick Payment Actions</CardLabel>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDrawerAction('Send Reminder')}
                  className="flex min-h-10 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Send Reminder
                </button>
                <button
                  type="button"
                  onClick={() => handleDrawerAction('Mark as Paid')}
                  className="flex min-h-10 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Mark as Paid
                </button>
                <Link
                  to="/admin/clients"
                  className="flex min-h-10 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Open Client
                </Link>
                <Link
                  to="/admin/projects"
                  className="flex min-h-10 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Open Project
                </Link>
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
