import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => window.localStorage.clear())

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('k', 'fallback'))
    expect(result.current[0]).toBe('fallback')
  })

  it('reads an existing stored value', () => {
    window.localStorage.setItem('k', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('k', 'fallback'))
    expect(result.current[0]).toBe('stored')
  })

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('k', 0))
    act(() => result.current[1](42))
    expect(result.current[0]).toBe(42)
    expect(window.localStorage.getItem('k')).toBe('42')
  })

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('k', 1))
    act(() => result.current[1]((prev) => prev + 1))
    expect(result.current[0]).toBe(2)
  })

  it('remove clears storage and resets to initial', () => {
    const { result } = renderHook(() => useLocalStorage('k', 'init'))
    act(() => result.current[1]('changed'))
    act(() => result.current[2]())
    expect(result.current[0]).toBe('init')
    expect(window.localStorage.getItem('k')).toBeNull()
  })
})
