import { Suspense } from "react"
import ProductDisplay from "@/components/product-display"
import FilterSortControls from "@/components/filter-sort-controls"
import { ProductProvider } from "@/components/product-context"
import { Skeleton } from "@/components/ui/skeleton"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <ProductProvider>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Automated Merchandising</h1>
            <ModeToggle />
          </div>
          <p className="text-muted-foreground">
            Discover our most loved Korean skincare products, curated for your beauty routine.
Created by: github.com/sekshem
          </p>
          <FilterSortControls />
        </div>
        <Suspense fallback={<ProductDisplaySkeleton />}>
          <ProductDisplay />
        </Suspense>
      </main>
    </ProductProvider>
  )
}

function ProductDisplaySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 rounded-xl border p-4">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
            <div className="flex justify-between">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
    </div>
  )
}
