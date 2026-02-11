import { MetricCard } from "@/components/dashboard/metric-card"
import { ProductsTable } from "@/components/dashboard/products-table"
import PageWithGridDashboard from "@/components/dashboard/products-table-pagination"
import { NavLink } from "@/components/navLink"
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
    <PageWithGridDashboard

    //   children={    
    //       <NavLink
    //         href="/dashboard/add"
    //         label="Agregar Producto"
    //         icon="add"
    //       /> 
    // }  
      products={products}
      pageNumber={currentPage}
      totalProducts={totalProducts}
      totalPages={totalPages}
    />
  )
}
