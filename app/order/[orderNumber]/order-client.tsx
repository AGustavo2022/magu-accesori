"use client"

import { useEffect, useRef } from "react"

import OrderConfirmation from "@/components/checkout/order-confirmation"
import { OrderConfirmationProps } from "@/lib/types/order.types"
import { useCart } from "@/contexts/cart.context"

export default function OrderClient({ order,
    items,
}: OrderConfirmationProps) {

    const { clearCart } = useCart()
    const ran = useRef(false) //useRef para evitar doble ejecución

    useEffect(() => {
        if (ran.current) return
        ran.current = true
        clearCart()
    }, [clearCart])

    return <OrderConfirmation order={order} items={items} />
}
