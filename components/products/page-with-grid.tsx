"use client";

import ProductGrid from "@/components/products/product-grid";
import { Suspense } from "react";
import { SkeletonProductsPage } from "../skeletons";
import PaginationPage from "@/components/pagination-page";


interface Props {
  products: any[];
  pageNumber: number;
  totalPages: number;
  children?: React.ReactNode;        // opcional, por si querés agregar algo arriba
  footer?: React.ReactNode;          // opcional, por si querés agregar algo abajo
}

export default function PageWithGrid({
  products,
  pageNumber,
  totalPages,
  children,
  footer,
}: Props) {
  return (
    <div className="container mx-auto flex flex-col min-h-screen">

      {/* Contenido superior opcional */}
      <div className=" h-16">
        {children}
      </div>

      <Suspense fallback={<SkeletonProductsPage/>}>
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </Suspense>

      <div className="mt-8">
        {totalPages > 1 && (
          <PaginationPage
            currentPage={pageNumber}
            totalPages={totalPages}
          />
        )}
      </div>

      {footer}
    </div>
  );
}
