"use client"

import { useState } from "react"
import { useProductContext } from "@/components/product-context"
import ProductCard from "@/components/product-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProductDisplay() {
  const { products, isLoading, error } = useProductContext()
  const [displayMode, setDisplayMode] = useState<"grid" | "carousel">("grid")
  const [currentSlide, setCurrentSlide] = useState(0)

  // For carousel mode
  const productsPerSlide = 4
  const totalSlides = Math.ceil(products.length / productsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  if (isLoading) {
    return <div className="text-center">Loading products...</div>
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
        Error loading products: {error}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No products found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="grid" onValueChange={(value) => setDisplayMode(value as "grid" | "carousel")}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="carousel">Carousel View</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">Showing {products.length} products</div>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} rank={index + 1} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="carousel" className="relative mt-6">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="flex w-full flex-none gap-4">
                  {products
                    .slice(slideIndex * productsPerSlide, slideIndex * productsPerSlide + productsPerSlide)
                    .map((product, index) => (
                      <div key={product.id} className="w-full flex-none md:w-1/2 lg:w-1/3 xl:w-1/4">
                        <ProductCard product={product} rank={slideIndex * productsPerSlide + index + 1} />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <Button variant="outline" size="icon" onClick={prevSlide} aria-label="Previous slide">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full",
                      currentSlide === index && "bg-primary text-primary-foreground",
                    )}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <span className="sr-only">Slide {index + 1}</span>
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={nextSlide} aria-label="Next slide">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
