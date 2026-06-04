import { View, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type AspectRatioPreset =
  | 'square'
  | 'video'
  | 'portrait'
  | 'wide'
  | '4/3'
  | '3/2'

export interface AspectRatioProps extends ViewProps {
  /** Ratio preset. Defaults to 'video' (16:9). */
  ratio?: AspectRatioPreset
  /** Content (image, etc.) — stretched to fill. */
  children: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/** Preset name → numeric width/height ratio (RN's `aspectRatio` takes a number). */
const RATIOS: Record<AspectRatioPreset, number> = {
  square: 1,
  video: 16 / 9,
  portrait: 3 / 4,
  wide: 21 / 9,
  '4/3': 4 / 3,
  '3/2': 3 / 2,
}

/**
 * AspectRatio (native) — constrains content to a fixed width:height ratio.
 *
 * Mirrors the web AspectRatio props API. Uses RN's `aspectRatio` style; the
 * child fills the box. Use for media so layout doesn't shift before it loads.
 */
export function AspectRatio({
  ratio = 'video',
  children,
  className,
  ...rest
}: AspectRatioProps) {
  return (
    <View
      className={cn('w-full overflow-hidden', className)}
      style={{ aspectRatio: RATIOS[ratio] }}
      {...rest}
    >
      {children}
    </View>
  )
}
