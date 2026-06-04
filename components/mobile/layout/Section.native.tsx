import { View, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type SectionSpacing = 'sm' | 'md' | 'lg'
export type SectionTone = 'background' | 'surface'
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

/** Max widths in px (Tailwind screen sizes); 'full' is unconstrained. */
const MAX_WIDTH: Record<ContainerSize, number | undefined> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  full: undefined,
}

export interface SectionProps extends ViewProps {
  /** Vertical padding scale. Defaults to 'md'. */
  spacing?: SectionSpacing
  /** Background tone. Defaults to 'background'. */
  tone?: SectionTone
  /** Draw top/bottom borders to define the band. */
  bordered?: boolean
  /**
   * Wrap children in a Container. Set false to manage width yourself.
   * Defaults to true.
   */
  contained?: boolean
  /** Container max width when `contained`. Defaults to 'xl'. */
  containerSize?: ContainerSize
  /** Section content. */
  children: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Section (native) — a full-width band with vertical rhythm and optional
 * centered Container.
 *
 * Mirrors the web Section props API. Vertical padding is scaled down from the
 * web's generous desktop rhythm to mobile-appropriate values. Alternate `tone`
 * across sections for scroll rhythm.
 */
export function Section({
  spacing = 'md',
  tone = 'background',
  bordered = false,
  contained = true,
  containerSize = 'xl',
  children,
  className,
  ...rest
}: SectionProps) {
  const spacings: Record<SectionSpacing, string> = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  }

  const tones: Record<SectionTone, string> = {
    background: 'bg-background',
    surface: 'bg-surface',
  }

  const maxWidth = MAX_WIDTH[containerSize]

  return (
    <View
      className={cn(
        spacings[spacing],
        tones[tone],
        bordered && 'border-y border-grey-2A',
        className
      )}
      {...rest}
    >
      {contained ? (
        <View
          className="w-full self-center px-4"
          style={maxWidth ? { maxWidth } : undefined}
        >
          {children}
        </View>
      ) : (
        children
      )}
    </View>
  )
}
