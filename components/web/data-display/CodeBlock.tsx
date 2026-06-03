import type { HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'
import { useClipboard } from '../../../hooks/useClipboard'

/** Lucide copy / check glyphs, inlined to avoid a runtime icon dependency. */
function CopyGlyph({ done }: { done: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-3.5 w-3.5', done && 'text-success')}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {done ? (
        <path d="M20 6 9 17l-5-5" />
      ) : (
        <>
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </>
      )}
    </svg>
  )
}

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** The code to display (and copy). */
  code: string
  /** Optional language label shown in the header (e.g. 'tsx'). */
  language?: string
  /** Optional filename shown in the header. */
  filename?: string
  /** Show the copy button. Defaults to true. */
  copyable?: boolean
  /** Show line numbers in the gutter. Defaults to false. */
  showLineNumbers?: boolean
}

/**
 * CodeBlock — a monospace code surface with an optional header and copy button.
 *
 * Not a syntax highlighter — it renders the code verbatim in a styled surface
 * with optional line numbers, a language/filename header, and copy-to-clipboard.
 */
export function CodeBlock({
  code,
  language,
  filename,
  copyable = true,
  showLineNumbers = false,
  className,
  ...rest
}: CodeBlockProps) {
  const { copy, copied } = useClipboard()
  const lines = code.replace(/\n$/, '').split('\n')
  const hasHeader = Boolean(filename || language || copyable)

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-grey-2A bg-grey-0A',
        className
      )}
      {...rest}
    >
      {hasHeader && (
        <div className="flex items-center justify-between border-b border-grey-2A bg-grey-11 px-4 py-2">
          <span className="font-mono text-xs text-text-muted">
            {filename ?? language ?? ''}
          </span>
          {copyable && (
            <button
              type="button"
              onClick={() => copy(code)}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-grey-22 hover:text-text-primary"
              aria-label={copied ? 'Copied' : 'Copy code'}
            >
              <CopyGlyph done={copied} />
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-text-primary">
          {lines.map((line, i) => (
            <div key={i} className="table-row">
              {showLineNumbers && (
                <span className="table-cell select-none pr-4 text-right text-text-muted">
                  {i + 1}
                </span>
              )}
              <span className="table-cell whitespace-pre">{line || ' '}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
