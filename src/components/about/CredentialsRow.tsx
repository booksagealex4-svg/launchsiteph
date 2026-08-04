const credentials = [
  "[DTI/SEC Registration]",
  "[Certification]",
  "[Certification]",
  "[Client Logo]",
  "[Client Logo]",
  "[Client Logo]",
]

export function CredentialsRow() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
      {credentials.map((label, i) => (
        <div
          key={`${label}-${i}`}
          className="flex h-20 items-center justify-center rounded-[14px] border border-dashed border-border bg-surface px-3 text-center text-xs text-muted-foreground"
        >
          {label}
        </div>
      ))}
    </div>
  )
}
