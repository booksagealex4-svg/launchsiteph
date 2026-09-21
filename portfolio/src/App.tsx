import { Routes, Route, Outlet } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Sidebar } from '@/components/layout/Sidebar'
import { ScrollToTop } from '@/components/ScrollToTop'
import { PhilippineTime } from '@/components/PhilippineTime'
import { PortalLayout } from '@/components/portal/PortalLayout'
import { HomePage } from '@/pages/HomePage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { TestimonialsPage } from '@/pages/TestimonialsPage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { ClientLoginPage } from '@/pages/ClientLoginPage'
import { PortalOverviewPage } from '@/pages/portal/PortalOverviewPage'
import { PortalProjectPage } from '@/pages/portal/PortalProjectPage'
import { PortalReviewsPage } from '@/pages/portal/PortalReviewsPage'
import { PortalMessagesPage } from '@/pages/portal/PortalMessagesPage'
import { PortalFilesPage } from '@/pages/portal/PortalFilesPage'
import { PortalPaymentsPage } from '@/pages/portal/PortalPaymentsPage'
import { PortalProfilePage } from '@/pages/portal/PortalProfilePage'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminOverviewPage } from '@/pages/admin/AdminOverviewPage'
import { AdminClientsPage } from '@/pages/admin/AdminClientsPage'
import { AdminProjectsPage } from '@/pages/admin/AdminProjectsPage'
import { AdminReviewsPage } from '@/pages/admin/AdminReviewsPage'
import { AdminMessagesPage } from '@/pages/admin/AdminMessagesPage'
import { AdminLeadsPage } from '@/pages/admin/AdminLeadsPage'
import { AdminPaymentsPage } from '@/pages/admin/AdminPaymentsPage'
import { AdminAnalyticsPage } from '@/pages/admin/AdminAnalyticsPage'
import { AdminActivityPage } from '@/pages/admin/AdminActivityPage'
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage'

/**
 * Public-site chrome. The fluid-marble image is applied ONCE here as the
 * shared canvas for the whole public shell — the sidebar and main workspace
 * are translucent surfaces layered on top of this single background, so the
 * image reads as one continuous canvas with no seam at the sidebar boundary.
 */
function PublicLayout() {
  return (
    <div className="min-h-screen bg-[url('/home-fluid-background.avif')] bg-cover bg-center bg-fixed">
      <Sidebar />

      <main className="relative z-0 flex flex-col bg-white/30 p-4 lg:ml-[336px]">
        <Outlet />
      </main>

      <PhilippineTime />
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Analytics />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route path="/client-login" element={<ClientLoginPage />} />

        <Route path="/client-portal" element={<PortalLayout />}>
          <Route index element={<PortalOverviewPage />} />
          <Route path="project" element={<PortalProjectPage />} />
          <Route path="reviews" element={<PortalReviewsPage />} />
          <Route path="messages" element={<PortalMessagesPage />} />
          <Route path="files" element={<PortalFilesPage />} />
          <Route path="payments" element={<PortalPaymentsPage />} />
          <Route path="profile" element={<PortalProfilePage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverviewPage />} />
          <Route path="clients" element={<AdminClientsPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
          <Route path="leads" element={<AdminLeadsPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="activity" element={<AdminActivityPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
