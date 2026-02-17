import { notFound } from "next/navigation"
import {
  getProductsPages,
  getProductsTotalPages,
} from "@/lib/data/product.data"
import ProductsPageClient from "../_components/products-page-client"
import { unslugify } from "@/lib/utils"

export const dynamic = "force-dynamic"

interface ProductItemPageProps {
  params: Promise<{
    slug?: string[]
  }>
  searchParams: Promise<{
    page?: string
    query?: string
  }>
}

export default async function ProductItemPage({
  params,
  searchParams,
}: ProductItemPageProps) {

  const { slug } = await params
  const search = await searchParams

  const currentPage = Number(search?.page ?? 1)
  const query = search?.query ?? ""

  const slugArray = slug ?? []

  if (slugArray.length > 2) {
    notFound()
  }

  const categorySlug = slugArray[0]
  const subcategorySlug = slugArray[1]

  const category = categorySlug ? unslugify(categorySlug) : undefined
  const subcategory = subcategorySlug ? unslugify(subcategorySlug) : undefined

  const [products, totalPages] = await Promise.all([
    getProductsPages({
      query,
      page: currentPage,
      category,
      subcategory,
    }),
    getProductsTotalPages({
      query,
      category,
      subcategory,
    }),
  ])

  return (
    <ProductsPageClient
      products={products}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}
