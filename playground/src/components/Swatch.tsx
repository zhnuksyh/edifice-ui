interface SwatchProps {
  name: string
  value: string
  /** Optional caption under the value (e.g. usage role). */
  note?: string
}

/** A single color swatch with its name and hex value. */
export function Swatch({ name, value, note }: SwatchProps) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-14 w-full rounded-lg border border-grey-2A"
        style={{ backgroundColor: value }}
      />
      <div className="px-0.5">
        <p className="text-xs font-medium text-grey-F0">{name}</p>
        <p className="font-mono text-[10px] text-grey-88">{value}</p>
        {note && <p className="text-[10px] text-grey-66">{note}</p>}
      </div>
    </div>
  )
}
