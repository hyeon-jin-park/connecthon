"use client"
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/app/_context/AuthStore'
import { useProductStore } from '@/app/_context/ProductStore'
import Link from 'next/link'
import Popup from '@/app/_components/ui/Popup'
 

export default function MyRentalsPage(){
  const { user } = useAuth()
  const { products, returnProducts } = useProductStore()
  const [confirm, setConfirm] = useState<{ open: boolean; id?: string; name?: string }>({ open: false })
  const [ids, setIds] = useState<string[]>([])
  const [records, setRecords] = useState<Record<string, { rentedAt: string; dueAt: string }> | null>(null)

  useEffect(() => {
    if (!user) return
    try {
      // Load legacy ids
      const raw = localStorage.getItem('user_rentals')
      const map = raw ? (JSON.parse(raw) as Record<string, string[]>) : {}
      setIds(map[user.id] ?? [])

      // Load structured records
      const recRaw = localStorage.getItem('user_rental_records')
      const recMap = recRaw ? (JSON.parse(recRaw) as Record<string, Array<{ id: string; rentedAt: string; dueAt: string }>>) : {}
      const list = recMap[user.id] ?? []
      const dict: Record<string, { rentedAt: string; dueAt: string }> = {}
      list.forEach(r => {
        dict[r.id] = { rentedAt: r.rentedAt, dueAt: r.dueAt }
      })
      setRecords(dict)
    } catch {
      setIds([])
      setRecords(null)
    }
  }, [user])

  const rentals = useMemo(() => {
    const set = new Set(ids)
    const matched = products.filter(p => set.has(p.id))
    return matched
  }, [ids, products])

  const fmt = (iso?: string) => {
    if (!iso) return '—'
    try { return new Date(iso).toLocaleDateString() } catch { return '—' }
  }

  const left = (iso?: string) => {
    if (!iso) return null
    const ms = new Date(iso).getTime() - Date.now()
    const days = Math.ceil(ms / (24 * 60 * 60 * 1000))
    return days
  }

  const router = useRouter()

  const doReturn = (id: string) => {
    if (!user) return
    try {
      // Update product availability
      returnProducts([id])

      // Remove from legacy map
      const legacyRaw = localStorage.getItem('user_rentals')
      const legacyMap = legacyRaw ? (JSON.parse(legacyRaw) as Record<string, string[]>) : {}
      const existing = legacyMap[user.id] ?? []
      legacyMap[user.id] = existing.filter(x => x !== id)
      localStorage.setItem('user_rentals', JSON.stringify(legacyMap))

      // Remove from structured records
      const recRaw = localStorage.getItem('user_rental_records')
      const recMap = recRaw ? (JSON.parse(recRaw) as Record<string, Array<{ id: string; rentedAt: string; dueAt: string }>>) : {}
      const recs = recMap[user.id] ?? []
      recMap[user.id] = recs.filter(r => r.id !== id)
      localStorage.setItem('user_rental_records', JSON.stringify(recMap))

      // Update local state
      setIds(prev => prev.filter(x => x !== id))
      setRecords(prev => {
        if (!prev) return prev
        const copy = { ...prev }
        delete copy[id]
        return copy
      })
    } catch {}
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <button aria-label="Back" title="Back" className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800" onClick={()=>router.back()}>
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold inline-block ml-2">My Rentals</h1>
      </div>
      {rentals.length === 0 ? (
        <div className="rounded-md border bg-white p-4">
          <p className="text-slate-700">No rentals yet.</p>
          <Link href="/home" className="inline-block mt-2 text-brand font-medium">Browse items →</Link>
        </div>
      ) : (
        <ul className="divide-y rounded-md border bg-white">
          {rentals.map(p => (
            <li key={p.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-slate-500">₩{p.pricePerSemester.toLocaleString()} / semester</div>
                  {records?.[p.id] && (
                    <div className="text-xs text-slate-500 mt-1">
                      Due: <span className="font-medium text-slate-700">{fmt(records[p.id].dueAt)}</span>
                      {(() => { const d = left(records[p.id].dueAt); return d!=null ? ` · ${d} day${Math.abs(d)===1?'':'s'} left` : '' })()}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded border ${p.isAvailable ? 'text-slate-600 border-slate-200' : 'text-red-700 border-red-200 bg-red-50'}`}>
                    {p.isAvailable ? 'Available' : 'Currently rented'}
                  </span>
                  {!p.isAvailable && (
                    <button
                      onClick={() => setConfirm({ open: true, id: p.id, name: p.name })}
                      className="text-sm px-3 py-1 rounded bg-brand text-white"
                    >
                      Return
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Popup
        open={confirm.open}
        title={`Return ${confirm.name ?? 'item'}?`}
        message="Are you sure you want to return this item? This will make it available to others."
        onClose={() => setConfirm({ open: false })}
        actions={[
          { label: 'Cancel', tone: 'secondary', onClick: () => setConfirm({ open: false }) },
          { label: 'Return', onClick: () => { if (confirm.id) { doReturn(confirm.id); setConfirm({ open: false }) } } },
        ]}
      />
    </div>
  )
}
