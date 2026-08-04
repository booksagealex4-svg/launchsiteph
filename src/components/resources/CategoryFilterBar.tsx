import { cn } from "@/lib/utils"
import { articleCategories, type ArticleCategory } from "@/data/articles"

interface CategoryFilterBarProps {
  active: ArticleCategory
  onSelect: (category: ArticleCategory) => void
}

export function CategoryFilterBar({
  active,
  onSelect,
}: CategoryFilterBarProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {articleCategories.map((category) => (
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
