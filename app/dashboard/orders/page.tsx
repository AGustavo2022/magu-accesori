import { OrdersTable } from "@/components/dashboard/orders-table"
import PaginationProducts from "@/components/pagination-products"
import { getOrdersDashboardTotalCount, getOrdersPages, getOrdersTotalPages } from "@/lib/data/orders.data"


export default async function OrdersPage({
    searchParams,
}: {
  searchParams?: Promise<{
    page?: string
    query?: string
  }>
}) {

  const params = await searchParams;
  const currentPage = Number(params?.page || 1)
  const query = params?.query || ""


  const orders = await getOrdersPages(query, currentPage)

  const totalOrders = await getOrdersDashboardTotalCount(query)
  
  const totalPage = await getOrdersTotalPages(query)

  return (
    <>
      <OrdersTable
        orders={orders}
        totalOrder={totalOrders} />

      <div className="mt-8">
        {totalPage > 1 && (
          <PaginationProducts
            currentPage={currentPage}
            totalPages={totalPage}
          />
        )}
      </div>
    </>
  )
}