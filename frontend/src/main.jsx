import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App className="bg-gray-100 min-h-screen flex flex-col md:flex-row items-center justify-center" />
  </StrictMode>,
)
