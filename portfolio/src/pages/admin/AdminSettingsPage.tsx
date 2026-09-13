import { useState, type FormEvent, type ReactNode } from 'react'
import { CardShell, CardLabel, ToggleSwitch } from '@/components/portal/PortalUI'
import { StatusBadge } from '@/components/admin/AdminUI'
import { cn } from '@/lib/utils'

const sections = ['General', 'Client Portal', 'Notifications', 'Payments', 'Analytics', 'Integrations', 'Security'] as const
type Section = (typeof sections)[number]

interface SettingsState {
  siteName: string
  adminDisplayName: string
  timezone: string
  language: string
  emailOnNewMessage: boolean
  emailOnProjectUpdate: boolean
  emailOnReviewRequest: boolean
  allowClientFileUploads: boolean
  allowClientSelfCheckout: boolean
  notifyNewClientMessage: boolean
  notifyNewReview: boolean
  notifyNewLead: boolean
  notifyPaymentActivity: boolean
  notifyFileUpload: boolean
  notifyClientLoginActivity: boolean
  channelEmail: boolean
  channelInApp: boolean
  defaultPaymentProvider: string
  clientSelfCheckoutPayments: boolean
  trackPageViews: boolean
  trackContactConversions: boolean
  trackFreeMockupRequests: boolean
  privacyRespectingAnalytics: boolean
  requireEmailVerification: boolean
  allowAdminDisableClientAccess: boolean
  requireStrongPasswords: boolean
}

type BooleanSettingKey = { [K in keyof SettingsState]: SettingsState[K] extends boolean ? K : never }[keyof SettingsState]

const initialSettings: SettingsState = {
  siteName: 'Alex Portfolio',
  adminDisplayName: 'Alex',
  timezone: 'GMT+8 / Asia/Manila',
  language: 'English',
  emailOnNewMessage: true,
  emailOnProjectUpdate: true,
  emailOnReviewRequest: true,
  allowClientFileUploads: true,
  allowClientSelfCheckout: true,
  notifyNewClientMessage: true,
  notifyNewReview: true,
  notifyNewLead: true,
  notifyPaymentActivity: true,
  notifyFileUpload: true,
  notifyClientLoginActivity: false,
  channelEmail: true,
  channelInApp: true,
  defaultPaymentProvider: 'None Selected',
  clientSelfCheckoutPayments: true,
  trackPageViews: true,
  trackContactConversions: true,
  trackFreeMockupRequests: true,
  privacyRespectingAnalytics: true,
  requireEmailVerification: true,
  allowAdminDisableClientAccess: true,
  requireStrongPasswords: true,
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description?: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {description ? <p className="mt-0.5 text-sm text-slate-500">{description}</p> : null}
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} label={label} />
    </div>
  )
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-slate-700">
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-md border border-slate-300/70 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none'

function ProviderRow({ label, actionLabel, onAction }: { label: string; actionLabel: string; onAction: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-slate-200 px-3 py-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <div className="mt-1">
          <StatusBadge tone="slate">Not Connected</StatusBadge>
        </div>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="flex min-h-9 shrink-0 items-center justify-center rounded-md border border-slate-300/70 bg-white px-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        {actionLabel}
      </button>
    </div>
  )
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  )
}

export function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>('General')
  const [settings, setSettings] = useState<SettingsState>(initialSettings)
  const [dirty, setDirty] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [connectMessage, setConnectMessage] = useState<string | null>(null)

  function updateField<K extends keyof SettingsState>(key: K, value: SettingsState[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setDirty(true)
    setSaveMessage(null)
  }

  function toggleField(key: BooleanSettingKey) {
    updateField(key, !settings[key])
  }

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaveMessage('Settings will be saved once backend configuration is connected.')
    setDirty(false)
  }

  function showConnectMessage(label: string) {
    setConnectMessage(`${label} will be available once this integration is connected.`)
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-4">
      {/* Compact header */}
      <div className="rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-4">
        <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Settings</p>
        <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Admin Settings</h1>
        <p className="mt-0.5 max-w-[56ch] text-sm text-slate-600">
          Manage portal preferences, notifications, integrations, payments, analytics, and account access.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {/* Section nav — desktop vertical */}
        <nav aria-label="Settings sections" className="hidden shrink-0 flex-col gap-0.5 rounded-lg border border-slate-300/70 bg-white p-2 lg:flex lg:w-[196px]">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              aria-current={activeSection === section ? 'true' : undefined}
              onClick={() => setActiveSection(section)}
              className={cn(
                'rounded-md px-3 py-2 text-left text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
                activeSection === section ? 'bg-blue-50 text-[#1F6FEB]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
              )}
            >
              {section}
            </button>
          ))}
        </nav>

        {/* Section nav — mobile/tablet horizontal */}
        <div className="flex flex-wrap gap-1 rounded-lg border border-slate-300/70 bg-white p-2 lg:hidden">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              aria-current={activeSection === section ? 'true' : undefined}
              onClick={() => setActiveSection(section)}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
                activeSection === section ? 'bg-blue-50 text-[#1F6FEB]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
              )}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Section content */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {activeSection === 'General' ? (
            <CardShell>
              <CardLabel>General</CardLabel>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="site-name">Site Name</FieldLabel>
                  <input
                    id="site-name"
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => updateField('siteName', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="admin-display-name">Admin Display Name</FieldLabel>
                  <input
                    id="admin-display-name"
                    type="text"
                    value={settings.adminDisplayName}
                    onChange={(e) => updateField('adminDisplayName', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="default-timezone">Default Timezone</FieldLabel>
                  <select
                    id="default-timezone"
                    value={settings.timezone}
                    onChange={(e) => updateField('timezone', e.target.value)}
                    className={inputClass}
                  >
                    <option value="GMT+8 / Asia/Manila">GMT+8 / Asia/Manila</option>
                    <option value="GMT+0 / UTC">GMT+0 / UTC</option>
                    <option value="GMT-5 / America/New_York">GMT-5 / America/New_York</option>
                  </select>
                </div>
                <div>
                  <FieldLabel htmlFor="default-language">Default Language</FieldLabel>
                  <select
                    id="default-language"
                    value={settings.language}
                    onChange={(e) => updateField('language', e.target.value)}
                    className={inputClass}
                  >
                    <option value="English">English</option>
                    <option value="Filipino">Filipino</option>
                  </select>
                </div>
              </div>
            </CardShell>
          ) : null}

          {activeSection === 'Client Portal' ? (
            <>
              <CardShell>
                <CardLabel>Client Portal</CardLabel>
                <div className="mt-3 flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-slate-50/60 px-3 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">Allow Public Registration</p>
                    <p className="mt-0.5 text-sm text-slate-500">Client accounts should be created or approved by admin.</p>
                  </div>
                  <StatusBadge tone="slate">OFF &middot; Locked</StatusBadge>
                </div>
                <div className="mt-1 divide-y divide-slate-100">
                  <ToggleRow
                    label="Email Client on New Message"
                    checked={settings.emailOnNewMessage}
                    onChange={() => toggleField('emailOnNewMessage')}
                  />
                  <ToggleRow
                    label="Email Client on New Project Update"
                    checked={settings.emailOnProjectUpdate}
                    onChange={() => toggleField('emailOnProjectUpdate')}
                  />
                  <ToggleRow
                    label="Email Client on Review Request"
                    checked={settings.emailOnReviewRequest}
                    onChange={() => toggleField('emailOnReviewRequest')}
                  />
                  <ToggleRow
                    label="Allow Client File Uploads"
                    checked={settings.allowClientFileUploads}
                    onChange={() => toggleField('allowClientFileUploads')}
                  />
                  <ToggleRow
                    label="Allow Client Self-Checkout"
                    checked={settings.allowClientSelfCheckout}
                    onChange={() => toggleField('allowClientSelfCheckout')}
                  />
                </div>
                <p className="mt-3 text-xs text-slate-400">Shell preferences only — not yet active.</p>
              </CardShell>

              <CardShell className="border-blue-200/70 bg-blue-50/30">
                <CardLabel>Client Account Access</CardLabel>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">Preferred future workflow:</p>
                <p className="mt-2 text-sm leading-relaxed font-semibold text-slate-700">
                  Admin creates or approves client &rarr; invite is sent &rarr; client sets password &rarr; client signs in.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">No public self-registration.</p>
              </CardShell>
            </>
          ) : null}

          {activeSection === 'Notifications' ? (
            <>
              <CardShell>
                <CardLabel>Notifications</CardLabel>
                <div className="mt-1 divide-y divide-slate-100">
                  <ToggleRow label="New Client Message" checked={settings.notifyNewClientMessage} onChange={() => toggleField('notifyNewClientMessage')} />
                  <ToggleRow label="New Review / Feedback" checked={settings.notifyNewReview} onChange={() => toggleField('notifyNewReview')} />
                  <ToggleRow label="New Lead" checked={settings.notifyNewLead} onChange={() => toggleField('notifyNewLead')} />
                  <ToggleRow label="Payment Activity" checked={settings.notifyPaymentActivity} onChange={() => toggleField('notifyPaymentActivity')} />
                  <ToggleRow label="File Upload" checked={settings.notifyFileUpload} onChange={() => toggleField('notifyFileUpload')} />
                  <ToggleRow
                    label="Client Login Activity"
                    description="Optional"
                    checked={settings.notifyClientLoginActivity}
                    onChange={() => toggleField('notifyClientLoginActivity')}
                  />
                </div>
                <div className="mt-3 border-t border-slate-200/80 pt-3">
                  <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-slate-400 uppercase">Delivery Channels</p>
                  <div className="mt-1 divide-y divide-slate-100">
                    <ToggleRow label="Email" checked={settings.channelEmail} onChange={() => toggleField('channelEmail')} />
                    <ToggleRow label="In-App" checked={settings.channelInApp} onChange={() => toggleField('channelInApp')} />
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-400">Shell preferences only — not yet active.</p>
              </CardShell>

              <CardShell>
                <CardLabel>Client Email Notifications</CardLabel>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">Future client email should contain a simple subject, a short message, and a button to sign in to the portal.</p>
                <div className="mt-3 rounded-md border border-slate-200 bg-slate-50/60 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-700">&ldquo;You have a new project update.&rdquo;</p>
                  <p className="mt-1 text-sm font-semibold text-[#1F6FEB]">View in Client Portal &rarr;</p>
                </div>
                <p className="mt-2 text-xs text-slate-400">Example only — email templates and sending are not built yet.</p>
              </CardShell>
            </>
          ) : null}

          {activeSection === 'Payments' ? (
            <>
              <CardShell>
                <CardLabel>Payment Providers</CardLabel>
                <div className="mt-3 flex flex-col gap-2">
                  <ProviderRow label="PayPal" actionLabel="Connect" onAction={() => showConnectMessage('PayPal')} />
                  <ProviderRow label="Wise" actionLabel="Connect" onAction={() => showConnectMessage('Wise')} />
                  <ProviderRow label="Gumroad" actionLabel="Connect" onAction={() => showConnectMessage('Gumroad')} />
                </div>
                {connectMessage ? (
                  <p role="status" className="mt-3 rounded-md border border-blue-100 bg-blue-50/60 px-3 py-2 text-sm text-slate-600">
                    {connectMessage}
                  </p>
                ) : null}
              </CardShell>

              <CardShell>
                <CardLabel>Checkout Preferences</CardLabel>
                <div className="mt-3">
                  <FieldLabel htmlFor="default-provider">Default Payment Provider</FieldLabel>
                  <select
                    id="default-provider"
                    value={settings.defaultPaymentProvider}
                    onChange={(e) => updateField('defaultPaymentProvider', e.target.value)}
                    className={inputClass}
                  >
                    <option value="None Selected">None Selected</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Wise">Wise</option>
                    <option value="Gumroad">Gumroad</option>
                  </select>
                </div>
                <div className="mt-1 divide-y divide-slate-100">
                  <ToggleRow
                    label="Client Self-Checkout"
                    description="Shell preference — no real payment integration yet."
                    checked={settings.clientSelfCheckoutPayments}
                    onChange={() => toggleField('clientSelfCheckoutPayments')}
                  />
                </div>
              </CardShell>
            </>
          ) : null}

          {activeSection === 'Analytics' ? (
            <>
              <CardShell>
                <CardLabel>Analytics Connections</CardLabel>
                <div className="mt-3 flex flex-col gap-2.5">
                  <StatusRow label="Website Analytics" value="Not Connected" />
                  <StatusRow label="Real-Time Visitors" value="Not Connected" />
                  <StatusRow label="Lead Conversion Tracking" value="Not Connected" />
                </div>
              </CardShell>

              <CardShell>
                <CardLabel>Analytics Preferences</CardLabel>
                <div className="mt-1 divide-y divide-slate-100">
                  <ToggleRow label="Track Page Views" checked={settings.trackPageViews} onChange={() => toggleField('trackPageViews')} />
                  <ToggleRow label="Track Contact Conversions" checked={settings.trackContactConversions} onChange={() => toggleField('trackContactConversions')} />
                  <ToggleRow label="Track Free Mockup Requests" checked={settings.trackFreeMockupRequests} onChange={() => toggleField('trackFreeMockupRequests')} />
                  <ToggleRow
                    label="Privacy-Respecting Analytics"
                    checked={settings.privacyRespectingAnalytics}
                    onChange={() => toggleField('privacyRespectingAnalytics')}
                  />
                </div>
                <p className="mt-3 text-xs text-slate-400">Shell preferences only — no tracking is implemented yet.</p>
              </CardShell>
            </>
          ) : null}

          {activeSection === 'Integrations' ? (
            <CardShell>
              <CardLabel>Integrations</CardLabel>
              <div className="mt-3 flex flex-col gap-2">
                <ProviderRow label="Email Provider" actionLabel="Configure" onAction={() => showConnectMessage('Email Provider')} />
                <ProviderRow label="Analytics Provider" actionLabel="Configure" onAction={() => showConnectMessage('Analytics Provider')} />
                <ProviderRow label="Payment Providers" actionLabel="Configure" onAction={() => showConnectMessage('Payment Providers')} />
                <ProviderRow label="File Storage" actionLabel="Configure" onAction={() => showConnectMessage('File Storage')} />
                <ProviderRow label="Automation / Webhooks" actionLabel="Configure" onAction={() => showConnectMessage('Automation / Webhooks')} />
              </div>
              {connectMessage ? (
                <p role="status" className="mt-3 rounded-md border border-blue-100 bg-blue-50/60 px-3 py-2 text-sm text-slate-600">
                  {connectMessage}
                </p>
              ) : null}
            </CardShell>
          ) : null}

          {activeSection === 'Security' ? (
            <>
              <CardShell>
                <CardLabel>Security &amp; Access</CardLabel>
                <div className="mt-3 flex flex-col gap-2.5">
                  <StatusRow label="Public Client Registration" value="Disabled" />
                  <StatusRow label="Client Accounts" value="Admin-created / approved" />
                  <StatusRow label="Admin Authentication" value="Not Connected" />
                  <StatusRow label="Session Management" value="Not Connected" />
                </div>
                <div className="mt-3 divide-y divide-slate-100 border-t border-slate-200/80 pt-1">
                  <ToggleRow
                    label="Require Email Verification"
                    checked={settings.requireEmailVerification}
                    onChange={() => toggleField('requireEmailVerification')}
                  />
                  <ToggleRow
                    label="Allow Admin to Disable Client Access"
                    checked={settings.allowAdminDisableClientAccess}
                    onChange={() => toggleField('allowAdminDisableClientAccess')}
                  />
                  <ToggleRow
                    label="Require Strong Passwords"
                    checked={settings.requireStrongPasswords}
                    onChange={() => toggleField('requireStrongPasswords')}
                  />
                </div>
                <p className="mt-3 text-xs text-slate-400">Shell preferences only — no security policy is enforced yet.</p>
              </CardShell>

              <CardShell className="border-blue-200/70 bg-blue-50/30">
                <CardLabel>Admin Access Direction</CardLabel>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">Future admin authentication will include:</p>
                <ul className="mt-2 flex flex-col gap-1 text-sm leading-relaxed text-slate-600">
                  <li>&bull; Admin login</li>
                  <li>&bull; Protected admin routes</li>
                  <li>&bull; Secure sessions</li>
                  <li>&bull; Role separation between admin and client permissions</li>
                </ul>
                <p className="mt-2 text-xs text-slate-400">Not implemented yet.</p>
              </CardShell>
            </>
          ) : null}

          {/* Save behavior */}
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[var(--card-border-accent)] bg-white px-5 py-4">
            <button
              type="submit"
              className="flex min-h-11 items-center justify-center rounded-md bg-[#1F6FEB] px-5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Save Settings
            </button>
            {dirty ? <span className="text-sm font-semibold text-amber-600">Unsaved changes</span> : null}
            {saveMessage ? (
              <p role="status" className="w-full text-sm text-slate-500">
                {saveMessage}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  )
}
