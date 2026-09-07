import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets window scroll to the top whenever the route's pathname changes, so a
 * page never opens at the previous page's scroll depth. Watches only
 * `pathname` (not the full location) so query-string-only changes, like
 * swapping `?intent=` on the same route, do not trigger a reset.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    // Let this component own scroll position instead of the browser's native
    // history-based restoration, which can otherwise fight our own reset.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname
    // `html` carries a global `scroll-smooth` class, and the spec's "auto" behavior
    // defers to that CSS scroll-behavior, so an "auto" scrollTo here would animate
    // instead of jumping. "instant" forces an immediate jump regardless of CSS.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // The new page's first paint can still shift layout a frame later (e.g. an
    // async icon or font swap); reapply once after paint so that shift can't
    // leave the page part-way down.
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    })
    return () => window.cancelAnimationFrame(id)
  }, [pathname])

  return null
}
