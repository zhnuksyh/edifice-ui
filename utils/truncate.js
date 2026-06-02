/**
 * Truncate a string to a maximum length, appending an ellipsis.
 *
 * The returned string (including the ellipsis) never exceeds `length`.
 * If the input already fits, it is returned unchanged.
 *
 * @param {string} input - The string to truncate.
 * @param {number} length - Maximum length of the result, including ellipsis.
 * @param {string} [ellipsis='…'] - Suffix appended when truncation occurs.
 * @returns {string} The truncated string, or an empty string for invalid input.
 *
 * @example
 * truncate('The quick brown fox', 9)  // → 'The quic…'
 * truncate('Short', 20)               // → 'Short'
 * truncate('Loading data', 8, '...')  // → 'Load...'
 */
export function truncate(input, length, ellipsis = '…') {
  if (typeof input !== 'string') {
    return ''
  }

  if (input.length <= length) {
    return input
  }

  const sliceEnd = Math.max(0, length - ellipsis.length)

  return input.slice(0, sliceEnd).trimEnd() + ellipsis
}
