/**
 * Shared shape for an Edifice preset.
 *
 * A preset is a named bundle of token choices that together define a "look":
 * which grey is the background vs. surface, which accent leads, which fonts,
 * the base corner radius, and the spacing density. Projects pick a preset as a
 * starting point instead of wiring every token by hand.
 */
import type { Accent } from '../tokens/colors'

export interface Preset {
  /** Preset identifier. */
  name: string
  /** One-line description of the look. */
  description: string
  colors: {
    /** Page background (a hex value). */
    background: string
    /** Card / surface color (a hex value). */
    surface: string
    /** Elevated surface — modals, dropdowns (a hex value). */
    elevated: string
    /** Border color (a hex value). */
    border: string
    /** Lead accent name + its hex. */
    accent: Accent
    accentColor: string
    /** Primary text color (a hex value). */
    text: string
    /** Secondary / muted text color (a hex value). */
    secondaryText: string
  }
  fonts: {
    /** Display / heading font family name. */
    display: string
    /** Body font family name. */
    body: string
  }
  /** Base corner radius token key. */
  radius: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Spacing density. */
  density: 'compact' | 'normal' | 'spacious'
}
