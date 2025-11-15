"use client"
import { useRouter } from 'next/navigation'
import Button from '@/app/_components/ui/Button'
import Popup from '@/app/_components/ui/Popup'
import { useState } from 'react'

export default function DonatePickupAddressPage(){
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [postal, setPostal] = useState('')
  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-semibold mb-4">Pickup Address</h1>
      <div className="space-y-3">
        <input value={address} onChange={e=>setAddress(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Address" />
        <input value={postal} onChange={e=>setPostal(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Postal Code" />
        <Button onClick={() => {
          // attach address to pending donation and redirect to payment
          try {
            const raw = localStorage.getItem('pending_donation')
            const pending = raw ? JSON.parse(raw) : {}
            pending.address = address
            pending.postal = postal
            localStorage.setItem('pending_donation', JSON.stringify(pending))
          } catch {}
          router.push('/checkout/payment?shipping=3000&donation=1')
        }}>Proceed to Payment</Button>
      </div>
      <Popup open={open} title="Thank you for your donation!" message="We will contact you for pickup details." onClose={()=>{ setOpen(false); router.push('/home') }} />
    </div>
  )
}
