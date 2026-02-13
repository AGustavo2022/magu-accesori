"use client"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  CreditCard,
  MapPin,
  User,
  Calendar,
  MoreHorizontal,
} from "lucide-react"

import { useState, useEffect } from "react"
import { formatPrice } from "@/lib/utils"
import { Order, OrderItemDrawer } from "@/lib/types/order.types"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { updateOrderStatus } from "@/lib/actions/order.actions"

type OrderDrawerProps = {
  order: Order
}


function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    pending: {
      label: "Pendiente",
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    confirmed: {
      label: "Confirmado",
      className: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    shipped: {
      label: "Enviado",
      className: "bg-sky-100 text-sky-800 border-sky-200",
    },
    delivered: {
      label: "Entregado",
      className: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    cancelled: {
      label: "Cancelado",
      className: "bg-red-100 text-red-800 border-red-200",
    },
  }

  const info = map[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
  }

  return (
    <Badge variant="outline" className={info.className}>
      {info.label}
    </Badge>
  )
}

export function OrderDrawer({ order }: OrderDrawerProps) {
  const [items, setItems] = useState<OrderItemDrawer[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const fetchItems = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/orders/${order.id}`)
        if (!res.ok) throw new Error("Error fetching items")
        const data = await res.json()
        setItems(data.items || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [isOpen, order.id])

  const s = order.shipping_data



const handleUpdateStatus = async (status: "confirmed" | "cancelled") => {
  const result = await updateOrderStatus(order.id, status)
}

  return (

    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md overflow-y-auto px-6 py-8 text-sm">

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <p className="text-xl font-bold tracking-wide">
            {order.order_number}
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            {new Date(order.created_at).toLocaleString()}
          </div>
        </div>

<div className="flex flex-col items-center gap-4 w-full">
  {order.status === "pending" && (
    <div className="flex w-full gap-4 pt-3">

      <Button
        size="lg"
        className="flex-1 bg-emerald-600/80 hover:bg-emerald-600 text-white font-medium"
        onClick={() => handleUpdateStatus("confirmed")}
      >
        Confirmar
      </Button>

      <Button
        size="lg"
        className="flex-1 bg-red-600/70 hover:bg-red-600 text-white font-medium"
        onClick={() => handleUpdateStatus("cancelled")}
      >
        Cancelar
      </Button>

    </div>
  )}
</div>


        {/* Productos */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="products" className="border-none">

            <AccordionTrigger className="text-lg font-semibold py-4 tracking-wide">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                Productos ({items.length})
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="space-y-4 pt-2">

                {loading ? (
                  <p className="text-muted-foreground text-center py-4">
                    Cargando productos...
                  </p>
                ) : items.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Esta orden no tiene productos
                  </p>
                ) : (
                  items.map((item, index) => (
                    <div key={item.id} className="space-y-2 pb-4">

                      <div className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium">
                            {item.title}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Cantidad: {item.quantity}
                          </p>
                        </div>

                        <p className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))
                )}

              </div>
            </AccordionContent>

          </AccordionItem>
        </Accordion>

        <Separator className="my-2 border-dashed" />

        {/* Método de Pago */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-lg font-semibold tracking-wide">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            Método de pago
          </div>
          <p className="text-muted-foreground">
            {order.payment_method.replace(/_/g, " ")}
          </p>
        </div>

        <Separator className="my-2 border-dashed" />

        {/* Totales */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Envío</span>
            <span>{formatPrice(Number(order.shipping_cost))}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(Number(order.total))}</span>
          </div>
        </div>

        <Separator className="my-2 border-dashed" />

        {/* Cliente */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-lg font-semibold tracking-wide">
            <User className="h-4 w-4 text-muted-foreground" />
            Cliente
          </div>
          <p>{s.firstName} {s.lastName}</p>
          <p>{s.email}</p>
          <p>{s.phone}</p>
        </div>

        <Separator className="my-2 border-dashed" />

        {/* Dirección */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-lg font-semibold tracking-wide">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Dirección
          </div>
          <p>{s.address}</p>
          <p>{s.city}, {s.province}</p>
          <p>CP {s.postal}</p>
        </div>

        <Separator className="my-2 border-dashed" />

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>ID: {order.id}</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
