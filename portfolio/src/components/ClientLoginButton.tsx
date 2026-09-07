import { KeyRound } from 'lucide-react'

/**
 * Shared upper-right utility action reused across every main page
 * (Home, Projects, and future Services/Testimonials/About/Contact).
 * Placeholder only — no authentication yet.
 */
export function ClientLoginButton() {
  return (
    <a
      href="#"
      className="group inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#1F6FEB] px-3 py-1.5 text-[0.8rem] font-semibold whitespace-nowrap text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] hover:shadow-[0_6px_14px_rgba(31,111,235,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6FEB]"
    >
      <KeyRound className="h-[14px] w-[14px]" />
      Client Login
    </a>
  )
}
