import { getProductsPages, getProductsTotalPages } from '@/lib/data/product.data';
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

  const isEmpty = !products || products.length === 0


  return (
    <PageWithGrid
      products={products}
      pageNumber={currentPage}
      totalPages={totalPages}
    >
      <SearchNew placeholder="Busqueda de Producto" />

      {isEmpty && (
        <div className="mt-10 text-center text-muted-foreground">
          No se encontraron productos para tu búsqueda
        </div>
      )}
      
    </PageWithGrid>
  );
}
