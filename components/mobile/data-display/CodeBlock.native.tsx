import { View, Text, Pressable, ScrollView, type ViewProps } from 'react-native'
import { cn } from '../../../utils/cn'

export interface CodeBlockProps extends ViewProps {
  /** The code to display (and pass to `onCopy`). */
  code: string
  /** Optional language label shown in the header (e.g. 'tsx'). */
  language?: string
  /** Optional filename shown in the header. */
  filename?: string
  /**
   * Copy handler invoked with the code. RN has no built-in clipboard, so the
   * consumer wires their own (e.g. expo-clipboard). The button is shown only
   * when this is provided.
   */
  onCopy?: (code: string) => void
  /** Whether the last copy succeeded — toggles the button to a ✓ "Copied" state. */
  copied?: boolean
  /** Show line numbers in the gutter. Defaults to false. */
  showLineNumbers?: boolean
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * CodeBlock (native) — a monospace code surface with an optional header.
 *
 * Mirrors the web CodeBlock display API. Not a syntax highlighter — it renders
 * code verbatim with optional line numbers and a language/filename header. RN
 * has no built-in clipboard, so copy is delegated: pass `onCopy` (and drive
 * `copied`) to wire your own clipboard library.
 */
export function CodeBlock({
  code,
  language,
  filename,
  onCopy,
  copied = false,
  showLineNumbers = false,
  className,
  ...rest
}: CodeBlockProps) {
  const lines = code.replace(/\n$/, '').split('\n')
  const hasHeader = Boolean(filename || language || onCopy)

  return (
    <View
      className={cn('overflow-hidden rounded-xl border border-grey-2A bg-grey-0A', className)}
      {...rest}
    >
      {hasHeader && (
        <View className="flex-row items-center justify-between border-b border-grey-2A bg-grey-11 px-4 py-2">
          <Text className="font-mono text-xs text-text-muted">
            {filename ?? language ?? ''}
          </Text>
          {onCopy && (
            <Pressable
              onPress={() => onCopy(code)}
              accessibilityRole="button"
              accessibilityLabel={copied ? 'Copied' : 'Copy code'}
              hitSlop={8}
              className="flex-row items-center gap-1.5 rounded-md px-2 py-1 active:bg-grey-22"
            >
              <Text className={cn('text-xs', copied ? 'text-success' : 'text-text-secondary')}>
                {copied ? '✓ Copied' : 'Copy'}
              </Text>
            </Pressable>
          )}
        </View>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="p-4">
          {lines.map((line, i) => (
            <View key={i} className="flex-row">
              {showLineNumbers && (
                <Text className="mr-4 text-right font-mono text-sm leading-relaxed text-text-muted">
                  {i + 1}
                </Text>
              )}
              <Text className="font-mono text-sm leading-relaxed text-text-primary">
                {line || ' '}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
