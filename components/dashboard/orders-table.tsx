"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Order } from "@/lib/types/order.types"
import { Clock } from "lucide-react"
import { CheckCircle2 } from "lucide-react"
import { Truck } from "lucide-react"
import { PackageCheck } from "lucide-react"
import { Ban } from "lucide-react"
import { Eye } from "lucide-react"
import { OrderDrawer } from "./order-drawer"
import { Store } from "lucide-react"

type OrderColumn =
  | "order"
  | "customer"
  | "payment-method"
  | "tolal"
  | "date"
  | "status"
  | "shipment"
  | "drawer"


interface OrdersTableProps {
  orders: Order[]
  columns: OrderColumn[]
}

type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled"


const STATUS_CONFIG: Record<
OrderStatus,
  { label: string; className: string; icon: typeof Clock }
> = {
  pending: {
    label: "Pendiente",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmado",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    icon: CheckCircle2,
  },
  shipped: {
    label: "Enviado",
    className: "bg-sky-50 text-sky-700 border-sky-200",
    icon: Truck,
  },
  delivered: {
    label: "Entregado",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: PackageCheck,
  },
  cancelled: {
    label: "Cancelado",
    className: "bg-red-50 text-red-700 border-red-200",
    icon: Ban,
  },
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
    icon: Clock,
  }
  const Icon = config.icon
  return (
    <Badge variant="outline" className={`${config.className} gap-1`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  )
}

type FilterKey = "all" | OrderStatus

const FILTER_OPTIONS: { key: FilterKey; label: string; icon: typeof Clock }[] = [
  { key: "all", label: "Todos", icon: Eye },
  { key: "pending", label: "Pendientes", icon: Clock },
  { key: "confirmed", label: "Confirmados", icon: CheckCircle2 },
  { key: "shipped", label: "Enviados", icon: Truck },
  { key: "delivered", label: "Entregados", icon: PackageCheck },
  { key: "cancelled", label: "Cancelados", icon: Ban },
]

interface ShippingIconProps {
  address?: string | null
  shippingCost?: string | number | null
}

export function ShippingIcon({
  address,
  shippingCost,
}: ShippingIconProps) {
  const isPickup =
    address?.trim().toLowerCase() === "retiro del local" ||
    Number(shippingCost ?? 0) === 0

  if (isPickup) {
    return (
      <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
        <Store className="w-4 h-4" />
        Retiro
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 text-sky-500 font-medium text-sm">
      <Truck className="w-4 h-4" />
      Envío
    </div>
  )
}

export function OrdersTable({ orders, columns }: OrdersTableProps) {


  return (
    <>
      {/* TABLA */}
      <div className="mt-6 border rounded-lg overflow-hidden">
        <Table>

          <TableHeader>
            <TableRow>
              {columns.includes("order") && (
                <TableHead className="text-center">Orden</TableHead>
              )}
              {columns.includes("customer") && (
              <TableHead className="text-center">Cliente</TableHead>
              )}
              {columns.includes("payment-method") && (
              <TableHead className="text-center">Mét. Pago</TableHead>
              )}
              {columns.includes("tolal") && (
              <TableHead className="text-center">Total</TableHead>
              )}
              {columns.includes("date") && (
              <TableHead className="text-center">Fecha</TableHead>
              )}
              {columns.includes("status") && (
              <TableHead className="text-center">Estado</TableHead>
              )}
              {columns.includes("shipment") && (
              <TableHead className="text-center">Envio</TableHead>
              )}
              {columns.includes("drawer") && (
              <TableHead className="text-center"></TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay órdenes para este filtro
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>

                  {/* ORDEN */}
                  {columns.includes("order") && (
                  <TableCell className="text-center font-medium">
                    {order.order_number}
                  </TableCell>
                  )}

                  {/* CLIENTE */}
                  {columns.includes("customer") && (
                  <TableCell>
                    <p className="font-medium">
                      {order.shipping_data.firstName}{" "}
                      {order.shipping_data.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.shipping_data.phone}
                    </p>
                  </TableCell>
                  )}

                  {/* MÉTODO DE PAGO */}
                  {columns.includes("payment-method") && (
                  <TableCell className="text-center capitalize">
                    {order.payment_method}
                  </TableCell>
                  )}

                  {/* TOTAL */}
                  {columns.includes("tolal") && (
                  <TableCell className="text-center font-semibold">
                    ${order.total}
                  </TableCell>
                  )}

                  {/* FECHA */}
                  {columns.includes("date") && (
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {order.created_at
                      ? new Date(order.created_at).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  )}

                  {/* ESTADO */}
                  {columns.includes("status") && (
                  <TableCell className="text-center">
                      <StatusBadge status={order.status} />
                  </TableCell>
                  )}

                  {/* Envio */}
                  {columns.includes("shipment") && (
                  <TableCell className="text-center font-semibold">
                    {<ShippingIcon
                      address={order.shipping_data?.address}
                      shippingCost={order.shipping_cost}
                    />}
                  </TableCell>
                  )}

                  {/* ACCIONES */}
                  {columns.includes("drawer") && (
                  <TableCell className="text-center">
                    <OrderDrawer order={order} />
                  </TableCell>
                  )}

                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </div>
    </>
  )
}
