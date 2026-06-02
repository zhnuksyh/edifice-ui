/** Shared option types + lists for the Live Preview switcher. */
import type { ButtonVariant } from '../../../components/web/ui/Button'

export type ButtonStyle = 'Default' | 'Outline' | 'Ghost' | 'Danger' | 'Accent'
export type NavbarStyle = 'Minimal' | 'With CTA' | 'Centered logo'
export type HeroLayout = 'Left-aligned' | 'Centered' | 'Split'
export type PresetName = 'Dark' | 'Void' | 'Obsidian'
export type RadiusLevel = 'low' | 'medium' | 'high'

export interface LivePreviewState {
  buttonStyle: ButtonStyle
  navbarStyle: NavbarStyle
  heroLayout: HeroLayout
  preset: PresetName
  radius: RadiusLevel
}

export const DEFAULT_STATE: LivePreviewState = {
  buttonStyle: 'Default',
  navbarStyle: 'With CTA',
  heroLayout: 'Centered',
  preset: 'Dark',
  radius: 'medium',
}

export const BUTTON_STYLES: ButtonStyle[] = [
  'Default',
  'Outline',
  'Ghost',
  'Danger',
  'Accent',
]
export const NAVBAR_STYLES: NavbarStyle[] = [
  'Minimal',
  'With CTA',
  'Centered logo',
]
export const HERO_LAYOUTS: HeroLayout[] = ['Left-aligned', 'Centered', 'Split']
export const PRESETS: PresetName[] = ['Dark', 'Void', 'Obsidian']
export const RADIUS_LEVELS: RadiusLevel[] = ['low', 'medium', 'high']

/** Map the playground's Button-style label to the Edifice Button variant. */
export function buttonVariant(style: ButtonStyle): ButtonVariant {
  switch (style) {
    case 'Outline':
      // Edifice has no outline variant; ghost is the closest neutral style and
      // the scoped CSS gives it a visible border in the sandbox.
      return 'ghost'
    case 'Ghost':
      return 'ghost'
    case 'Danger':
      return 'danger'
    case 'Accent':
      return 'accent'
    case 'Default':
    default:
      return 'primary'
  }
}

/** Extra classes for the Outline button style (border around a ghost button). */
export function buttonExtraClass(style: ButtonStyle): string {
  return style === 'Outline' ? 'border border-grey-2A' : ''
}
