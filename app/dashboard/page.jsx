//"use client"
//import { useProducts } from "@/contexts/products-context"
import {CardProducts, CardProductsTable} from "@/components/card-products" 
import { getProductos2 } from '@/lib/data'

export default async function DashboardPage() {
  //const { products, deleteProduct } = useProducts()
  const products = await getProductos2()

  console.log(products)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">Gestiona tu inventario de productos</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <CardProducts
          products={products.length}
          cardTitle="Cantidad de Productos"
        />
        <CardProducts
          products={products.reduce((sum, product) => sum + product.stock, 0)}
          cardTitle="Stock Total"
        />
        <CardProducts
          products={products.reduce((sum, product) => sum + product.price * product.stock, 0).toFixed(2)}
          cardTitle="Valor del Inventario"
          unitSigla="$"
        />
      </div>
        <CardProductsTable
          products={products}
        />
    </div>
  )
}
