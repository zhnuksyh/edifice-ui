import { useCallback, useMemo, useState } from 'react'

/**
 * Manage a boolean toggle with explicit controls.
 *
 * @param {boolean} [initial=false] - The initial value.
 * @returns {[boolean, { on: () => void, off: () => void, toggle: () => void, set: (value: boolean) => void }]}
 *   A tuple of `[value, controls]`.
 *
 * @example
 * const [isOpen, { on, off, toggle }] = useToggle()
 */
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial)

  const on = useCallback(() => setValue(true), [])
  const off = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((prev) => !prev), [])
  const set = useCallback((next) => setValue(Boolean(next)), [])

  const controls = useMemo(() => ({ on, off, toggle, set }), [on, off, toggle, set])

  return [value, controls]
}
