import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleEmailSignIn = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/feed')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      navigate('/feed')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleEmailSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="relative mb-6">
            <input
              type={show ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {show ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition mb-4"
          >
            Sign In
          </button>
        </form>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition mb-4"
        >
          Sign in with Google
        </button>
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}
