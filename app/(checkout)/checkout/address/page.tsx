"use client"
import { useRouter } from 'next/navigation'
import Button from '@/app/_components/ui/Button'
import { useState } from 'react'

export default function DeliveryAddressPage(){
  const router = useRouter()
  const [address, setAddress] = useState('')
  const [postal, setPostal] = useState('')
  const [error, setError] = useState<string | null>(null)
  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-semibold mb-4">Delivery Address</h1>
      <div className="space-y-3">
        <input value={address} onChange={e=>setAddress(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Address" />
        <input value={postal} onChange={e=>setPostal(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Postal Code" />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <Button onClick={() => {
          if (!address.trim()) return setError('Please enter delivery address')
          // optionally save delivery address for later
          try { localStorage.setItem('pending_delivery_address', JSON.stringify({ address, postal })) } catch {}
          router.push('/checkout/payment?shipping=3000')
        }}>Next</Button>
      </div>
    </div>
  )
}
