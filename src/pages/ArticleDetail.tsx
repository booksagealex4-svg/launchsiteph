import { Link, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import { ArticleCard } from "@/components/resources/ArticleCard"
import { ArticleBody } from "@/components/resources/ArticleBody"
import { TableOfContents } from "@/components/resources/TableOfContents"
import { articles, getArticleBySlug } from "@/data/articles"

function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 text-center md:px-8">
      <h1 className="text-foreground">Article not found</h1>
      <p className="mx-auto mt-4 text-muted-foreground">
        We couldn&apos;t find that article. It may have been renamed or
        retired.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link to="/resources">Back to resources</Link>
        </Button>
      </div>
    </div>
  )
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return <NotFound />
  }

  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3)

  return (
    <div className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/resources" className="hover:text-foreground">
                Resources
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {article.title}
            </li>
          </ol>
        </nav>

        <Reveal className="mt-6 max-w-[68ch]">
          <span className="inline-flex items-center rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs text-muted-foreground">
            {article.category}
          </span>
          <h1 className="mt-4 text-foreground">{article.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {article.readTime} read &middot; {article.publishDate}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px]">
          <Reveal delay={1}>
            <ArticleBody body={article.body} />
          </Reveal>

          <TableOfContents body={article.body} />
        </div>

        <Reveal className="mt-16 max-w-[68ch]">
          <div className="rounded-[14px] border border-border bg-surface p-8 text-center">
            <h3 className="text-foreground">
              Want this handled for you? Get a free quote.
            </h3>
            <div className="mt-6">
              <Button asChild>
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {related.length > 0 && (
          <Reveal className="mt-16">
            <h2 className="text-foreground">Related guides</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  )
}
