import React, { useState, useContext } from 'react'
import { PromptContext } from '../context/PromptContext'
import { auth, db } from '../firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { Button } from './ui/button'

const tags = ['Work','Mood','Travel','Ideas','Personal']

export default function NoteEditor() {
  const { prompt } = useContext(PromptContext)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState(tags[0])

  const handleSubmit = async e => {
    e.preventDefault()
    await addDoc(
      collection(db, 'users', auth.currentUser.uid, 'entries'),
      { title, content, tag, createdAt: serverTimestamp(), mood:'😊' }
    )
    setTitle('')
    setContent('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <p className="italic text-gray-600 dark:text-gray-400 mb-2">
        Prompt: {prompt}
      </p>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Entry Title"
        className="w-full mb-2 p-2 border-b-2 border-gray-300 focus:border-blue-500 bg-transparent"
      />
      <textarea
        rows={4}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full mb-2 p-2 lined-paper border border-gray-300 rounded resize-none bg-white dark:bg-gray-700"
      />
      <select
        value={tag}
        onChange={e => setTag(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        {tags.map(t => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <Button type="submit" className="w-full">
        Add Entry
      </Button>
    </form>
  )
}
