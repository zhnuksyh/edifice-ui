import { useState } from 'react'
import { Input } from '../../../components/web/forms/Input'
import { Select } from '../../../components/web/forms/Select'
import { Toggle } from '../../../components/web/forms/Toggle'
import { Showcase, Row } from '../components/Showcase'

const SELECT_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
]

/** Input, Select, and Toggle in controlled demo harnesses. */
export function FormsSection() {
  const [text, setText] = useState('')
  const [framework, setFramework] = useState('react')
  const [enabled, setEnabled] = useState(true)

  return (
    <div>
      <Showcase
        title="Input"
        source="components/web/forms/Input.tsx"
        description="Labeled text field with hint, error, and required states."
      >
        <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <Input
            label="Default"
            placeholder="Type here…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Input label="With hint" hint="We'll never share it." placeholder="you@example.com" />
          <Input label="Required" required placeholder="Required field" />
          <Input label="With error" error="This field is required." placeholder="Oops" />
        </div>
      </Showcase>

      <Showcase
        title="Select"
        source="components/web/forms/Select.tsx"
        description="Labeled dropdown with placeholder and error support."
      >
        <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <Select
            label="Framework"
            options={SELECT_OPTIONS}
            value={framework}
            onChange={setFramework}
          />
          <Select
            label="With placeholder"
            placeholder="Choose one…"
            options={SELECT_OPTIONS}
          />
        </div>
      </Showcase>

      <Showcase
        title="Toggle"
        source="components/web/forms/Toggle.tsx"
        description="Accessible on/off switch (controlled)."
      >
        <Row>
          <Toggle checked={enabled} onChange={setEnabled} label="Enable notifications" />
          <Toggle checked={false} onChange={() => {}} label="Off" />
          <Toggle checked disabled onChange={() => {}} label="Disabled (on)" />
        </Row>
      </Showcase>
    </div>
  )
}
