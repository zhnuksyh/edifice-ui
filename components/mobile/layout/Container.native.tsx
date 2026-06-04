import { View, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ContainerProps extends ViewProps {
  /** Max width preset. Defaults to 'xl'. */
  size?: ContainerSize
  /** Apply horizontal gutter padding. Defaults to true. */
  padded?: boolean
  /** Content. */
  children: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/** Max widths in px (Tailwind screen sizes); 'full' is unconstrained. */
const MAX_WIDTH: Record<ContainerSize, number | undefined> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  full: undefined,
}

/**
 * Container (native) — centers content at a max width with horizontal padding.
 *
 * Mirrors the web Container props API. RN has no max-width utilities, so the cap
 * is applied via `style.maxWidth` with `alignSelf: 'center'`. On phones the cap
 * rarely engages (screens are narrower); it matters on tablets/large screens.
 */
export function Container({
  size = 'xl',
  padded = true,
  children,
  className,
  style,
  ...rest
}: ContainerProps) {
  const maxWidth = MAX_WIDTH[size]

  return (
    <View
      className={cn('w-full self-center', padded && 'px-4', className)}
      style={[maxWidth ? { maxWidth } : null, style]}
      {...rest}
    >
      {children}
    </View>
  )
}
