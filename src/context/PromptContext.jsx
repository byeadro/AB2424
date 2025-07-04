import React, { createContext, useState, useEffect } from 'react'
import { prompts } from '../utils/prompts.js'

export const PromptContext = createContext({ prompt: '' })

export function PromptProvider({ children }) {
  const todayKey = new Date().toDateString()
  const [prompt, setPrompt] = useState('')

  useEffect(() => {
    const storedPrompt = localStorage.getItem('dailyPrompt')
    const storedDay = localStorage.getItem('promptDay')
    if (storedPrompt && storedDay === todayKey) {
      setPrompt(storedPrompt)
    } else {
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
      localStorage.setItem('dailyPrompt', randomPrompt)
      localStorage.setItem('promptDay', todayKey)
      setPrompt(randomPrompt)
    }
  }, [todayKey])

  return (
    <PromptContext.Provider value={{ prompt }}>
      {children}
    </PromptContext.Provider>
  )
}
