import { useState } from "react"

import { cn } from "@/lib/utils"

const DEVICES = ["Desktop", "Tablet", "Mobile"] as const
type Device = (typeof DEVICES)[number]

const FRAME_CLASS: Record<Device, string> = {
  Desktop: "aspect-[16/10] w-full",
  Tablet: "aspect-[3/4] w-full max-w-[320px] mx-auto",
  Mobile: "aspect-[9/19] w-full max-w-[220px] mx-auto",
}

export function DevicePreviewSwitcher({
  palette,
}: {
  palette: [string, string, string]
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
            "mx-auto overflow-hidden rounded-[10px] border border-border bg-background transition-[opacity] duration-[250ms] ease-out",
            FRAME_CLASS[device],
            fading ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
          </div>
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(135deg, ${palette[0]}, ${palette[1]})`,
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}
