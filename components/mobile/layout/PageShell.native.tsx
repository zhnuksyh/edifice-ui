import { View, ScrollView, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface PageShellProps extends ViewProps {
  /** Rendered above the scrollable content (fixed). */
  navbar?: ReactNode
  /** Rendered below the scrollable content (fixed). */
  footer?: ReactNode
  /**
   * Constrain main content to a centered max-width Container with gutters.
   * Defaults to true.
   */
  contained?: boolean
  /** Main page content. */
  children: ReactNode
  /** Extra NativeWind classes merged onto the content area via cn(). */
  className?: string
}

/**
 * PageShell (native) — top-level screen wrapper composing a fixed navbar, a
 * scrollable main area, and a fixed footer into a full-height column.
 *
 * Mirrors the web PageShell props API. The main area scrolls (`ScrollView`)
 * while navbar/footer stay fixed. Wrap in a SafeAreaView at the app level for
 * notch/inset handling (kept dependency-free here).
 */
export function PageShell({
  navbar,
  footer,
  contained = true,
  children,
  className,
  ...rest
}: PageShellProps) {
  return (
    <View className="flex-1 bg-background">
      {navbar}
      <ScrollView
        className="flex-1"
        contentContainerClassName={cn('py-8', className)}
        {...rest}
      >
        {contained ? (
          // Centered, max-width gutter wrapper (xl = 1280px, matches Container).
          <View className="w-full self-center px-4" style={{ maxWidth: 1280 }}>
            {children}
          </View>
        ) : (
          children
        )}
      </ScrollView>
      {footer}
    </View>
  )
}
