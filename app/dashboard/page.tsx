

import {  getTopFiveOldestProducts, getTopFiveOutOfStockProducts } from "@/lib/data/product.data"
import { getOrdersDashboardTotalCount, getTopFiveRecentOrders } from "@/lib/data/orders.data"
import { OrderStatus } from "@/lib/types/order.types"
import DashboardTablesClient from "./DashboardTablesClient"



export default async function EcommerceDashboard({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string
    query?: string
    status?: OrderStatus
  }>
}) {

  const params = await searchParams;
  const query = params?.query || ""
  const status = params?.status


  const productsOutofStock = await getTopFiveOutOfStockProducts()

  const productsOld = await getTopFiveOldestProducts()

  const totalOrders = await getOrdersDashboardTotalCount(query, status)

  const OrdersTopFive = await getTopFiveRecentOrders()

  return (
    <DashboardTablesClient
      productsOld={productsOld}
      productsOutOfStock={productsOutofStock}
      OrdersTopFive={OrdersTopFive}
      totalOrders={totalOrders}
    />
  )
}

