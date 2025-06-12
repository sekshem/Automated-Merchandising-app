"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/lib/types"

interface ProductImageProps {
  product: Product
  width?: number
  height?: number
  className?: string
}

export default function ProductImage({ product, width = 300, height = 300, className = "" }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)

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

  // Generate a fallback image based on product name and category
  const getFallbackImage = () => {
    return `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(product.name.substring(0, 20))}`
  }

  if (imageError) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center ${getProductBackground()} ${className}`}>
        <div className="p-4 text-center">
          <div className="text-lg font-medium">{product.name}</div>
          <div className="text-sm text-muted-foreground">{product.category}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${getProductBackground()} ${className}`}>
      <Image
        src={getFallbackImage() || "/placeholder.svg"}
        alt={product.name}
        width={width}
        height={height}
        className="object-contain p-2"
        onError={() => setImageError(true)}
      />
    </div>
  )
}
