

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { OrdersProvider } from "@/contexts/orders/orders-context"
import React from "react"

export const dynamic = "force-dynamic"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OrdersProvider>
    <div className="flex min-h-screen flex-col">
      {/* HEADER */}
      
        <header className=" bg-background  py-2">
          <DashboardHeader />
        </header>
      

      {/* CONTENIDO */}
      <main className="flex-1">
        {children}
      </main>
    </div>
    </OrdersProvider>
  )
}
