export interface FormatCurrencyOptions {
  /** ISO 4217 currency code. Defaults to 'USD'. */
  currency?: string
  /** BCP 47 locale tag. Defaults to 'en-US'. */
  locale?: string
  /** Minimum decimal places. */
  minimumFractionDigits?: number
  /** Maximum decimal places. */
  maximumFractionDigits?: number
}

/**
 * Format a number as a localized currency string.
 *
 * Wraps Intl.NumberFormat with sensible defaults and graceful handling of
 * non-numeric input.
 *
 * @param amount - The numeric amount to format.
 * @param options - Currency, locale, and fraction-digit overrides.
 * @returns The formatted currency string, or an empty string for invalid input.
 *
 * @example
 * formatCurrency(1234.5)                                   // → '$1,234.50'
 * formatCurrency(1234.5, { currency: 'EUR', locale: 'de-DE' }) // → '1.234,50 €'
 * formatCurrency(1000, { maximumFractionDigits: 0 })       // → '$1,000'
 */
export function formatCurrency(
  amount: number,
  {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits,
    maximumFractionDigits,
  }: FormatCurrencyOptions = {}
): string {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    return ''
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)
}
