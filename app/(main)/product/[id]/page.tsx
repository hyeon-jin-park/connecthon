"use client"
import { useProductStore } from '@/app/_context/ProductStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Button from '@/app/_components/ui/Button'
import Popup from '@/app/_components/ui/Popup'
import { useState } from 'react'
import { useCart } from '@/app/_context/CartContext'

type Props = { params: { id: string } }

export default function ProductDetail({ params }: Props){
  const { products } = useProductStore()
  const product = products.find(p => p.id === params.id)
  const router = useRouter()
  const { add } = useCart()
  const [popupProps, setPopupProps] = useState<null | { title: string; message: string; actions?: { label: string; onClick: () => void; tone?: 'primary' | 'secondary' }[] }>(null)

  if (!product) return <p>Product not found.</p>

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="relative aspect-[4/3] bg-slate-100 rounded overflow-hidden md:col-span-1">
        <button
          aria-label="Back"
          title="Back"
          onClick={()=>router.back()}
          className="absolute left-3 top-3 z-10 p-2 rounded-full bg-white/80 text-slate-700 hover:bg-white shadow"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <Image src={product.images[0]} alt={product.name} fill className="object-cover"/>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="mt-2 text-slate-600">{product.description}</p>
        <div className="mt-3 text-sm text-slate-600">Condition: <b>{product.condition}</b></div>
        <div className="mt-1 text-sm text-slate-600">Rating: {'★'.repeat(product.rating)}{'☆'.repeat(5-product.rating)}</div>
        <div className="mt-1 text-sm">
          {product.isAvailable ? (
            <span className="text-slate-600">Availability: Available</span>
          ) : (
            <span className="inline-flex items-center gap-2 text-red-600 font-medium">
              <span className="inline-block h-2 w-2 rounded-full bg-red-600" />
              Currently rented
            </span>
          )}
        </div>
        <div className="mt-3 text-brand font-semibold">₩{product.pricePerSemester.toLocaleString()} / semester</div>
        <div className="mt-5">
          {product.isAvailable ? (
            <Button onClick={() => {
              const added = add(product)
              if (added) {
                setPopupProps({
                  title: 'Added to cart',
                  message: 'This item was added to your cart.',
                  actions: [
                    { label: 'Back', tone: 'secondary', onClick: () => { setPopupProps(null); router.back() } },
                    { label: 'Go to Cart', onClick: () => { setPopupProps(null); router.push('/cart') } },
                  ],
                })
              } else {
                setPopupProps({
                  title: 'Already in cart',
                  message: 'This item is already in your cart.',
                  actions: [
                    { label: 'Go to Cart', onClick: () => { setPopupProps(null); router.push('/cart') } },
                    { label: 'Close', tone: 'secondary', onClick: () => setPopupProps(null) },
                  ],
                })
              }
            }}>Add to Cart</Button>
          ) : (
            <Button disabled variant="secondary">Unavailable</Button>
          )}
        </div>
        <Popup
          open={!!popupProps}
          title={popupProps?.title || ''}
          message={popupProps?.message || ''}
          onClose={() => setPopupProps(null)}
          actions={popupProps?.actions}
        />
      </div>
    </div>
  )
}
