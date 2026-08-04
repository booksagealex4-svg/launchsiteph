import type { SVGProps } from "react"

export function ViberIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3c-5 0-9 3.4-9 7.6 0 2.7 1.7 5.1 4.3 6.5-.1.9-.5 2.3-1.3 3.4 1.6-.2 3.2-.9 4.4-1.7.5.1 1.1.2 1.6.2 5 0 9-3.4 9-7.6S17 3 12 3Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" />
      <path d="M14.5 15c-.3-1-.8-1.8-1.5-2.2" />
    </svg>
  )
}
