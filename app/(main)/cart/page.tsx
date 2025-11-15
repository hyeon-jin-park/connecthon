"use client"
import { useCart } from '@/app/_context/CartContext'
import Button from '@/app/_components/ui/Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CartPage(){
  const { items, total, remove, clear } = useCart()
  const router = useRouter()
  const [method, setMethod] = useState<'Pick-up' | 'Delivery'>('Pick-up')
  const shipping = method === 'Delivery' ? 3000 : 0
  const displayedTotal = total + shipping

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-4">Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <ul className="divide-y">
            {items.map(ci => (
              <li key={ci.product.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{ci.product.name}</div>
                  <div className="text-sm text-slate-500">₩{ci.product.pricePerSemester.toLocaleString()} / semester × {ci.qty}</div>
                </div>
                <button className="text-sm text-red-600" onClick={()=>remove(ci.product.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t">
            {shipping > 0 && (
              <div className="flex items-center justify-between mb-2">
                <div className="text-slate-600">Shipping</div>
                <div className="text-slate-700">₩{shipping.toLocaleString()}</div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="text-slate-600">Total</div>
              <div className="text-brand font-semibold">₩{displayedTotal.toLocaleString()}</div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Receive Method</label>
            <div className="space-y-2">
              {['Pick-up','Delivery'].map(v => (
                <label key={v} className="flex items-center gap-2">
                  <input type="radio" name="method" checked={method===v} onChange={()=>setMethod(v as any)} />
                  <span>{v === 'Pick-up' ? 'Pick up at our center' : 'Delivery Service (paid)'}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {method==='Pick-up' ? (
              <Button onClick={()=>router.push('/checkout/payment')}>Confirm</Button>
            ) : (
              <Button onClick={()=>router.push('/checkout/address')}>Next</Button>
            )}
            <Button variant="secondary" onClick={clear}>Clear</Button>
          </div>
        </div>
      )}
    </div>
  )
}
