import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode className="bg-gray-100 dark:bg-gray-600 text-black dark:text-white min-h-screen flex flex-col md:flex-row items-center justify-center" >
    <App />
  </StrictMode>,
)
