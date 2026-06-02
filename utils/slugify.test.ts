import { describe, it, expect } from 'vitest'
import { slugify } from './slugify'

describe('slugify', () => {
  it('lowercases and hyphenates words', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('strips punctuation', () => {
    expect(slugify('Hello, World!')).toBe('hello-world')
  })

  it('removes diacritics', () => {
    expect(slugify('Café au Lait')).toBe('cafe-au-lait')
  })

  it('collapses runs of non-alphanumeric characters into a single hyphen', () => {
    expect(slugify('Edifice — UI   Library')).toBe('edifice-ui-library')
  })

  it('trims leading and trailing whitespace and hyphens', () => {
    expect(slugify('  Spaced Out  ')).toBe('spaced-out')
    expect(slugify('---edge---')).toBe('edge')
  })

  it('keeps digits', () => {
    expect(slugify('Top 10 Picks')).toBe('top-10-picks')
  })

  it('returns an empty string for an all-symbol input', () => {
    expect(slugify('!!!')).toBe('')
  })

  it('returns an empty string for an empty input', () => {
    expect(slugify('')).toBe('')
  })

  it('returns an empty string for non-string input', () => {
    // @ts-expect-error testing runtime guard against invalid input
    expect(slugify(null)).toBe('')
    // @ts-expect-error testing runtime guard against invalid input
    expect(slugify(42)).toBe('')
  })
})
