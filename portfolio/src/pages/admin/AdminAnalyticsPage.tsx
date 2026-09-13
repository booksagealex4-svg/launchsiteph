import { useState } from 'react'
import {
  Users,
  Eye,
  UserCheck,
  FileText,
  Target,
  Mail,
  Radio,
  Download,
  Monitor,
  Smartphone,
  Tablet,
  Globe2,
  ArrowRight,
} from 'lucide-react'
import { IconChip, StatusPill, CardShell, CardLabel } from '@/components/portal/PortalUI'
import { KpiCard, RangeTabs, LineChartPlaceholder, SegmentBar } from '@/components/admin/AdminUI'

const kpis = [
  { label: 'Visitors Online Now', icon: Radio, tint: 'amber' as const },
  { label: 'Visits Today', icon: Users },
  { label: 'Unique Visitors', icon: UserCheck, tint: 'mint' as const },
  { label: 'Page Views', icon: Eye },
  { label: 'New Leads', icon: Target, tint: 'mint' as const },
  { label: 'Contact Conversions', icon: Mail, tint: 'amber' as const },
]

const trafficRangeOptions = ['Today', '7 Days', '30 Days', '90 Days']

const trafficSourceSegments = [
  { label: 'Direct', color: 'bg-[#1F6FEB]' },
  { label: 'Search', color: 'bg-blue-300' },
  { label: 'Social', color: 'bg-[#1f9d7c]' },
  { label: 'Referral', color: 'bg-amber-300' },
  { label: 'Email', color: 'bg-slate-300' },
]

const deviceSegments = [
  { label: 'Desktop', color: 'bg-[#1F6FEB]' },
  { label: 'Mobile', color: 'bg-[#1f9d7c]' },
  { label: 'Tablet', color: 'bg-amber-300' },
]

const leadSourceSegments = [
  { label: 'Contact Form', color: 'bg-[#1F6FEB]' },
  { label: 'Free Mockup', color: 'bg-[#1f9d7c]' },
  { label: 'Project Inquiry', color: 'bg-amber-300' },
  { label: 'Direct Email', color: 'bg-slate-300' },
]

const topPages = ['Home', 'Projects', 'Services', 'Testimonials', 'About', 'Contact']

const visitorLocations = ['Country Placeholder 01', 'Country Placeholder 02', 'Country Placeholder 03']

const conversionStages = ['Website Visit', 'Contact Inquiry', 'Qualified Lead', 'Client']

const pagePerformanceRows = ['Home', 'Projects', 'Services']

const visitorActivityRows = ['Visitor viewed page', 'Visitor opened Contact', 'Visitor submitted inquiry', 'Visitor requested mockup']

function MetricRow({ label, metrics }: { label: string; metrics: string[] }) {
  return (
    <div className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
      <p className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">{label}</p>
      {metrics.map((metric, i) => (
        <p key={i} className="w-16 shrink-0 text-right text-sm text-slate-400">
          {metric}
        </p>
      ))}
    </div>
  )
}

export function AdminAnalyticsPage() {
  const [trafficRange, setTrafficRange] = useState('7 Days')
  const [exportMessage, setExportMessage] = useState<string | null>(null)

  return (
    <>
      {/* Compact header */}
      <div className="flex flex-col gap-3 rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Analytics</p>
          <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Website Analytics</h1>
          <p className="mt-0.5 max-w-[52ch] text-sm text-slate-600">
            Track website traffic, visitor activity, page performance, and lead conversion.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExportMessage('Report export will be available once analytics is connected.')}
          className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300/70 bg-white px-4 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      {exportMessage ? (
        <p role="status" className="rounded-md border border-blue-100 bg-blue-50/60 px-3 py-2 text-sm text-slate-600">
          {exportMessage}
        </p>
      ) : null}

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} icon={kpi.icon} label={kpi.label} tint={kpi.tint} />
        ))}
      </div>

      {/* Real-Time Activity — prominent */}
      <CardShell className="border-blue-200/70 bg-blue-50/30">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <IconChip icon={Radio} />
            <CardLabel>Real-Time Activity</CardLabel>
          </div>
          <StatusPill tone="amber">Analytics Connection Pending</StatusPill>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">Visitors Online Now</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-800">&mdash;</p>
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">Active Pages</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-800">&mdash;</p>
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">Recent Visitor Activity</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">Placeholder</p>
          </div>
        </div>
      </CardShell>

      {/* Traffic Trend + Traffic Sources */}
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <CardShell>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardLabel>Traffic Trend</CardLabel>
            <RangeTabs options={trafficRangeOptions} value={trafficRange} onChange={setTrafficRange} />
          </div>
          <div className="mt-4">
            <LineChartPlaceholder ariaLabel="Sample website traffic chart, not real data" />
          </div>
          <p className="mt-2 text-xs text-slate-400">Sample data — analytics connection pending.</p>
        </CardShell>

        <CardShell>
          <div className="flex items-center justify-between gap-3">
            <CardLabel>Traffic Sources</CardLabel>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
              Sample data
            </span>
          </div>
          <div className="mt-4">
            <SegmentBar segments={trafficSourceSegments} />
          </div>
          <p className="mt-3 text-xs text-slate-400">Placeholder distribution — no real traffic percentages.</p>
        </CardShell>
      </div>

      {/* Top Pages + Devices + Visitor Locations */}
      <div className="grid gap-4 lg:grid-cols-3">
        <CardShell>
          <CardLabel>Top Pages</CardLabel>
          <div className="mt-2 flex items-center gap-3 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
            <span className="flex-1">Page</span>
            <span className="w-16 shrink-0 text-right">Views</span>
            <span className="w-16 shrink-0 text-right">Visitors</span>
          </div>
          <div className="mt-1 divide-y divide-slate-100">
            {topPages.map((page) => (
              <MetricRow key={page} label={page} metrics={['—', '—']} />
            ))}
          </div>
        </CardShell>

        <CardShell>
          <div className="flex items-center gap-2.5">
            <IconChip icon={Monitor} tint="mint" />
            <CardLabel>Devices</CardLabel>
          </div>
          <div className="mt-4">
            <SegmentBar segments={deviceSegments} />
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
            <Monitor className="h-3.5 w-3.5" />
            <Smartphone className="h-3.5 w-3.5" />
            <Tablet className="h-3.5 w-3.5" />
            <span>No real percentages yet.</span>
          </div>
        </CardShell>

        <CardShell>
          <div className="flex items-center gap-2.5">
            <IconChip icon={Globe2} />
            <CardLabel>Visitor Locations</CardLabel>
          </div>
          <div className="mt-2 flex items-center gap-3 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
            <span className="flex-1">Country</span>
            <span className="w-16 shrink-0 text-right">Visitors</span>
          </div>
          <div className="mt-1 divide-y divide-slate-100">
            {visitorLocations.map((country) => (
              <MetricRow key={country} label={country} metrics={['—']} />
            ))}
          </div>
        </CardShell>
      </div>

      {/* Conversions + Lead Sources */}
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <CardShell>
          <CardLabel>Conversions</CardLabel>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-1.5">
            {conversionStages.map((stage, i) => (
              <div key={stage} className="flex flex-1 items-center gap-1.5">
                <div className="flex flex-1 flex-col items-center gap-1 rounded-md border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-center">
                  <p className="text-xs font-semibold text-slate-600">{stage}</p>
                  <p className="text-lg font-extrabold text-slate-800">&mdash;</p>
                </div>
                {i < conversionStages.length - 1 ? (
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-slate-300 sm:block" />
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-md bg-slate-50/60 px-3 py-2.5">
            <span className="text-sm font-medium text-slate-600">Free Mockup Requests</span>
            <span className="text-sm font-bold text-slate-800">&mdash;</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">Placeholder funnel — no real conversion percentages.</p>
        </CardShell>

        <CardShell>
          <div className="flex items-center justify-between gap-3">
            <CardLabel>Lead Sources</CardLabel>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
              Sample data
            </span>
          </div>
          <div className="mt-4">
            <SegmentBar segments={leadSourceSegments} />
          </div>
          <p className="mt-3 text-xs text-slate-400">Aligned with Admin Leads sources — placeholder distribution only.</p>
        </CardShell>
      </div>

      {/* Page Performance */}
      <CardShell>
        <CardLabel>Page Performance</CardLabel>
        <div className="mt-2 flex items-center gap-3 text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">
          <span className="flex-1">Page</span>
          <span className="w-16 shrink-0 text-right">Visits</span>
          <span className="w-16 shrink-0 text-right">Engagement</span>
          <span className="w-16 shrink-0 text-right">Conversion</span>
        </div>
        <div className="mt-1 divide-y divide-slate-100">
          {pagePerformanceRows.map((page) => (
            <MetricRow key={page} label={page} metrics={['—', '—', '—']} />
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400">Placeholder metrics — no invented engagement rates.</p>
      </CardShell>

      {/* Recent Visitor Activity */}
      <CardShell>
        <div className="flex items-center gap-2.5">
          <IconChip icon={FileText} tint="mint" />
          <CardLabel>Recent Visitor Activity</CardLabel>
        </div>
        <div className="mt-2.5 flex flex-col gap-2">
          {visitorActivityRows.map((text) => (
            <div key={text} className="rounded-md bg-slate-50/60 px-3 py-2 text-sm text-slate-600">
              {text}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">Placeholder activity examples — no visitor tracking exists yet.</p>
      </CardShell>
    </>
  )
}
