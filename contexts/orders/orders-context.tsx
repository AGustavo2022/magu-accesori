"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface OrdersContextType {
  pendingCount: number
  setPendingCount: (count: number) => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [pendingCount, setPendingCount] = useState(0)

  return (
    <OrdersContext.Provider value={{ pendingCount, setPendingCount }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider")
  }
  return context
}
