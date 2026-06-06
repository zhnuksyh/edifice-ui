import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FileUpload } from './FileUpload'

describe('FileUpload', () => {
  it('renders the prompt and hint', () => {
    render(<FileUpload label="Files" hint="PNG up to 5MB" />)
    expect(screen.getByText('Click to upload or drag and drop')).toBeInTheDocument()
    expect(screen.getByText('PNG up to 5MB')).toBeInTheDocument()
  })

  it('reports selected files via onFiles', () => {
    const onFiles = vi.fn()
    const { container } = render(<FileUpload label="Files" onFiles={onFiles} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['x'], 'a.png', { type: 'image/png' })
    fireEvent.change(input, { target: { files: [file] } })
    expect(onFiles).toHaveBeenCalledTimes(1)
    expect(onFiles.mock.calls[0][0][0].name).toBe('a.png')
  })

  it('shows an error message', () => {
    render(<FileUpload label="Files" error="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })
})
