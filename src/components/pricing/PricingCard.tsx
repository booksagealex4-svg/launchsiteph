import { Link } from "react-router-dom"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { PackageRecord } from "@/data/packages"

export function PricingCard({ pkg }: { pkg: PackageRecord }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-[14px] border bg-surface p-8",
        pkg.highlighted
          ? "border-primary md:scale-105"
          : "border-border"
      )}
    >
      {pkg.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          Most chosen
        </span>
      )}

      <h3 className="font-heading text-foreground">{pkg.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{pkg.audience}</p>

      <div className="mt-6">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm text-muted-foreground">PHP</span>
          <span className="font-heading text-4xl font-bold text-foreground">
            {pkg.price.toLocaleString()}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">starting</p>
      </div>

      <Button asChild className="mt-6 w-full">
        <Link to={`/contact?package=${encodeURIComponent(pkg.name)}`}>
          Get a Free Quote
        </Link>
      </Button>

      <div className="mt-8 flex-1">
        {pkg.includesNote && (
          <p className="mb-3 text-sm font-medium text-foreground">
            {pkg.includesNote}
          </p>
        )}
        <ul className="flex flex-col gap-3">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check
                className="mt-0.5 shrink-0 text-success"
                size={18}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="text-sm text-muted-foreground">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 space-y-1 border-t border-border pt-6 text-sm text-muted-foreground">
        <p>{pkg.deliveryRange}</p>
        <p>{pkg.revisionRounds} revision rounds</p>
        <p>{pkg.supportNote}</p>
      </div>
    </div>
  )
}
