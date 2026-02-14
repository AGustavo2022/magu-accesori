"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  FileChartColumn,
  Plus,
  LayoutGrid,
  Package,
  ListOrdered
} from "lucide-react"
import { Clock } from "lucide-react"
import { CheckCircle } from "lucide-react"
import { XCircle } from "lucide-react"
import { useOrders } from "@/contexts/orders/orders-context"
import { Badge } from "./ui/badge"


type IconName = "dashboard" | "products" | "orders" | "add" | "pending" | "confirmed" | "cancelled" 

interface NavLinkProps {
  href: string
  label: string
  icon: IconName
}

const ICONS = {
  dashboard: FileChartColumn,
  add: Plus,
  categories: LayoutGrid,
  products: Package,
  orders: ListOrdered,
  pending: Clock,
  confirmed: CheckCircle,
  cancelled: XCircle,
}

export function NavLink({ href, label, icon }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  const { pendingCount } = useOrders()

  const Icon = ICONS[icon]

  const base =
    "w-24 h-24 rounded-xl flex flex-col items-center justify-center gap-1 transition"

  const active =
    "bg-muted border-primary text-primary pointer-events-none"

  const inactive =
    "hover:bg-gray-100"

  return (
    <Button
      asChild
      variant="outline"
      disabled={isActive}
      className={`${base} ${isActive ? active : inactive}`}
    >
      <Link
        href={href}
        className="flex flex-col items-center justify-center gap-1 text-center"
        aria-current={isActive ? "page" : undefined}
      >
        <div className="relative">
          <Icon size={24} />

          {icon === "pending" && pendingCount > 0 && (
            <Badge variant="outline" className="absolute -top-6 -right-8 min-w-6.5 h-6.5 px-2 flex items-center justify-center rounded-full bg-red-600/60 text-white text-sm font-bold shadow-md">
              {pendingCount > 99 ? "99+" : pendingCount}
            </Badge>

          )}
        </div>

        <span className="text-xs leading-tight whitespace-pre-line text-center">
          {label}
        </span>
      </Link>
    </Button>
  )
}
