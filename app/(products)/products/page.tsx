import ProductGrid from "@/components/products/product-grid";
import { getProductsPages, getProductsTotalPages } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PaginationProducts from "@/components/pagination-products";

export default async function ProductItemPage({ searchParams,}: {searchParams?: { page?: string };}) {
  
  const page = Number(searchParams?.page) || 1;

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
