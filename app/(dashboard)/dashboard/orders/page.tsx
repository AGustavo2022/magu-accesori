import { getOrdersDashboardTotalCount, getOrdersPages, getOrdersTotalPages } from "@/lib/data/orders.data"
import DashboardOrdersClient from "./_components/dashboard-orders-client"
import { getPendingOrdersCount } from "@/lib/actions/order.actions"
import { OrderStatus } from "@/lib/types/order.types";

interface OrdersPageProps { 
  searchParams: Promise<{ 
    page?: string 
    query?: string 
    status?: OrderStatus
  }>; }

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  
  const params = await searchParams

  const currentPage = Number(params?.page ?? 1)
  const query = params?.query ?? ""
  const status = params?.status ?? "pending"

  const [orders, totalOrders, totalPages, pendingCount] = await Promise.all([
    getOrdersPages(query, currentPage, status),
    getOrdersDashboardTotalCount(query, status),
    getOrdersTotalPages(query, status),
    getPendingOrdersCount(),
  ])

  return (
    <DashboardOrdersClient
      orders={orders}
      totalOrders={totalOrders}
      totalPages={totalPages}
      currentPage={currentPage}
      pendingCount={pendingCount}
    />
  )
}
