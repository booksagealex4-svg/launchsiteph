import { slugify } from "@/lib/slugify"
import type { ContentBlock } from "@/data/articles"

export function TableOfContents({ body }: { body: ContentBlock[] }) {
  const headings = body.filter(
    (block): block is Extract<ContentBlock, { type: "heading" }> =>
      block.type === "heading"
  )

  if (headings.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 hidden lg:block"
    >
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        On this page
      </p>
      <ul className="mt-4 flex flex-col gap-2 border-l border-border pl-4">
        {headings.map((heading) => (
          <li key={heading.text}>
            <a
              href={`#${slugify(heading.text)}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
