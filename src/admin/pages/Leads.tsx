import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Pencil, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { deleteLeadRecord, listLeads } from "@/admin/lib/leads"
import { LEAD_STATUS_OPTIONS, type Lead } from "@/admin/types"

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listLeads()
      setLeads(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const query = search.trim().toLowerCase()
      const matchesSearch =
        query === "" ||
        l.name.toLowerCase().includes(query) ||
        (l.profession ?? "").toLowerCase().includes(query)
      const matchesStatus = statusFilter === "All" || l.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [leads, search, statusFilter])

  const newCount = leads.filter((l) => l.status === "New").length
  const activeCount = leads.filter(
    (l) => l.status !== "Converted" && l.status !== "Lost"
  ).length

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return
    await deleteLeadRecord(id)
    load()
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-foreground">Leads</h1>
        <Button asChild>
          <Link to="/admin/leads/new">
            <Plus size={18} aria-hidden="true" />
            Add lead
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-[14px] border border-border bg-surface p-5">
          <p className="text-sm text-muted-foreground">Total leads</p>
          <p className="font-heading mt-1 text-2xl font-bold text-foreground">
            {leads.length}
          </p>
        </div>
        <div className="rounded-[14px] border border-border bg-surface p-5">
          <p className="text-sm text-muted-foreground">New, not yet contacted</p>
          <p className="font-heading mt-1 text-2xl font-bold text-primary">
            {newCount}
          </p>
        </div>
        <div className="rounded-[14px] border border-border bg-surface p-5">
          <p className="text-sm text-muted-foreground">Active in pipeline</p>
          <p className="font-heading mt-1 text-2xl font-bold text-foreground">
            {activeCount}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search by name or profession..."
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
          {LEAD_STATUS_OPTIONS.map((s) => (
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
        <p className="mt-8 text-sm text-muted-foreground">No leads found.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-[14px] border border-border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Profession</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Added</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-foreground">{l.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div>{l.phone || "—"}</div>
                    <div className="text-xs">{l.email || ""}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {l.profession || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {l.source || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-xs text-muted-foreground">
                      {l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(l.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/leads/${l.id}`}
                        aria-label={`Edit ${l.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-[10px] text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        aria-label={`Delete ${l.name}`}
                        onClick={() => handleDelete(l.id, l.name)}
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
