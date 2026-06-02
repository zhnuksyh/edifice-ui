import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

// Noon UTC so the calendar date is identical across virtually all time zones,
// keeping the date-only assertions stable regardless of the runner's TZ.
const NOON_UTC = new Date('2026-06-02T12:00:00Z')

describe('formatDate', () => {
  it('uses the medium preset by default', () => {
    expect(formatDate(NOON_UTC)).toBe('Jun 2, 2026')
  })

  it('accepts an ISO string', () => {
    expect(formatDate('2026-06-02T12:00:00Z')).toBe('Jun 2, 2026')
  })

  it('accepts a timestamp', () => {
    expect(formatDate(NOON_UTC.getTime())).toBe('Jun 2, 2026')
  })

  it('formats the short preset', () => {
    expect(formatDate(NOON_UTC, { format: 'short' })).toBe('6/2/2026')
  })

  it('formats the long preset', () => {
    expect(formatDate(NOON_UTC, { format: 'long' })).toBe('June 2, 2026')
  })

  it('formats the full preset with weekday', () => {
    expect(formatDate(NOON_UTC, { format: 'full' })).toBe('Tuesday, June 2, 2026')
  })

  it('returns a true ISO string for the iso preset', () => {
    expect(formatDate(NOON_UTC, { format: 'iso' })).toBe('2026-06-02T12:00:00.000Z')
  })

  it('respects a different locale', () => {
    // en-GB renders day before month.
    expect(formatDate(NOON_UTC, { format: 'long', locale: 'en-GB' })).toBe(
      '2 June 2026'
    )
  })

  it('produces a time string containing a clock value', () => {
    const result = formatDate(NOON_UTC, { format: 'time' })
    expect(result).toMatch(/\d{1,2}:\d{2}/)
  })

  it('produces a datetime string containing the date and a clock value', () => {
    const result = formatDate(NOON_UTC, { format: 'datetime' })
    expect(result).toContain('Jun 2, 2026')
    expect(result).toMatch(/\d{1,2}:\d{2}/)
  })

  it('returns an empty string for an invalid date', () => {
    expect(formatDate('not a date')).toBe('')
    expect(formatDate(new Date('invalid'))).toBe('')
  })
})
