import { useCallback, useEffect, useState } from 'react'

export type SetValue<T> = (value: T | ((prev: T) => T)) => void

/**
 * Persist state to localStorage with JSON serialization.
 *
 * Behaves like useState but reads the initial value from localStorage (if
 * present) and writes back on every change. Safe in SSR environments — it
 * falls back to `initialValue` when `window` is unavailable.
 *
 * @param key - The localStorage key.
 * @param initialValue - The fallback value when nothing is stored.
 * @returns A tuple of `[value, setValue, remove]`.
 *
 * @example
 * const [theme, setTheme, clearTheme] = useLocalStorage('theme', 'light')
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>, () => void] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState<T>(readValue)

  const setValue = useCallback<SetValue<T>>(
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
