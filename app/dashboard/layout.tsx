"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ProductsProvider } from "@/contexts/products-context"

const PackageIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
)

const TableIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M3 14h18m-9-4v8m-7 0V6a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"
    />
  </svg>
)

const PlusIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const navigation = [
  {
    name: "Productos",
    href: "/dashboard",
    icon: TableIcon,
  },
  {
    name: "Agregar Producto",
    href: "/dashboard/add",
    icon: PlusIcon,
  },
]

export default function DashboardLayout({children,}: {children: React.ReactNode}) {
  
    const pathname = usePathname()

  return (
    <ProductsProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        {/* <header className="border-b border-border bg-card">
          <div className="flex h-16 items-center px-6">
            <div className="flex items-center space-x-2">
              <PackageIcon />
              <h1 className="text-xl font-semibold">Dashboard de Productos</h1>
            </div>
          </div>
        </header> */}

        <div className="flex">
          {/* Sidebar */}
          {/* <nav className="w-64 border-r border-border bg-card">
            <div className="p-4">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav> */}

          {/* Main content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProductsProvider>
  )
}
