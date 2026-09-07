/**
 * Data contract for the floating visitor counter. Kept independent of any
 * specific analytics provider — swap the body of `useVisitorStats` for a real
 * fetch/subscription once a backend is chosen, without touching the UI.
 */
export interface VisitorStats {
  totalVisits: number | null
  todayVisits: number | null
  weekVisits: number | null
  isLoading: boolean
  error: string | null
}

/**
 * No analytics provider is wired up yet. This intentionally returns "no data"
 * rather than a fabricated count — the UI renders "—" for any null field.
 * Replace this implementation with a real data source when one exists.
 */
export function useVisitorStats(): VisitorStats {
  return {
    totalVisits: null,
    todayVisits: null,
    weekVisits: null,
    isLoading: false,
    error: null,
  }
}
