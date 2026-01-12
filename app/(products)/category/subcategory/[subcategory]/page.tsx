import {
  getProductsBySubcategory,
  getSubcategoryTotalPages
} from "@/lib/data/categories.data";
import { notFound } from "next/navigation";
import { unslugify } from "@/lib/utils";
import PageWithGrid from "@/components/page-with-grid";

export const dynamic = "force-dynamic";

export default async function SubCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ subcategory: string }>;
  searchParams: Promise<{ page?: string }>;
}) {

  const { subcategory } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;


  const products = await getProductsBySubcategory(unslugify(subcategory), currentPage);
  const totalPages = await getSubcategoryTotalPages(unslugify(subcategory));

  if (!products || products.length === 0) {
    notFound();
  }



  return (
    <>
    <PageWithGrid
      products={products}
      pageNumber={currentPage}
      totalPages={totalPages}
    />
    </>
  )
}
