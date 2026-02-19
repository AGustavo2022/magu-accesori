import { getOrderByNumber } from "@/lib/data/orders.data"
import { notFound } from "next/navigation"
import OrderConfirmation from "@/app/(shop)/order/_components/order-confirmation"


export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>
}) {

  const { orderNumber } = await params
  const { order, items } = await getOrderByNumber(orderNumber)

  if (!order) notFound()

  return <OrderConfirmation order={order} items={items} />
}