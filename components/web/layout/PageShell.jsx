import { cn } from '../../../utils/cn.js'

/**
 * PageShell — top-level page wrapper that composes a navbar, main content
 * area, and footer into a full-height column.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} [props.navbar] - Rendered above the content.
 * @param {import('react').ReactNode} [props.footer] - Rendered below the content.
 * @param {boolean} [props.contained=true] - Constrain main content to a centered
 *   max-width container with gutters.
 * @param {import('react').ReactNode} props.children - Main page content.
 * @param {string} [props.className] - Extra classes merged onto <main> via cn().
 * @returns {JSX.Element}
 */
export function PageShell({
  navbar,
  footer,
  contained = true,
  children,
  className,
  ...rest
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      {navbar}
      <main
        className={cn(
          'flex-1',
          contained && 'mx-auto w-full max-w-screen-xl px-6 py-12',
          className
        )}
        {...rest}
      >
        {children}
      </main>
      {footer}
    </div>
  )
}
