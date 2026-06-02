import { useState } from 'react'
import { Card } from '../../../components/web/ui/Card'
import { Accordion } from '../../../components/web/ui/Accordion'
import { Modal } from '../../../components/web/ui/Modal'
import { Toast } from '../../../components/web/ui/Toast'
import type { ToastVariant } from '../../../components/web/ui/Toast'
import { Alert } from '../../../components/web/ui/Alert'
import type { AlertVariant } from '../../../components/web/ui/Alert'
import { Progress } from '../../../components/web/ui/Progress'
import { Skeleton } from '../../../components/web/ui/Skeleton'
import { Breadcrumb } from '../../../components/web/ui/Breadcrumb'
import { Button } from '../../../components/web/ui/Button'
import { Showcase, Row } from '../components/Showcase'

const TOAST_VARIANTS: ToastVariant[] = ['success', 'warning', 'danger', 'info']
const ALERT_VARIANTS: AlertVariant[] = ['info', 'success', 'warning', 'danger']

const ACCORDION_ITEMS = [
  { id: 'a', title: 'What is Edifice?', content: 'A personal component library.' },
  { id: 'b', title: 'How do I use it?', content: 'Fetch components or use the MCP server.' },
  { id: 'c', title: 'Is it typed?', content: 'Yes — fully TypeScript.' },
]

/** Card, Accordion, Modal, and Toast. */
export function UISection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <Showcase
        title="Card"
        source="components/web/ui/Card.tsx"
        description="Surface container with optional header/footer and padding/shadow options."
      >
        <Row>
          <div className="w-64">
            <Card>Basic card with default padding and shadow.</Card>
          </div>
          <div className="w-64">
            <Card header="Card header" footer="Card footer">
              Card with a header and footer slot.
            </Card>
          </div>
          <div className="w-64">
            <Card shadow="xl" padding="lg">
              Larger padding, extra-large shadow.
            </Card>
          </div>
        </Row>
      </Showcase>

      <Showcase
        title="Accordion"
        source="components/web/ui/Accordion.tsx"
        description="Single-open by default; allowMultiple lets several panels open at once."
      >
        <Row label="Single open (default)">
          <div className="w-full max-w-md">
            <Accordion items={ACCORDION_ITEMS} defaultOpen="a" />
          </div>
        </Row>
        <Row label="Allow multiple">
          <div className="w-full max-w-md">
            <Accordion items={ACCORDION_ITEMS} allowMultiple defaultOpen={['a', 'b']} />
          </div>
        </Row>
      </Showcase>

      <Showcase
        title="Modal"
        source="components/web/ui/Modal.tsx"
        description="Closes on overlay click or Escape. Opened here via local state."
      >
        <Row>
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
        </Row>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example modal"
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </>
          }
        >
          This is the modal body. Click the overlay, press Escape, or use a button
          to close it.
        </Modal>
      </Showcase>

      <Showcase
        title="Toast"
        source="components/web/ui/Toast.tsx"
        description="Transient notification in four tones (auto-dismiss disabled here for display)."
      >
        <div className="flex max-w-md flex-col gap-3">
          {TOAST_VARIANTS.map((variant) => (
            <Toast key={variant} variant={variant} title={variant} duration={0}>
              This is a {variant} toast message.
            </Toast>
          ))}
        </div>
      </Showcase>

      <Showcase
        title="Alert"
        source="components/web/ui/Alert.tsx"
        description="Persistent in-page message in four tones; optionally dismissible."
      >
        <div className="flex max-w-md flex-col gap-3">
          {ALERT_VARIANTS.map((variant) => (
            <Alert key={variant} variant={variant} title={variant}>
              This is a persistent {variant} alert.
            </Alert>
          ))}
          <Alert variant="info" title="Dismissible" onDismiss={() => {}}>
            This one has a dismiss button.
          </Alert>
        </div>
      </Showcase>

      <Showcase
        title="Progress"
        source="components/web/ui/Progress.tsx"
        description="Linear bar — determinate (value) and indeterminate, three sizes."
      >
        <div className="flex max-w-md flex-col gap-4">
          <Progress value={30} />
          <Progress value={70} tone="success" size="lg" />
          <Progress value={90} tone="danger" size="sm" />
          <Progress label="Loading" />
        </div>
      </Showcase>

      <Showcase
        title="Skeleton"
        source="components/web/ui/Skeleton.tsx"
        description="Animated loading placeholders — text lines, circle, and block."
      >
        <div className="flex max-w-md items-start gap-4">
          <Skeleton variant="circle" width={48} height={48} />
          <div className="flex-1">
            <Skeleton variant="text" lines={3} />
          </div>
        </div>
        <div className="mt-4 max-w-md">
          <Skeleton variant="rect" height={120} />
        </div>
      </Showcase>

      <Showcase
        title="Breadcrumb"
        source="components/web/ui/Breadcrumb.tsx"
        description="Navigation trail; the last item is the current page."
      >
        <Breadcrumb
          items={[
            { label: 'Home', href: '#' },
            { label: 'Components', href: '#' },
            { label: 'Breadcrumb' },
          ]}
        />
      </Showcase>
    </div>
  )
}
