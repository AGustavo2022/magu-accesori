
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, ShoppingCart, DollarSign, TrendingUp, Truck, Clock } from "lucide-react"
import { ProductsTable } from "@/components/dashboard/products-table"
import { getProductsDashboardPages, getProductsDashboardTotalCount, getTopFiveOldestProducts, getTopFiveOutOfStockProducts } from "@/lib/data/product.data"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { getOrdersDashboardTotalCount, getTopFiveRecentOrders } from "@/lib/data/orders.data"
import { OrderStatus } from "@/lib/types/order.types"

// =========================
// MOCK DATA
// =========================

const mockStats = {
  totalProducts: 128,
  totalOrders: 542,
  pendingOrders: 12,
  requestedShipments: 18,
  inventoryValue: 254300,
}

const outOfStockProducts = [
  { id: 1, title: "Monitor 27''", price: 120000 },
  { id: 2, title: "Notebook Gamer", price: 850000 },
  { id: 3, title: "Silla Ergonómica", price: 230000 },
  { id: 4, title: "Tablet Pro", price: 310000 },
  { id: 5, title: "Smartwatch X", price: 99000 },
]

const oldestProducts = [
  { id: 10, title: "Mouse Clásico", stock: 15, createdAt: "2024-01-10" },
  { id: 11, title: "Teclado Office", stock: 8, createdAt: "2024-02-05" },
  { id: 12, title: "Webcam HD", stock: 5, createdAt: "2024-03-18" },
  { id: 13, title: "Disco HDD 1TB", stock: 12, createdAt: "2024-04-02" },
  { id: 14, title: "Parlante Mini", stock: 20, createdAt: "2024-04-15" },
]

const recentTopOrders = [
  { id: 1001, customer: "Juan Pérez", total: 32000 },
  { id: 1002, customer: "María López", total: 18500 },
  { id: 1003, customer: "Carlos Gómez", total: 72000 },
  { id: 1004, customer: "Lucía Fernández", total: 9500 },
  { id: 1005, customer: "Pedro Ramírez", total: 15400 },
]

// =========================
// COMPONENT
// =========================

export default async function EcommerceDashboard({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string
    query?: string
    status?: OrderStatus
    category?: string
    outOfStock?: string
  }>
}) {

  const params = await searchParams;
  const currentPage = Number(params?.page || 1)
  const query = params?.query || ""

  const status = params?.status

  const categoryName = params?.category ?? undefined

  const onlyOutOfStock = params?.outOfStock === "true"


  const productsOutofStock = await getTopFiveOutOfStockProducts()

  const productsOld = await getTopFiveOldestProducts()

  const totalOrders = await getOrdersDashboardTotalCount(query, status)

  const OrdersTopFive = await getTopFiveRecentOrders()

  console.log(OrdersTopFive)



  return (
    <div className="p-8 space-y-10 bg-muted/30 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Panel general de control de tu ecommerce
          </p>
        </div>
      </div>

      <Separator />

      {/* PREMIUM STATS */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Productos" value={mockStats.totalProducts} icon={<Package className="w-5 h-5" />} />
        <StatCard title="Órdenes Totales" value={mockStats.totalOrders} icon={<ShoppingCart className="w-5 h-5" />} />
        <StatCard title="Órdenes Pendientes" value={mockStats.pendingOrders} icon={<Clock className="w-5 h-5" />} highlight="text-amber-500" />
        <StatCard title="Envíos Solicitados" value={mockStats.requestedShipments} icon={<Truck className="w-5 h-5" />} highlight="text-blue-500" />
        <StatCard title="Valor Inventario" value={`$${mockStats.inventoryValue.toLocaleString()}`} icon={<DollarSign className="w-5 h-5" />} />
      </div>

      {/* TABLAS CON SEPARACIÓN */}
      <div className="space-y-10">
        <Card className="rounded-2xl border bg-background shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Top 5 Productos Más Antiguos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProductsTable products={productsOld} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border bg-background shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Top 5 Productos Sin Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
        <ProductsTable products={productsOutofStock}/>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border bg-background shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Top 5 Ultimas Orden
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersTable
              orders={OrdersTopFive}
              totalOrders={totalOrders}
              columns={[
                "order",
                "customer",
                "payment-method",
                "tolal",
                "date",
                "status",
                "shipment"
              ]} />
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

// =========================
// COMPONENTES AUXILIARES
// =========================

function StatCard({ title, value, icon, highlight }: any) {
  return (
    <Card className="rounded-2xl border bg-background/70 backdrop-blur shadow-lg hover:shadow-xl transition">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${highlight || ""}`}>{value}</p>
      </CardContent>
    </Card>
  )
}

