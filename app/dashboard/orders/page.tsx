import { OrdersInitializer } from "@/components/dashboard/orders-initializer"
import { OrdersTable } from "@/components/dashboard/orders-table"
import PaginationProducts from "@/components/pagination-products"
import SearchNew from "@/components/search"
import { getPendingOrdersCount } from "@/lib/actions/order.actions"
import {
  getOrdersDashboardTotalCount,
  getOrdersPages,
  getOrdersTotalPages
} from "@/lib/data/orders.data"
import { OrderStatus } from "@/lib/types/order.types"

export const dynamic = "force-dynamic"

interface OrdersPageProps {
  searchParams?: {
    page?: string
    query?: string
    status?: OrderStatus
  }
}

export default async function OrdersPage({
  searchParams,
}: OrdersPageProps) {

  const currentPage = Number(searchParams?.page ?? 1)
  const query = searchParams?.query ?? ""
  const status = searchParams?.status ?? "pending"

  const orders = await getOrdersPages(query, currentPage, status)
  const totalOrders = await getOrdersDashboardTotalCount(query, status)
  const totalPage = await getOrdersTotalPages(query, status)
  const pendingCount = await getPendingOrdersCount()

  return (
    <div className="container mx-auto flex flex-col min-h-screen">

      <OrdersInitializer count={pendingCount} />

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
          "status",
          "shipment",
          "drawer"
        ]}
      />

      <div className="mt-8">
        {totalPage > 1 && (
          <PaginationProducts
            currentPage={currentPage}
            totalPages={totalPage}
          />
        )}
      </div>
    </div>
  )
}
