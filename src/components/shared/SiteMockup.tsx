import { Star, User, type LucideIcon } from "lucide-react"

export type MockupVariant = "cards" | "gallery" | "list" | "video"

interface SiteMockupProps {
  background: string
  accent: string
  text: string
  variant: MockupVariant
  icon: LucideIcon
}

function ContentSection({
  variant,
  accent,
  text,
  icon: Icon,
}: {
  variant: MockupVariant
  accent: string
  text: string
  icon: LucideIcon
}) {
  switch (variant) {
    case "cards":
      return (
        <div className="grid h-[36%] grid-cols-3 gap-[4%] px-[6%] pb-[6%]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col justify-center gap-[10%] rounded-[15%] p-[10%]"
              style={{ backgroundColor: `${text}14` }}
            >
              <div
                className="flex aspect-square w-[38%] items-center justify-center rounded-full"
                style={{ backgroundColor: `${accent}33` }}
              >
                <Icon
                  className="h-[55%] w-[55%]"
                  style={{ color: accent }}
                  strokeWidth={1.75}
                />
              </div>
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
        <div className="grid h-[36%] grid-cols-2 gap-[4%] px-[6%] pb-[6%]">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative flex items-center justify-center overflow-hidden rounded-[10%]"
              style={{
                backgroundColor: i === 3 ? `${accent}40` : `${text}1F`,
              }}
            >
              {i === 3 && (
                <Icon
                  className="h-[42%] w-[42%]"
                  style={{ color: accent }}
                  strokeWidth={1.5}
                />
              )}
            </div>
          ))}
        </div>
      )
    case "list":
      return (
        <div className="flex h-[36%] flex-col justify-center gap-[8%] px-[6%] pb-[6%]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-[6%]">
                <div
                  className="flex aspect-square w-[16%] items-center justify-center rounded-full"
                  style={{ backgroundColor: `${accent}33` }}
                >
                  <Icon
                    className="h-[55%] w-[55%]"
                    style={{ color: accent }}
                    strokeWidth={1.75}
                  />
                </div>
                <div
                  className="h-[14%] w-24 rounded-full"
                  style={{ backgroundColor: text, opacity: 0.4 }}
                />
              </div>
              <div
                className="h-[14%] w-[14%] rounded-full"
                style={{ backgroundColor: accent, opacity: 0.6 }}
              />
            </div>
          ))}
        </div>
      )
    case "video":
      return (
        <div className="h-[36%] px-[6%] pb-[6%]">
          <div
            className="relative flex h-full items-center justify-center overflow-hidden rounded-[10%]"
            style={{ backgroundColor: `${accent}26` }}
          >
            <Icon
              className="absolute h-[46%] w-[46%] opacity-25"
              style={{ color: accent }}
              strokeWidth={1.5}
            />
            <div
              className="relative aspect-square w-[14%] rounded-full"
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
  icon: Icon,
}: SiteMockupProps) {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden"
      style={{ backgroundColor: background }}
    >
      <div className="flex h-[12%] items-center justify-between px-[6%]">
        <div
          className="h-[35%] w-[16%] rounded-full"
          style={{ backgroundColor: accent }}
        />
        <div className="hidden gap-[6%] sm:flex">
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

      <div className="flex h-[20%] flex-col justify-center gap-[7%] px-[6%]">
        <div
          className="h-[16%] w-3/5 rounded-full"
          style={{ backgroundColor: text, opacity: 0.8 }}
        />
        <div
          className="h-[9%] w-4/5 rounded-full"
          style={{ backgroundColor: text, opacity: 0.35 }}
        />
        <div
          className="mt-[2%] h-[16%] w-[30%] rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>

      <div className="relative h-[32%] px-[6%] pb-[4%]">
        <div
          className="relative flex h-full items-center justify-center overflow-hidden rounded-[10%]"
          style={{ backgroundColor: `${accent}1A` }}
        >
          <div
            className="absolute -right-[10%] -top-[25%] aspect-square h-[75%] rounded-full"
            style={{ backgroundColor: `${accent}33` }}
          />
          <div
            className="absolute -bottom-[30%] -left-[10%] aspect-square h-[60%] rounded-full"
            style={{ backgroundColor: `${accent}22` }}
          />
          <div
            className="relative flex aspect-square w-[30%] items-center justify-center rounded-full"
            style={{ backgroundColor: accent }}
          >
            <Icon
              className="h-[52%] w-[52%]"
              style={{ color: background }}
              strokeWidth={1.75}
            />
          </div>

          <div
            className="absolute bottom-[8%] left-[6%] flex items-center gap-[5%] rounded-full py-[3%] pl-[3%] pr-[6%]"
            style={{ backgroundColor: background }}
          >
            <div
              className="flex aspect-square w-[14%] items-center justify-center rounded-full"
              style={{ backgroundColor: `${accent}33` }}
            >
              <User
                className="h-[65%] w-[65%]"
                style={{ color: accent }}
                strokeWidth={2}
              />
            </div>
            <div className="flex gap-[2px]">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="h-[9px] w-[9px]"
                  style={{ color: accent }}
                  fill={accent}
                  strokeWidth={0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ContentSection variant={variant} accent={accent} text={text} icon={Icon} />
    </div>
  )
}
