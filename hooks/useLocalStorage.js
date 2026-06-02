import { useCallback, useEffect, useState } from 'react'

/**
 * Persist state to localStorage with JSON serialization.
 *
 * Behaves like useState but reads the initial value from localStorage (if
 * present) and writes back on every change. Safe in SSR environments — it
 * falls back to `initialValue` when `window` is unavailable.
 *
 * @template T
 * @param {string} key - The localStorage key.
 * @param {T} initialValue - The fallback value when nothing is stored.
 * @returns {[T, (value: T | ((prev: T) => T)) => void, () => void]}
 *   A tuple of `[value, setValue, remove]`.
 *
 * @example
 * const [theme, setTheme, clearTheme] = useLocalStorage('theme', 'light')
 */
export function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState(readValue)

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(key, JSON.stringify(next))
          } catch {
            // Storage may be full or unavailable — keep in-memory state only.
          }
        }
        return next
      })
    },
    [key]
  )

  const remove = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(key)
      } catch {
        // Ignore — nothing more we can do if removal fails.
      }
    }
    setStoredValue(initialValue)
  }, [key, initialValue])

  // Keep state in sync if the key changes.
  useEffect(() => {
    setStoredValue(readValue())
  }, [readValue])

  return [storedValue, setValue, remove]
}
