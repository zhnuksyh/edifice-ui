import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useClipboard } from './useClipboard'

describe('useClipboard', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    })
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('starts not-copied', () => {
    const { result } = renderHook(() => useClipboard())
    expect(result.current.copied).toBe(false)
  })

  it('writes text and flips copied to true', async () => {
    const { result } = renderHook(() => useClipboard())
    await act(async () => {
      const ok = await result.current.copy('hello')
      expect(ok).toBe(true)
    })
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello')
    expect(result.current.copied).toBe(true)
  })

  it('resets copied after the timeout', async () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useClipboard(2000))
    await act(async () => {
      await result.current.copy('x')
    })
    expect(result.current.copied).toBe(true)
    act(() => vi.advanceTimersByTime(2000))
    expect(result.current.copied).toBe(false)
  })

  it('returns false when the clipboard API is unavailable', async () => {
    vi.stubGlobal('navigator', {})
    const { result } = renderHook(() => useClipboard())
    await act(async () => {
      const ok = await result.current.copy('x')
      expect(ok).toBe(false)
    })
    expect(result.current.copied).toBe(false)
  })
})
