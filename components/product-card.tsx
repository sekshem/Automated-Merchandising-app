"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Eye, Pin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import ProductQuickView from "@/components/product-quick-view"
import ProductImage from "@/components/product-image"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  rank: number
  isAdmin?: boolean
  onTogglePin?: (productId: string) => void
}

export default function ProductCard({ product, rank, isAdmin = false, onTogglePin }: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
    // Log analytics event
    console.log("Analytics: Product added to cart", {
      productId: product.id,
      name: product.name,
      price: product.price,
    })
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    })
    // Log analytics event
    console.log("Analytics: Product added to wishlist", {
      productId: product.id,
      name: product.name,
    })
  }

  const handleQuickView = () => {
    setShowQuickView(true)
    // Log analytics event
    console.log("Analytics: Product quick view opened", {
      productId: product.id,
      name: product.name,
    })
  }

  const handleTogglePin = () => {
    if (onTogglePin) {
      onTogglePin(product.id)
    }
  }

  const getBrandTierStyle = () => {
    switch (product.brandTier) {
      case "A":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
      case "B":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "C":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getInventoryStyle = () => {
    switch (product.inventoryStatus) {
      case "In Stock":
        return "text-green-600 dark:text-green-400"
      case "Low Stock":
        return "text-amber-600 dark:text-amber-400"
      case "Out of Stock":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  // Get background color based on product category
  const getProductBackground = () => {
    switch (product.category) {
      case "Cleansers":
        return "bg-blue-50 dark:bg-blue-950"
      case "Toners":
        return "bg-purple-50 dark:bg-purple-950"
      case "Serums":
        return "bg-amber-50 dark:bg-amber-950"
      case "Moisturizers":
        return "bg-green-50 dark:bg-green-950"
      case "Masks":
        return "bg-pink-50 dark:bg-pink-950"
      case "Ampoules":
        return "bg-orange-50 dark:bg-orange-950"
      case "Emulsions":
        return "bg-teal-50 dark:bg-teal-950"
      case "Mists":
        return "bg-cyan-50 dark:bg-cyan-950"
      case "Essences":
        return "bg-indigo-50 dark:bg-indigo-950"
      case "Gels":
        return "bg-sky-50 dark:bg-sky-950"
      case "Lotions":
        return "bg-emerald-50 dark:bg-emerald-950"
      case "Balms":
        return "bg-rose-50 dark:bg-rose-950"
      default:
        return "bg-gray-50 dark:bg-gray-900"
    }
  }

  // Generate a fallback image based on product name
  const getFallbackImage = () => {
    return `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name.substring(0, 20))}`
  }

  return (
    <>
      <div className="group relative flex flex-col rounded-xl border bg-card p-4 transition-all hover:shadow-md">
        {/* Rank badge */}
        <div className="absolute left-2 top-2 z-10 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white">
          #{rank}
        </div>

        {/* Pinned badge */}
        {product.isPinned && (
          <div className="absolute right-2 top-2 z-10">
            <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300">
              <Pin className="mr-1 h-3 w-3" /> Pinned
            </Badge>
          </div>
        )}

        {/* Product image */}
        <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
          <ProductImage product={product} width={300} height={300} className="h-full w-full" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full"
              onClick={handleQuickView}
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full"
              onClick={handleAddToWishlist}
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-1 flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm font-medium">{product.brand}</span>
            <Badge variant="outline" className={cn("text-xs", getBrandTierStyle())}>
              Tier {product.brandTier}
            </Badge>
          </div>

          <h3 className="mb-1 line-clamp-2 text-base font-semibold">{product.name}</h3>

          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            <span className={cn("text-xs font-medium", getInventoryStyle())}>{product.inventoryStatus}</span>
          </div>

          {product.stats && (
            <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Views:</span>
                <span className="font-medium">{product.stats.viewsLastMonth.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Sold:</span>
                <span className="font-medium">{product.stats.volumeSoldLastMonth.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="mt-auto flex items-center gap-2">
            <Button className="flex-1" onClick={handleAddToCart} disabled={product.inventoryStatus === "Out of Stock"}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>

            {isAdmin && (
              <Button
                variant={product.isPinned ? "destructive" : "outline"}
                size="icon"
                onClick={handleTogglePin}
                aria-label={product.isPinned ? "Unpin product" : "Pin product"}
              >
                <Pin className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {showQuickView && <ProductQuickView product={product} onClose={() => setShowQuickView(false)} />}
    </>
  )
}
