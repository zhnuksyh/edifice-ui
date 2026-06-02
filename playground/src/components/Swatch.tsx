interface SwatchProps {
  name: string
  value: string
}

/** A single color swatch with its name and hex/rgb value. */
export function Swatch({ name, value }: SwatchProps) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-14 w-full rounded-lg border border-neutral-200"
        style={{ backgroundColor: value }}
      />
      <div className="px-0.5">
        <p className="text-xs font-medium text-text-primary">{name}</p>
        <p className="font-mono text-[10px] text-text-muted">{value}</p>
      </div>
    </div>
  )
}
