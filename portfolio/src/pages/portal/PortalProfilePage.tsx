import { useState } from 'react'
import { UserRound, Bell, Lock, LogOut } from 'lucide-react'
import { IconChip, CardShell, CardLabel, ToggleSwitch } from '@/components/portal/PortalUI'

const notificationPrefs = [
  {
    id: 'project-updates',
    label: 'Project Updates',
    description: 'Receive an email when a new project update is posted.',
  },
  {
    id: 'messages',
    label: 'Messages',
    description: 'Receive an email when a new message is available.',
  },
  {
    id: 'reviews',
    label: 'Reviews',
    description: 'Receive an email when something is ready for review.',
  },
]

export function PortalProfilePage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    'project-updates': true,
    messages: true,
    reviews: true,
  })
  const [accessMessage, setAccessMessage] = useState<string | null>(null)
  const [logOutMessage, setLogOutMessage] = useState(false)

  function togglePref(id: string) {
    setPrefs((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
      {/* Compact header */}
      <div className="rounded-lg border border-slate-300/60 bg-[#fdfbf7] px-5 py-4">
        <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Profile</p>
        <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Your Account</h1>
        <p className="mt-0.5 text-sm text-slate-600">Review your basic account details and communication preferences.</p>
      </div>

      {/* Account Details — dominant */}
      <CardShell>
        <div className="flex items-start gap-3">
          <IconChip icon={UserRound} />
          <div className="min-w-0 flex-1">
            <CardLabel>Account Details</CardLabel>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:gap-10">
              <div>
                <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">Name</p>
                <p className="mt-1 text-base font-semibold text-slate-800">Client Name Placeholder</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">Email</p>
                <p className="mt-1 text-base font-semibold text-slate-800">client@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </CardShell>

      {/* Email Notifications — secondary priority */}
      <CardShell>
        <div className="flex items-start gap-3">
          <IconChip icon={Bell} tint="mint" />
          <div className="min-w-0 flex-1">
            <CardLabel>Email Notifications</CardLabel>
            <div className="mt-2.5 divide-y divide-slate-200/70">
              {notificationPrefs.map((pref) => (
                <div key={pref.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{pref.label}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-500">{pref.description}</p>
                  </div>
                  <ToggleSwitch checked={prefs[pref.id]} onChange={() => togglePref(pref.id)} label={pref.label} />
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Email notifications will become available once account notifications are connected.
            </p>
          </div>
        </div>
      </CardShell>

      {/* Password & Access — lighter treatment */}
      <div className="rounded-lg border border-slate-200 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <IconChip icon={Lock} />
          <div className="min-w-0 flex-1">
            <CardLabel>Password &amp; Access</CardLabel>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              Manage your password and account access.
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setAccessMessage('Change Password will become available once secure account access is connected.')}
                className="flex min-h-11 items-center justify-center rounded-md border border-slate-300/70 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Change Password
              </button>
              <button
                type="button"
                onClick={() => setAccessMessage('Account Access settings will become available once secure account access is connected.')}
                className="flex min-h-11 items-center justify-center rounded-md border border-slate-300/70 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Account Access
              </button>
            </div>
            {accessMessage ? <p role="status" className="mt-3 text-sm text-slate-500">{accessMessage}</p> : null}
          </div>
        </div>
      </div>

      {/* Log Out — lowest priority, shell only */}
      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <IconChip icon={LogOut} tint="amber" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800">Log Out</p>
            <p className="mt-0.5 text-sm text-slate-500">Sign out of your client portal session.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setLogOutMessage(true)}
          className="flex min-h-11 w-full shrink-0 items-center justify-center rounded-md border border-slate-300/70 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#1F6FEB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-auto"
        >
          Log Out
        </button>
      </div>
      {logOutMessage ? (
        <p role="status" className="px-1 text-sm text-slate-500">
          Log out will become available once secure account access is connected.
        </p>
      ) : null}
    </>
  )
}
