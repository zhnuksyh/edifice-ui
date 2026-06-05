import { useState } from 'react'
import { Card } from '../../../components/web/ui/Card'
import type { CardStyleVariant } from '../../../components/web/ui/Card'
import { Accordion } from '../../../components/web/ui/Accordion'
import { Modal } from '../../../components/web/ui/Modal'
import type { ModalStyleVariant } from '../../../components/web/ui/Modal'
import { Toast } from '../../../components/web/ui/Toast'
import type {
  ToastVariant,
  ToastStyleVariant,
} from '../../../components/web/ui/Toast'
import { Alert } from '../../../components/web/ui/Alert'
import type {
  AlertVariant,
  AlertStyleVariant,
} from '../../../components/web/ui/Alert'
import { Progress } from '../../../components/web/ui/Progress'
import { Skeleton } from '../../../components/web/ui/Skeleton'
import { Breadcrumb } from '../../../components/web/ui/Breadcrumb'
import { Pagination } from '../../../components/web/ui/Pagination'
import { EmptyState } from '../../../components/web/ui/EmptyState'
import { Divider } from '../../../components/web/ui/Divider'
import { Kbd } from '../../../components/web/ui/Kbd'
import { Drawer } from '../../../components/web/ui/Drawer'
import type {
  DrawerSide,
  DrawerStyleVariant,
} from '../../../components/web/ui/Drawer'
import { Stepper } from '../../../components/web/ui/Stepper'
import { Rating } from '../../../components/web/ui/Rating'
import { Inbox } from 'lucide-react'
import { Button } from '../../../components/web/ui/Button'
import { useToast } from '../../../components/web/ui/ToastProvider'
import { Showcase, Row } from '../components/Showcase'

const TOAST_VARIANTS: ToastVariant[] = ['success', 'warning', 'danger', 'info']
const TOAST_STYLE_VARIANTS: ToastStyleVariant[] = ['soft', 'solid', 'outline']
const ALERT_VARIANTS: AlertVariant[] = ['info', 'success', 'warning', 'danger']
const ALERT_STYLE_VARIANTS: AlertStyleVariant[] = ['soft', 'solid', 'outline']
const CARD_STYLE_VARIANTS: CardStyleVariant[] = ['elevated', 'outlined', 'ghost']
const MODAL_STYLE_VARIANTS: ModalStyleVariant[] = [
  'centered',
  'sheet',
  'fullscreen',
]

const ACCORDION_ITEMS = [
  { id: 'a', title: 'What is Edifice?', content: 'A personal component library.' },
  { id: 'b', title: 'How do I use it?', content: 'Fetch components or use the MCP server.' },
  { id: 'c', title: 'Is it typed?', content: 'Yes — fully TypeScript.' },
]

const STEPPER_STEPS = [
  { id: '1', label: 'Account', description: 'Your details' },
  { id: '2', label: 'Payment', description: 'Billing info' },
  { id: '3', label: 'Confirm', description: 'Review & submit' },
]

const DRAWER_SIDES: DrawerSide[] = ['left', 'right', 'top', 'bottom']
const DRAWER_STYLE_VARIANTS: DrawerStyleVariant[] = ['overlay', 'flush']

/** Card, Accordion, Modal, and Toast. */
export function UISection() {
  const [modalStyle, setModalStyle] = useState<ModalStyleVariant | null>(null)
  const [page, setPage] = useState(1)
  const [drawerSide, setDrawerSide] = useState<DrawerSide | null>(null)
  const [drawerStyle, setDrawerStyle] = useState<DrawerStyleVariant>('overlay')
  const [step, setStep] = useState(1)
  const [rating, setRating] = useState(3)
  const { toast, success, error } = useToast()

  return (
    <div>
      <Showcase
        title="Card"
        source="components/web/ui/Card.tsx"
        description="Surface container with optional header/footer. Three styleVariant treatments; shadow/padding still configurable."
      >
        <Row label="styleVariant (elevated · outlined · ghost)">
          {CARD_STYLE_VARIANTS.map((styleVariant) => (
            <div key={styleVariant} className="w-64">
              <Card styleVariant={styleVariant} header={styleVariant}>
                {styleVariant} treatment.
              </Card>
            </div>
          ))}
        </Row>
        <Row label="Header/footer + overrides">
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
        description="Closes on overlay click or Escape. Three styleVariant looks: centered, sheet, fullscreen."
      >
        <Row label="styleVariant">
          {MODAL_STYLE_VARIANTS.map((styleVariant) => (
            <Button
              key={styleVariant}
              variant="secondary"
              onClick={() => setModalStyle(styleVariant)}
            >
              Open {styleVariant}
            </Button>
          ))}
        </Row>
        <Modal
          isOpen={modalStyle !== null}
          onClose={() => setModalStyle(null)}
          styleVariant={modalStyle ?? 'centered'}
          title={`Example modal (${modalStyle ?? 'centered'})`}
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalStyle(null)}>
                Cancel
              </Button>
              <Button onClick={() => setModalStyle(null)}>Confirm</Button>
            </>
          }
        >
          This is the modal body. Click the overlay, press Escape, or use a button
          to close it.
        </Modal>
      </Showcase>

      <Showcase
        title="Drawer"
        source="components/web/ui/Drawer.tsx"
        description="Panel that slides in from any edge. Closes on overlay click or Escape. Two backdrop treatments."
      >
        <Row label="Sides (overlay)">
          {DRAWER_SIDES.map((side) => (
            <Button
              key={side}
              variant="ghost"
              onClick={() => {
                setDrawerStyle('overlay')
                setDrawerSide(side)
              }}
            >
              Open {side}
            </Button>
          ))}
        </Row>
        <Row label="styleVariant (right)">
          {DRAWER_STYLE_VARIANTS.map((styleVariant) => (
            <Button
              key={styleVariant}
              variant="secondary"
              onClick={() => {
                setDrawerStyle(styleVariant)
                setDrawerSide('right')
              }}
            >
              Open {styleVariant}
            </Button>
          ))}
        </Row>
        <Drawer
          isOpen={drawerSide !== null}
          onClose={() => setDrawerSide(null)}
          side={drawerSide ?? 'right'}
          styleVariant={drawerStyle}
          title={`Drawer (${drawerStyle})`}
          footer={
            <>
              <Button variant="ghost" onClick={() => setDrawerSide(null)}>
                Cancel
              </Button>
              <Button onClick={() => setDrawerSide(null)}>Save</Button>
            </>
          }
        >
          Slide-in panel content. Click the overlay, press Escape, or use a button
          to close it.
        </Drawer>
      </Showcase>

      <Showcase
        title="Stepper"
        source="components/web/ui/Stepper.tsx"
        description="Numbered progress for multi-step flows; completed steps show a check."
      >
        <Row label="Horizontal">
          <div className="w-full max-w-lg">
            <Stepper steps={STEPPER_STEPS} current={step} />
          </div>
        </Row>
        <Row>
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          <Button
            onClick={() => setStep((s) => Math.min(STEPPER_STEPS.length - 1, s + 1))}
            disabled={step === STEPPER_STEPS.length - 1}
          >
            Next
          </Button>
        </Row>
        <Row label="Vertical">
          <div className="max-w-xs">
            <Stepper steps={STEPPER_STEPS} current={step} orientation="vertical" />
          </div>
        </Row>
      </Showcase>

      <Showcase
        title="Rating"
        source="components/web/ui/Rating.tsx"
        description="Star rating — interactive (with hover preview) or read-only."
      >
        <Row label="Interactive">
          <Rating value={rating} onChange={setRating} />
          <span className="text-sm text-text-secondary">{rating} / 5</span>
        </Row>
        <Row label="Sizes (read-only)">
          <Rating value={4} size="sm" readOnly />
          <Rating value={4} size="md" readOnly />
          <Rating value={4} size="lg" readOnly />
        </Row>
      </Showcase>

      <Showcase
        title="Toast"
        source="components/web/ui/Toast.tsx"
        description="Transient notification; four tones × three styleVariant treatments (auto-dismiss disabled here for display)."
      >
        {TOAST_STYLE_VARIANTS.map((styleVariant) => (
          <Row key={styleVariant} label={styleVariant}>
            <div className="flex w-full max-w-md flex-col gap-3">
              {TOAST_VARIANTS.map((variant) => (
                <Toast
                  key={variant}
                  variant={variant}
                  styleVariant={styleVariant}
                  title={variant}
                  duration={0}
                >
                  This is a {styleVariant} {variant} toast.
                </Toast>
              ))}
            </div>
          </Row>
        ))}
      </Showcase>

      <Showcase
        title="useToast (provider)"
        source="components/web/ui/ToastProvider.tsx"
        description="Fire toasts imperatively from anywhere under ToastProvider; they queue and auto-dismiss."
      >
        <Row>
          <Button onClick={() => success('Changes saved.')}>Success toast</Button>
          <Button variant="danger" onClick={() => error('Something went wrong.')}>
            Error toast
          </Button>
          <Button
            variant="ghost"
            onClick={() => toast({ title: 'Heads up', description: 'A neutral info toast.', variant: 'info' })}
          >
            Info toast
          </Button>
        </Row>
      </Showcase>

      <Showcase
        title="Alert"
        source="components/web/ui/Alert.tsx"
        description="Persistent in-page message; four tones × three styleVariant treatments, optionally dismissible."
      >
        {ALERT_STYLE_VARIANTS.map((styleVariant) => (
          <Row key={styleVariant} label={styleVariant}>
            <div className="flex w-full max-w-md flex-col gap-3">
              {ALERT_VARIANTS.map((variant) => (
                <Alert
                  key={variant}
                  variant={variant}
                  styleVariant={styleVariant}
                  title={variant}
                >
                  This is a {styleVariant} {variant} alert.
                </Alert>
              ))}
            </div>
          </Row>
        ))}
        <Row label="Dismissible">
          <div className="w-full max-w-md">
            <Alert variant="info" title="Dismissible" onDismiss={() => {}}>
              This one has a dismiss button.
            </Alert>
          </div>
        </Row>
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

      <Showcase
        title="Pagination"
        source="components/web/ui/Pagination.tsx"
        description="Page navigation with prev/next and ellipsis-truncated page numbers."
      >
        <Pagination page={page} pageCount={12} onPageChange={setPage} />
      </Showcase>

      <Showcase
        title="EmptyState"
        source="components/web/ui/EmptyState.tsx"
        description="Placeholder for empty / no-results views, with an optional action."
      >
        <div className="max-w-md">
          <EmptyState
            icon={<Inbox className="h-6 w-6" strokeWidth={1.75} />}
            title="No messages yet"
            description="When you receive messages, they'll show up here."
            action={<Button>Compose</Button>}
          />
        </div>
      </Showcase>

      <Showcase
        title="Divider"
        source="components/web/ui/Divider.tsx"
        description="Horizontal or vertical separator, optionally with a centered label."
      >
        <div className="max-w-md space-y-4">
          <Divider />
          <Divider label="or" />
          <div className="flex h-8 items-center text-sm text-text-secondary">
            <span>Left</span>
            <Divider orientation="vertical" />
            <span>Right</span>
          </div>
        </div>
      </Showcase>

      <Showcase
        title="Kbd"
        source="components/web/ui/Kbd.tsx"
        description="Keyboard key caps for documenting shortcuts."
      >
        <Row>
          <span className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
          <span className="flex items-center gap-1">
            <Kbd size="sm">Ctrl</Kbd>
            <Kbd size="sm">C</Kbd>
          </span>
          <Kbd>Esc</Kbd>
        </Row>
      </Showcase>
    </div>
  )
}
