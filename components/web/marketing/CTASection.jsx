import { cn } from '../../../utils/cn.js'

/**
 * CTASection — bold call-to-action band, typically near the page bottom.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.title - CTA headline.
 * @param {import('react').ReactNode} [props.subtitle] - Supporting line.
 * @param {import('react').ReactNode} [props.actions] - CTA buttons.
 * @param {boolean} [props.inverted=true] - Use the dark, high-contrast variant.
 * @param {string} [props.className] - Extra classes merged via cn().
 * @returns {JSX.Element}
 */
export function CTASection({
  title,
  subtitle,
  actions,
  inverted = true,
  className,
  ...rest
}) {
  return (
    <section
      className={cn(
        'py-20',
        inverted ? 'bg-primary-700' : 'bg-surface',
        className
      )}
      {...rest}
    >
      <div className="mx-auto max-w-screen-md px-6 text-center">
        <h2
          className={cn(
            'text-3xl font-bold sm:text-4xl',
            inverted ? 'text-text-inverse' : 'text-text-primary'
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'mx-auto mt-4 max-w-2xl text-lg',
              inverted ? 'text-primary-100' : 'text-text-secondary'
            )}
          >
            {subtitle}
          </p>
        )}
        {actions && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {actions}
          </div>
        )}
      </div>
    </section>
  )
}
