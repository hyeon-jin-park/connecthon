import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/app/_lib/definitions'

export default function ProductCard({ product }: { product: Product }){
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 ring-1 ring-transparent hover:ring-brand/30"
    >
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105"/>
        {!product.isAvailable && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded">Rented</span>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-slate-800 line-clamp-1">{product.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700">{product.condition}</span>
        </div>
        <div className="mt-1 text-slate-500 text-xs line-clamp-2">{product.description}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm font-semibold text-brand">₩{product.pricePerSemester.toLocaleString()} / semester</div>
          <div className={product.isAvailable ? 'text-xs text-slate-500' : 'text-xs text-red-600 font-medium'}>
            {product.isAvailable ? 'Available' : 'Rented'}
          </div>
        </div>
      </div>
    </Link>
  )
}
