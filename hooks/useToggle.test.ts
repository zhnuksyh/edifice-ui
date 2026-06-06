import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useToggle } from './useToggle'

describe('useToggle', () => {
  it('defaults to false', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current[0]).toBe(false)
  })

  it('honors the initial value', () => {
    const { result } = renderHook(() => useToggle(true))
    expect(result.current[0]).toBe(true)
  })

  it('toggle flips the value', () => {
    const { result } = renderHook(() => useToggle())
    act(() => result.current[1].toggle())
    expect(result.current[0]).toBe(true)
    act(() => result.current[1].toggle())
    expect(result.current[0]).toBe(false)
  })

  it('on/off set explicit values', () => {
    const { result } = renderHook(() => useToggle())
    act(() => result.current[1].on())
    expect(result.current[0]).toBe(true)
    act(() => result.current[1].off())
    expect(result.current[0]).toBe(false)
  })

  it('set assigns a boolean', () => {
    const { result } = renderHook(() => useToggle())
    act(() => result.current[1].set(true))
    expect(result.current[0]).toBe(true)
  })

  it('keeps stable control identities across renders', () => {
    const { result, rerender } = renderHook(() => useToggle())
    const first = result.current[1]
    rerender()
    expect(result.current[1]).toBe(first)
  })
})
