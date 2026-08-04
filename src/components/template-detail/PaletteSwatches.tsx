export function PaletteSwatches({
  palette,
}: {
  palette: [string, string, string]
}) {
  return (
    <div className="flex items-center gap-3">
      {palette.map((hex) => (
        <span
          key={hex}
          title={hex}
          className="h-10 w-10 rounded-full border border-border transition-transform duration-200 ease-out hover:scale-110"
          style={{ backgroundColor: hex }}
        />
      ))}
    </div>
  )
}
