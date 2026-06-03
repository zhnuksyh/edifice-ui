import { Modal as RNModal, View, Text, Pressable } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean
  /** Called when the user dismisses the modal (backdrop press / Android back). */
  onClose: () => void
  /** Optional heading. String or nodes. */
  title?: ReactNode
  /** Optional footer (actions). */
  footer?: ReactNode
  /** Max width preset. Defaults to 'md'. */
  size?: ModalSize
  /** Modal body. */
  children: ReactNode
  /** Extra NativeWind classes merged onto the panel via cn(). */
  className?: string
}

/**
 * Modal (native) — accessible dialog rendered over an overlay.
 *
 * Mirrors the web Modal props API, built on RN's `Modal`. Closes on backdrop
 * press and the Android back button. Renders nothing when `isOpen` is false.
 * The consumer controls open state. String `title` is wrapped in styled <Text>.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  footer,
  size = 'md',
  children,
  className,
}: ModalProps) {
  const sizes: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        onPress={onClose}
        accessibilityLabel="Close"
        className="flex-1 items-center justify-center bg-overlay p-4"
      >
        {/* Stop backdrop press from reaching the panel. */}
        <Pressable
          accessibilityRole="none"
          onPress={() => {}}
          className={cn('w-full rounded-xl bg-surface', sizes[size], className)}
        >
          {title != null &&
            (typeof title === 'string' ? (
              <Text className="px-6 pb-2 pt-5 text-lg font-semibold text-text-primary">
                {title}
              </Text>
            ) : (
              <View className="px-6 pb-2 pt-5">{title}</View>
            ))}
          <View className="px-6 py-3">{children}</View>
          {footer != null && (
            <View className="flex-row justify-end gap-3 px-6 pb-5 pt-2">
              {footer}
            </View>
          )}
        </Pressable>
      </Pressable>
    </RNModal>
  )
}
