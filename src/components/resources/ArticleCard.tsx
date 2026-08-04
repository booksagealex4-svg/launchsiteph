import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import type { ArticleRecord } from "@/data/articles"

export function ArticleCard({ article }: { article: ArticleRecord }) {
  return (
    <Link
      to={`/resources/${article.slug}`}
      className="group flex h-full flex-col rounded-[14px] border border-border bg-surface p-6 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-glow/30 hover:bg-surface-elevated"
    >
      <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs text-muted-foreground">
        {article.category}
      </span>
      <p className="font-heading mt-4 font-semibold text-foreground">
        {article.title}
      </p>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
        {article.excerpt}
      </p>
      <div className="mt-4 flex flex-1 items-end justify-between gap-4">
        <span className="text-xs text-muted-foreground">
          {article.readTime} read
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Read
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  )
}
