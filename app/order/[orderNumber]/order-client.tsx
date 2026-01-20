"use client"

import { useEffect, useRef } from "react"

import OrderConfirmation from "@/components/checkout/order-confirmation"
import { OrderConfirmationProps } from "@/lib/types/order.types"
import { useCart } from "@/contexts/cart.context"

export default function OrderClient({ order,
    items,
}: OrderConfirmationProps) {

    const { clearCart } = useCart()

    useEffect(() => {
        clearCart()
    }, [])

    return <OrderConfirmation order={order} items={items} />
}
