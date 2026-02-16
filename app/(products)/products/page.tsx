import { getProductsPages, getProductsTotalPages } from "@/lib/data/product.data"
import ProductsPageClient from "./_components/products-page-client"

export const dynamic = "force-dynamic"

interface ProductItemPageProps {
  searchParams: Promise<{
    page?: string
    query?: string
  }>
}

export default async function ProductItemPage({
  searchParams,
}: ProductItemPageProps) {

  const params = await searchParams

  const currentPage = Number(params?.page ?? 1)
  const query = params?.query ?? ""

  const [products, totalPages] = await Promise.all([
    getProductsPages(query, currentPage),
    getProductsTotalPages(query),
  ])

  return (
    <ProductsPageClient
      products={products}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}
