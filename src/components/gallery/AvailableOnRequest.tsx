import { availableOnRequest } from "@/components/gallery/data"

export function AvailableOnRequest() {
  return (
    <div className="rounded-[14px] border border-border bg-surface p-8 text-center">
      <h2 className="font-heading text-2xl text-foreground">
        Available on request
      </h2>
      <p className="mx-auto mt-2 text-muted-foreground">
        We adapt the closest flagship template to your industry, at no extra
        cost.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {availableOnRequest.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
