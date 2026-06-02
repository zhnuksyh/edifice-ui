import { SafeAreaView, ScrollView, View } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface ScreenShellProps {
  /** Wrap content in a ScrollView. Defaults to true. */
  scroll?: boolean
  /** Apply default horizontal/vertical padding. Defaults to true. */
  padded?: boolean
  /** Fixed content above the body. */
  header?: ReactNode
  /** Fixed content below the body. */
  footer?: ReactNode
  /** Screen content. */
  children: ReactNode
  /** Extra NativeWind classes merged onto the body container via cn(). */
  className?: string
}

/**
 * ScreenShell — top-level screen wrapper for React Native.
 *
 * Provides safe-area insets, an optional scroll container, and consistent
 * padding. The mobile counterpart to the web PageShell.
 */
export function ScreenShell({
  scroll = true,
  padded = true,
  header,
  footer,
  children,
  className,
  ...rest
}: ScreenShellProps) {
  const Body = scroll ? ScrollView : View
  const bodyProps = scroll
    ? { contentContainerClassName: cn(padded && 'p-4', className) }
    : { className: cn('flex-1', padded && 'p-4', className) }

  return (
    <SafeAreaView className="flex-1 bg-background" {...rest}>
      {header}
      <Body className="flex-1" {...bodyProps}>
        {children}
      </Body>
      {footer}
    </SafeAreaView>
  )
}
