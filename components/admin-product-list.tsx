"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Pin, Search } from "lucide-react"
import type { Product } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import { pinProduct, unpinProduct } from "@/lib/api"
import ProductImage from "@/components/product-image"

interface AdminProductListProps {
  products: Product[]
  isLoading: boolean
  onRefresh: () => void
}

export default function AdminProductList({ products, isLoading, onRefresh }: AdminProductListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleTogglePin = async (product: Product) => {
    try {
      if (product.isPinned) {
        await unpinProduct(product.id)
        toast({
          title: "Product unpinned",
          description: `${product.name} has been unpinned from the rankings`,
        })
      } else {
        await pinProduct(product.id)
        toast({
          title: "Product pinned",
          description: `${product.name} has been pinned to the rankings`,
        })
      }
      onRefresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product pin status",
        variant: "destructive",
      })
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get background color based on product category
  const getProductBackground = (category: string) => {
    switch (category) {
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
  const getFallbackImage = (product: Product) => {
    return `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(product.name.substring(0, 10))}`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Views</TableHead>
              <TableHead className="hidden md:table-cell">Sold</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Loading products...
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">#{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-md">
                        <ProductImage product={product} width={40} height={40} className="h-full w-full" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-xs text-muted-foreground">{product.category}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {product.brand}
                      <Badge variant="outline">Tier {product.brandTier}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.stats ? product.stats.viewsLastMonth.toLocaleString() : "N/A"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.stats ? product.stats.volumeSoldLastMonth.toLocaleString() : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={product.isPinned ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => handleTogglePin(product)}
                    >
                      <Pin className="mr-2 h-4 w-4" />
                      {product.isPinned ? "Unpin" : "Pin"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
