import React, { useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function NoteEditor() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!title || !content) {
      setError('Both title and content are required.')
      return
    }

    try {
      const entriesRef = collection(
        db,
        'users',
        auth.currentUser.uid,
        'entries'
      )
      await addDoc(entriesRef, {
        title,
        content,
        createdAt: serverTimestamp()
      })
      setTitle('')
      setContent('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 p-2 border rounded resize-none"
        rows={4}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Add Entry
      </button>
    </form>
  )
}
