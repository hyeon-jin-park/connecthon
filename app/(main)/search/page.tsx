"use client"
import { useMemo, useState } from 'react'
import { useProductStore } from '@/app/_context/ProductStore'
import ProductCard from '@/app/_components/ui/ProductCard'
import { useAvailableOnly } from '@/app/_hooks/useAvailableOnly'
import AvailableOnlyToggle from '@/app/_components/ui/AvailableOnlyToggle'

export default function SearchPage(){
  const { products } = useProductStore()
  const [q, setQ] = useState('')
  const { availableOnly, setAvailableOnly } = useAvailableOnly()
  const results = useMemo(() => {
    const term = q.toLowerCase()
    let list = products.filter(p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term))
    if (availableOnly) list = list.filter(p => p.isAvailable)
    return list
  }, [q, products, availableOnly])

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Search</h1>
        <AvailableOnlyToggle value={availableOnly} onChange={setAvailableOnly} />
      </div>
      <input aria-label="Search items" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search items" className="w-full border rounded px-3 py-2 mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      {results.length===0 && <p className="text-slate-500">No results.</p>}
    </div>
  )
}
