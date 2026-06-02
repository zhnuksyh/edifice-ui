import { colors } from '../tokens/colors'
import { typography } from '../tokens/typography'
import type { Preset } from './types'

/**
 * Obsidian preset — raw, terminal, developer-tool.
 *
 * Pure-black background with near-black panels, a barely-visible border, a
 * purple accent, Space Grotesk display + DM Mono body, sharp `sm` corners, and
 * deep heavy shadows. The feel of a coding environment (think Raycast).
 */
export const obsidianPreset: Preset = {
  name: 'Obsidian',
  description: 'Raw, terminal developer-tool UI — pure black with a purple accent.',
  colors: {
    background: '#000000',
    surface: '#0A0A0A',
    elevated: '#111111',
    border: '#1A1A1A',
    accent: 'purple',
    accentColor: colors.purple.DEFAULT, // #A855F7
    text: '#F0F0F0',
    secondaryText: '#888888',
  },
  fonts: {
    display: typography.fontFamily.spaceGrotesk[0],
    body: typography.fontFamily.dmMono[0],
  },
  radius: 'sm',
  density: 'compact',
}
