/**
 * Format a Date (or date-like value) into a readable string.
 *
 * Uses the Intl API under the hood for locale-aware output. Supports a set
 * of named presets plus locale override.
 *
 * @param {Date|string|number} value - A Date, ISO string, or timestamp.
 * @param {Object} [options]
 * @param {('short'|'medium'|'long'|'full'|'iso'|'time'|'datetime')} [options.format='medium']
 *   Output preset.
 * @param {string} [options.locale='en-US'] - BCP 47 locale tag.
 * @returns {string} The formatted date, or an empty string for invalid input.
 *
 * @example
 * formatDate('2026-06-02')                          // → 'Jun 2, 2026'
 * formatDate(new Date(), { format: 'full' })        // → 'Tuesday, June 2, 2026'
 * formatDate(Date.now(), { format: 'datetime' })    // → 'Jun 2, 2026, 3:30 PM'
 */
export function formatDate(value, { format = 'medium', locale = 'en-US' } = {}) {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  if (format === 'iso') {
    return date.toISOString()
  }

  const presets = {
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
