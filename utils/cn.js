import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class names safely.
 *
 * Combines conditional class logic (clsx) with conflict resolution
 * (tailwind-merge) so later utilities win over earlier ones.
 *
 * @param {...(string|Object|Array)} inputs - Class values (strings, arrays, or
 *   condition maps) accepted by clsx.
 * @returns {string} The merged, de-conflicted className string.
 *
 * @example
 * cn('px-2 py-1', isActive && 'bg-primary-600', 'px-4')
 * // → 'py-1 bg-primary-600 px-4'
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
