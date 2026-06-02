# API Layer

How to structure API calls. The rule is simple: **components never call `fetch`
directly.** All network access goes through a service layer — one module per
domain.

## Why

- Components stay focused on rendering, not data plumbing.
- Request/response shapes and error handling live in one place per domain.
- Swapping the transport (fetch → axios → tRPC) touches one file, not fifty.
- Agents always know where to add or find a call.

## Structure

```
src/lib/api/
├── client.js          # Single configured HTTP client (base URL, headers, interceptors)
├── users.js           # User domain: getUser, listUsers, updateUser, ...
├── posts.js           # Post domain
└── billing.js         # Billing domain
```

## The shared client

One place that knows the base URL, default headers, and how to turn a non-OK
response into a thrown error.

```js
// src/lib/api/client.js
const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

async function request(path, { method = 'GET', body, headers, signal } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  })

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText)
    throw new ApiError(message, res.status)
  }

  return res.status === 204 ? null : res.json()
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  delete: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
}
```

## A domain service

```js
// src/lib/api/users.js
import { api } from './client.js'

export function getUser(id) {
  return api.get(`/users/${id}`)
}

export function listUsers(params = {}) {
  const query = new URLSearchParams(params).toString()
  return api.get(`/users?${query}`)
}

export function updateUser(id, patch) {
  return api.patch(`/users/${id}`, patch)
}
```

## Consuming in components

Call services from hooks or data-fetching boundaries — never inline `fetch`.

```jsx
import { getUser } from '@/lib/api/users'

function useUser(id) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    getUser(id)
      .then((data) => active && setUser(data))
      .catch((err) => active && setError(err))
    return () => {
      active = false
    }
  }, [id])

  return { user, error }
}
```

If the project uses TanStack Query, the service functions become the
`queryFn`/`mutationFn` — the structure does not change.

## Rules

- One file per domain in `src/lib/api/`. Name it after the domain (`users.js`).
- Export named functions, one per endpoint. No default exports.
- Throw a typed `ApiError` on failure — never return `{ error }` ad hoc.
- Never call `fetch` from inside a component or a JSX file.
- Keep request/response transformation in the service, not the component.
