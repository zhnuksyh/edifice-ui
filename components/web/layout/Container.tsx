import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Max width preset. Defaults to 'xl'. */
  size?: ContainerSize
  /** Apply horizontal gutter padding. Defaults to true. */
  padded?: boolean
  /** Content. */
  children: ReactNode
}

/**
 * Container — centers content at a max width with responsive horizontal padding.
 *
 * The building block for consistent page width; compose inside Section or use
 * standalone.
 */
export function Container({
  size = 'xl',
  padded = true,
  children,
  className,
  ...rest
}: ContainerProps) {
  const sizes: Record<ContainerSize, string> = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-full',
  }

  return (
    <div
      className={cn(
        'mx-auto w-full',
        sizes[size],
        padded && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
