

import {  getTopFiveOldestProducts, getTopFiveOutOfStockProducts } from "@/lib/data/product.data"
import { getOrdersDashboardTotalCount, getTopFiveRecentOrders } from "@/lib/data/orders.data"
import { OrderStatus } from "@/lib/types/order.types"
import DashboardClient from "./_components/dashboard-client"

interface DashboardPageProps {
  searchParams?: {
    query?: string
    status?: OrderStatus
  }
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {

  const params = await searchParams;

  const query = params?.query ?? ""
  const status: OrderStatus = (params?.status as OrderStatus) ?? "pending"; 


  const [
    productsOutofStock,
    productsOld,
    totalOrders,
    OrdersTopFive,
  ] = await Promise.all([
    getTopFiveOutOfStockProducts(),
    getTopFiveOldestProducts(),
    getOrdersDashboardTotalCount(query, status),
    getTopFiveRecentOrders(),
  ])

  return (
    <DashboardClient
      productsOld={productsOld}
      productsOutOfStock={productsOutofStock}
      OrdersTopFive={OrdersTopFive}
      totalOrders={totalOrders}
    />
  )
}

