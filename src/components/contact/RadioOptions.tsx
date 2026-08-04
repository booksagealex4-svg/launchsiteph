import { cn } from "@/lib/utils"

interface RadioOptionsProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: readonly string[]
}

export function RadioOptions({
  name,
  value,
  onChange,
  options,
}: RadioOptionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const id = `${name}-${option}`
        const checked = value === option
        return (
          <label
            key={option}
            htmlFor={id}
            className={cn(
              "flex min-h-12 cursor-pointer items-center gap-2 rounded-[10px] border px-4 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-glow has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
              checked
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border text-muted-foreground hover:bg-surface-elevated"
            )}
          >
            <input
              type="radio"
              id={id}
              name={name}
              value={option}
              checked={checked}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        )
      })}
    </div>
  )
}
