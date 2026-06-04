import { useRef, useState, type ReactNode } from 'react'
import {
  View,
  Text,
  PanResponder,
  type LayoutChangeEvent,
  type GestureResponderEvent,
} from 'react-native'
import { cn } from '../../../utils/cn'

export interface SliderProps {
  /** Visible label text. */
  label?: string
  /** Controlled value. */
  value?: number
  /** Default value (uncontrolled). */
  defaultValue?: number
  /** Called with the new value as the user drags. */
  onChange?: (value: number) => void
  /** Minimum. Defaults to 0. */
  min?: number
  /** Maximum. Defaults to 100. */
  max?: number
  /** Step increment. Defaults to 1. */
  step?: number
  /** Disable the control. */
  disabled?: boolean
  /** Show the current value beside the label. Defaults to true. */
  showValue?: boolean
  /** Format the displayed value (e.g. (v) => `${v}%`). */
  formatValue?: (value: number) => ReactNode
  /** Error message; sets invalid styling. */
  error?: string
  /** Helper text shown below the field. */
  hint?: string
  /** Extra NativeWind classes merged onto the wrapper via cn(). */
  className?: string
}

/** Snap a raw value to the nearest step within [min, max]. */
function snap(raw: number, min: number, max: number, step: number): number {
  const clamped = Math.min(max, Math.max(min, raw))
  const stepped = Math.round((clamped - min) / step) * step + min
  return Math.min(max, Math.max(min, stepped))
}

/**
 * Slider (native) — a labeled range control with a value readout.
 *
 * Mirrors the web Slider props API. RN has no range input, so the track + thumb
 * are driven by a PanResponder over a measured track width (no extra deps).
 * Controlled via `value`/`onChange`, or uncontrolled via `defaultValue`.
 */
export function Slider({
  label,
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = true,
  formatValue,
  error,
  hint,
  className,
}: SliderProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? min)
  const current = isControlled ? value : internal

  const widthRef = useRef(0)

  const commit = (next: number) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  const handleAt = (e: GestureResponderEvent) => {
    if (disabled || widthRef.current <= 0) return
    const x = e.nativeEvent.locationX
    const ratio = x / widthRef.current
    commit(snap(min + ratio * (max - min), min, max, step))
  }

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: handleAt,
      onPanResponderMove: handleAt,
    })
  ).current

  const onLayout = (e: LayoutChangeEvent) => {
    widthRef.current = e.nativeEvent.layout.width
  }

  const pct = max > min ? ((current - min) / (max - min)) * 100 : 0

  return (
    <View className={cn('gap-1.5', className)}>
      {(label || showValue) && (
        <View className="flex-row items-center justify-between">
          {label ? (
            <Text className="text-sm font-medium text-text-primary">{label}</Text>
          ) : (
            <View />
          )}
          {showValue && (
            <Text className="text-sm text-text-secondary">
              {formatValue ? formatValue(current) : current}
            </Text>
          )}
        </View>
      )}

      <View
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ min, max, now: current }}
        className={cn('h-6 justify-center', disabled && 'opacity-50')}
        onLayout={onLayout}
        {...responder.panHandlers}
      >
        {/* Track */}
        <View className="h-2 w-full rounded-full bg-grey-2A">
          {/* Filled portion */}
          <View
            className={cn('h-2 rounded-full', error ? 'bg-danger' : 'bg-yellow')}
            style={{ width: `${pct}%` }}
          />
        </View>
        {/* Thumb */}
        <View
          className={cn(
            'absolute h-5 w-5 rounded-full border-2 bg-grey-F0',
            error ? 'border-danger' : 'border-yellow'
          )}
          style={{ left: `${pct}%`, marginLeft: -10 }}
        />
      </View>

      {error ? (
        <Text className="text-sm text-danger">{error}</Text>
      ) : (
        hint && <Text className="text-sm text-text-secondary">{hint}</Text>
      )}
    </View>
  )
}
