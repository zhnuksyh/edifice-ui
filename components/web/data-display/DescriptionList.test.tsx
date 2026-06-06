import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DescriptionList } from './DescriptionList'

const ITEMS = [
  { id: 'name', term: 'Name', description: 'Edifice' },
  { id: 'version', term: 'Version', description: 'v0.1.0' },
]

describe('DescriptionList', () => {
  it('renders each term and description', () => {
    render(<DescriptionList items={ITEMS} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Edifice')).toBeInTheDocument()
    expect(screen.getByText('Version')).toBeInTheDocument()
    expect(screen.getByText('v0.1.0')).toBeInTheDocument()
  })

  it('renders nothing when there are no items', () => {
    const { container } = render(<DescriptionList items={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
})
