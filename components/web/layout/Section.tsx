import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { Container, type ContainerSize } from './Container'

export type SectionSpacing = 'sm' | 'md' | 'lg'
export type SectionTone = 'background' | 'surface'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Vertical padding scale. Defaults to 'md'. */
  spacing?: SectionSpacing
  /** Background tone. Defaults to 'background'. */
  tone?: SectionTone
  /** Draw 1px top/bottom borders to define the band. */
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
}

/**
 * Section — a full-width band with consistent vertical rhythm and an optional
 * centered container.
 *
 * Use alternating `tone` (background / surface) across sections to create
 * scroll rhythm, per Edifice's design principles.
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
    sm: 'py-12',
    md: 'py-20',
    lg: 'py-28',
  }

  const tones: Record<SectionTone, string> = {
    background: 'bg-background',
    surface: 'bg-surface',
  }

  return (
    <section
      className={cn(
        spacings[spacing],
        tones[tone],
        bordered && 'border-y border-grey-2A',
        className
      )}
      {...rest}
    >
      {contained ? <Container size={containerSize}>{children}</Container> : children}
    </section>
  )
}
