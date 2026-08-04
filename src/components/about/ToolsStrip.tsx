const tools = [
  "React",
  "Next.js",
  "Supabase",
  "Vercel",
  "Figma",
  "Claude",
  "GitHub",
  "Google Analytics",
]

export function ToolsStrip() {
  return (
    <div className="text-center">
      <h2 className="text-foreground">The tools behind the work.</h2>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {tools.map((tool) => (
          <span
            key={tool}
            className="rounded-[14px] border border-border bg-surface px-4 py-2 text-sm text-muted-foreground"
          >
            {tool}
          </span>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        The tools change. The standard does not.
      </p>
    </div>
  )
}
