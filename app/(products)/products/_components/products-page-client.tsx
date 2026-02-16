"use client"

import PageWithGrid from "@/components/page-with-grid"
import SearchNew from "@/components/search"

import { Product } from "@/lib/types/definitions"

interface ProductsPageClientProps {
  products: Product[]
  currentPage: number
  totalPages: number
}

export default function ProductsPageClient({
  products,
  currentPage,
  totalPages,
}: ProductsPageClientProps) {

  const isEmpty = !products || products.length === 0

    return (
        <PageWithGrid
            products={products}
            pageNumber={currentPage}
            totalPages={totalPages}
        >
            <SearchNew
                placeholder="Busqueda de Producto"
            />

            {isEmpty && (
                <div className="mt-10 text-center text-muted-foreground">
                    No se encontraron productos para tu búsqueda
                </div>
            )}
        </PageWithGrid>
    )
}
