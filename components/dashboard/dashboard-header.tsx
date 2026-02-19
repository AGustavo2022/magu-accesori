"use client"

import { Suspense } from "react"
import { NavLink } from "./navLink"
import { usePathname } from "next/navigation"
import { SignOutButton } from "../auth/sign-out-button"

function OrdersFilters() {
  return (
    <>
      <NavLink 
        href="/dashboard/orders?page=1&status=pending" 
        label="Pendientes" 
        icon="pending" 
      />
      <NavLink 
        href="/dashboard/orders?page=1&status=confirmed" 
        label="Confirmadas" 
        icon="confirmed" 
      />
      <NavLink 
        href="/dashboard/orders?page=1&status=cancelled" 
        label="Canceladas" 
        icon="cancelled" 
      />
    </>
  )
}

export function DashboardHeader() {
  const pathname = usePathname()

  const isProductsPage = pathname === "/dashboard/products"
  const isOrdersPage = pathname === "/dashboard/orders"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">

        <div className="flex items-start gap-3">
          <NavLink href="/dashboard" label="Dashboard" icon="dashboard" />
          <NavLink href="/dashboard/products" label="Productos" icon="products" />
          <NavLink href="/dashboard/orders" label="Ordenes" icon="orders" />
        </div>

        <div className="flex items-center gap-4">

          {isProductsPage && (
            <NavLink 
              href="/dashboard/products/add" 
              label="Agregar Productos" 
              icon="add" 
            />
          )}

          {isOrdersPage && (
            <Suspense fallback={null}>
              <OrdersFilters />
            </Suspense>
          )}

          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
