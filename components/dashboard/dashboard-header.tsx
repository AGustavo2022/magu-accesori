"use client"

import { NavLink } from "../navLink"
import { signOut } from "@/auth"
import { Button } from "../ui/button"
import { PowerIcon, PlusIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { SignOutButton } from "../auth/sign-out-button"

export function DashboardHeader() {
  const pathname = usePathname()

  const isProductsPage = pathname === "/dashboard/products"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">

        {/* LINKS */}
        <div className="flex items-start gap-3">
          <NavLink href="/dashboard" label="Dashboard" icon="dashboard" />
          <NavLink href="/dashboard/products" label="Productos" icon="products" />
          <NavLink href="/dashboard/orders" label="Ordenes" icon="orders" />
        </div>

        {/* ACCIONES DERECHA */}
        <div className="flex items-center gap-4">

          {/* SOLO EN PRODUCTOS */}
          {isProductsPage && (
            <NavLink href="/dashboard/products/add" label="Agregar Productos" icon="add" />
          )}

          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
