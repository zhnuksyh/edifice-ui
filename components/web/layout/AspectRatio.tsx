import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type AspectRatioPreset =
  | 'square'
  | 'video'
  | 'portrait'
  | 'wide'
  | '4/3'
  | '3/2'

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /** Ratio preset. Defaults to 'video' (16:9). */
  ratio?: AspectRatioPreset
  /** Content (image, video, iframe, etc.) — stretched to fill. */
  children: ReactNode
}

/**
 * AspectRatio — constrains content to a fixed width:height ratio.
 *
 * Use for media (images, video, embeds) so layout doesn't shift before they
 * load. Pick a `ratio` preset; the child is stretched to fill the box.
 */
export function AspectRatio({
  ratio = 'video',
  children,
  className,
  ...rest
}: AspectRatioProps) {
  const ratios: Record<AspectRatioPreset, string> = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden [&>*]:absolute [&>*]:inset-0 [&>*]:h-full [&>*]:w-full',
        ratios[ratio],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
