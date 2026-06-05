import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/** Turn a component title into a stable slug for selection + anchors. */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

interface RegisteredItem {
  slug: string
  title: string
}

interface SectionNavValue {
  /** Currently isolated component slug, or null for "show all". */
  activeSlug: string | null
  register: (item: RegisteredItem) => void
}

const SectionNavContext = createContext<SectionNavValue | null>(null)

/** Showcase blocks call this to add themselves to the section's component list. */
export function useSectionNav(): SectionNavValue {
  const ctx = useContext(SectionNavContext)
  if (!ctx) {
    throw new Error('useSectionNav must be used within a SectionNavProvider')
  }
  return ctx
}

interface SectionNavProviderProps {
  /** Resets the active selection when the section changes. */
  sectionId: string
  children: ReactNode
}

/**
 * Provides the per-section component list + isolation state. Renders a chip bar
 * (All + each registered component) above the section so a single component can
 * be isolated, shadcn-style, without rewriting the demos.
 */
export function SectionNavProvider({
  sectionId,
  children,
}: SectionNavProviderProps) {
  const [items, setItems] = useState<RegisteredItem[]>([])
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  // Reset selection + registry whenever we navigate to a different section.
  useEffect(() => {
    setItems([])
    setActiveSlug(null)
  }, [sectionId])

  const value = useMemo<SectionNavValue>(
    () => ({
      activeSlug,
      register: (item) =>
        setItems((prev) =>
          prev.some((p) => p.slug === item.slug) ? prev : [...prev, item]
        ),
    }),
    [activeSlug]
  )

  return (
    <SectionNavContext.Provider value={value}>
      {items.length > 1 && (
        <div className="mb-2 flex flex-wrap gap-2">
          <Chip
            active={activeSlug === null}
            onClick={() => setActiveSlug(null)}
          >
            All
          </Chip>
          {items.map((item) => (
            <Chip
              key={item.slug}
              active={activeSlug === item.slug}
              onClick={() => setActiveSlug(item.slug)}
            >
              {item.title}
            </Chip>
          ))}
        </div>
      )}
      {children}
    </SectionNavContext.Provider>
  )
}

interface ChipProps {
  active: boolean
  onClick: () => void
  children: ReactNode
}

function Chip({ active, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-fast ' +
        (active
          ? 'border-grey-44 bg-grey-22 text-grey-F0'
          : 'border-grey-2A bg-grey-1A text-grey-AA hover:border-grey-44 hover:text-grey-F0')
      }
    >
      {children}
    </button>
  )
}
