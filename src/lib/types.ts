export interface Product {
  id: string
  name: string
  nameEn?: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  images?: string[]
  category: string
  brand: string
  rating: number
  reviewCount: number
  inStock: boolean
  isFeatured?: boolean
  isNew?: boolean
  isBestseller?: boolean
  description: string
  specifications?: Record<string, string>
  features?: string[]
  advantages?: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
}
