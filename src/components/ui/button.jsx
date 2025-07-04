import React from 'react'
import clsx from 'clsx'

export function Button({ children, variant = 'default', className = '', ...props }) {
  const base = 'px-4 py-2 rounded-lg font-medium transition ease-in-out'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700',
  }
  return (
    <button
      {...props}
      className={clsx(base, variants[variant], className)}
    >
      {children}
    </button>
  )
}
