"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminProductList from "@/components/admin-product-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RefreshCw, LogOut } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { fetchProducts } from "@/lib/api"
import type { Product } from "@/lib/types"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAdmin = localStorage.getItem("isAdmin")
    if (!isAdmin) {
      router.push("/admin")
      return
    }

    loadProducts()
  }, [router])

  const loadProducts = async () => {
    setIsLoading(true)
    try {
      const data = await fetchProducts()
      setProducts(data)
      setLastRefresh(new Date())
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    toast({
      title: "Refreshing data",
      description: "Fetching the latest product rankings",
    })
    loadProducts()
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    router.push("/admin")
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Last Refresh</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{lastRefresh.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{products.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pinned Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{products.filter((p) => p.isPinned).length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="mt-6">
        <TabsList>
          <TabsTrigger value="products">Product Rankings</TabsTrigger>
          <TabsTrigger value="history">Override History</TabsTrigger>
        </TabsList>
        <TabsContent value="products" className="mt-4">
          <AdminProductList products={products} isLoading={isLoading} onRefresh={loadProducts} />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Override History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50 text-left">
                      <th className="p-2 font-medium">Date</th>
                      <th className="p-2 font-medium">Product</th>
                      <th className="p-2 font-medium">Action</th>
                      <th className="p-2 font-medium">User</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">2023-06-13 09:15</td>
                      <td className="p-2">Glow Serum</td>
                      <td className="p-2">Pinned to #1</td>
                      <td className="p-2">admin@skinseoul.com</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">2023-06-12 14:30</td>
                      <td className="p-2">Hydrating Toner</td>
                      <td className="p-2">Unpinned</td>
                      <td className="p-2">admin@skinseoul.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
