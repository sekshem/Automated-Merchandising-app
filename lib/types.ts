export interface Product {
  id: string
  name: string
  description: string
  brand: string
  brandTier: "A" | "B" | "C"
  category: string
  price: number
  image: string
  inventoryStatus: "In Stock" | "Low Stock" | "Out of Stock"
  isPinned: boolean
  createdAt: string
  benefits?: string[]
  howToUse?: string
  stats?: {
    cogs: number
    daysOfInventory: number
    unitsInStock: number
    viewsLastMonth: number
    volumeSoldLastMonth: number
  }
}
