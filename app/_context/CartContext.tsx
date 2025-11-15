"use client"
import { createContext, useContext, useMemo, useState, ReactNode } from 'react'
import type { CartItem, Product } from '@/app/_lib/definitions'

export type CartContextType = {
  items: CartItem[]
  add: (product: Product) => boolean
  remove: (productId: string) => void
  clear: () => void
  total: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const add = (product: Product) => {
    let added = false
    setItems(prev => {
      const idx = prev.findIndex(ci => ci.product.id === product.id)
      if (idx >= 0) {
        // do not increase qty for unique items
        return prev
      }
      added = true
      return [...prev, { product, qty: 1 }]
    })
    return added
  }
  const remove = (productId: string) => setItems(prev => prev.filter(ci => ci.product.id !== productId))
  const clear = () => setItems([])
  const total = useMemo(() => items.reduce((sum, ci) => sum + ci.product.pricePerSemester * ci.qty, 0), [items])

  const value = useMemo(() => ({ items, add, remove, clear, total }), [items, total])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
