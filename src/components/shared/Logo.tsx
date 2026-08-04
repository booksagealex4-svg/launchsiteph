import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-heading inline-flex items-center gap-2 text-lg font-bold text-foreground",
        className
      )}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect width="24" height="24" rx="6" className="fill-primary/15" />
        <path
          d="M7 17V7h3.5a3.5 3.5 0 1 1 0 7H7m10-7v10"
          className="stroke-primary"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      LaunchSite PH
    </span>
  )
}
