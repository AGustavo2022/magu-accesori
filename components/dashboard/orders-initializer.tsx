"use client"

import { useOrders } from "@/contexts/orders/orders-context"
import { useEffect } from "react"


export function OrdersInitializer({ count }: { count: number }) {
  const { setPendingCount } = useOrders()

  useEffect(() => {
    setPendingCount(count)
  }, [count, setPendingCount])

  return null
}
