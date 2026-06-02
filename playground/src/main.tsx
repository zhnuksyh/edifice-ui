import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastProvider } from '../../components/web/ui/ToastProvider'
import { App } from './App'
import './index.css'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element #root not found')
}

createRoot(root).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>
)
