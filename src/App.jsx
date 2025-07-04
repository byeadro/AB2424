import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import JournalFeed from './components/JournalFeed'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<JournalFeed />} />
      </Routes>
    </Router>
  )
}
