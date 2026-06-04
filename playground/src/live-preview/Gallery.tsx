import { useState, type ReactNode } from 'react'
import { Button } from '../../../components/web/ui/Button'
import { Badge } from '../../../components/web/ui/Badge'
import { Avatar, AvatarGroup } from '../../../components/web/ui/Avatar'
import { Spinner } from '../../../components/web/ui/Spinner'
import { Card } from '../../../components/web/ui/Card'
import { Alert } from '../../../components/web/ui/Alert'
import { Tabs } from '../../../components/web/ui/Tabs'
import { Accordion } from '../../../components/web/ui/Accordion'
import { Modal } from '../../../components/web/ui/Modal'
import { Tooltip } from '../../../components/web/ui/Tooltip'
import { Toast } from '../../../components/web/ui/Toast'
import { Input } from '../../../components/web/forms/Input'
import { Select } from '../../../components/web/forms/Select'
import { Toggle } from '../../../components/web/forms/Toggle'
import { Section, SectionIntro, type } from './primitives'
import {
  buttonExtraClass,
  buttonVariant,
  type LivePreviewState,
} from './config'

/** A labeled cell wrapping one component demo. */
function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span style={{ ...type.label, color: 'var(--lp-text-muted)' }}>{label}</span>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        {children}
      </div>
    </div>
  )
}

/** A responsive grid of cells under a heading. */
function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h3 style={{ ...type.h3, color: 'var(--lp-text)', marginBottom: 24 }}>{title}</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 32,
        }}
      >
        {children}
      </div>
    </div>
  )
}

const SELECT_OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

const TAB_ITEMS = [
  { value: 'one', label: 'Overview', content: <p style={{ color: 'var(--lp-text-secondary)' }}>Overview panel.</p> },
  { value: 'two', label: 'Activity', content: <p style={{ color: 'var(--lp-text-secondary)' }}>Activity panel.</p> },
  { value: 'three', label: 'Settings', content: <p style={{ color: 'var(--lp-text-secondary)' }}>Settings panel.</p> },
]

const ACCORDION_ITEMS = [
  { id: '1', title: 'What is Edifice?', content: 'A personal component & design library.' },
  { id: '2', title: 'Is it themeable?', content: 'Yes — every surface re-themes live.' },
]

/**
 * Gallery — every Edifice component grouped by category, rendered with the real
 * library components so they re-theme live via the `.lp-root` switcher. Sits
 * below the landing page in Live Preview. Playground-only.
 */
export function Gallery({ state }: { state: LivePreviewState }) {
  const variant = buttonVariant(state.buttonStyle)
  const extra = buttonExtraClass(state.buttonStyle)

  const [toggle, setToggle] = useState(true)
  const [select, setSelect] = useState('a')
  const [modalOpen, setModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)

  return (
    <Section size="large" tone="bg" bordered>
      <SectionIntro
        label="Component gallery"
        heading="Every component, live-themed"
        subheading="The same switcher above drives all of these. Toggle a preset, radius, or button style and watch them re-theme."
      />

      {/* ---------- Buttons ---------- */}
      <Group title="Buttons">
        <Cell label="Switcher style">
          <Button variant={variant} className={extra}>Primary</Button>
          <Button variant={variant} className={extra} disabled>Disabled</Button>
        </Cell>
        <Cell label="Variants">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Cell>
        <Cell label="Sizes">
          <Button variant={variant} size="sm" className={extra}>Small</Button>
          <Button variant={variant} size="md" className={extra}>Medium</Button>
          <Button variant={variant} size="lg" className={extra}>Large</Button>
        </Cell>
        <Cell label="Loading">
          <Button variant={variant} className={extra} loading>Saving</Button>
        </Cell>
      </Group>

      {/* ---------- Badges & Avatars ---------- */}
      <Group title="Badges & Avatars">
        <Cell label="Badge variants">
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
        </Cell>
        <Cell label="Badge pills">
          <Badge variant="info" pill>Info</Badge>
          <Badge variant="warning" pill>Warning</Badge>
          <Badge variant="purple" pill>Purple</Badge>
        </Cell>
        <Cell label="Avatars">
          <Avatar name="Ada Lovelace" />
          <Avatar name="Grace Hopper" size="lg" />
          <Avatar />
        </Cell>
        <Cell label="Avatar group">
          <AvatarGroup max={3}>
            <Avatar name="Ada Lovelace" />
            <Avatar name="Grace Hopper" />
            <Avatar name="Alan Turing" />
            <Avatar name="Edsger Dijkstra" />
            <Avatar name="Donald Knuth" />
          </AvatarGroup>
        </Cell>
      </Group>

      {/* ---------- Feedback ---------- */}
      <Group title="Feedback">
        <Cell label="Spinners">
          <Spinner tone="primary" />
          <Spinner tone="neutral" />
          <Spinner tone="purple" size="lg" />
        </Cell>
        <Cell label="Alerts">
          <Alert variant="info" title="Heads up">A persistent in-page notice.</Alert>
        </Cell>
        <Cell label="Toast">
          <Button variant={variant} className={extra} onClick={() => setShowToast((s) => !s)}>
            Toggle toast
          </Button>
          {showToast && (
            <Toast variant="success" title="Saved" duration={0} onClose={() => setShowToast(false)}>
              Your changes were saved.
            </Toast>
          )}
        </Cell>
      </Group>

      {/* ---------- Forms ---------- */}
      <Group title="Forms">
        <Cell label="Input">
          <Input label="Email" placeholder="you@example.com" />
        </Cell>
        <Cell label="Input with error">
          <Input label="Email" defaultValue="nope" error="Invalid email" />
        </Cell>
        <Cell label="Select">
          <Select label="Plan" options={SELECT_OPTIONS} value={select} onChange={setSelect} />
        </Cell>
        <Cell label="Toggle">
          <Toggle checked={toggle} onChange={setToggle} label="Notifications" />
        </Cell>
      </Group>

      {/* ---------- Disclosure & overlays ---------- */}
      <Group title="Disclosure & overlays">
        <Cell label="Tabs">
          <div style={{ width: '100%' }}>
            <Tabs items={TAB_ITEMS} />
          </div>
        </Cell>
        <Cell label="Accordion">
          <div style={{ width: '100%' }}>
            <Accordion items={ACCORDION_ITEMS} />
          </div>
        </Cell>
        <Cell label="Tooltip">
          <Tooltip content="Helpful hint">
            <Button variant="secondary">Hover me</Button>
          </Tooltip>
        </Cell>
        <Cell label="Modal">
          <Button variant={variant} className={extra} onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm action"
            footer={
              <>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant={variant} className={extra} onClick={() => setModalOpen(false)}>Confirm</Button>
              </>
            }
          >
            This modal re-themes live with the switcher.
          </Modal>
        </Cell>
      </Group>

      {/* ---------- Surfaces ---------- */}
      <Group title="Surfaces">
        <Cell label="Card">
          <Card header="Card title" footer="Card footer">
            A surface container with header and footer slots.
          </Card>
        </Cell>
        <Cell label="Interactive card">
          <Card interactive>Hover to brighten the border.</Card>
        </Cell>
      </Group>
    </Section>
  )
}
