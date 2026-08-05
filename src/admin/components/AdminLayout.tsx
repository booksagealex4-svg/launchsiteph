import { NavLink, Outlet } from "react-router-dom"
import { LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { Logo } from "@/components/shared/Logo"

const adminNavLinks = [
  { to: "/admin", label: "Clients" },
  { to: "/admin/referrals", label: "Referrals" },
]

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-xs text-muted-foreground">
              Admin
            </span>
          </div>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="flex min-h-12 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <LogOut size={16} aria-hidden="true" />
            Sign out
          </button>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-6 px-5 md:px-8">
          {adminNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/admin"}
              className={({ isActive }) =>
                cn(
                  "flex h-11 items-center border-b-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <Outlet />
      </main>
    </div>
  )
}
