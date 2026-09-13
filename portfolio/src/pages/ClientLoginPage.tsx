import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, UserRound, LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ClientLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10 sm:px-6">
      <div className="w-full max-w-[880px] overflow-hidden rounded-lg border border-[var(--card-border-accent)] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05),0_16px_40px_rgba(15,23,42,0.09)] lg:grid lg:grid-cols-[1fr_1fr]">
        {/* Supporting brand panel — desktop/tablet only */}
        <div className="hidden flex-col justify-center gap-4 bg-[#0f1f3d] px-10 py-12 text-white lg:flex">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
            <UserRound className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-blue-300 uppercase">Private Client Access</p>
            <p className="mt-1 text-2xl font-extrabold">
              Alex <span className="text-slate-400">&middot;</span> Client Portal
            </p>
          </div>
          <p className="max-w-[32ch] text-sm leading-relaxed text-slate-300">
            Sign in to view your project updates, messages, reviews, files, and payments.
          </p>
        </div>

        {/* Login form */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12">
          {/* Compact brand header — mobile only, since the side panel is hidden */}
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400">
              <UserRound className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-[#1F6FEB] uppercase">Private Client Access</p>
              <p className="text-base font-bold text-slate-900">Alex &middot; Client Portal</p>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-[#122c52] sm:text-[1.75rem]">Sign In</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Sign in to view your project updates, messages, reviews, files, and payments.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-slate-300/70 bg-white py-2.5 pr-3.5 pl-11 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-md border border-slate-300/70 bg-white py-2.5 pr-11 pl-11 text-sm text-slate-700 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  className="absolute top-1/2 right-2.5 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#1F6FEB] text-base font-semibold text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <LogIn className="h-[18px] w-[18px]" />
              Sign In
            </button>

            {submitted ? (
              <p
                role="status"
                className={cn(
                  'rounded-md border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm leading-relaxed text-slate-600',
                )}
              >
                Client login will be available once secure account access is connected.
              </p>
            ) : null}
          </form>

          <div className="mt-6 flex flex-col items-center gap-3 border-t border-slate-200/80 pt-5 text-center">
            <a href="#" className="text-sm font-semibold text-[#1F6FEB] hover:underline">
              Forgot your password?
            </a>
            <p className="text-sm text-slate-500">
              Need help signing in?{' '}
              <Link to="/contact?intent=message" className="font-semibold text-[#1F6FEB] hover:underline">
                Contact Me
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
