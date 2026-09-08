import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

/**
 * Admin Portal shell — the site owner's own area, deliberately separate from
 * both the public site chrome and the Client Portal chrome.
 */
export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex flex-col gap-4 p-4 lg:ml-[304px]">
        <Outlet />
      </main>
    </div>
  )
}
