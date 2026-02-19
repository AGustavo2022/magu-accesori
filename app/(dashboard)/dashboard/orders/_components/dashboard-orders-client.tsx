"use client"

import { useEffect } from "react"
import { useOrders } from "@/contexts/orders/orders-context"

import { OrdersTable } from "@/components/dashboard/orders-table"
import PaginationProducts from "@/components/pagination-products"
import SearchNew from "@/components/search"

import { Order } from "@/lib/types/order.types"

interface DashboardOrdersClientProps {
  orders: Order[]
  totalOrders: number
  totalPages: number
  currentPage: number
  pendingCount: number
}

export default function DashboardOrdersClient({
  orders,
  totalOrders,
  totalPages,
  currentPage,
  pendingCount,
}: DashboardOrdersClientProps) {

  const { setPendingCount } = useOrders()

  useEffect(() => {
    setPendingCount(pendingCount)
  }, [pendingCount, setPendingCount])

  return (
    <div className="container mx-auto flex flex-col min-h-screen">

      <SearchNew placeholder="Buscar orden..." />

      <OrdersTable
        orders={orders}
        totalOrders={totalOrders}
        columns={[
          "info",
          "order",
          "customer",
          "payment-method",
          "tolal",
          "date",
          "time",
          "status",
          "shipment",
          "drawer",
        ]}
      />

      <div className="mt-8">
        {totalPages > 1 && (
          <PaginationProducts
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>

    </div>
  )
}
