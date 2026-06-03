import { useState } from 'react'
import { Search, Mail } from 'lucide-react'
import { Input } from '../../../components/web/forms/Input'
import { Select } from '../../../components/web/forms/Select'
import { Toggle } from '../../../components/web/forms/Toggle'
import { Textarea } from '../../../components/web/forms/Textarea'
import { Checkbox } from '../../../components/web/forms/Checkbox'
import { Radio, RadioGroup } from '../../../components/web/forms/Radio'
import { Slider } from '../../../components/web/forms/Slider'
import { Combobox } from '../../../components/web/forms/Combobox'
import { OtpInput } from '../../../components/web/forms/OtpInput'
import { FileUpload } from '../../../components/web/forms/FileUpload'
import { Showcase, Row } from '../components/Showcase'

const SELECT_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
]

const COUNTRY_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
]

/** Input, Select, Toggle, Textarea, Checkbox, and Radio in controlled demos. */
export function FormsSection() {
  const [text, setText] = useState('')
  const [framework, setFramework] = useState('react')
  const [enabled, setEnabled] = useState(true)
  const [terms, setTerms] = useState(false)
  const [plan, setPlan] = useState('starter')
  const [search, setSearch] = useState('Edifice')
  const [volume, setVolume] = useState(60)
  const [country, setCountry] = useState('')
  const [otp, setOtp] = useState('')

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
          <Input
            label="With left icon"
            leftIcon={<Mail className="h-4 w-4" strokeWidth={1.75} />}
            placeholder="you@example.com"
          />
          <Input
            label="Search (clearable)"
            leftIcon={<Search className="h-4 w-4" strokeWidth={1.75} />}
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            clearable
            onClear={() => setSearch('')}
          />
        </div>
      </Showcase>

      <Showcase
        title="Textarea"
        source="components/web/forms/Textarea.tsx"
        description="Multi-line field with the same label/hint/error API as Input."
      >
        <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <Textarea label="Message" placeholder="How can we help?" hint="Max 500 characters." />
          <Textarea label="With error" error="This field is required." placeholder="…" />
        </div>
      </Showcase>

      <Showcase
        title="Select"
        source="components/web/forms/Select.tsx"
        description="Labeled dropdown with placeholder and error support."
      >
        <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <Select label="Framework" options={SELECT_OPTIONS} value={framework} onChange={setFramework} />
          <Select label="With placeholder" placeholder="Choose one…" options={SELECT_OPTIONS} />
        </div>
      </Showcase>

      <Showcase
        title="Checkbox"
        source="components/web/forms/Checkbox.tsx"
        description="Boolean control with indeterminate, error, and disabled states."
      >
        <Row>
          <Checkbox label="Accept terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Checked" checked readOnly />
          <Checkbox label="Disabled" disabled />
        </Row>
      </Showcase>

      <Showcase
        title="Radio"
        source="components/web/forms/Radio.tsx"
        description="Mutually-exclusive options grouped by RadioGroup (controlled)."
      >
        <RadioGroup
          label="Plan"
          value={plan}
          onChange={setPlan}
          hint="Pick the plan that fits your team."
          className="max-w-xs"
        >
          <Radio value="starter" label="Starter" />
          <Radio value="pro" label="Pro" />
          <Radio value="enterprise" label="Enterprise" />
        </RadioGroup>
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

      <Showcase
        title="Slider"
        source="components/web/forms/Slider.tsx"
        description="Labeled range input with a value readout; themed via accent-color."
      >
        <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
          <Slider
            label="Volume"
            value={volume}
            onChange={setVolume}
            formatValue={(v) => `${v}%`}
          />
          <Slider label="Disabled" defaultValue={40} disabled />
        </div>
      </Showcase>

      <Showcase
        title="Combobox"
        source="components/web/forms/Combobox.tsx"
        description="Searchable select — type to filter, then pick. Keyboard + click-outside."
      >
        <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <Combobox
            label="Country"
            options={COUNTRY_OPTIONS}
            value={country}
            onChange={setCountry}
            placeholder="Search countries…"
          />
          <Combobox
            label="With error"
            options={COUNTRY_OPTIONS}
            error="Please choose a country."
            placeholder="Search…"
          />
        </div>
      </Showcase>

      <Showcase
        title="OtpInput"
        source="components/web/forms/OtpInput.tsx"
        description="Segmented passcode entry — auto-advance, backspace nav, and paste-to-fill."
      >
        <Row label="6-digit (controlled)">
          <OtpInput value={otp} onChange={setOtp} />
        </Row>
        <Row label="4-digit, masked">
          <OtpInput length={4} masked />
        </Row>
      </Showcase>

      <Showcase
        title="FileUpload"
        source="components/web/forms/FileUpload.tsx"
        description="Click-or-drag dropzone over a hidden file input; lists selected files."
      >
        <div className="max-w-md">
          <FileUpload
            label="Attachments"
            multiple
            hint="PNG, JPG, or PDF up to 5MB"
            onFiles={() => {}}
          />
        </div>
      </Showcase>
    </div>
  )
}
