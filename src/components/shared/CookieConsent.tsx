import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { getStoredConsent, loadAnalytics, storeConsent } from "@/lib/analytics"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    if (stored === "accepted") {
      loadAnalytics()
    } else if (stored === null) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    storeConsent("accepted")
    loadAnalytics()
    setVisible(false)
  }

  const handleDecline = () => {
    storeConsent("declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-4 sm:flex-row sm:justify-between md:px-8">
        <p className="text-sm text-muted-foreground">
          We use cookies to understand how visitors use this site. No
          tracking scripts run until you accept.
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="secondary" onClick={handleDecline}>
            Decline
          </Button>
          <Button onClick={handleAccept}>Accept</Button>
        </div>
      </div>
    </div>
  )
}
