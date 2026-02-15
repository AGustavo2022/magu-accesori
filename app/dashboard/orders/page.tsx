import { OrdersInitializer } from "@/components/dashboard/orders-initializer"
import { OrdersTable } from "@/components/dashboard/orders-table"
import PaginationProducts from "@/components/pagination-products"
import SearchNew from "@/components/search"
import { getPendingOrdersCount } from "@/lib/actions/order.actions"
import { getOrdersDashboardTotalCount, getOrdersPages, getOrdersTotalPages } from "@/lib/data/orders.data"
import { OrderStatus } from "@/lib/types/order.types"


export default async function OrdersPage({
    searchParams,
}: {
  searchParams?: Promise<{
    page?: string
    query?: string
    status?: OrderStatus
  }>
}) {

  const params = await searchParams;
  const currentPage = Number(params?.page || 1)
  const query = params?.query || ""
 
const status = params?.status


  const orders = await getOrdersPages(query, currentPage, status)

  const totalOrders = await getOrdersDashboardTotalCount(query)
  
  const totalPage = await getOrdersTotalPages(query, status)

  const pendingCount = await getPendingOrdersCount()

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <OrdersInitializer count={pendingCount} />
      <SearchNew placeholder="Buscar orden..." />
      {/* INFO */}
      <p className="text-sm text-muted-foreground pt-3">
        Mostrando {orders.length} de {totalOrders} órdenes
      </p>
      <OrdersTable
        orders={orders}
        columns={[
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