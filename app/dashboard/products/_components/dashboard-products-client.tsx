"use client"

import { useRouter, usePathname } from "next/navigation"
import PaginationProducts from "@/components/pagination-products"
import { ProductsTable } from "../../../../components/dashboard/products-table"
import SearchNew from "../../../../components/search"

import {
  FilterOptionCard,
  filterOptions,
} from "@/components/dashboard/filter-option-card"

interface Props {
  products: any[]
  pageNumber: number
  totalPages: number
  totalProducts: number
  currentFilter: "active" | "out-of-stock" | "inactive"
  children?: React.ReactNode
  footer?: React.ReactNode
}

export default function DashboardProductsClient({
  products,
  pageNumber,
  totalPages,
  totalProducts,
  currentFilter,
  children,
  footer,
}: Props) {

  const router = useRouter()
  const pathname = usePathname()


  return (
    <div className="container mx-auto flex flex-col min-h-screen space-y-6">

      <div className="flex justify-end py-2">
        {children}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filterOptions.map((option) => (
          <FilterOptionCard
            key={option.id}
            item={option}
            selected={currentFilter === option.id}
            onSelect={() => {
              const params = new URLSearchParams()

              if (option.id === "active") {
                params.set("status", "true")
              }

              if (option.id === "out-of-stock") {
                params.set("status", "true")
                params.set("outOfStock", "true")
              }

              if (option.id === "inactive") {
                params.set("status", "false")
              }

              params.set("page", "1")

              router.replace(`${pathname}?${params.toString()}`)
            }}

          />
        ))}
      </div>

      <SearchNew placeholder="Buscar producto..." />

      <ProductsTable 
      products={products} 
      totalProducts={totalProducts} 
        columns={[
          "info",
          "image",
          "product",
          "price",
          "stock",
          "discount",
          "date",
          "action"
        ]}
      />

      {totalPages > 1 && (
        <PaginationProducts
          currentPage={pageNumber}
          totalPages={totalPages}
        />
      )}

      {footer}
    </div>
  )
}
