"use client"

import { useRouter, useSearchParams } from "next/navigation"
import PaginationProducts from "@/components/pagination-products"
import { ProductsTable } from "./products-table"
import SearchNew from "../search"

import {
  FilterOptionCard,
  filterOptions,
} from "@/components/dashboard/filter-option-card"

interface Props {
  products: any[]
  pageNumber: number
  totalPages: number
  totalProducts: number
  children?: React.ReactNode
  footer?: React.ReactNode
}

export default function PageWithGridDashboard({
  products,
  pageNumber,
  totalPages,
  totalProducts,
  children,
  footer,
}: Props) {

  const router = useRouter()
  const searchParams = useSearchParams()

  const statusParam = searchParams.get("status") ?? "true"
  const outOfStockParam = searchParams.get("outOfStock") === "true"

  const currentFilter: "active" | "out-of-stock" | "inactive" =
    outOfStockParam
      ? "out-of-stock"
      : statusParam === "false"
      ? "inactive"
      : "active"

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
              const params = new URLSearchParams(searchParams.toString())

              if (option.id === "active") {
                params.set("status", "true")
                params.delete("outOfStock")
              }

              if (option.id === "out-of-stock") {
                params.set("page", "1")
                params.set("status", "true")
                params.set("outOfStock", "true")
              }

              if (option.id === "inactive") {
                params.set("page", "1")
                params.set("status", "false")
                params.delete("outOfStock")
              }

              router.push(`?${params.toString()}`)
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
