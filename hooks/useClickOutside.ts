import { useEffect, useRef, type RefObject } from 'react'

/**
 * Fire a callback when a click/touch occurs outside a referenced element.
 *
 * Attach the returned ref to the element you want to protect (e.g. a dropdown
 * or modal panel). Clicks inside it are ignored; clicks anywhere else invoke
 * `handler`.
 *
 * @param handler - Called on an outside click.
 * @param enabled - Toggle the listener on/off. Defaults to true.
 * @returns A ref to attach to the element.
 *
 * @example
 * const ref = useClickOutside<HTMLDivElement>(() => setOpen(false), isOpen)
 * return <div ref={ref}>…</div>
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true
): RefObject<T> {
  const ref = useRef<T>(null) as RefObject<T>

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      if (!el || el.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler, enabled])

  return ref
}
