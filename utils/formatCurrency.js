/**
 * Format a number as a localized currency string.
 *
 * Wraps Intl.NumberFormat with sensible defaults and graceful handling of
 * non-numeric input.
 *
 * @param {number} amount - The numeric amount to format.
 * @param {Object} [options]
 * @param {string} [options.currency='USD'] - ISO 4217 currency code.
 * @param {string} [options.locale='en-US'] - BCP 47 locale tag.
 * @param {number} [options.minimumFractionDigits] - Min decimal places.
 * @param {number} [options.maximumFractionDigits] - Max decimal places.
 * @returns {string} The formatted currency string, or an empty string for
 *   invalid input.
 *
 * @example
 * formatCurrency(1234.5)                                   // → '$1,234.50'
 * formatCurrency(1234.5, { currency: 'EUR', locale: 'de-DE' }) // → '1.234,50 €'
 * formatCurrency(1000, { maximumFractionDigits: 0 })       // → '$1,000'
 */
export function formatCurrency(
  amount,
  {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits,
    maximumFractionDigits,
  } = {}
) {
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
