import { createClient } from "@supabase/supabase-js"

const PLACEHOLDER_URL = "https://placeholder.supabase.co"
const PLACEHOLDER_KEY = "placeholder-anon-key"

function clean(value: string | undefined): string {
  if (!value) return ""
  // Trims whitespace/newlines and strips wrapping quotes — both common
  // paste mistakes when copying values into a dashboard's env var field.
  return value.trim().replace(/^['"]|['"]$/g, "")
}

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const rawUrl = clean(import.meta.env.VITE_SUPABASE_URL as string | undefined)
const rawKey = clean(
  import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
)

const looksConfigured = Boolean(
  rawUrl && rawKey && isValidHttpUrl(rawUrl) && rawKey.length > 20
)

function createSafeClient() {
  if (looksConfigured) {
    try {
      return { client: createClient(rawUrl, rawKey), configured: true }
    } catch (error) {
      // A malformed URL/key can make createClient throw. Never let that
      // take down the whole app — fall back to an inert placeholder
      // client instead.
      console.error(
        "Failed to create the Supabase client — check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for stray characters (quotes, trailing spaces/slashes).",
        error
      )
    }
  }
  return {
    client: createClient(PLACEHOLDER_URL, PLACEHOLDER_KEY),
    configured: false,
  }
}

const { client, configured } = createSafeClient()

export const supabase = client
export const isSupabaseConfigured = configured

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase is not configured (or the provided values look invalid). Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable the /admin client tracker."
  )
}
