"use client"

import { useEffect, useRef } from "react"
import { useCart } from "@/contexts/cart-context"
import OrderConfirmation from "@/components/checkout/order-confirmation"
import { OrderConfirmationProps } from "@/lib/types/order.types"

export default function OrderClient({ order,
    items,
}: OrderConfirmationProps) {

    const { clearCart } = useCart()
    const ran = useRef(false)

    useEffect(() => {
        if (ran.current) return
        ran.current = true
        clearCart()
    }, [clearCart])

    return <OrderConfirmation order={order} items={items} />
}
