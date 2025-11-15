"use client"
import { useCart } from '@/app/_context/CartContext'
import Button from '@/app/_components/ui/Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CartPage(){
  const { items, total, remove, clear } = useCart()
  const router = useRouter()
  const [method, setMethod] = useState<'Pick-up' | 'Delivery'>('Pick-up')
  const PICKUP_ADDRESS = '100 Inha-ro, Michuhol-gu, Incheon 22212, Republic of Korea'
  const shipping = method === 'Delivery' ? 3000 : 0
  const displayedTotal = total + shipping

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-lg">Your cart is empty.</p>
          <p className="text-sm text-slate-500 mt-2">Browse items and add what you need — it's free to add.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            {items.map(ci => (
              <div key={ci.product.id} className="flex gap-4 items-center bg-white rounded-lg p-4 shadow-sm">
                <div className="w-28 h-20 flex-shrink-0 rounded overflow-hidden bg-slate-100">
                  <img src={ci.product.images?.[0] || '/logo.png'} alt={ci.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium text-slate-900">{ci.product.name}</div>
                      <div className="text-sm text-slate-500 mt-1">{ci.product.subCategory} • {ci.product.condition}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">₩{ci.product.pricePerSemester.toLocaleString()}</div>
                      <div className="text-sm text-slate-500">× {ci.qty}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <button className="text-sm text-red-600" onClick={()=>remove(ci.product.id)}>Remove</button>
                    <div className="text-xs text-slate-400">Seller: Donation</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="md:col-span-1">
            <div className="bg-white rounded-lg p-4 shadow-sm md:sticky md:top-20">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-slate-600">Subtotal</div>
                <div className="font-medium">₩{total.toLocaleString()}</div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Receive Method</div>
                <div className="space-y-2">
                  {['Pick-up','Delivery'].map(v => (
                    <label key={v} className="flex items-center gap-2">
                      <input type="radio" name="method" checked={method===v} onChange={()=>setMethod(v as any)} />
                      <span className="text-sm">{v === 'Pick-up' ? 'Pick up at our center' : 'Delivery Service (paid)'}</span>
                    </label>
                  ))}
                </div>
                {shipping > 0 && (
                  <div className="mt-2 text-sm text-slate-600">Delivery fee: <span className="font-semibold">₩{shipping.toLocaleString()}</span></div>
                )}
                {method === 'Pick-up' && (
                  <div className="mt-2 text-sm text-slate-500">Pickup address: <span className="font-medium">{PICKUP_ADDRESS}</span></div>
                )}
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-slate-600">Total</div>
                  <div className="text-lg font-semibold">₩{displayedTotal.toLocaleString()}</div>
                </div>
                <div className="space-y-2">
                  {method==='Pick-up' ? (
                    <Button onClick={()=>router.push('/checkout/payment')} className="w-full">Confirm</Button>
                  ) : (
                    <Button onClick={()=>router.push('/checkout/address')} className="w-full">Next</Button>
                  )}
                  <Button variant="secondary" onClick={clear} className="w-full">Clear Cart</Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
