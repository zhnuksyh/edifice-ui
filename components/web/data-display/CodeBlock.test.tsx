import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CodeBlock } from './CodeBlock'

describe('CodeBlock', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    })
  })

  it('renders the code and a filename header', () => {
    render(<CodeBlock code={'const a = 1'} filename="a.ts" />)
    expect(screen.getByText('a.ts')).toBeInTheDocument()
    expect(screen.getByText('const a = 1')).toBeInTheDocument()
  })

  it('renders line numbers when requested', () => {
    render(<CodeBlock code={'one\ntwo'} showLineNumbers />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('copies the code via the copy button', () => {
    render(<CodeBlock code={'copy me'} language="ts" />)
    fireEvent.click(screen.getByRole('button', { name: /copy/i }))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('copy me')
  })

  it('hides the copy button when not copyable', () => {
    render(<CodeBlock code={'x'} language="ts" copyable={false} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
