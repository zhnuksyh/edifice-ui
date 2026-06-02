import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends ViewProps {
  /** Inner padding. Defaults to 'md'. */
  padding?: CardPadding
  /** Show a hairline border. Defaults to true. */
  bordered?: boolean
  /** Optional header content. */
  header?: ReactNode
  /** Optional footer content. */
  footer?: ReactNode
  /** Card body. */
  children: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Card (native) — surface container for React Native + NativeWind.
 *
 * Mirrors the web Card props API. Header/footer accept strings or nodes;
 * strings are wrapped in styled <Text> automatically.
 */
export function Card({
  padding = 'md',
  bordered = true,
  header,
  footer,
  children,
  className,
  ...rest
}: CardProps) {
  const paddings: Record<CardPadding, string> = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  return (
    <View
      className={cn(
        'overflow-hidden rounded-xl bg-surface',
        bordered && 'border border-neutral-200',
        className
      )}
      {...rest}
    >
      {header != null && (
        <View className="border-b border-neutral-200 px-4 py-3">
          {typeof header === 'string' ? (
            <Text className="font-semibold text-text-primary">{header}</Text>
          ) : (
            header
          )}
        </View>
      )}
      <View className={paddings[padding]}>{children}</View>
      {footer != null && (
        <View className="border-t border-neutral-200 px-4 py-3">
          {typeof footer === 'string' ? (
            <Text className="text-text-secondary">{footer}</Text>
          ) : (
            footer
          )}
        </View>
      )}
    </View>
  )
}
