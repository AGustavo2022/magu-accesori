
import { MetricCard } from "@/components/dashboard/metric-card"
import { ProductTableCard } from "@/components/dashboard/products-table-card"
import { getProductsDashboard } from '@/lib/data/product.data'


export default async function DashboardPage() {

  const products = await getProductsDashboard()

  // console.log(products)

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Productos</h1>
        <p className="text-muted-foreground">Gestiona tu inventario de productos</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          products={products.length}
          cardTitle="Cantidad de Productos"
        />
        <MetricCard
          products={products.reduce((sum, product) => sum + product.stock, 0)}
          cardTitle="Stock Total"
        />
        <MetricCard
          products={products.reduce((sum, product) => sum + product.price * product.stock, 0).toFixed(2)}
          cardTitle="Valor del Inventario"
          unitSigla="$"
        />
      </div>
      <ProductTableCard products={products} />
    </div>
  )
}
