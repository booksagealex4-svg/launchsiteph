import { useState } from "react"

import { cn } from "@/lib/utils"
import { getReadableTextColor, templateMockupVariants } from "@/lib/mockup"
import { SiteMockup } from "@/components/shared/SiteMockup"

const DEVICES = ["Desktop", "Tablet", "Mobile"] as const
type Device = (typeof DEVICES)[number]

const FRAME_CLASS: Record<Device, string> = {
  Desktop: "aspect-[16/10] w-full",
  Tablet: "aspect-[3/4] w-full max-w-[320px] mx-auto",
  Mobile: "aspect-[9/19] w-full max-w-[220px] mx-auto",
}

export function DevicePreviewSwitcher({
  palette,
  slug,
}: {
  palette: [string, string, string]
  slug: string
}) {
  const [device, setDevice] = useState<Device>("Desktop")
  const [fading, setFading] = useState(false)

  const selectDevice = (next: Device) => {
    if (next === device) return
    setFading(true)
    window.setTimeout(() => {
      setDevice(next)
      setFading(false)
    }, 125)
  }

  return (
    <div>
      <div className="mb-6 flex justify-center gap-2">
        {DEVICES.map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={device === d}
            onClick={() => selectDevice(d)}
            className={cn(
              "inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-200",
              device === d
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-transparent text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="rounded-[14px] border border-border bg-surface p-2">
        <div
          className={cn(
            "mx-auto flex flex-col overflow-hidden rounded-[10px] border border-border bg-background transition-[opacity] duration-[250ms] ease-out",
            FRAME_CLASS[device],
            fading ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="flex shrink-0 items-center gap-1.5 border-b border-border px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="min-h-0 flex-1">
            <SiteMockup
              background={palette[0]}
              accent={palette[1]}
              text={getReadableTextColor(palette[0])}
              variant={templateMockupVariants[slug] ?? "cards"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
