
import PageWithGridDashboard from "@/components/dashboard/page-with-grid-dashboard"
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
      products={products}
      pageNumber={currentPage}
      totalProducts={totalProducts}
      totalPages={totalPages}
    />
  )
}
