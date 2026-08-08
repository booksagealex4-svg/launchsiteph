import { useEffect, useState, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createLeadRecord, getLead, updateLeadRecord } from "@/admin/lib/leads"
import {
  LEAD_SOURCE_OPTIONS,
  LEAD_STATUS_OPTIONS,
  type LeadInput,
} from "@/admin/types"

const emptyForm: LeadInput = {
  name: "",
  profession: "",
  phone: "",
  email: "",
  address: "",
  source: null,
  status: "New",
  notes: "",
}

export default function LeadForm() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState<LeadInput>(emptyForm)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    getLead(id)
      .then((lead) => {
        if (lead) {
          const { id: _id, created_at: _c, updated_at: _u, ...rest } = lead
          setForm(rest)
        }
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load lead.")
      )
      .finally(() => setLoading(false))
  }, [id])

  const update = <K extends keyof LeadInput>(key: K, value: LeadInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (isEditing && id) {
        await updateLeadRecord(id, form)
      } else {
        await createLeadRecord(form)
      }
      navigate("/admin/leads")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save lead.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-foreground">{isEditing ? "Edit lead" : "Add lead"}</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        {error && (
          <p
            role="alert"
            className="rounded-[10px] border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground"
          >
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="profession">Profession / business</Label>
            <Input
              id="profession"
              value={form.profession ?? ""}
              onChange={(e) => update("profession", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone ?? ""}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email ?? ""}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={form.address ?? ""}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="source">Lead source</Label>
            <Select
              id="source"
              value={form.source ?? ""}
              onChange={(e) =>
                update(
                  "source",
                  (e.target.value || null) as LeadInput["source"]
                )
              }
            >
              <option value="">Not specified</option>
              {LEAD_SOURCE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              value={form.status}
              onChange={(e) =>
                update("status", e.target.value as LeadInput["status"])
              }
            >
              {LEAD_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={form.notes ?? ""}
            onChange={(e) => update("notes", e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : isEditing ? "Save changes" : "Add lead"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/admin/leads")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
