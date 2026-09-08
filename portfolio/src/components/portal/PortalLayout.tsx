import { Outlet } from 'react-router-dom'
import { PortalSidebar } from '@/components/portal/PortalSidebar'

/**
 * Client Portal shell — deliberately separate from the public site's
 * Sidebar/VisitorCounter chrome. Nested portal routes (My Project, Files,
 * Messages, ...) will render here via <Outlet /> once built.
 */
export function PortalLayout() {
  return (
    <div className="min-h-screen bg-background">
      <PortalSidebar />
      <main className="flex flex-col gap-4 p-4 lg:ml-[304px]">
        <Outlet />
      </main>
    </div>
  )
}
