import ProductGrid from "@/components/products/product-grid";
import { getProductsPages, getProductsTotalPages } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PaginationProducts from "@/components/pagination-products";

export const dynamic = "force-dynamic";


export default async function ProductItemPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {

  const params = await searchParams;
  const pageNumber = Number(params?.page) || 1;

  const products = await getProductsPages(pageNumber);
  const totalPages = await getProductsTotalPages();

  if (!products || products.length === 0) {
    notFound();
  }

  return (
    <Suspense fallback={<p className="text-center py-10">Cargando productos...</p>}>
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
    </Suspense>
  );
}
