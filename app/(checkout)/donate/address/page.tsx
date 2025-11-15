"use client"
import { useRouter } from 'next/navigation'
import Button from '@/app/_components/ui/Button'
import Popup from '@/app/_components/ui/Popup'
import { useState } from 'react'

export default function DonatePickupAddressPage(){
  const router = useRouter()
  const [open, setOpen] = useState(false)
  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-semibold mb-4">Pickup Address</h1>
      <div className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Address" />
        <input className="w-full border rounded px-3 py-2" placeholder="Postal Code" />
        <Button onClick={()=>setOpen(true)}>Schedule Pickup</Button>
      </div>
      <Popup open={open} title="Thank you for your donation!" message="We will contact you for pickup details." onClose={()=>{ setOpen(false); router.push('/home') }} />
    </div>
  )
}
