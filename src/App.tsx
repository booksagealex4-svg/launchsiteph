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
import Referral from "@/pages/Referral"

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
        </Route>

        <Route element={<AdminRoot />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/clients/new" element={<AdminClientForm />} />
              <Route path="/admin/clients/:id" element={<AdminClientForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
