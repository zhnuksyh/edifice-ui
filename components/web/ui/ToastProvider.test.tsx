import { describe, it, expect, vi } from 'vitest'
import { render, screen, act, renderHook } from '@testing-library/react'
import { ToastProvider, useToast } from './ToastProvider'

describe('ToastProvider', () => {
  it('renders a toast fired imperatively via useToast', () => {
    function Trigger() {
      const { toast } = useToast()
      return <button onClick={() => toast({ description: 'Hello toast' })}>fire</button>
    }
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    )
    act(() => screen.getByText('fire').click())
    expect(screen.getByText('Hello toast')).toBeInTheDocument()
  })

  it('success() fires a success-variant toast', () => {
    function Trigger() {
      const { success } = useToast()
      return <button onClick={() => success('Saved')}>ok</button>
    }
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    )
    act(() => screen.getByText('ok').click())
    expect(screen.getByText('Saved')).toBeInTheDocument()
  })

  it('throws when useToast is used outside a provider', () => {
    // The hook throws during render; React (dev) also re-reports the error to
    // the host, which would otherwise leak into other test files. Capture and
    // swallow exactly that expected error for the duration of this test, and
    // silence the matching console.error noise.
    const onError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('must be used within a ToastProvider')) {
        event.preventDefault()
      }
    }
    window.addEventListener('error', onError)
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useToast())).toThrow(
      /must be used within a ToastProvider/
    )

    spy.mockRestore()
    window.removeEventListener('error', onError)
  })
})
