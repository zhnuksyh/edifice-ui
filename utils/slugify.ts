/**
 * Convert a string into a URL-safe slug.
 *
 * Lowercases, strips accents/diacritics, replaces non-alphanumeric runs with
 * a single hyphen, and trims leading/trailing hyphens.
 *
 * @param input - The string to slugify.
 * @returns The slug, or an empty string for invalid input.
 *
 * @example
 * slugify('Hello, World!')        // → 'hello-world'
 * slugify('  Café au Lait  ')     // → 'cafe-au-lait'
 * slugify('Edifice — UI Library') // → 'edifice-ui-library'
 */
export function slugify(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }

  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric → hyphen
    .replace(/^-+|-+$/g, '') // trim hyphens
}
