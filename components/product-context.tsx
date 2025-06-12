"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/types"
import { fetchProducts } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface ProductContextType {
  products: Product[]
  filteredProducts: Product[]
  isLoading: boolean
  error: string | null
  filters: {
    brands: string[]
    categories: string[]
    priceRange: number[]
  }
  setFilters: (filters: {
    brands: string[]
    categories: string[]
    priceRange: number[]
  }) => void
  sortOption: string
  setSortOption: (option: string) => void
  refreshProducts: () => Promise<void>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    brands: [] as string[],
    categories: [] as string[],
    priceRange: [0, 100] as number[],
  })
  const [sortOption, setSortOption] = useState("Popularity")
  const { toast } = useToast()

  const refreshProducts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError("Failed to fetch products. Please try again later.")
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshProducts()
    // Set up auto-refresh every 5 minutes
    const intervalId = setInterval(refreshProducts, 5 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    // Apply filters and sorting
    let result = [...products]

    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter((product) => filters.brands.includes(product.brand))
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((product) => filters.categories.includes(product.category))
    }

    // Apply price filter
    result = result.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply sorting
    switch (sortOption) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price)
        break
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price)
        break
      case "Newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "Most Viewed":
        result.sort((a, b) => {
          const viewsA = a.stats?.viewsLastMonth || 0
          const viewsB = b.stats?.viewsLastMonth || 0
          return viewsB - viewsA
        })
        break
      case "Best Selling":
        result.sort((a, b) => {
          const salesA = a.stats?.volumeSoldLastMonth || 0
          const salesB = b.stats?.volumeSoldLastMonth || 0
          return salesB - salesA
        })
        break
      case "Popularity":
      default:
        // Products are already sorted by popularity (ranking)
        break
    }

    setFilteredProducts(result)
  }, [products, filters, sortOption])

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        filteredProducts,
        isLoading,
        error,
        filters,
        setFilters,
        sortOption,
        setSortOption,
        refreshProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider")
  }
  return context
}
