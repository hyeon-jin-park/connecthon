"use client"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Product } from '@/app/_lib/definitions'
import { products as baseProducts } from '@/app/_lib/dummy-data'

type NewProductInput = {
  name: string
  description: string
  category: Product['category']
  subCategory?: string
  pricePerSemester: number
  condition: Product['condition']
  imageSeed?: string
  imageUrl?: string
}

type ProductStoreValue = {
  products: Product[]
  addDonatedProduct: (data: NewProductInput) => void
  rentProducts: (ids: string[]) => void
  returnProducts: (ids: string[]) => void
}

const ProductStoreContext = createContext<ProductStoreValue | undefined>(undefined)

export function ProductStoreProvider({ children }: { children: React.ReactNode }) {
  const [donated, setDonated] = useState<Product[]>([])
  const [rentedIds, setRentedIds] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('donated_products')
      if (raw) setDonated(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('rented_ids')
      if (raw) setRentedIds(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('donated_products', JSON.stringify(donated))
    } catch {}
  }, [donated])

  useEffect(() => {
    try {
      localStorage.setItem('rented_ids', JSON.stringify(rentedIds))
    } catch {}
  }, [rentedIds])

  const addDonatedProduct = useCallback((data: NewProductInput) => {
    const id = `D-${Date.now()}`
    const sub = data.subCategory || (data.category === 'Electronics' ? 'General' : 'Misc')
    const imageSeed = data.imageSeed || data.name.toLowerCase().replace(/\s+/g, '-')

    const images = data.imageUrl
      ? [data.imageUrl, `/images/products/${imageSeed}.jpg`]
      : [`/images/products/${imageSeed}.jpg`, `https://picsum.photos/seed/${imageSeed}/600/400`]

    const newProduct: Product = {
      id,
      name: data.name.trim(),
      description: data.description.trim(),
      images,
      condition: data.condition,
      rating: 4,
      isAvailable: true,
      pricePerSemester: data.pricePerSemester,
      category: data.category,
      subCategory: sub,
    }
    setDonated(prev => [...prev, newProduct])
  }, [])

  const rentProducts = useCallback((ids: string[]) => {
    setDonated(prev => prev.map(p => ids.includes(p.id) ? { ...p, isAvailable: false } : p))
    setRentedIds(prev => Array.from(new Set([...prev, ...ids.filter(id => !id.startsWith('D-'))])))
  }, [])

  const returnProducts = useCallback((ids: string[]) => {
    setDonated(prev => prev.map(p => ids.includes(p.id) ? { ...p, isAvailable: true } : p))
    setRentedIds(prev => prev.filter(id => !ids.includes(id)))
  }, [])

  const merged = useMemo(() => {
    const baseWithStatus = baseProducts.map(p => rentedIds.includes(p.id) ? { ...p, isAvailable: false } : p)
    return [...baseWithStatus, ...donated]
  }, [donated, rentedIds])

  return (
    <ProductStoreContext.Provider value={{ products: merged, addDonatedProduct, rentProducts, returnProducts }}>
      {children}
    </ProductStoreContext.Provider>
  )
}

export function useProductStore() {
  const ctx = useContext(ProductStoreContext)
  if (!ctx) throw new Error('useProductStore must be used within ProductStoreProvider')
  return ctx
}
