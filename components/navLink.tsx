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
        <Icon size={24} />
        <span className="text-xs leading-tight whitespace-pre-line text-center">
          {label}
        </span>
      </Link>
    </Button>
  )
}
