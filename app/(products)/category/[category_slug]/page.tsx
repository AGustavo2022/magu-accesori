import PaginationProducts from "@/components/pagination-products";
import ProductGrid from "@/components/products/product-grid"
import { getCategoryTotalPages, getProductsByCategory } from "@/lib/data"
import { unslugify } from "@/lib/utils"

export const dynamic = "force-dynamic";


export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category_slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const {category_slug} = await params
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;

  const products = await getProductsByCategory(unslugify(category_slug), pageNumber)
  const totalPages = await getCategoryTotalPages(unslugify(category_slug));

  console.log(totalPages)

  return (
  <div className="container mx-auto flex flex-col min-h-screen">

    <div className="flex-1">
      <ProductGrid products={products} />
    </div>

    <div className="mt-8">
    {totalPages > 1 && (
      <PaginationProducts
        currentPage={pageNumber}
        totalPages={totalPages}
      />
    )}
    </div>

  </div>
  )
}
