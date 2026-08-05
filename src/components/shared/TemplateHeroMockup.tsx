import type { TemplatePreviewContent } from "@/lib/template-preview-content"

export function TemplateHeroMockup({
  name,
  content,
}: {
  name: string
  content: TemplatePreviewContent
}) {
  const {
    bg,
    text,
    accent,
    icon: Icon,
    heroImage,
    badge,
    headline,
    subtext,
    primaryCta,
    secondaryCta,
    pages,
  } = content

  return (
    <div
      className="@container flex h-full w-full flex-col overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      <div className="flex h-[11%] items-center justify-between px-[4%]">
        <div className="flex items-center gap-[3%]">
          <div
            className="flex aspect-square w-[7%] items-center justify-center rounded-full"
            style={{ backgroundColor: accent }}
          >
            <Icon className="h-[60%] w-[60%]" style={{ color: bg }} strokeWidth={2} />
          </div>
          <span
            className="text-[3.2cqw] leading-none font-semibold"
            style={{ color: text }}
          >
            {name}
          </span>
        </div>
        <div
          className="rounded-full px-[4%] py-[2%] text-[2.2cqw] leading-none font-medium"
          style={{ backgroundColor: accent, color: bg }}
        >
          {primaryCta}
        </div>
      </div>

      <div className="flex h-[54%] items-center gap-[3%] px-[4%]">
        <div className="flex w-[52%] flex-col gap-[6%]">
          <span
            className="w-fit rounded-full px-[8%] py-[3%] text-[1.9cqw] font-semibold tracking-wide uppercase"
            style={{ backgroundColor: `${accent}22`, color: accent }}
          >
            {badge}
          </span>
          <p
            className="text-[4.2cqw] leading-[1.15] font-bold"
            style={{ color: text }}
          >
            {headline[0]}
            <br />
            <span style={{ color: accent }}>{headline[1]}</span>
          </p>
          <p
            className="text-[2.2cqw] leading-snug opacity-70"
            style={{ color: text }}
          >
            {subtext}
          </p>
          <div className="flex gap-[6%]">
            <div
              className="rounded-full px-[7%] py-[3.5%] text-[2cqw] font-medium"
              style={{ backgroundColor: accent, color: bg }}
            >
              {primaryCta}
            </div>
            <div
              className="rounded-full border px-[7%] py-[3.5%] text-[2cqw] font-medium"
              style={{ borderColor: `${text}33`, color: text }}
            >
              {secondaryCta}
            </div>
          </div>
        </div>
        <div className="h-full w-[48%] overflow-hidden rounded-[8%]">
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            width={700}
            height={616}
          />
        </div>
      </div>

      <div className="grid h-[35%] grid-cols-5 gap-[2%] px-[4%] pb-[4%]">
        {pages.map((label, i) => (
          <div
            key={label}
            className="flex flex-col justify-between rounded-[10%] p-[8%]"
            style={{ backgroundColor: i === 0 ? `${accent}18` : `${text}0D` }}
          >
            <span
              className="text-[2.4cqw] font-bold"
              style={{ color: text, opacity: 0.5 }}
            >
              0{i + 1}
            </span>
            <span
              className="text-[2cqw] leading-tight font-medium"
              style={{ color: text }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
