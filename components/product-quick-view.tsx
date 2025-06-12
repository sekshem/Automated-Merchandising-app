"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Product } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import ProductImage from "@/components/product-image"

interface ProductQuickViewProps {
  product: Product
  onClose: () => void
}

export default function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1)
  const [imageError, setImageError] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} has been added to your cart`,
    })
    onClose()
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    })
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
    return `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(product.name.substring(0, 20))}`
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Product Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <ProductImage product={product} width={400} height={400} className="h-full w-full" />
          </div>
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-medium">{product.brand}</span>
              <Badge variant="outline" className={cn("text-xs", getBrandTierStyle())}>
                Tier {product.brandTier}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </div>

            <h2 className="mb-2 text-xl font-bold">{product.name}</h2>
            <p className="mb-4 text-sm text-muted-foreground">{product.description}</p>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              <span className={cn("text-sm font-medium", getInventoryStyle())}>{product.inventoryStatus}</span>
            </div>

            <div className="mb-6 space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">Key Benefits:</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {product.benefits?.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">How to Use:</h3>
                <p className="text-sm text-muted-foreground">{product.howToUse}</p>
              </div>

              {product.stats && (
                <div>
                  <h3 className="mb-2 text-sm font-medium">Product Statistics:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Views Last Month:</span>
                      <span className="font-medium">{product.stats.viewsLastMonth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Units Sold:</span>
                      <span className="font-medium">{product.stats.volumeSoldLastMonth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">In Stock:</span>
                      <span className="font-medium">{product.stats.unitsInStock.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Days of Inventory:</span>
                      <span className="font-medium">{product.stats.daysOfInventory}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4 flex items-center">
              <span className="mr-4 text-sm font-medium">Quantity:</span>
              <div className="flex items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="mt-auto flex gap-2">
              <Button
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.inventoryStatus === "Out of Stock"}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" onClick={handleAddToWishlist} aria-label="Add to wishlist">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
