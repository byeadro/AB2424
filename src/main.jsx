import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { ThemeProvider } from './context/ThemeContext'
import { PromptProvider } from './context/PromptContext'

const container = document.getElementById('root')
createRoot(container).render(
  <ThemeProvider>
    <PromptProvider>
      <App />
    </PromptProvider>
  </ThemeProvider>
)
