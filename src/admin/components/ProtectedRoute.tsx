import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "@/admin/context/AuthContext"

export function ProtectedRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Loading...
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
