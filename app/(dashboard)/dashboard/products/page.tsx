import DashboardProductsClient from "@/app/(dashboard)/dashboard/products/_components/dashboard-products-client"
import {
  getProductsDashboardPages,
  getProductsDashboardTotalCount,
  getProductsDashboardTotalPages,
} from "@/lib/data/product.data"

interface DashboardPageProps {
  searchParams: Promise<{
    page?: string
    query?: string
    status?: "true" | "false"
    category?: string
    outOfStock?: string
      }>;
    }

export default async function DashboardProductsPage({ searchParams }: DashboardPageProps) {

  const params = await searchParams;

  const currentPage = Number(params?.page ?? 1)
  const query = params?.query ?? ""

  const status: boolean =
    params?.status === "false" ? false : true

  const categoryName = params?.category ?? undefined
  const onlyOutOfStock = params?.outOfStock === "true"

  const statusParam = params?.status ?? "true"
  const outOfStockParam = params?.outOfStock === "true"

  const currentFilter: "active" | "out-of-stock" | "inactive" =
  outOfStockParam
    ? "out-of-stock"
    : statusParam === "false"
    ? "inactive"
    : "active"


  const [ products, totalProducts, totalPages ] = await Promise.all([
    
    getProductsDashboardPages(
      query,
      currentPage,
      status,
      categoryName,
      onlyOutOfStock
    ),
    getProductsDashboardTotalCount(
      query,
      status,
      categoryName,
      onlyOutOfStock
    ),
    getProductsDashboardTotalPages(
      query,
      status,
      categoryName
    ),
  ])

  return (

    <DashboardProductsClient
      products={products}
      pageNumber={currentPage}
      totalProducts={totalProducts}
      totalPages={totalPages}
      currentFilter={currentFilter} 
    />
  )
}
