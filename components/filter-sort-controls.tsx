"use client"

import { useState, useEffect } from "react"
import { useProductContext } from "@/components/product-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { SlidersHorizontal } from "lucide-react"

export default function FilterSortControls() {
  const { filters, setFilters, sortOption, setSortOption } = useProductContext()
  const [priceRange, setPriceRange] = useState([0, 100])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Available filter options - updated with all brands and categories
  const brands = [
    "COSRX",
    "Innisfree",
    "Laneige",
    "Missha",
    "Some By Mi",
    "Skinfood",
    "Tony Moly",
    "Sulwhasoo",
    "Etude House",
    "Neogen",
    "Benton",
    "Mamonde",
    "IOPE",
    "Dr. Jart+",
    "Hera",
    "The Face Shop",
  ]

  const categories = [
    "Cleansers",
    "Toners",
    "Serums",
    "Moisturizers",
    "Masks",
    "Ampoules",
    "Emulsions",
    "Mists",
    "Essences",
    "Gels",
    "Lotions",
    "Balms",
  ]

  useEffect(() => {
    // Update filters when selections change
    setFilters({
      ...filters,
      brands: selectedBrands,
      categories: selectedCategories,
      priceRange: priceRange,
    })
  }, [selectedBrands, selectedCategories, priceRange])

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setPriceRange([0, 100])
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {(selectedBrands.length > 0 || selectedCategories.length > 0) && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {selectedBrands.length + selectedCategories.length}
            </span>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort: {sortOption}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
              <DropdownMenuRadioItem value="Popularity">Popularity</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Price: Low to High">Price: Low to High</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Price: High to Low">Price: High to Low</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Newest">Newest</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Most Viewed">Most Viewed</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Best Selling">Best Selling</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {showFilters && (
        <div className="mt-4 rounded-lg border p-4 md:mt-0">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">Filter Products</h3>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="brands">
              <AccordionTrigger>Brands</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <Label htmlFor={`brand-${brand}`} className="text-sm font-normal">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="categories">
              <AccordionTrigger>Categories</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="py-4"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  )
}
