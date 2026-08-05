export type MockupVariant = "cards" | "gallery" | "list" | "video"

interface SiteMockupProps {
  background: string
  accent: string
  text: string
  variant: MockupVariant
}

function ContentSection({
  variant,
  accent,
  text,
}: {
  variant: MockupVariant
  accent: string
  text: string
}) {
  switch (variant) {
    case "cards":
      return (
        <div className="grid h-[38%] grid-cols-3 gap-[4%] px-[6%] pb-[6%]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col justify-center gap-[10%] rounded-[15%] p-[10%]"
              style={{ backgroundColor: `${text}14` }}
            >
              <div
                className="aspect-square w-[35%] rounded-full"
                style={{ backgroundColor: `${accent}40` }}
              />
              <div
                className="h-[10%] w-full rounded-full"
                style={{ backgroundColor: text, opacity: 0.45 }}
              />
              <div
                className="h-[10%] w-2/3 rounded-full"
                style={{ backgroundColor: text, opacity: 0.3 }}
              />
            </div>
          ))}
        </div>
      )
    case "gallery":
      return (
        <div className="grid h-[38%] grid-cols-2 gap-[4%] px-[6%] pb-[6%]">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-[10%]"
              style={{
                backgroundColor: i === 3 ? `${accent}55` : `${text}1F`,
              }}
            />
          ))}
        </div>
      )
    case "list":
      return (
        <div className="flex h-[38%] flex-col justify-center gap-[8%] px-[6%] pb-[6%]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div
                className="h-[14%] w-3/5 rounded-full"
                style={{ backgroundColor: text, opacity: 0.4 }}
              />
              <div
                className="h-[14%] w-1/6 rounded-full"
                style={{ backgroundColor: accent, opacity: 0.6 }}
              />
            </div>
          ))}
        </div>
      )
    case "video":
      return (
        <div className="h-[38%] px-[6%] pb-[6%]">
          <div
            className="flex h-full items-center justify-center rounded-[10%]"
            style={{ backgroundColor: `${accent}26` }}
          >
            <div
              className="aspect-square w-[14%] rounded-full"
              style={{ backgroundColor: accent }}
            />
          </div>
        </div>
      )
    default:
      return null
  }
}

export function SiteMockup({
  background,
  accent,
  text,
  variant,
}: SiteMockupProps) {
  return (
    <div
      className="flex h-full w-full flex-col"
      style={{ backgroundColor: background }}
    >
      <div className="flex h-[14%] items-center justify-between px-[6%]">
        <div
          className="h-[35%] w-[16%] rounded-full"
          style={{ backgroundColor: accent }}
        />
        <div className="flex gap-[6%]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-[14%] w-[10%] rounded-full"
              style={{ backgroundColor: text, opacity: 0.3 }}
            />
          ))}
        </div>
        <div
          className="h-[45%] w-[18%] rounded-full"
          style={{ backgroundColor: accent, opacity: 0.85 }}
        />
      </div>

      <div className="flex h-[48%] flex-col justify-center gap-[6%] px-[6%]">
        <div
          className="h-[11%] w-3/5 rounded-full"
          style={{ backgroundColor: text, opacity: 0.75 }}
        />
        <div
          className="h-[11%] w-2/5 rounded-full"
          style={{ backgroundColor: text, opacity: 0.75 }}
        />
        <div
          className="h-[6%] w-4/5 rounded-full"
          style={{ backgroundColor: text, opacity: 0.35 }}
        />
        <div
          className="mt-[4%] h-[13%] w-[30%] rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>

      <ContentSection variant={variant} accent={accent} text={text} />
    </div>
  )
}
