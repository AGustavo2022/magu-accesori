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

  if (!products || products.length === 0) {
    notFound();
  }



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
