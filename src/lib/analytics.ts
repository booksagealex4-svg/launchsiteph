const CONSENT_KEY = "cookie-consent"

export type ConsentValue = "accepted" | "declined"

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

export function getStoredConsent(): ConsentValue | null {
  const value = window.localStorage.getItem(CONSENT_KEY)
  return value === "accepted" || value === "declined" ? value : null
}

export function storeConsent(value: ConsentValue) {
  window.localStorage.setItem(CONSENT_KEY, value)
}

let analyticsLoaded = false

/**
 * Loads Google Analytics 4 and Microsoft Clarity. Only call this after the
 * visitor has explicitly accepted the cookie consent bar. Both are no-ops
 * if their env vars (VITE_GA_MEASUREMENT_ID / VITE_CLARITY_PROJECT_ID)
 * aren't configured.
 */
export function loadAnalytics() {
  if (analyticsLoaded) return
  analyticsLoaded = true

  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
  const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID as
    | string
    | undefined

  if (gaId) {
    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    const gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args)
    }
    gtag("js", new Date())
    gtag("config", gaId)
  }

  if (clarityId) {
    const script = document.createElement("script")
    script.async = true
    script.innerHTML = `(function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${clarityId}");`
    document.head.appendChild(script)
  }
}
