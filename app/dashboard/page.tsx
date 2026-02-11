import { MetricCard } from "@/components/dashboard/metric-card"
import { getProductsDashboardPages } from "@/lib/data/product.data"

export const dynamic = "force-dynamic"



export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string
    query?: string
    status?: "true" | "false"
    category?: string
    outOfStock?: string
  }>
}) {

  const params = await searchParams;
  const currentPage = Number(params?.page || 1)
  const query = params?.query || ""


 
    const products = await getProductsDashboardPages(
      query,
      currentPage,
    )


  return (
    <>
    <h1>Dashboard</h1>

      <div>
        <h1 className="text-3xl font-bold">Productos</h1>
        <p className="text-muted-foreground">
          Gestiona tu inventario de productos
        </p>
      </div>


     <div className="grid gap-4 md:grid-cols-3">
         <MetricCard
          products={products.length}
           cardTitle="Productos visibles"
         />
         <MetricCard
           products={products.reduce((sum, p) => sum + p.stock, 0)}
           cardTitle="Stock visible"
         />
         {/* <MetricCard
           products={products
             .reduce((sum, p) => sum + p.price * p.stock, 0)
             .toFixed(2)}
           cardTitle="Valor visible"
           unitSigla="$"
         /> */}
       </div> 
    </>
  )
}
