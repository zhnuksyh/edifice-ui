import { Stat } from '../../../components/web/data-display/Stat'
import { Timeline } from '../../../components/web/data-display/Timeline'
import { CodeBlock } from '../../../components/web/data-display/CodeBlock'
import { DescriptionList } from '../../../components/web/data-display/DescriptionList'
import { Users, GitCommit, Rocket, AlertTriangle } from 'lucide-react'
import { Showcase, Row } from '../components/Showcase'

const TIMELINE_ITEMS = [
  {
    id: '1',
    title: 'Deployed to production',
    time: '2 hours ago',
    description: 'Release v2.4.0 shipped to all regions.',
    tone: 'success' as const,
    icon: <Rocket className="h-2.5 w-2.5" strokeWidth={2} />,
  },
  {
    id: '2',
    title: 'Build passed',
    time: '3 hours ago',
    tone: 'primary' as const,
    icon: <GitCommit className="h-2.5 w-2.5" strokeWidth={2} />,
  },
  {
    id: '3',
    title: 'Warning: flaky test',
    time: 'Yesterday',
    description: 'integration/auth retried twice before passing.',
    tone: 'warning' as const,
    icon: <AlertTriangle className="h-2.5 w-2.5" strokeWidth={2} />,
  },
  {
    id: '4',
    title: 'Branch created',
    time: '2 days ago',
  },
]

const DETAILS = [
  { id: 'name', term: 'Name', description: 'Edifice' },
  { id: 'version', term: 'Version', description: 'v0.1.0' },
  { id: 'license', term: 'License', description: 'MIT' },
  { id: 'lang', term: 'Language', description: 'TypeScript' },
]

const SAMPLE_CODE = `import { Stat } from '@/components/web/data-display/Stat'

export function Overview() {
  return (
    <Stat label="Revenue" value="$48,200" delta="+12.5%" trend="up" />
  )
}`

/** Stat, Timeline, CodeBlock, and DescriptionList. */
export function DataDisplaySection() {
  return (
    <div>
      <Showcase
        title="Stat"
        source="components/web/data-display/Stat.tsx"
        description="A single key metric with an optional trend delta. Compose in a grid for dashboards."
      >
        <div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat
            label="Monthly revenue"
            value="$48,200"
            delta="+12.5%"
            trend="up"
            hint="vs last month"
          />
          <Stat
            label="Active users"
            value="1,204"
            delta="-3.2%"
            trend="down"
            icon={<Users className="h-4 w-4" strokeWidth={1.75} />}
          />
          <Stat label="Open issues" value="37" delta="No change" trend="neutral" />
        </div>
      </Showcase>

      <Showcase
        title="Timeline"
        source="components/web/data-display/Timeline.tsx"
        description="A vertical sequence of events connected by a rail; toned dots, optional icons and bodies."
      >
        <div className="max-w-md">
          <Timeline items={TIMELINE_ITEMS} />
        </div>
      </Showcase>

      <Showcase
        title="CodeBlock"
        source="components/web/data-display/CodeBlock.tsx"
        description="A monospace code surface with a language/filename header, copy button, and optional line numbers."
      >
        <Row label="With filename + line numbers">
          <div className="w-full max-w-2xl">
            <CodeBlock code={SAMPLE_CODE} filename="overview.tsx" showLineNumbers />
          </div>
        </Row>
        <Row label="Language label only">
          <div className="w-full max-w-2xl">
            <CodeBlock code={`npm install @edifice/ui`} language="bash" />
          </div>
        </Row>
      </Showcase>

      <Showcase
        title="DescriptionList"
        source="components/web/data-display/DescriptionList.tsx"
        description="Key/value pairs for detail and summary views, in row or stacked layout."
      >
        <Row label="Row layout (default)">
          <div className="w-full max-w-md">
            <DescriptionList items={DETAILS} />
          </div>
        </Row>
        <Row label="Stacked layout">
          <div className="w-full max-w-md">
            <DescriptionList items={DETAILS} layout="stacked" />
          </div>
        </Row>
      </Showcase>
    </div>
  )
}
