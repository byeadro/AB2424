import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'

export default function NavBar() {
  const { theme, toggle } = useContext(ThemeContext)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <header className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">My Journal</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggle}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button
          onClick={handleSignOut}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </header>
  )
}
