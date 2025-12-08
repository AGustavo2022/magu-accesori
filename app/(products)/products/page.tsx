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
  const page = Number(params?.page) || 1;

  const products = await getProductsPages(page);
  const totalPages = await getProductsTotalPages();

  if (!products || products.length === 0) {
    notFound();
  }

  return (
    <Suspense fallback={<p className="text-center py-10">Cargando productos...</p>}>
      <div className="space-y-6">

        {/* PRODUCT GRID */}
        <ProductGrid products={products} />

        {/* PAGINATION */}
        <PaginationProducts
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    </Suspense>
  );
}
