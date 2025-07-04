import React from 'react'

export default function JournalEntry({ entry }) {
  const date = entry.createdAt?.toDate().toLocaleDateString()
  return (
    <div className="rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition">
      <div className="flex justify-between mb-4">
        <span className="font-medium text-gray-700">{date}</span>
        <span className="text-xl">{entry.mood || '😊'}</span>
      </div>
      <p className="text-gray-800 whitespace-pre-wrap">
        {entry.content}
      </p>
    </div>
  )
}
