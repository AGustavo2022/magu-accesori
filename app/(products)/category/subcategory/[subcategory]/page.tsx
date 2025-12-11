import ProductGrid from "@/components/products/product-grid";
import { 
  getProductsBySubcategory, 
  getSubcategoryTotalPages 
} from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PaginationProducts from "@/components/pagination-products";
import { unslugify } from "@/lib/utils";

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
  const pageNumber = Number(page) || 1;


  const products = await getProductsBySubcategory(unslugify(subcategory), pageNumber);
  const totalPages = await getSubcategoryTotalPages(subcategory);

  // if (!products || products.length === 0) {
  //   notFound();
  // }

  console.log(totalPages)
  return (
  <div className="space-y-6">
    <ProductGrid products={products} />

    {totalPages > 0 && (
      <PaginationProducts
        currentPage={pageNumber}
        totalPages={totalPages}
      />
    )}
  </div>
  );
}
