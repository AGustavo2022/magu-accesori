import PageWithGrid from "@/components/page-with-grid";
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
    <PageWithGrid
      products={products}
      pageNumber={pageNumber}
      totalPages={totalPages}
    />
  )
}
