"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, DollarSign, Truck, Clock } from "lucide-react"
import { ProductsTable } from "@/components/dashboard/products-table"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { Order } from "@/lib/types/order.types"
import { Product } from "@/lib/types/definitions"

interface DashboardTablesClientProps {
  productsOld: Product[]
  productsOutOfStock: Product[]
  OrdersTopFive: Order[]
  totalOrders: number
}

const mockStats = {
  totalProducts: 128,
  totalOrders: 542,
  pendingOrders: 12,
  requestedShipments: 18,
  inventoryValue: 254300,
}

export default function DashboardTablesClient({
  productsOld,
  productsOutOfStock,
  OrdersTopFive,
  totalOrders,
}: DashboardTablesClientProps) {
  return (
    <div className="space-y-8">
      
      {/* ===== HEADER + STATS ===== */}
      <div className="space-y-6">
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <StatCard title="Total Productos" value={mockStats.totalProducts} icon={<Package className="w-5 h-5" />} />
          <StatCard title="Órdenes Totales" value={mockStats.totalOrders} icon={<ShoppingCart className="w-5 h-5" />} />
          <StatCard title="Órdenes Pendientes" value={mockStats.pendingOrders} icon={<Clock className="w-5 h-5" />} highlight="text-amber-500" />
          <StatCard title="Envíos Solicitados" value={mockStats.requestedShipments} icon={<Truck className="w-5 h-5" />} highlight="text-blue-500" />
          <StatCard title="Valor Inventario" value={`$${mockStats.inventoryValue.toLocaleString()}`} icon={<DollarSign className="w-5 h-5" />} />
        </div>
      </div>

      <div className="divide-y divide-muted/40 space-y-10">
        
        {/* ===== PRODUCTOS EN PARALELO ===== */}
        <div className="grid gap-8 lg:grid-cols-2 pt-10">
          <Card className="rounded-2xl border bg-background shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top 5 Productos Más Antiguos</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductsTable products={productsOld} columns={["image", "product"]} />
            </CardContent>
          </Card>

          <Card className="rounded-2xl border bg-background shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top 5 Productos Sin Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductsTable products={productsOutOfStock} columns={["image", "product"]} />
            </CardContent>
          </Card>
        </div>

        {/* ===== ORDENES ABAJO ===== */}
        <div className="pt-10">
          <Card className="rounded-2xl border bg-background shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top 5 Últimas Ordenes</CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersTable
                orders={OrdersTopFive}
                totalOrders={totalOrders}
                columns={["order", "customer", "payment-method", "tolal", "date", "status", "shipment"]}
              />
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

function StatCard({ title, value, icon, highlight }: any) {
  return (
    <Card className="rounded-2xl border bg-background/70 backdrop-blur shadow-lg hover:shadow-xl transition">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${highlight || ""}`}>{value}</p>
      </CardContent>
    </Card>
  )
}
