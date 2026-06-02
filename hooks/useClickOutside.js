import { useEffect, useRef } from 'react'

/**
 * Fire a callback when a click/touch occurs outside a referenced element.
 *
 * Attach the returned ref to the element you want to protect (e.g. a dropdown
 * or modal panel). Clicks inside it are ignored; clicks anywhere else invoke
 * `handler`.
 *
 * @template {HTMLElement} T
 * @param {(event: MouseEvent | TouchEvent) => void} handler - Called on an
 *   outside click.
 * @param {boolean} [enabled=true] - Toggle the listener on/off.
 * @returns {import('react').RefObject<T>} A ref to attach to the element.
 *
 * @example
 * const ref = useClickOutside(() => setOpen(false), isOpen)
 * return <div ref={ref}>…</div>
 */
export function useClickOutside(handler, enabled = true) {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const listener = (event) => {
      const el = ref.current
      if (!el || el.contains(event.target)) {
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
