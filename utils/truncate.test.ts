import { describe, it, expect } from 'vitest'
import { truncate } from './truncate'

describe('truncate', () => {
  it('leaves a string shorter than the limit unchanged', () => {
    expect(truncate('Short', 20)).toBe('Short')
  })

  it('leaves a string exactly at the limit unchanged', () => {
    expect(truncate('12345', 5)).toBe('12345')
  })

  it('truncates and appends the default ellipsis', () => {
    expect(truncate('The quick brown fox', 9)).toBe('The quic…')
  })

  it('keeps the result within the limit including the ellipsis', () => {
    const result = truncate('The quick brown fox', 9)
    expect(result.length).toBeLessThanOrEqual(9)
  })

  it('supports a custom ellipsis and respects the limit', () => {
    // length 8 − ellipsis 3 = slice to 5 chars ('Loadi') + '...'.
    expect(truncate('Loading data', 8, '...')).toBe('Loadi...')
    expect(truncate('Loading data', 8, '...').length).toBeLessThanOrEqual(8)
  })

  it('trims trailing whitespace before the ellipsis', () => {
    // Slicing 'Hello world' to 6 chars yields 'Hello ' → trimmed to 'Hello'.
    expect(truncate('Hello world', 6)).toBe('Hello…')
  })

  it('handles an ellipsis longer than the limit without going negative', () => {
    const result = truncate('abcdef', 2, '...')
    expect(result).toBe('...')
    expect(result.length).toBeLessThanOrEqual('...'.length)
  })

  it('returns an empty string for non-string input', () => {
    // @ts-expect-error testing runtime guard against invalid input
    expect(truncate(null, 5)).toBe('')
    // @ts-expect-error testing runtime guard against invalid input
    expect(truncate(123456, 3)).toBe('')
  })
})
