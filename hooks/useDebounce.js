import { useEffect, useState } from 'react'

/**
 * Debounce a rapidly-changing value.
 *
 * Returns a copy of `value` that only updates after `delay` ms have passed
 * without a new change. Useful for search inputs, resize handlers, etc.
 *
 * @template T
 * @param {T} value - The value to debounce.
 * @param {number} [delay=300] - Delay in milliseconds.
 * @returns {T} The debounced value.
 *
 * @example
 * const debouncedQuery = useDebounce(query, 400)
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
