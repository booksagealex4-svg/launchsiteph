import { useState, type FormEvent } from "react"
import { Navigate } from "react-router-dom"

import { isSupabaseConfigured, supabase } from "@/lib/supabase"
import { useAuth } from "@/admin/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  const { session } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (session) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)
    if (signInError) setError(signInError.message)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm rounded-[14px] border border-border bg-surface p-8">
        <h1 className="font-heading text-center text-2xl font-bold text-foreground">
          Admin sign in
        </h1>

        {!isSupabaseConfigured && (
          <p className="mt-4 rounded-[10px] border border-destructive/40 bg-destructive/10 p-3 text-xs text-foreground">
            Supabase isn&apos;t configured yet. Add VITE_SUPABASE_URL and
            VITE_SUPABASE_ANON_KEY to .env.local, run supabase/schema.sql in
            your project, then create your login user under
            Authentication &gt; Users.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p role="alert" className="text-xs text-destructive">
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading || !isSupabaseConfigured}
            className="w-full"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  )
}
