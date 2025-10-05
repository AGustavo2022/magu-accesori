"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProductsTable } from "@/components/products-table"
import { useProducts } from "@/contexts/products-context"

const PlusIcon = () => (
  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

export default function DashboardPage() {
  const { products, deleteProduct } = useProducts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">Gestiona tu inventario de productos</p>
        </div>
        {/* <Link href="/dashboard/add">
          <Button>
            <PlusIcon />
            Agregar Producto
          </Button>
        </Link> */}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.reduce((sum, product) => sum + product.stock, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${products.reduce((sum, product) => sum + product.price * product.stock, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsTable products={products} onDelete={deleteProduct} />
        </CardContent>
      </Card>
    </div>
  )
}
