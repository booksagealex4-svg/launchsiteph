import { type ReactNode } from "react"
import { Link } from "react-router-dom"

import { slugify } from "@/lib/slugify"
import type { ContentBlock } from "@/data/articles"

const LINK_PATTERN = /(\[[^\]]+\]\([^)]+\))/g
const LINK_MATCH = /^\[([^\]]+)\]\(([^)]+)\)$/

function renderInline(text: string): ReactNode[] {
  return text.split(LINK_PATTERN).map((part, i) => {
    const match = part.match(LINK_MATCH)
    if (!match) return part

    const [, label, href] = match
    const linkClassName =
      "text-primary underline underline-offset-2 hover:text-primary-hover"

    return href.startsWith("/") ? (
      <Link key={i} to={href} className={linkClassName}>
        {label}
      </Link>
    ) : (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={linkClassName}
      >
        {label}
      </a>
    )
  })
}

export function ArticleBody({ body }: { body: ContentBlock[] }) {
  return (
    <div className="max-w-[68ch]">
      {body.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                id={slugify(block.text)}
                className="mt-10 text-foreground first:mt-0"
              >
                {block.text}
              </h2>
            )
          case "paragraph":
            return (
              <p key={i} className="mt-4 text-muted-foreground">
                {renderInline(block.text)}
              </p>
            )
          case "list":
            return (
              <ul key={i} className="mt-4 flex flex-col gap-2">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-muted-foreground"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            )
          case "blockquote":
            return (
              <blockquote
                key={i}
                className="mt-6 border-l-2 border-primary pl-4 text-foreground"
              >
                {renderInline(block.text)}
              </blockquote>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
