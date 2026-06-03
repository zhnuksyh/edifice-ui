import { View, Text, Image, type ViewProps } from 'react-native'
import { useState } from 'react'
import { cn } from '../../../utils/cn'

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps extends ViewProps {
  /** Image source URI. If omitted or it fails to load, initials/fallback show. */
  src?: string
  /** Accessible label for the avatar. */
  alt?: string
  /** Name used to derive initials when no image is shown. */
  name?: string
  /** Size preset. Defaults to 'md'. */
  size?: AvatarSize
  /** Extra NativeWind classes merged via cn(). */
  className?: string
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
 * Avatar (native) — a user image with an initials fallback.
 *
 * Mirrors the web Avatar props API. Falls back to initials (from `name`) when
 * no `src` is given or the image fails to load, then to a neutral placeholder.
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
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  const textSizes: Record<AvatarSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  }

  const showImage = Boolean(src) && !failed
  const initials = name ? initialsFrom(name) : ''

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={alt ?? name}
      className={cn(
        'items-center justify-center overflow-hidden rounded-full bg-grey-22',
        sizes[size],
        className
      )}
      {...rest}
    >
      {showImage ? (
        <Image
          source={{ uri: src }}
          onError={() => setFailed(true)}
          className="h-full w-full"
          accessibilityLabel={alt ?? name}
        />
      ) : initials ? (
        <Text className={cn('font-medium text-text-secondary', textSizes[size])}>
          {initials}
        </Text>
      ) : (
        <Text className={cn('font-medium text-text-muted', textSizes[size])}>?</Text>
      )}
    </View>
  )
}
