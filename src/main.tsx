import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Transactions } from './pages/transactions'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Transactions />
  </StrictMode>,
)
