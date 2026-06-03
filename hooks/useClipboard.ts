import { useCallback, useRef, useState } from 'react'

export interface ClipboardControls {
  /** Copy the given text; returns true on success. */
  copy: (text: string) => Promise<boolean>
  /** True for `timeout` ms after a successful copy. */
  copied: boolean
}

/**
 * Copy text to the clipboard and track a transient "copied" flag.
 *
 * @param timeout - How long `copied` stays true after a copy, in ms. Defaults to 2000.
 * @returns `{ copy, copied }` — call `copy(text)`, read `copied` for UI feedback.
 *
 * @example
 * const { copy, copied } = useClipboard()
 * <button onClick={() => copy('hello')}>{copied ? 'Copied' : 'Copy'}</button>
 */
export function useClipboard(timeout = 2000): ClipboardControls {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const copy = useCallback(
    async (text: string) => {
      if (typeof navigator === 'undefined' || !navigator.clipboard) return false
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), timeout)
        return true
      } catch {
        return false
      }
    },
    [timeout]
  )

  return { copy, copied }
}
