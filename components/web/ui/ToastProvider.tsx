import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { cn } from '../../../utils/cn'
import { Toast, type ToastVariant, type ToastStyleVariant } from './Toast'

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'

export interface ToastOptions {
  /** Tone (hue). Defaults to 'info'. */
  variant?: ToastVariant
  /** Visual treatment. Defaults to 'soft'. */
  styleVariant?: ToastStyleVariant
  /** Optional bold heading. */
  title?: ReactNode
  /** Message body. */
  description: ReactNode
  /** Auto-dismiss delay in ms; 0 disables. Defaults to 4000. */
  duration?: number
}

interface ToastEntry extends ToastOptions {
  id: number
}

export interface ToastContextValue {
  /** Show a toast; returns its id. */
  toast: (options: ToastOptions) => number
  /** Convenience: success toast. */
  success: (description: ReactNode, options?: Omit<ToastOptions, 'description' | 'variant'>) => number
  /** Convenience: error/danger toast. */
  error: (description: ReactNode, options?: Omit<ToastOptions, 'description' | 'variant'>) => number
  /** Dismiss a toast by id. */
  dismiss: (id: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const positions: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
}

export interface ToastProviderProps {
  children: ReactNode
  /** Where toasts stack. Defaults to 'bottom-right'. */
  position?: ToastPosition
}

/**
 * ToastProvider — manages a queue of toasts and renders them in a fixed
 * viewport. Wrap your app, then call {@link useToast} to fire toasts
 * imperatively.
 */
export function ToastProvider({ children, position = 'bottom-right' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastEntry[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((options: ToastOptions) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { ...options, id }])
    return id
  }, [])

  const success = useCallback<ToastContextValue['success']>(
    (description, options) => toast({ ...options, description, variant: 'success' }),
    [toast]
  )
  const error = useCallback<ToastContextValue['error']>(
    (description, options) => toast({ ...options, description, variant: 'danger' }),
    [toast]
  )

  const value = useMemo<ToastContextValue>(
    () => ({ toast, success, error, dismiss }),
    [toast, success, error, dismiss]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className={cn(
          'pointer-events-none fixed z-50 flex w-full max-w-sm flex-col gap-3',
          positions[position]
        )}
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto w-full">
            <Toast
              variant={t.variant}
              styleVariant={t.styleVariant}
              title={t.title}
              duration={t.duration}
              onClose={() => dismiss(t.id)}
            >
              {t.description}
            </Toast>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/**
 * useToast — fire toasts imperatively. Must be used within a ToastProvider.
 *
 * @example
 * const { toast, success } = useToast()
 * success('Saved!')
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx
}
