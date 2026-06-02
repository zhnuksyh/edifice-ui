import { describe, it, expect } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formats USD with the default locale', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
  })

  it('respects a different currency and locale', () => {
    // de-DE uses '.' for thousands, ',' for decimals, and a trailing € sign.
    const result = formatCurrency(1234.5, { currency: 'EUR', locale: 'de-DE' })
    expect(result).toContain('1.234,50')
    expect(result).toContain('€')
  })

  it('honors maximumFractionDigits', () => {
    expect(formatCurrency(1000, { maximumFractionDigits: 0 })).toBe('$1,000')
  })

  it('honors minimumFractionDigits', () => {
    expect(formatCurrency(5, { minimumFractionDigits: 3 })).toBe('$5.000')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats negative amounts', () => {
    expect(formatCurrency(-42)).toBe('-$42.00')
  })

  it('returns an empty string for NaN', () => {
    expect(formatCurrency(Number.NaN)).toBe('')
  })

  it('returns an empty string for non-number input', () => {
    // @ts-expect-error testing runtime guard against invalid input
    expect(formatCurrency('100')).toBe('')
    // @ts-expect-error testing runtime guard against invalid input
    expect(formatCurrency(undefined)).toBe('')
  })
})
