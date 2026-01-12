import { getProductsPages, getProductsTotalPages } from '@/lib/data/product.data';
import { notFound } from "next/navigation";
import PageWithGrid from "@/components/page-with-grid";
import SearchNew from "@/components/search";

export const dynamic = "force-dynamic";


export default async function ProductItemPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
}) {

  const params = await searchParams;
  const currentPage  = Number(params?.page) || 1;
  const query = params?.query || "";

  const products = await getProductsPages(query, currentPage);
  const totalPages = await getProductsTotalPages(query);

  if (!products || products.length === 0) {
    notFound();
  }

  return (
    <PageWithGrid
      products={products}
      pageNumber={currentPage}
      totalPages={totalPages}
    >
      <SearchNew placeholder="Busqueda de Producto" />
    </PageWithGrid>
  );
}
