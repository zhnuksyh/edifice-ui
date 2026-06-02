import { useEffect, useState } from 'react'

/**
 * Debounce a rapidly-changing value.
 *
 * Returns a copy of `value` that only updates after `delay` ms have passed
 * without a new change. Useful for search inputs, resize handlers, etc.
 *
 * @param value - The value to debounce.
 * @param delay - Delay in milliseconds. Defaults to 300.
 * @returns The debounced value.
 *
 * @example
 * const debouncedQuery = useDebounce(query, 400)
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
