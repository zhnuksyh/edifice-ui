import { useId, useRef, useState, type DragEvent } from 'react'
import { UploadCloud } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface FileUploadProps {
  /** Visible label text. */
  label?: string
  /** Accepted file types (passed to the native input's `accept`). */
  accept?: string
  /** Allow selecting multiple files. */
  multiple?: boolean
  /** Called with the selected files whenever the selection changes. */
  onFiles?: (files: File[]) => void
  /** Disable the control. */
  disabled?: boolean
  /** Primary prompt text. Defaults to a click/drag message. */
  prompt?: string
  /** Secondary hint under the prompt (e.g. 'PNG, JPG up to 5MB'). */
  hint?: string
  /** Error message; sets invalid styling. */
  error?: string
  /** Field id; auto-generated if omitted. */
  id?: string
  /** Name for native form submission. */
  name?: string
  /** Extra classes merged onto the dropzone via cn(). */
  className?: string
}


/**
 * FileUpload — a click-or-drag dropzone over a hidden file input.
 *
 * Highlights on drag-over, lists selected file names, and reports the selection
 * via `onFiles`. Uncontrolled by design — the consumer holds the files it
 * receives. Pair with `accept`/`multiple` to constrain the picker.
 */
export function FileUpload({
  label,
  accept,
  multiple = false,
  onFiles,
  disabled = false,
  prompt = 'Click to upload or drag and drop',
  hint,
  error,
  id,
  name,
  className,
}: FileUploadProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const describedBy = error
    ? `${fieldId}-error`
    : hint
      ? `${fieldId}-hint`
      : undefined

  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const emit = (list: FileList | null) => {
    if (!list) return
    const next = Array.from(list)
    setFiles(next)
    onFiles?.(next)
  }

  const onDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setDragging(false)
    if (disabled) return
    emit(event.dataTransfer.files)
  }

  const onDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!disabled) setDragging(true)
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <span className="text-sm font-medium text-text-primary">{label}</span>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={() => setDragging(false)}
        aria-describedby={describedBy}
        className={cn(
          'flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-8 text-center transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50',
          dragging
            ? 'border-yellow bg-yellow-tint'
            : error
              ? 'border-danger'
              : 'border-grey-2A bg-grey-1A hover:border-grey-44'
        )}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-grey-22 text-text-secondary">
          <UploadCloud
            className="h-6 w-6"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </span>
        <span className="text-sm font-medium text-text-primary">{prompt}</span>
        {hint && (
          <span id={`${fieldId}-hint`} className="text-xs text-text-secondary">
            {hint}
          </span>
        )}
      </button>

      <input
        ref={inputRef}
        id={fieldId}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={(e) => emit(e.target.files)}
      />

      {files.length > 0 && (
        <ul className="flex flex-col gap-1">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between gap-2 rounded-lg border border-grey-2A bg-grey-1A px-3 py-2 text-sm"
            >
              <span className="truncate text-text-primary">{file.name}</span>
              <span className="shrink-0 text-xs text-text-secondary">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p id={`${fieldId}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
