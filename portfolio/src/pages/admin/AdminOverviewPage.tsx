import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Bell,
  UserRound,
  Users,
  Briefcase,
  Eye,
  MessageCircle,
  Target,
  Wallet,
  Radio,
  AlertTriangle,
  FileText,
  Monitor,
  CreditCard,
} from 'lucide-react'
import { IconChip, StatusPill, CardShell, CardLabel } from '@/components/portal/PortalUI'
import { KpiCard, RangeTabs, TrafficChartPlaceholder, RevenueSparkline, StageDistributionBar } from '@/components/admin/AdminUI'

const kpis: { label: string; icon: LucideIcon; tint?: 'blue' | 'mint' | 'amber' }[] = [
  { label: 'Active Clients', icon: Users },
  { label: 'Active Projects', icon: Briefcase },
  { label: 'Pending Reviews', icon: Eye, tint: 'amber' },
  { label: 'Unread Messages', icon: MessageCircle, tint: 'amber' },
  { label: 'Leads', icon: Target, tint: 'mint' },
  { label: 'Revenue', icon: Wallet, tint: 'mint' },
]

const attentionItems = ['Reviews waiting', 'Unread messages', 'New leads', 'Payments pending']

const activityRows: { icon: LucideIcon; text: string }[] = [
  { icon: MessageCircle, text: 'Client message received' },
  { icon: Eye, text: 'Review submitted' },
  { icon: FileText, text: 'File uploaded' },
  { icon: Monitor, text: 'Project update viewed' },
  { icon: CreditCard, text: 'Payment activity' },
]

const leadRows = ['Contact Form', 'Free Mockup Request', 'Project Inquiry']

const messageRows = [
  { unread: true },
  { unread: true },
  { unread: false },
]

const quickActions = ['Add Client', 'Create Project', 'Post Update', 'Send Message', 'Request Review']

export function AdminOverviewPage() {
  const [range, setRange] = useState('7 Days')
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  return (
    <>
      {/* Compact header */}
      <div className="flex flex-col gap-3 rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Admin Overview</p>
          <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Business Dashboard</h1>
          <p className="mt-0.5 max-w-[52ch] text-sm text-slate-600">
            Track clients, projects, website activity, leads, messages, and revenue from one place.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400" aria-label="Notifications placeholder">
            <Bell className="h-4 w-4" />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400" aria-label="Admin avatar placeholder">
            <UserRound className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} icon={kpi.icon} label={kpi.label} tint={kpi.tint} />
        ))}
      </div>

      {/* Live Website Activity — prominent */}
      <CardShell className="border-blue-200/70 bg-blue-50/30">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <IconChip icon={Radio} />
            <CardLabel>Live Website Activity</CardLabel>
          </div>
          <StatusPill tone="amber">Analytics connection pending</StatusPill>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">Visitors Online Now</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-800">&mdash;</p>
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">Visits Today</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-800">&mdash;</p>
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">Page Views Today</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-800">&mdash;</p>
          </div>
        </div>
      </CardShell>

      {/* Website Traffic + Needs Your Attention */}
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <CardShell>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardLabel>Website Traffic</CardLabel>
            <RangeTabs options={['7 Days', '30 Days', '90 Days']} value={range} onChange={setRange} />
          </div>
          <div className="mt-4">
            <TrafficChartPlaceholder />
          </div>
          <p className="mt-2 text-xs text-slate-400">Sample chart shape — analytics connection pending.</p>
        </CardShell>

        <CardShell className="border-amber-200/70 bg-amber-50/30">
          <div className="flex items-center gap-2.5">
            <IconChip icon={AlertTriangle} tint="amber" />
            <CardLabel>Needs Your Attention</CardLabel>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {attentionItems.map((label) => (
              <div key={label} className="flex items-center justify-between gap-2 rounded-md bg-white/70 px-3 py-2">
                <span className="text-sm font-medium text-slate-700">{label}</span>
                <StatusPill tone="amber">&mdash;</StatusPill>
              </div>
            ))}
          </div>
        </CardShell>
      </div>

      {/* Revenue Overview + Project Status Overview */}
      <div className="grid gap-4 lg:grid-cols-2">
        <CardShell>
          <div className="flex items-center gap-2.5">
            <IconChip icon={Wallet} tint="mint" />
            <CardLabel>Revenue Overview</CardLabel>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">This Month</p>
              <p className="mt-1 text-lg font-bold text-slate-800">&mdash;</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">Outstanding</p>
              <p className="mt-1 text-lg font-bold text-slate-800">&mdash;</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">Paid</p>
              <p className="mt-1 text-lg font-bold text-slate-800">&mdash;</p>
            </div>
          </div>
          <div className="mt-4">
            <RevenueSparkline />
          </div>
          <p className="mt-2 text-xs text-slate-400">Sample trend — placeholder only, not real revenue.</p>
        </CardShell>

        <CardShell>
          <CardLabel>Project Status Overview</CardLabel>
          <div className="mt-4">
            <StageDistributionBar />
          </div>
          <p className="mt-3 text-xs text-slate-400">Placeholder distribution — live counts pending.</p>
        </CardShell>
      </div>

      {/* Recent Client Activity + New Leads */}
      <div className="grid gap-4 lg:grid-cols-2">
        <CardShell>
          <CardLabel>Recent Client Activity</CardLabel>
          <div className="mt-2.5 divide-y divide-slate-200/70">
            {activityRows.map((row) => (
              <div key={row.text} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <IconChip icon={row.icon} />
                <p className="min-w-0 flex-1 text-sm text-slate-700">{row.text}</p>
                <span className="text-xs text-slate-400">Example</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">Placeholder activity examples — not real client data.</p>
        </CardShell>

        <CardShell>
          <CardLabel>New Leads</CardLabel>
          <div className="mt-2.5 divide-y divide-slate-200/70">
            {leadRows.map((source) => (
              <div key={source} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{source}</p>
                  <p className="text-xs text-slate-400">Placeholder inquiry</p>
                </div>
                <StatusPill tone="blue">New</StatusPill>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">Future statuses: New, Contacted, Qualified, Converted, Closed.</p>
        </CardShell>
      </div>

      {/* Latest Messages + Quick Actions */}
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <CardShell>
          <CardLabel>Latest Messages</CardLabel>
          <div className="mt-2.5 divide-y divide-slate-200/70">
            {messageRows.map((row, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <IconChip icon={MessageCircle} tint="mint" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">Client Placeholder</p>
                  <p className="truncate text-sm text-slate-500">New message preview will appear here.</p>
                </div>
                {row.unread ? <span className="h-2 w-2 shrink-0 rounded-full bg-[#1F6FEB]" aria-label="Unread" /> : null}
              </div>
            ))}
          </div>
        </CardShell>

        <CardShell>
          <CardLabel>Quick Actions</CardLabel>
          <div className="mt-3 flex flex-col gap-2">
            {quickActions.map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => setActionMessage(`${action} will be available once this workflow is connected.`)}
                className="flex min-h-11 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                {action}
              </button>
            ))}
          </div>
          {actionMessage ? (
            <p role="status" className="mt-3 text-sm text-slate-500">
              {actionMessage}
            </p>
          ) : null}
        </CardShell>
      </div>
    </>
  )
}
