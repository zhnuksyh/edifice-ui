# Error Handling

A consistent strategy across three boundaries: **API calls**, **component
rendering**, and **form validation**. Each boundary has one canonical pattern.

## 1. API errors

All API failures surface as a typed `ApiError` thrown from the service layer
(see [`api-layer.md`](./api-layer.md)). Callers branch on `error.status`.

```js
import { ApiError } from '@/lib/api/client'

try {
  await updateUser(id, patch)
} catch (err) {
  if (err instanceof ApiError && err.status === 409) {
    showToast({ variant: 'warning', message: 'That email is already taken.' })
  } else {
    showToast({ variant: 'danger', message: 'Something went wrong. Try again.' })
  }
}
```

Rules:

- Never swallow an error silently. Either handle it (show feedback, retry) or
  rethrow.
- Map status codes to user-facing messages at the call site, not in the service.
- Use the Edifice `Toast` component for transient feedback.

## 2. Component errors

Wrap route- or feature-level subtrees in an **error boundary** so a render-time
crash degrades gracefully instead of blanking the app.

```jsx
// src/components/ErrorBoundary.jsx
import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Forward to your monitoring service here.
    console.error('Render error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <p>Something went wrong.</p>
    }
    return this.props.children
  }
}
```

Rules:

- One boundary per route, plus optional finer-grained boundaries around risky
  widgets (charts, embeds, third-party content).
- Always provide a meaningful `fallback` — never a blank screen.
- In Next.js App Router, use `error.jsx` / `global-error.jsx` files instead of a
  custom class boundary; the contract is the same.

## 3. Form validation

Validate on submit, surface field-level errors through the component's `error`
prop. Edifice `Input` and `Select` render `error` text and invalid styling
automatically.

```jsx
function validate(values) {
  const errors = {}
  if (!values.email) errors.email = 'Email is required.'
  else if (!/^[^@]+@[^@]+$/.test(values.email))
    errors.email = 'Enter a valid email.'
  return errors
}

function ContactForm() {
  const [values, setValues] = useState({ email: '' })
  const [errors, setErrors] = useState({})

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    // submit...
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        error={errors.email}
      />
    </form>
  )
}
```

Rules:

- Validate the whole form on submit; optionally re-validate a field on blur.
- Field errors are strings passed to the field's `error` prop. Never use
  `alert()`.
- Disable the submit button while a request is in flight to prevent double
  submits.

## The three states rule

Every data-driven view handles **loading**, **empty**, and **error** explicitly
— never just the happy path.

```jsx
if (error) return <ErrorState message={error.message} />
if (loading) return <Spinner />
if (items.length === 0) return <EmptyState />
return <List items={items} />
```
