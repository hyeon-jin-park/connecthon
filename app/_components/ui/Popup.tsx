"use client"
import { useEffect } from 'react'
import type { ReactNode } from 'react'

type Action = { label: string; onClick: () => void; tone?: 'primary' | 'secondary' }

export default function Popup({ open, title, message, onClose, actions, children }: { open: boolean, title: string, message?: string, onClose: () => void, actions?: Action[], children?: ReactNode }){
  useEffect(() => {
    function onEsc(e: KeyboardEvent){ if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[90%] max-w-sm rounded-lg bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold">{title}</h3>
        {children ? (
          <div className="mt-2 text-slate-600">{children}</div>
        ) : (
          <p className="mt-2 text-slate-600">{message}</p>
        )}
        {actions && actions.length > 0 ? (
          <div className="mt-4 flex justify-end gap-2">
            {actions.map((a, i) => (
              <button
                key={i}
                onClick={a.onClick}
                className={`px-4 py-2 rounded-md ${a.tone === 'secondary' ? 'border bg-white' : 'bg-brand text-white'}`}
              >
                {a.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 rounded-md bg-brand text-white">OK</button>
          </div>
        )}
      </div>
    </div>
  )
}
