import OrderConfirmation from "@/components/checkout/order-confirmation"
import { useCart } from "@/contexts/cart-context"
import { getOrderByNumber } from "@/lib/data/orders.data"
import OrderClient from "./order-client"


export default async function OrderPage(props: { params: Promise<{ orderNumber: string }> }) {
    
    const { orderNumber } = await props.params

    const { order, items } = await getOrderByNumber(orderNumber)


  return <OrderClient order={order} items={items} />
}