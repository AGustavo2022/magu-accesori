"use client";

import PaginationProducts from "@/components/pagination-products";
import { ProductsTable } from "./products-table";


interface Props {
  products: any[];
  pageNumber: number;
  totalPages: number;
  totalProducts: number;
  children?: React.ReactNode;  
  footer?: React.ReactNode;          
}

export default function PageWithGridDashboard({
  products,
  pageNumber,
  totalPages,
  totalProducts,
  children,
  footer,
}: Props) {
  return (
    
    <div className="container mx-auto flex flex-col min-h-screen">

      {/* Contenido superior opcional */}
      <div className="flex justify-end py-2">
        {children}
      </div>
      <div className="flex-1">
        <ProductsTable 
          products={products}
          totalProducts={totalProducts} 
          />
      </div>

      <div className="mt-8">
        {totalPages > 1 && (
          <PaginationProducts
            currentPage={pageNumber}
            totalPages={totalPages}
          />
        )}
      </div>

      {footer}
    </div>
  );
}
