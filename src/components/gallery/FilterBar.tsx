import { cn } from "@/lib/utils"
import { categories, type Category } from "@/components/gallery/data"

interface FilterBarProps {
  active: Category
  onSelect: (category: Category) => void
}

export function FilterBar({ active, onSelect }: FilterBarProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={active === category}
          onClick={() => onSelect(category)}
          className={cn(
            "inline-flex h-12 items-center rounded-full border px-5 text-sm font-medium transition-colors duration-200",
            active === category
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-transparent text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
