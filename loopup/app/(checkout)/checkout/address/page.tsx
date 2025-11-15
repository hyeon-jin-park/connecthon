"use client"
import { useRouter } from 'next/navigation'
import Button from '@/app/_components/ui/Button'

export default function DeliveryAddressPage(){
  const router = useRouter()
  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-semibold mb-4">Delivery Address</h1>
      <div className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Address" />
        <input className="w-full border rounded px-3 py-2" placeholder="Postal Code" />
        <Button onClick={()=>router.push('/checkout/payment?shipping=3000')}>Next</Button>
      </div>
    </div>
  )
}
