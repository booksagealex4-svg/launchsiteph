import { Outlet } from "react-router-dom"

import { AuthProvider } from "@/admin/context/AuthContext"

export function AdminRoot() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
