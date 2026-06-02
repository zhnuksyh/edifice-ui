import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '../../../utils/cn'

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source. If omitted or it fails to load, initials/fallback show. */
  src?: string
  /** Alt text for the image and accessible label. */
  alt?: string
  /** Name used to derive initials when no image is shown. */
  name?: string
  /** Size preset. Defaults to 'md'. */
  size?: AvatarSize
}

/** Derive up to two uppercase initials from a name. */
function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0][0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : ''
  return (first + last).toUpperCase()
}

/**
 * Avatar — a user image with an initials fallback.
 *
 * Falls back to initials (from `name`) when no `src` is given or the image
 * fails to load; falls back to a neutral placeholder when neither is available.
 */
export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  className,
  ...rest
}: AvatarProps) {
  const [failed, setFailed] = useState(false)

  const sizes: Record<AvatarSize, string> = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  }

  const showImage = Boolean(src) && !failed
  const initials = name ? initialsFrom(name) : ''

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-grey-22 font-medium text-grey-F0',
        sizes[size],
        className
      )}
      aria-label={alt ?? name}
      role="img"
      {...rest}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? ''}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : initials ? (
        <span aria-hidden="true">{initials}</span>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-1/2 w-1/2"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6Z" />
        </svg>
      )}
    </span>
  )
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Size applied to all avatars in the group. Defaults to 'md'. */
  size?: AvatarSize
  /** Max avatars to show before collapsing into a +N chip. */
  max?: number
  /** Avatar children. */
  children: ReactNode
}

const overlap: Record<AvatarSize, string> = {
  sm: '-ml-2',
  md: '-ml-2.5',
  lg: '-ml-3',
  xl: '-ml-4',
}

/**
 * AvatarGroup — overlapping stack of avatars with a `+N` overflow.
 *
 * Applies the group `size` to each child Avatar and shows at most `max`
 * avatars, collapsing the rest into a count chip.
 */
export function AvatarGroup({
  size = 'md',
  max,
  children,
  className,
  ...rest
}: AvatarGroupProps) {
  const avatars = Children.toArray(children).filter(isValidElement) as ReactElement<
    AvatarProps
  >[]
  const visible = max ? avatars.slice(0, max) : avatars
  const overflow = avatars.length - visible.length

  const sizes: Record<AvatarSize, string> = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  }

  return (
    <div className={cn('flex items-center', className)} {...rest}>
      {visible.map((child, i) => (
        <span
          key={child.key ?? i}
          className={cn('rounded-full ring-2 ring-grey-11', i > 0 && overlap[size])}
        >
          {cloneElement(child, { size })}
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-grey-2A font-medium text-text-secondary ring-2 ring-grey-11',
            sizes[size],
            overlap[size]
          )}
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}
