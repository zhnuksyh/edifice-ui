export type DateFormat =
  | 'short'
  | 'medium'
  | 'long'
  | 'full'
  | 'iso'
  | 'time'
  | 'datetime'

export interface FormatDateOptions {
  /** Output preset. Defaults to 'medium'. */
  format?: DateFormat
  /** BCP 47 locale tag. Defaults to 'en-US'. */
  locale?: string
}

/**
 * Format a Date (or date-like value) into a readable string.
 *
 * Uses the Intl API under the hood for locale-aware output. Supports a set
 * of named presets plus locale override.
 *
 * @param value - A Date, ISO string, or timestamp.
 * @param options - Format preset and locale.
 * @returns The formatted date, or an empty string for invalid input.
 *
 * @example
 * formatDate('2026-06-02')                          // → 'Jun 2, 2026'
 * formatDate(new Date(), { format: 'full' })        // → 'Tuesday, June 2, 2026'
 * formatDate(Date.now(), { format: 'datetime' })    // → 'Jun 2, 2026, 3:30 PM'
 */
export function formatDate(
  value: Date | string | number,
  { format = 'medium', locale = 'en-US' }: FormatDateOptions = {}
): string {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  if (format === 'iso') {
    return date.toISOString()
  }

  const presets: Record<
    Exclude<DateFormat, 'iso'>,
    Intl.DateTimeFormatOptions
  > = {
    short: { year: 'numeric', month: 'numeric', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: 'numeric', minute: '2-digit' },
    datetime: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    },
  }

  const intlOptions = presets[format] ?? presets.medium

  return new Intl.DateTimeFormat(locale, intlOptions).format(date)
}
