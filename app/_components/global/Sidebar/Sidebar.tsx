"use client"
import Link from 'next/link'
import { categories } from '@/app/_lib/dummy-data'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }){
  const [expanded, setExpanded] = useState<string | null>(null)
  const [entering, setEntering] = useState(false)

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      const t = requestAnimationFrame(() => setEntering(true))
      return () => {
        cancelAnimationFrame(t)
        document.body.style.overflow = prev
        setEntering(false)
      }
    } else {
      // ensure unlock when closed
      document.body.style.overflow = ''
      setEntering(false)
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed left-0 top-0 z-[110] w-80 h-full bg-white shadow-xl p-4 overflow-y-auto transform transition-transform duration-300 will-change-transform ${entering ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-4 flex items-center gap-2">
          <button aria-label="Close menu" onClick={onClose} className="p-2 -ml-2 rounded-md hover:bg-slate-100">
            <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
          </button>
          <h3 className="font-semibold text-lg">Browse Categories</h3>
        </div>
        <ul className="space-y-2">
          {categories.map(cat => (
            <li key={cat.name}>
              {cat.subCategories.length === 0 ? (
                <Link
                  href={`/category/${encodeURIComponent(cat.name)}`}
                  onClick={onClose}
                  className="w-full flex items-center justify-between px-2 py-2 rounded-md font-medium hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                >
                  <span>{cat.name}</span>
                  <span className="text-slate-400 text-sm">→</span>
                </Link>
              ) : (
                <>
                  <button
                    className={`w-full text-left font-medium flex items-center justify-between px-2 py-2 rounded-md transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${expanded===cat.name ? 'bg-slate-50' : ''}`}
                    aria-expanded={expanded===cat.name}
                    onClick={()=>setExpanded(expanded===cat.name?null:cat.name)}
                  >
                    {cat.name}
                    <span className="text-slate-500 text-lg">{expanded===cat.name ? '▾' : '▸'}</span>
                  </button>
                  {expanded===cat.name && (
                    <ul className="pl-3 mt-2 space-y-1">
                      {cat.subCategories.map(sub => (
                        <li key={sub}>
                          <Link href={`/category/${encodeURIComponent(cat.name)}/${encodeURIComponent(sub)}`} onClick={onClose} className="text-slate-700 hover:text-brand">{sub}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-8 pt-4 border-t">
          <Link href="/donate" onClick={onClose} className="inline-flex items-center gap-2 text-brand font-medium">Donate an Item →</Link>
        </div>
      </div>
    </Dialog>
  )
}

// Minimal dialog primitive using a portal-less overlay
function Overlay({ onClick, className }: { onClick: () => void; className?: string }){
  return <div onClick={onClick} className={`fixed inset-0 bg-emerald-900/25 ${className ?? ''}`} />
}

function Root({ children }: { children: React.ReactNode }){
  if (typeof document === 'undefined') return null
  return createPortal(
    <div className="fixed inset-0 z-[100] flex">{children}</div>,
    document.body
  )
}

export const Dialog = ({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) => {
  const [visible, setVisible] = useState(open)
  useEffect(() => {
    if (open) {
      setVisible(true)
      return
    }
    const t = setTimeout(() => setVisible(false), 300)
    return () => clearTimeout(t)
  }, [open])

  if (!open && !visible) return null
  return (
    <Root>
      <Overlay onClick={onClose} className={`z-[100] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />
      <div className="z-[101] pointer-events-auto w-0 h-0">{children}</div>
    </Root>
  )
}
