import { useCallback, useMemo, useState } from 'react'

export interface ToggleControls {
  on: () => void
  off: () => void
  toggle: () => void
  set: (value: boolean) => void
}

/**
 * Manage a boolean toggle with explicit controls.
 *
 * @param initial - The initial value. Defaults to false.
 * @returns A tuple of `[value, controls]`.
 *
 * @example
 * const [isOpen, { on, off, toggle }] = useToggle()
 */
export function useToggle(initial = false): [boolean, ToggleControls] {
  const [value, setValue] = useState(initial)

  const on = useCallback(() => setValue(true), [])
  const off = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((prev) => !prev), [])
  const set = useCallback((next: boolean) => setValue(Boolean(next)), [])

  const controls = useMemo<ToggleControls>(
    () => ({ on, off, toggle, set }),
    [on, off, toggle, set]
  )

  return [value, controls]
}
