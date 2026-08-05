import { Outlet } from "react-router-dom"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ConsultantWidget } from "@/components/consultant/ConsultantWidget"
import { CookieConsent } from "@/components/shared/CookieConsent"

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
      <ConsultantWidget />
      <CookieConsent />
    </div>
  )
}
