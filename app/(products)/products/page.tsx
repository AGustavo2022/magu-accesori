import { getProductsPages, getProductsTotalPages } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PageWithGrid from "@/components/page-with-grid";

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
      <PageWithGrid
        products={products}
        pageNumber={pageNumber}
        totalPages={totalPages}
      />
    </Suspense>
  );
}
