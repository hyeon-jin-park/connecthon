"use client"
import { useState } from 'react'
import Popup from '@/app/_components/ui/Popup'
import Button from '@/app/_components/ui/Button'
import { useRouter } from 'next/navigation'
import { useProductStore } from '@/app/_context/ProductStore'
import { categories } from '@/app/_lib/dummy-data'

export default function DonatePage(){
  const [method, setMethod] = useState<'Drop-off' | 'Pickup'>('Drop-off')
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<'Furniture'|'Appliances'|'Electronics'>('Furniture')
  const [subCategory, setSubCategory] = useState<string>('Bedroom')
  const [price, setPrice] = useState<number>(3000)
  const [condition, setCondition] = useState<'New'|'Good'|'Old'>('Good')
  const router = useRouter()
  const { addDonatedProduct } = useProductStore()
  const [errors, setErrors] = useState<Partial<Record<'name'|'price', string>>>({})
  const [warnOpen, setWarnOpen] = useState(false)
  const [warnMsg, setWarnMsg] = useState('')

  const availableSubs = categories.find(c => c.name === category)?.subCategories || ['General']
  const validate = () => {
    const nextErrors: Partial<Record<'name'|'price', string>> = {}
    if (!name.trim()) nextErrors.name = 'Please enter the item name.'
    if (!Number.isFinite(price) || price < 0) nextErrors.price = 'Enter a valid non-negative price.'
    setErrors(nextErrors)
    return nextErrors
  }

  const onSubmit = () => {
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      const missing: string[] = []
      if (nextErrors.name) missing.push('Item Name')
      if (nextErrors.price) missing.push('Price')
      setWarnMsg(`Please complete the following before adding: ${missing.join(', ')}`)
      setWarnOpen(true)
      return
    }

    addDonatedProduct({
      name,
      description: description || 'Donated item from user.',
      category,
      subCategory: availableSubs.length ? subCategory : 'General',
      pricePerSemester: Math.max(0, Math.round(price)),
      condition,
      imageSeed: name.trim().toLowerCase().replace(/\s+/g,'-') || undefined,
    })
    setOpen(true)
  }

  const onPickupNext = () => {
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      const missing: string[] = []
      if (nextErrors.name) missing.push('Item Name')
      if (nextErrors.price) missing.push('Price')
      setWarnMsg(`Please complete the following before proceeding: ${missing.join(', ')}`)
      setWarnOpen(true)
      return
    }
    router.push('/donate/address')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-card p-5 sm:p-6">
        <h1 className="text-xl font-semibold mb-4">Donate an Item</h1>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Item Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Small Bookshelf" className="w-full border rounded px-3 py-2" />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Upload Photos</label>
            <div className="border border-dashed rounded px-4 py-6 text-center text-slate-500 bg-slate-50">Mock Upload UI</div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={3} placeholder="Describe your item" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select value={category} onChange={e=>{
                const v = e.target.value as 'Furniture'|'Appliances'|'Electronics'
                setCategory(v)
                const subs = categories.find(c=>c.name===v)?.subCategories || ['General']
                setSubCategory(subs[0] || 'General')
              }} className="w-full border rounded px-3 py-2">
                <option value="Furniture">Furniture</option>
                <option value="Appliances">Appliances</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subcategory</label>
              <select value={subCategory} onChange={e=>setSubCategory(e.target.value)} className="w-full border rounded px-3 py-2" disabled={availableSubs.length===0}>
                {(availableSubs.length ? availableSubs : ['General']).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Condition</label>
              <select value={condition} onChange={e=>setCondition(e.target.value as any)} className="w-full border rounded px-3 py-2">
                <option>New</option>
                <option>Good</option>
                <option>Old</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price per Semester (₩)</label>
              <input type="number" value={Number.isFinite(price) ? price : 0} onChange={e=>setPrice(Number(e.target.value))} className="w-full border rounded px-3 py-2" min={0} step={100} />
              {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Donation Method</label>
            <div className="space-y-2">
              {['Drop-off','Pickup'].map(v => (
                <label key={v} className="flex items-center gap-3 rounded-md border px-3 py-2 hover:bg-slate-50">
                  <input type="radio" name="method" checked={method===v} onChange={()=>setMethod(v as any)} />
                  <span>{v === 'Drop-off' ? 'Drop-off at our center' : 'Pickup Service (paid)'}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            {method==='Drop-off' ? (
              <Button onClick={onSubmit}>Confirm & Add</Button>
            ) : (
              <Button onClick={onPickupNext}>Next</Button>
            )}
          </div>
        </div>
      </div>

      <Popup open={open} title="Thank you for your donation!" message="Your item has been added." onClose={()=>{ setOpen(false); router.push('/home') }} />
      <Popup open={warnOpen} title="Incomplete form" message={warnMsg || 'Please complete required fields.'} onClose={()=>setWarnOpen(false)} />
    </div>
  )
}
