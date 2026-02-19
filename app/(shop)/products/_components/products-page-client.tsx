"use client"


import PaginationPage from "@/components/pagination-page"
import ProductGrid from "@/components/products/product-grid"
import SearchNew from "@/components/search"
import { SkeletonProductsPage } from "@/components/skeletons"

import { Product } from "@/lib/types/definitions"
import { Suspense } from "react"

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

        <div className="container mx-auto flex flex-col min-h-screen">

            <SearchNew placeholder="Busqueda de Producto"/>

            <Suspense fallback={<SkeletonProductsPage />}>
                <div className="flex-1">
                    <ProductGrid products={products} />
                </div>
            </Suspense>

            <div className="mt-8">
                {totalPages > 1 && (
                    <PaginationPage
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                )}
            </div>
        </div>
    )
}
