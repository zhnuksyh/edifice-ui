import { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import type { DocumentPickerAsset } from 'expo-document-picker'
import { cn } from '../../../utils/cn'

export interface FileUploadProps {
  /** Visible label text. */
  label?: string
  /**
   * Accepted MIME type(s), passed to the picker's `type` (e.g. 'image/*' or
   * ['image/png', 'application/pdf']). Defaults to any type.
   */
  accept?: string | string[]
  /** Allow selecting multiple files. */
  multiple?: boolean
  /** Called with the picked assets whenever the selection changes. */
  onFiles?: (files: DocumentPickerAsset[]) => void
  /** Disable the control. */
  disabled?: boolean
  /** Primary prompt text. Defaults to a tap message. */
  prompt?: string
  /** Secondary hint under the prompt (e.g. 'PNG, JPG up to 5MB'). */
  hint?: string
  /** Error message; sets invalid styling. */
  error?: string
  /** Extra NativeWind classes merged onto the dropzone via cn(). */
  className?: string
}

/**
 * FileUpload (native) — a tap-to-pick dropzone backed by expo-document-picker.
 *
 * Mirrors the web FileUpload's props/visuals (dashed dropzone, prompt/hint/error,
 * selected-file list), but tap opens the system document picker (touch has no
 * drag-drop). Reports the selection via `onFiles` as `DocumentPickerAsset[]`
 * (the RN analog of web's `File[]`). Uncontrolled by design.
 *
 * Requires the optional peer dependency `expo-document-picker`.
 */
export function FileUpload({
  label,
  accept,
  multiple = false,
  onFiles,
  disabled = false,
  prompt = 'Tap to choose a file',
  hint,
  error,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<DocumentPickerAsset[]>([])

  const pick = async () => {
    if (disabled) return
    const result = await DocumentPicker.getDocumentAsync({
      type: accept,
      multiple,
    })
    if (result.canceled) return
    setFiles(result.assets)
    onFiles?.(result.assets)
  }

  return (
    <View className={cn('gap-1.5', className)}>
      {label && (
        <Text className="text-sm font-medium text-text-primary">{label}</Text>
      )}

      <Pressable
        onPress={pick}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label ?? prompt}
        accessibilityState={{ disabled }}
        className={cn(
          'items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-8',
          error ? 'border-danger' : 'border-grey-2A bg-grey-1A',
          disabled && 'opacity-50'
        )}
      >
        <View className="h-12 w-12 items-center justify-center rounded-full bg-grey-22">
          <Text className="text-lg text-text-secondary">↑</Text>
        </View>
        <Text className="text-sm font-medium text-text-primary">{prompt}</Text>
        {hint && <Text className="text-xs text-text-secondary">{hint}</Text>}
      </Pressable>

      {files.length > 0 && (
        <View className="gap-1">
          {files.map((file, i) => (
            <View
              key={`${file.name}-${i}`}
              className="flex-row items-center justify-between gap-2 rounded-lg border border-grey-2A bg-grey-1A px-3 py-2"
            >
              <Text className="flex-1 text-sm text-text-primary" numberOfLines={1}>
                {file.name}
              </Text>
              {file.size != null && (
                <Text className="shrink-0 text-xs text-text-secondary">
                  {(file.size / 1024).toFixed(1)} KB
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {error && <Text className="text-sm text-danger">{error}</Text>}
    </View>
  )
}
