import { View, Text } from 'react-native'
import { cn } from '../../../utils/cn.js'

/**
 * Card (native) — surface container for React Native + NativeWind.
 *
 * Mirrors the web Card props API. Header/footer accept strings or nodes;
 * strings are wrapped in styled <Text> automatically.
 *
 * @param {Object} props
 * @param {('none'|'sm'|'md'|'lg')} [props.padding='md'] - Inner padding.
 * @param {boolean} [props.bordered=true] - Show a hairline border.
 * @param {import('react').ReactNode} [props.header] - Optional header content.
 * @param {import('react').ReactNode} [props.footer] - Optional footer content.
 * @param {import('react').ReactNode} props.children - Card body.
 * @param {string} [props.className] - Extra NativeWind classes merged via cn().
 * @returns {JSX.Element}
 */
export function Card({
  padding = 'md',
  bordered = true,
  header,
  footer,
  children,
  className,
  ...rest
}) {
  const paddings = {
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
