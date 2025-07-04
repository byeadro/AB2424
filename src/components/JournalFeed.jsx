import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import JournalEntry from './JournalEntry'
import NoteEditor from './NoteEditor'

const tags = ['All', 'Work', 'Mood', 'Travel', 'Ideas', 'Personal']

export default function JournalFeed() {
  const [entries, setEntries] = useState([])
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, user => {
      if (!user) return navigate('/')
      const q = query(
        collection(db, 'users', user.uid, 'entries'),
        orderBy('createdAt', 'desc')
      )
      const unsubSnap = onSnapshot(q, snap =>
        setEntries(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      )
      return () => unsubSnap()
    })
    return () => unsubAuth()
  }, [navigate])

  const shown = entries.filter(e => filter === 'All' || e.tag === filter)

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="sticky top-0 bg-white p-4 shadow z-10">
        <h1 className="text-2xl font-semibold text-center">Journal</h1>
        <div className="mt-2 flex space-x-2 overflow-x-auto">
          {tags.map(t => {
            const isActive = filter === t
            const btnClass = isActive
              ? 'px-3 py-1 rounded-full bg-blue-600 text-white'
              : 'px-3 py-1 rounded-full bg-gray-200 text-gray-700'
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={btnClass}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>
      <div className="p-4 space-y-4">
        <NoteEditor />
        {shown.map(e => (
          <JournalEntry key={e.id} entry={e} />
        ))}
      </div>
    </div>
  )
}
