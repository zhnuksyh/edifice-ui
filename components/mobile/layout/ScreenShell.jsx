import { SafeAreaView, ScrollView, View } from 'react-native'
import { cn } from '../../../utils/cn.js'

/**
 * ScreenShell — top-level screen wrapper for React Native.
 *
 * Provides safe-area insets, an optional scroll container, and consistent
 * padding. The mobile counterpart to the web PageShell.
 *
 * @param {Object} props
 * @param {boolean} [props.scroll=true] - Wrap content in a ScrollView.
 * @param {boolean} [props.padded=true] - Apply default horizontal/vertical padding.
 * @param {import('react').ReactNode} [props.header] - Fixed content above the body.
 * @param {import('react').ReactNode} [props.footer] - Fixed content below the body.
 * @param {import('react').ReactNode} props.children - Screen content.
 * @param {string} [props.className] - Extra NativeWind classes merged onto the
 *   body container via cn().
 * @returns {JSX.Element}
 */
export function ScreenShell({
  scroll = true,
  padded = true,
  header,
  footer,
  children,
  className,
  ...rest
}) {
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
