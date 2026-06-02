import { useEffect, useState } from 'react'

/**
 * Track whether a CSS media query currently matches.
 *
 * SSR-safe: returns `false` until mounted in the browser.
 *
 * @param query - A media query string, e.g. '(min-width: 768px)'.
 * @returns Whether the query matches.
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 1024px)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined
    }

    const mql = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)

    setMatches(mql.matches)
    mql.addEventListener('change', handler)

    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
