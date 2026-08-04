import { useEffect, useState, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  createClientRecord,
  getClient,
  updateClientRecord,
} from "@/admin/lib/clients"
import {
  PACKAGE_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  type ClientInput,
} from "@/admin/types"

const emptyForm: ClientInput = {
  name: "",
  business_name: "",
  email: "",
  phone: "",
  package: "Launch",
  total_price: 10000,
  amount_paid: 0,
  payment_status: "Unpaid",
  start_date: null,
  target_launch_date: null,
  status: "Inquiry",
  notes: "",
}

export default function ClientForm() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState<ClientInput>(emptyForm)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    getClient(id)
      .then((client) => {
        if (client) {
          const { id: _id, created_at: _c, updated_at: _u, ...rest } = client
          setForm(rest)
        }
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load client.")
      )
      .finally(() => setLoading(false))
  }, [id])

  const update = <K extends keyof ClientInput>(
    key: K,
    value: ClientInput[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (isEditing && id) {
        await updateClientRecord(id, form)
      } else {
        await createClientRecord(form)
      }
      navigate("/admin")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save client.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-foreground">
        {isEditing ? "Edit client" : "Add client"}
      </h1>

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
            <Label htmlFor="name">Contact name</Label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="business_name">Business name</Label>
            <Input
              id="business_name"
              required
              value={form.business_name}
              onChange={(e) => update("business_name", e.target.value)}
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
            <Label htmlFor="package">Package</Label>
            <Select
              id="package"
              value={form.package}
              onChange={(e) =>
                update("package", e.target.value as ClientInput["package"])
              }
            >
              {PACKAGE_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="status">Project status</Label>
            <Select
              id="status"
              value={form.status}
              onChange={(e) =>
                update("status", e.target.value as ClientInput["status"])
              }
            >
              {PROJECT_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="total_price">Total price (PHP)</Label>
            <Input
              id="total_price"
              type="number"
              min="0"
              value={form.total_price}
              onChange={(e) => update("total_price", Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="amount_paid">Amount paid (PHP)</Label>
            <Input
              id="amount_paid"
              type="number"
              min="0"
              value={form.amount_paid}
              onChange={(e) => update("amount_paid", Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="payment_status">Payment status</Label>
            <Select
              id="payment_status"
              value={form.payment_status}
              onChange={(e) =>
                update(
                  "payment_status",
                  e.target.value as ClientInput["payment_status"]
                )
              }
            >
              {PAYMENT_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
          <div />
          <div className="flex flex-col gap-2">
            <Label htmlFor="start_date">Start date</Label>
            <Input
              id="start_date"
              type="date"
              value={form.start_date ?? ""}
              onChange={(e) => update("start_date", e.target.value || null)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="target_launch_date">Target launch date</Label>
            <Input
              id="target_launch_date"
              type="date"
              value={form.target_launch_date ?? ""}
              onChange={(e) =>
                update("target_launch_date", e.target.value || null)
              }
            />
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
            {saving ? "Saving..." : isEditing ? "Save changes" : "Add client"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/admin")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
