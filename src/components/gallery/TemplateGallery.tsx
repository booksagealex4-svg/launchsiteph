import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { galleryTemplates, type Category } from "@/components/gallery/data"
import { FilterBar } from "@/components/gallery/FilterBar"
import { TemplateGalleryCard } from "@/components/gallery/TemplateGalleryCard"

const FADE_MS = 200

function filterTemplates(category: Category) {
  return category === "All"
    ? galleryTemplates
    : galleryTemplates.filter((t) => t.category === category)
}

export function TemplateGallery() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [items, setItems] = useState(() => filterTemplates("All"))
  const [fading, setFading] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setRevealed(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const handleSelect = (category: Category) => {
    if (category === activeCategory || fading) return

    if (prefersReducedMotion) {
      setActiveCategory(category)
      setItems(filterTemplates(category))
      return
    }

    setFading(true)
    setRevealed(false)
    window.setTimeout(() => {
      setActiveCategory(category)
      setItems(filterTemplates(category))
      setFading(false)
      requestAnimationFrame(() => setRevealed(true))
    }, FADE_MS)
  }

  const active = prefersReducedMotion || revealed

  return (
    <div>
      <FilterBar active={activeCategory} onSelect={handleSelect} />

      <div
        className={cn(
          "mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3",
          !prefersReducedMotion && "transition-opacity duration-200",
          fading ? "opacity-0" : "opacity-100"
        )}
      >
        {items.map((template, i) => (
          <div
            key={template.slug}
            className={cn(
              !prefersReducedMotion && "transition-all duration-500 ease-out"
            )}
            style={{
              transitionDelay: active ? `${i * 60}ms` : "0ms",
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <TemplateGalleryCard template={template} />
          </div>
        ))}
      </div>
    </div>
  )
}
