"use client"
import { useState } from 'react'
import { isCardNumber, isExpiry, isCVC } from '@/app/_lib/formValidators'
import { useSearchParams } from 'next/navigation'
import Popup from '@/app/_components/ui/Popup'
import Button from '@/app/_components/ui/Button'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/_context/CartContext'
import { useProductStore } from '@/app/_context/ProductStore'
import { useAuth } from '@/app/_context/AuthStore'

const cards = [
  { key: 'visa', name: 'Visa' },
  { key: 'paypal', name: 'PayPal' },
  { key: 'applepay', name: 'Apple Pay' },
  { key: 'amex', name: 'American Express' },
]

export default function PaymentPage(){
  const [method, setMethod] = useState<string>('visa')
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { items, total, clear } = useCart()
  const { rentProducts } = useProductStore()
  const { addDonatedProduct } = useProductStore()
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const shipping = Number(searchParams?.get('shipping') || '0') || 0
  const isDonation = searchParams?.get('donation') === '1'
  const [postRedirect, setPostRedirect] = useState<string>('/home')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardError, setCardError] = useState<string | null>(null)
  const displayedTotal = total + shipping

  const appendUserRentals = (userId: string, ids: string[]) => {
    try {
      // Legacy simple ID list
      const legacyRaw = localStorage.getItem('user_rentals')
      const legacyMap = legacyRaw ? (JSON.parse(legacyRaw) as Record<string, string[]>) : {}
      const legacyExisting = legacyMap[userId] ?? []
      const legacyMerged = Array.from(new Set([...legacyExisting, ...ids]))
      legacyMap[userId] = legacyMerged
      localStorage.setItem('user_rentals', JSON.stringify(legacyMap))

      // New structured records with due dates
      type RentalRec = { id: string; rentedAt: string; dueAt: string }
      const recRaw = localStorage.getItem('user_rental_records')
      const recMap = recRaw ? (JSON.parse(recRaw) as Record<string, RentalRec[]>) : {}
      const now = Date.now()
      const semesterMs = 120 * 24 * 60 * 60 * 1000 // approx 4 months
      const newRecs: RentalRec[] = ids.map(id => ({ id, rentedAt: new Date(now).toISOString(), dueAt: new Date(now + semesterMs).toISOString() }))
      const existingRecs = recMap[userId] ?? []
      const mergedRecs = [...existingRecs]
      for (const nr of newRecs) {
        if (!mergedRecs.some(r => r.id === nr.id)) mergedRecs.push(nr)
      }
      recMap[userId] = mergedRecs
      localStorage.setItem('user_rental_records', JSON.stringify(recMap))
    } catch {}
  }

  const handlePay = async () => {
    // If there are no cart items and this is not a donation, warn the user
    if (!isDonation && items.length === 0) return setOpen(true)

    // Validate card details (mock)
    setCardError(null)
    if (!isCardNumber(cardNumber)) return setCardError('Enter a valid card number (13–19 digits)')
    if (!isExpiry(expiry)) return setCardError('Enter expiry as MM/YY')
    if (!isCVC(cvc)) return setCardError('Enter CVC (3–4 digits)')

    // mock processing
    await new Promise(r => setTimeout(r, 400))

    if (isDonation) {
      try {
        const raw = localStorage.getItem('pending_donation')
        if (raw) {
          const pending = JSON.parse(raw)
          // Ensure fields match expected input for addDonatedProduct
          const desc = `${pending.description || ''}${pending.address ? `\nPickup address: ${pending.address} ${pending.postal || ''}` : ''}`
          addDonatedProduct({
            name: pending.name,
            description: desc,
            category: pending.category,
            subCategory: pending.subCategory,
            pricePerSemester: pending.pricePerSemester,
            condition: pending.condition,
            imageSeed: pending.imageSeed,
            imageUrl: pending.imageUrl,
          })
          localStorage.removeItem('pending_donation')
        }
      } catch {}
      setPostRedirect('/home')
      setOpen(true)
      return
    }

    // Normal cart payment flow
    const ids = items.map(ci => ci.product.id)
    rentProducts(ids)
    if (user) appendUserRentals(user.id, ids)
    clear()
    setPostRedirect('/home')
    setOpen(true)
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-semibold mb-4">Payment</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <div className="grid grid-cols-2 gap-2">
            {cards.map(c => (
              <button key={c.key} onClick={()=>setMethod(c.key)} className={`border rounded p-3 text-left ${method===c.key ? 'border-brand' : ''}`}>
                <div className="font-medium">{c.name}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded border bg-white p-3">
          {shipping > 0 && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Shipping</span>
              <span className="text-slate-700">₩{shipping.toLocaleString()}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Total</span>
            <span className="text-brand font-semibold">₩{displayedTotal.toLocaleString()}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Card Details (Mock)</label>
          <input inputMode="numeric" pattern="\d{13,19}" required className="w-full border rounded px-3 py-2 mb-2" placeholder="Card Number" value={cardNumber} onChange={e=>setCardNumber(e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <input placeholder="MM/YY" required pattern="^(0[1-9]|1[0-2])\/\d{2}$" className="border rounded px-3 py-2" value={expiry} onChange={e=>setExpiry(e.target.value)} />
            <input inputMode="numeric" pattern="\d{3,4}" required className="border rounded px-3 py-2" placeholder="CVC" value={cvc} onChange={e=>setCvc(e.target.value)} />
          </div>
          {cardError && <p className="text-xs text-red-600 mt-2">{cardError}</p>}
        </div>
        <Button onClick={handlePay}>Pay</Button>
      </div>

      <Popup open={open} title="Payment completed" message={isDonation ? 'Pickup fee paid. Please schedule pickup details.' : 'Payment completed — rental details will be sent to your email.'} onClose={()=>{ setOpen(false); router.push(postRedirect) }} />
    </div>
  )
}
