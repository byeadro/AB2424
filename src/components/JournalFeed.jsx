import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebaseConfig'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import JournalEntry from './JournalEntry'
import NoteEditor from './NoteEditor'

export default function JournalFeed() {
  const [entries, setEntries] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/')
      return
    }
    const entriesRef = collection(
      db,
      'users',
      auth.currentUser.uid,
      'entries'
    )
    const q = query(entriesRef, orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setEntries(items)
    })
    return unsubscribe
  }, [navigate])

  const handleSignOut = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Your Journal</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      <NoteEditor />

      <div className="mt-8 space-y-4">
        {entries.length > 0 ? (
          entries.map(entry => (
            <JournalEntry key={entry.id} entry={entry} />
          ))
        ) : (
          <p className="text-gray-500">No entries yet — start writing above!</p>
        )}
      </div>
    </div>
  )
}
