"use client"
import { useState, useRef } from 'react'
import Popup from '@/app/_components/ui/Popup'
import Button from '@/app/_components/ui/Button'
import { useRouter } from 'next/navigation'
import { useProductStore } from '@/app/_context/ProductStore'
import { categories } from '@/app/_lib/dummy-data'

export default function DonatePage(){
  const PICKUP_ADDRESS = '100 Inha-ro, Michuhol-gu, Incheon 22212, Republic of Korea'
  const [method, setMethod] = useState<'Drop-off' | 'Pickup'>('Drop-off')
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
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

    const doAdd = async () => {
      setUploading(true)
      setUploadProgress(0)
      setUploadError(null)
      try {
        let imageUrl: string | undefined = undefined
        if (file) {
          // Client upload with progress using XMLHttpRequest
          imageUrl = await new Promise<string>((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', '/api/upload')
            xhr.upload.onprogress = (ev) => {
              if (ev.lengthComputable) {
                const pct = Math.round((ev.loaded / ev.total) * 100)
                setUploadProgress(pct)
              }
            }
            xhr.onload = () => {
              try {
                const j = JSON.parse(xhr.responseText)
                if (xhr.status >= 200 && xhr.status < 300 && j?.url) resolve(j.url)
                else reject(new Error(j?.error || 'Upload failed'))
              } catch (e) {
                reject(new Error('Invalid upload response'))
              }
            }
            xhr.onerror = () => reject(new Error('Network error during upload'))
            const fd = new FormData()
            fd.append('file', file)
            xhr.send(fd)
          })
        }

        addDonatedProduct({
          name,
          description: description || 'Donated item from user.',
          category,
          subCategory: availableSubs.length ? subCategory : 'General',
          pricePerSemester: Math.max(0, Math.round(price)),
          condition,
          imageSeed: name.trim().toLowerCase().replace(/\s+/g,'-') || undefined,
          imageUrl,
        })
        setOpen(true)
      } catch (err: any) {
        setUploadError(err?.message || 'Upload failed')
        setWarnMsg(err?.message || 'Upload failed')
        setWarnOpen(true)
      } finally {
        setUploading(false)
        setUploadProgress(0)
      }
    }
    void doAdd()
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
    // Save pending donation and redirect to payment so pickup fee can be charged
    try {
      const pending = {
        name,
        description: description || 'Donated item from user.',
        category,
        subCategory: availableSubs.length ? subCategory : 'General',
        pricePerSemester: Math.max(0, Math.round(price)),
        condition,
        imageUrl: undefined as string | undefined,
        imageSeed: name.trim().toLowerCase().replace(/\s+/g,'-') || undefined,
        method: 'Pickup',
      }
      if (preview) pending.imageUrl = preview
      localStorage.setItem('pending_donation', JSON.stringify(pending))
    } catch {}
    // Go to address input first, then payment
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
            <div className="flex items-center gap-4">
              <input
                ref={useRef<HTMLInputElement | null>(null)}
                className="hidden"
                id="donate-file-input"
                type="file"
                accept="image/*"
                onChange={e => {
                  const f = e.target.files?.[0] || null
                  setFile(f)
                  if (f) setPreview(URL.createObjectURL(f))
                  else setPreview(null)
                }}
              />
              {/* Custom English choose file button to avoid localized browser button text */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-3 py-2 bg-slate-100 rounded border hover:bg-slate-50"
                  onClick={() => document.getElementById('donate-file-input')?.click()}
                  disabled={uploading}
                >
                  Choose file
                </button>
                <span className="text-sm text-slate-500">{file ? file.name : 'No file chosen'}</span>
              </div>
              {preview && (
                <div className="w-24 h-24 rounded overflow-hidden border">
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-2">Uploaded images are saved and used as the item photo.</p>
          </div>
          {uploading && (
            <div className="mt-2">
              <div className="w-full bg-slate-100 rounded h-2 overflow-hidden">
                <div className="bg-green-500 h-2" style={{ width: `${uploadProgress}%` }} />
              </div>
              <p className="text-xs text-slate-500 mt-1">Uploading: {uploadProgress}%</p>
            </div>
          )}
          {uploadError && (
            <p className="mt-1 text-xs text-red-600">Upload error: {uploadError}</p>
          )}
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
            {method === 'Pickup' && (
              <p className="mt-2 text-sm text-slate-600">Pickup service fee: <span className="font-semibold">₩3,000</span></p>
            )}
            {method === 'Drop-off' && (
              <p className="mt-2 text-sm text-slate-500">Drop-off address: <span className="font-medium">{PICKUP_ADDRESS}</span></p>
            )}
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
