export type Product = {
  id: string
  name: string
  description: string
  images: string[]
  condition: 'New' | 'Good' | 'Old'
  rating: number
  isAvailable: boolean
  pricePerSemester: number
  category: 'Furniture' | 'Appliances' | 'Electronics'
  subCategory: string
}

export type CartItem = {
  product: Product
  qty: number
}

export type Category = {
  name: 'Furniture' | 'Appliances' | 'Electronics'
  subCategories: string[]
}

export type User = {
  id: string
  username: string
  name: string
  university?: string
  studentId?: string
}
