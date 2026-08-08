import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import { Layout } from "@/components/layout/Layout"
import { ScrollToTop } from "@/components/shared/ScrollToTop"
import Home from "@/pages/Home"
import Templates from "@/pages/Templates"
import TemplateDetail from "@/pages/TemplateDetail"
import Pricing from "@/pages/Pricing"
import Process from "@/pages/Process"
import Resources from "@/pages/Resources"
import ArticleDetail from "@/pages/ArticleDetail"
import About from "@/pages/About"
import Contact from "@/pages/Contact"

// Lazy-loaded: pulls in the Supabase client, kept out of the main bundle
// so public visitors who never submit a referral don't pay for it.
const Referral = lazy(() => import("@/pages/Referral"))

// Lazy-loaded: low-traffic pages, kept out of the main bundle.
const Privacy = lazy(() => import("@/pages/Privacy"))
const Terms = lazy(() => import("@/pages/Terms"))
const RefundPolicy = lazy(() => import("@/pages/RefundPolicy"))

const AdminRoot = lazy(() =>
  import("@/admin/AdminRoot").then((m) => ({ default: m.AdminRoot }))
)
const ProtectedRoute = lazy(() =>
  import("@/admin/components/ProtectedRoute").then((m) => ({
    default: m.ProtectedRoute,
  }))
)
const AdminLayout = lazy(() =>
  import("@/admin/components/AdminLayout").then((m) => ({
    default: m.AdminLayout,
  }))
)
const AdminLogin = lazy(() => import("@/admin/pages/Login"))
const AdminDashboard = lazy(() => import("@/admin/pages/Dashboard"))
const AdminClientForm = lazy(() => import("@/admin/pages/ClientForm"))
const AdminLeads = lazy(() => import("@/admin/pages/Leads"))
const AdminLeadForm = lazy(() => import("@/admin/pages/LeadForm"))
const AdminReferrals = lazy(() => import("@/admin/pages/Referrals"))

function App() {
  return (
    <Suspense fallback={null}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:slug" element={<TemplateDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/process" element={<Process />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<ArticleDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Route>

        <Route element={<AdminRoot />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/clients/new" element={<AdminClientForm />} />
              <Route path="/admin/clients/:id" element={<AdminClientForm />} />
              <Route path="/admin/leads" element={<AdminLeads />} />
              <Route path="/admin/leads/new" element={<AdminLeadForm />} />
              <Route path="/admin/leads/:id" element={<AdminLeadForm />} />
              <Route path="/admin/referrals" element={<AdminReferrals />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
