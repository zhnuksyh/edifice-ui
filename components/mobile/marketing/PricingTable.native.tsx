import { View, Text, Pressable, type ViewProps } from 'react-native'
import { cn } from '../../../utils/cn'

export interface PricingTier {
  /** Plan name. */
  name: string
  /** Price text (e.g. '$19'). */
  price: string
  /** Billing period suffix (e.g. '/mo'). */
  period?: string
  /** Short plan description. */
  description?: string
  /** Feature bullets. */
  features: string[]
  /** CTA label. */
  cta: string
  /** Called when the tier CTA is pressed. */
  onSelect?: () => void
  /** Emphasize this tier (accent border + 'Popular' badge). */
  highlighted?: boolean
}

export interface PricingTableProps extends ViewProps {
  /** The pricing tiers to render. */
  tiers: PricingTier[]
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * PricingTable (native) — a stack of pricing tiers with features and a CTA each.
 *
 * Mirrors the web PricingTable props API. Web's column grid stacks vertically on
 * mobile. The CTA is an inline styled Pressable (mobile components don't import
 * the Button). The `highlighted` tier gets an accent border + 'Popular' badge.
 */
export function PricingTable({ tiers, className, ...rest }: PricingTableProps) {
  return (
    <View className={cn('gap-6', className)} {...rest}>
      {tiers.map((tier) => (
        <View
          key={tier.name}
          className={cn(
            'rounded-xl border bg-surface p-6',
            tier.highlighted ? 'border-yellow' : 'border-grey-2A'
          )}
        >
          {tier.highlighted && (
            <View className="absolute -top-3 left-6 rounded-full bg-yellow px-3 py-0.5">
              <Text className="text-xs font-medium text-grey-0A">Popular</Text>
            </View>
          )}
          <Text className="font-display text-lg font-semibold text-text-primary">
            {tier.name}
          </Text>
          {tier.description && (
            <Text className="mt-1 text-sm text-text-secondary">{tier.description}</Text>
          )}
          <View className="mt-4 flex-row items-baseline gap-1">
            <Text className="font-display text-4xl font-bold text-text-primary">
              {tier.price}
            </Text>
            {tier.period && (
              <Text className="text-sm text-text-muted">{tier.period}</Text>
            )}
          </View>
          <View className="mt-6 gap-2.5">
            {tier.features.map((feature) => (
              <View key={feature} className="flex-row items-start gap-2">
                <Text className="text-sm text-yellow">✓</Text>
                <Text className="flex-1 text-sm text-text-secondary">{feature}</Text>
              </View>
            ))}
          </View>
          <Pressable
            onPress={tier.onSelect}
            accessibilityRole="button"
            accessibilityLabel={tier.cta}
            className={cn(
              'mt-6 h-11 items-center justify-center rounded-lg',
              tier.highlighted ? 'bg-yellow' : 'border border-grey-2A'
            )}
          >
            <Text
              className={cn(
                'text-sm font-medium',
                tier.highlighted ? 'text-grey-0A' : 'text-text-primary'
              )}
            >
              {tier.cta}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  )
}
