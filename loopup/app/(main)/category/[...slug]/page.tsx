"use client"
import { useProductStore } from '@/app/_context/ProductStore'
import ProductCard from '@/app/_components/ui/ProductCard'
import Link from 'next/link'
import { useAvailableOnly } from '@/app/_hooks/useAvailableOnly'
import AvailableOnlyToggle from '@/app/_components/ui/AvailableOnlyToggle'

type Props = { params: { slug: string[] } }

export default function CategoryPage({ params }: Props){
  const { products } = useProductStore()
  const { availableOnly, setAvailableOnly } = useAvailableOnly()
  const [category, sub] = params.slug || []
  const filtered = products
    .filter(p => (!category || p.category===decodeURIComponent(category)) && (!sub || p.subCategory===decodeURIComponent(sub)))
    .filter(p => !availableOnly || p.isAvailable)

  return (
    <div>
      <nav className="text-xs text-slate-500 mb-3">
        <Link
          href={{ pathname: '/home', query: availableOnly ? { available: '1' } : undefined }}
          className="hover:text-slate-800"
        >
          Home
        </Link>
        {category && (
          <> {'>'}{' '}
            <Link
              href={{ pathname: `/category/${category}`, query: availableOnly ? { available: '1' } : undefined }}
              className="hover:text-slate-800"
            >
              {decodeURIComponent(category)}
            </Link>
          </>
        )}
        {sub && <> {'>'} <span>{decodeURIComponent(sub)}</span></>}
      </nav>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold">{sub || category || 'All Items'}</h1>
        <AvailableOnlyToggle value={availableOnly} onChange={setAvailableOnly} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      {filtered.length===0 && <p className="text-slate-500 mt-6">No items found.</p>}
    </div>
  )
}
