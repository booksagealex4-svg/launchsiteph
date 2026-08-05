import { useMemo, useState } from "react"

import { Reveal } from "@/components/shared/Reveal"
import { Seo } from "@/components/shared/Seo"
import { articles, type ArticleCategory } from "@/data/articles"
import { CategoryFilterBar } from "@/components/resources/CategoryFilterBar"
import { ArticleCard } from "@/components/resources/ArticleCard"

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("All")

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? articles
        : articles.filter((a) => a.category === activeCategory),
    [activeCategory]
  )

  return (
    <div className="py-14 md:py-20">
      <Seo
        title="Guides for Philippine Businesses Going Online | LaunchSite PH"
        description="Plain-language guides on website costs, SEO basics, Google Business Profile setup and industry-specific checklists for Philippine businesses."
        path="/resources"
      />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h1 className="text-foreground">
            Guides for Philippine businesses going online.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Plain explanations of what a website actually needs, what it
            costs, and what you can skip.
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-10">
          <CategoryFilterBar
            active={activeCategory}
            onSelect={setActiveCategory}
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {filtered.map((article, i) => (
            <Reveal key={article.slug} delay={i}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
