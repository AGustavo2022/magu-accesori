import { MetricCard } from "@/components/dashboard/metric-card"
import { ProductsTable } from "@/components/dashboard/products-table"
import PageWithGridDashboard from "@/components/dashboard/products-table-pagination"
import SearchNew from "@/components/search"
import {
  getProductsDashboardPages,
  getProductsDashboardTotalCount,
  getProductsDashboardTotalPages,
} from "@/lib/data/product.data"

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

  const status: boolean =
    params?.status === "false" ? false : true

  const categoryName = params?.category ?? undefined

  const onlyOutOfStock = params?.outOfStock === "true"
 

  const products = await getProductsDashboardPages(
    query,
    currentPage,
    status,
    categoryName,
    onlyOutOfStock
  )

  const totalProducts = await getProductsDashboardTotalCount(
  query,
  status,
  categoryName,
  onlyOutOfStock
)

  const totalPages = await getProductsDashboardTotalPages(
  query,
  status,
  categoryName
)


  return (

  
    // <div className="space-y-6">
    //   <div>
    //     <h1 className="text-3xl font-bold">Productos</h1>
    //     <p className="text-muted-foreground">
    //       Gestiona tu inventario de productos
    //     </p>
    //   </div>

    //   {/* MÉTRICAS (solo sobre la página actual) */}
    //   <div className="grid gap-4 md:grid-cols-3">
    //     <MetricCard
    //       products={products.length}
    //       cardTitle="Productos visibles"
    //     />
    //     <MetricCard
    //       products={products.reduce((sum, p) => sum + p.stock, 0)}
    //       cardTitle="Stock visible"
    //     />
    //     <MetricCard
    //       products={products
    //         .reduce((sum, p) => sum + p.price * p.stock, 0)
    //         .toFixed(2)}
    //       cardTitle="Valor visible"
    //       unitSigla="$"
    //     />
    //   </div>
<>
    <PageWithGridDashboard
      products={products}
      pageNumber={currentPage}
      totalProducts={totalProducts}
      totalPages={totalPages}
    />
</>

    //   {isEmpty && (
    //     <div className="text-center text-muted-foreground mt-10">
    //       No se encontraron productos
    //     </div>
    //   )}
    // </div>
  )
}
