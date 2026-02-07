import { MetricCard } from "@/components/dashboard/metric-card"
import { ProductsTable } from "@/components/dashboard/products-table"
import {
  getProductsDashboardPages,
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
  }>
}) {

  const params = await searchParams;
  const currentPage = Number(params?.page || 1)
  const query = params?.query || ""

  const status: boolean | undefined =
    params?.status === "true"
      ? true
      : params?.status === "false"
        ? false
        : undefined

  const categoryName = params?.category ?? undefined

  const products = await getProductsDashboardPages(
    query,
    currentPage,
    status,
    categoryName
  )

//   const totalPages = await getProductsDashboardTotalPages(
//   query,
//   status,
//   categoryName
// )

  const isEmpty = products.length === 0

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

      <ProductsTable
        products={products}
      />

    //   {isEmpty && (
    //     <div className="text-center text-muted-foreground mt-10">
    //       No se encontraron productos
    //     </div>
    //   )}
    // </div>
  )
}
