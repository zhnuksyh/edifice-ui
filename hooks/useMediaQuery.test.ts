import { describe, it, expect, vi, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useMediaQuery } from './useMediaQuery'

/** Build a controllable matchMedia stub; returns a fire() to emit a change. */
function stubMatchMedia(initialMatches: boolean) {
  let handler: ((e: MediaQueryListEvent) => void) | null = null
  const mql = {
    matches: initialMatches,
    addEventListener: (_: string, h: (e: MediaQueryListEvent) => void) => {
      handler = h
    },
    removeEventListener: () => {
      handler = null
    },
  }
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => mql)
  )
  return {
    fire: (matches: boolean) => {
      mql.matches = matches
      handler?.({ matches } as MediaQueryListEvent)
    },
  }
}

describe('useMediaQuery', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('reflects the initial match state after mount', () => {
    stubMatchMedia(true)
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('updates when the query match changes', () => {
    const { fire } = stubMatchMedia(false)
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
    act(() => fire(true))
    expect(result.current).toBe(true)
  })
})
