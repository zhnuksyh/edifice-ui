import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FAQSection } from './FAQSection'

const ITEMS = [
  { question: 'What is it?', answer: 'A library.' },
  { question: 'Is it free?', answer: 'Yes.' },
]

describe('FAQSection', () => {
  it('renders a default title and the questions', () => {
    render(<FAQSection items={ITEMS} />)
    expect(screen.getByText('Frequently asked questions')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'What is it?' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Is it free?' })).toBeInTheDocument()
  })

  it('honors a custom title and subtitle', () => {
    render(<FAQSection title="Questions" subtitle="Answers below" items={ITEMS} />)
    expect(screen.getByText('Questions')).toBeInTheDocument()
    expect(screen.getByText('Answers below')).toBeInTheDocument()
  })
})
