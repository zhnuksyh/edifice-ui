import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { useClickOutside } from './useClickOutside'

function Harness({
  onOutside,
  enabled,
}: {
  onOutside: () => void
  enabled?: boolean
}) {
  const ref = useClickOutside<HTMLDivElement>(onOutside, enabled)
  return (
    <div>
      <div ref={ref} data-testid="inside">
        inside
      </div>
      <button data-testid="outside">outside</button>
    </div>
  )
}

describe('useClickOutside', () => {
  it('fires when clicking outside the ref element', () => {
    const onOutside = vi.fn()
    const { getByTestId } = render(<Harness onOutside={onOutside} />)
    getByTestId('outside').dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    )
    expect(onOutside).toHaveBeenCalledTimes(1)
  })

  it('does not fire when clicking inside the ref element', () => {
    const onOutside = vi.fn()
    const { getByTestId } = render(<Harness onOutside={onOutside} />)
    getByTestId('inside').dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    )
    expect(onOutside).not.toHaveBeenCalled()
  })

  it('does not fire when disabled', () => {
    const onOutside = vi.fn()
    const { getByTestId } = render(
      <Harness onOutside={onOutside} enabled={false} />
    )
    getByTestId('outside').dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    )
    expect(onOutside).not.toHaveBeenCalled()
  })
})
