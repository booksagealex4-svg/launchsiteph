import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"

import { Select } from "@/components/ui/select"
import {
  deleteReferralRecord,
  listReferrals,
  updateReferralStatus,
} from "@/admin/lib/referrals"
import { REFERRAL_STATUS_OPTIONS, type Referral } from "@/admin/types"

export default function Referrals() {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listReferrals()
      setReferrals(data)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load referrals."
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleStatusChange = async (
    id: string,
    status: Referral["status"]
  ) => {
    setReferrals((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    )
    try {
      await updateReferralStatus(id, status)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update status."
      )
      load()
    }
  }

  const handleDelete = async (id: string, businessName: string) => {
    if (!window.confirm(`Delete the referral for ${businessName}?`)) return
    await deleteReferralRecord(id)
    load()
  }

  const paidCount = referrals.filter(
    (r) => r.status === "Commission Paid"
  ).length
  const owedCount = referrals.filter(
    (r) => r.status === "Client Converted"
  ).length

  return (
    <div>
      <h1 className="text-foreground">Referrals</h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-[14px] border border-border bg-surface p-5">
          <p className="text-sm text-muted-foreground">Total submitted</p>
          <p className="font-heading mt-1 text-2xl font-bold text-foreground">
            {referrals.length}
          </p>
        </div>
        <div className="rounded-[14px] border border-border bg-surface p-5">
          <p className="text-sm text-muted-foreground">
            Converted, awaiting payout
          </p>
          <p className="font-heading mt-1 text-2xl font-bold text-primary">
            {owedCount}
          </p>
        </div>
        <div className="rounded-[14px] border border-border bg-surface p-5">
          <p className="text-sm text-muted-foreground">Commission paid</p>
          <p className="font-heading mt-1 text-2xl font-bold text-success">
            {paidCount}
          </p>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-[10px] border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground"
        >
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading...</p>
      ) : referrals.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          No referrals submitted yet.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-[14px] border border-border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Referrer</th>
                <th className="px-4 py-3 font-medium">Referred business</th>
                <th className="px-4 py-3 font-medium">Payout method</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-foreground">
                    <div>{r.referrer_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.referrer_mobile}
                      {r.referrer_email ? ` · ${r.referrer_email}` : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    <div>{r.referred_business_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.referred_contact_name} ·{" "}
                      {r.referred_contact_info}
                    </div>
                    {r.notes && (
                      <div className="mt-1 text-xs text-muted-foreground italic">
                        {r.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.payout_method}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      value={r.status}
                      onChange={(e) =>
                        handleStatusChange(
                          r.id,
                          e.target.value as Referral["status"]
                        )
                      }
                      className="h-9 min-w-[10rem] text-xs"
                    >
                      {REFERRAL_STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        aria-label={`Delete referral for ${r.referred_business_name}`}
                        onClick={() =>
                          handleDelete(r.id, r.referred_business_name)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-[10px] text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
