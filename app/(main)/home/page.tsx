"use client"
import { useProductStore } from '@/app/_context/ProductStore'
import ProductCard from '@/app/_components/ui/ProductCard'
import Link from 'next/link'
import { categories } from '@/app/_lib/dummy-data'
import { useMemo } from 'react'
import { useAvailableOnly } from '@/app/_hooks/useAvailableOnly'
import AvailableOnlyToggle from '@/app/_components/ui/AvailableOnlyToggle'

export default function HomePage(){
  const { products } = useProductStore()
  const { availableOnly, setAvailableOnly } = useAvailableOnly()
  const visible = useMemo(() => availableOnly ? products.filter(p => p.isAvailable) : products, [availableOnly, products])
  return (
    <div>
      <div className="rounded-xl border bg-gradient-to-r from-emerald-50 to-white p-5 mb-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Welcome to LoopUp</h1>
            <p className="text-sm text-slate-600 mt-1">Find essentials for a semester and return with ease.</p>
            <div className="mt-3 flex gap-2">
              <Link href="/search" className="px-3 py-2 rounded-md bg-brand text-white text-sm">Browse all</Link>
              <Link href="/donate" className="px-3 py-2 rounded-md border bg-white text-sm">Donate an item</Link>
            </div>
          </div>
          <div className="hidden sm:block w-20 h-20 rounded-full bg-brand/10" aria-hidden />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-semibold text-slate-800">Quick Categories</h2>
          <AvailableOnlyToggle value={availableOnly} onChange={setAvailableOnly} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <Link
              key={c.name}
              href={{
                pathname: `/category/${encodeURIComponent(c.name)}`,
                query: availableOnly ? { available: '1' } : undefined,
              }}
              className="shrink-0 px-3 py-1.5 rounded-full border bg-white text-sm hover:border-brand/60"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <h2 className="text-base font-semibold mb-3 text-slate-800">Featured Items</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
