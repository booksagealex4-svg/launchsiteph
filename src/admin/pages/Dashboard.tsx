import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Pencil, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { deleteClientRecord, listClients } from "@/admin/lib/clients"
import { PROJECT_STATUS_OPTIONS, type Client } from "@/admin/types"

function formatCurrency(n: number) {
  return `PHP ${n.toLocaleString()}`
}

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listClients()
      setClients(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load clients.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      const query = search.trim().toLowerCase()
      const matchesSearch =
        query === "" ||
        c.name.toLowerCase().includes(query) ||
        c.business_name.toLowerCase().includes(query)
      const matchesStatus = statusFilter === "All" || c.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [clients, search, statusFilter])

  const totalRevenue = clients.reduce((sum, c) => sum + (c.amount_paid || 0), 0)
  const activeCount = clients.filter(
    (c) => c.status !== "Completed" && c.status !== "Cancelled"
  ).length

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return
    await deleteClientRecord(id)
    load()
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-foreground">Clients</h1>
        <Button asChild>
          <Link to="/admin/clients/new">
            <Plus size={18} aria-hidden="true" />
            Add client
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-[14px] border border-border bg-surface p-5">
          <p className="text-sm text-muted-foreground">Total clients</p>
          <p className="font-heading mt-1 text-2xl font-bold text-foreground">
            {clients.length}
          </p>
        </div>
        <div className="rounded-[14px] border border-border bg-surface p-5">
          <p className="text-sm text-muted-foreground">Active projects</p>
          <p className="font-heading mt-1 text-2xl font-bold text-foreground">
            {activeCount}
          </p>
        </div>
        <div className="rounded-[14px] border border-border bg-surface p-5">
          <p className="text-sm text-muted-foreground">Total collected</p>
          <p className="font-heading mt-1 text-2xl font-bold text-primary">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search by name or business..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="sm:max-w-[200px]"
        >
          <option value="All">All statuses</option>
          {PROJECT_STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
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
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          No clients found.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-[14px] border border-border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Business</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Package</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Target launch</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-foreground">
                    {c.business_name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div>{c.name}</div>
                    <div className="text-xs">{c.email || c.phone || "—"}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {c.package}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatCurrency(c.amount_paid)} /{" "}
                    {formatCurrency(c.total_price)}
                    <div className="text-xs">{c.payment_status}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-xs text-muted-foreground">
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {c.target_launch_date || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/clients/${c.id}`}
                        aria-label={`Edit ${c.business_name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-[10px] text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        aria-label={`Delete ${c.business_name}`}
                        onClick={() => handleDelete(c.id, c.business_name)}
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
