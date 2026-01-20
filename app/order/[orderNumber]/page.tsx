import { getOrderByNumber } from "@/lib/data/orders.data"
import { notFound } from "next/navigation"
import OrderClient from "./order-client"


export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>
}) {

  const { orderNumber } = await params
  const { order, items } = await getOrderByNumber(orderNumber)

  if (!order) notFound()

  return <OrderClient order={order} items={items} />
}