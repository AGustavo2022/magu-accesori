"use client"

import {
  CheckCircle,
  Package,
  MapPinPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { OrderConfirmationProps } from "@/lib/types/order.types"
import { formatDateAR, formatPrice } from "@/lib/utils"
import { useCart } from "@/contexts/cart/cart.context"
import { useEffect } from "react"

/* -------------------- COMPONENT -------------------- */

export default function OrderConfirmation({
  order,
  items,
}: OrderConfirmationProps) {

  const router = useRouter()

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])


  const {
    order_number,
    total,
    subtotal,
    shipping_cost,
    payment_method,
    created_at,
    shipping_data,
  } = order

  const itemCount = items.length

  return (
    <div className="min-h-screen bg-background">

      <div className="mx-auto max-w-3xl px-4 py-10">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-light">
              <CheckCircle size={88} color="#22c55e" strokeWidth={2.8} />
            </div>
            <h1 className="mb-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Pedido confirmado
            </h1>
            <p className="text-lg text-muted-foreground">
              Hemos recibido tu pedido y lo procesaremos pronto
            </p>
          </div>

        <Card className="mb-6 overflow-hidden border-border bg-card">

          <div className="grid gap-6 bg-muted/30 p-6 text-center sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs uppercase text-muted-foreground">
                Número de pedido
              </p>
              <p className="text-lg font-medium">{order_number}</p>
            </div>

            <div>
              <p className="mb-1 text-xs uppercase text-muted-foreground">
                Fecha del pedido
              </p>
              <p className="text-lg font-medium">{formatDateAR(created_at).fecha}</p>
              <p className="text-sm text-muted-foreground">{formatDateAR(created_at).hora}</p>
            </div>
          </div>

          <Separator />

          <div className="px-6 py-4">
            <h2 className="mb-4 flex items-center gap-2 font-medium text-foreground">
              <Package className="h-4 w-4" />
              Productos ({itemCount})
            </h2>

            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-3 last:border-none"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Cantidad: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    {formatPrice(Number(item.price) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 px-6 py-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPinPlus className="h-4 w-4" />
                Dirección de envío
              </h3>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  {shipping_data.firstName} {shipping_data.lastName}
                </p>
                <p>{shipping_data.address}</p>
                <p>{shipping_data.phone}</p>
                <p>{shipping_data.city}</p>
                <p>{shipping_data.province}</p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium text-foreground">
                Resumen de pago
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="text-success">
                    {formatPrice(Number(shipping_cost))}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(Number(total))}</span>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  Pagado con {payment_method}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Button size="lg" onClick={() => router.push("/products")}>
            Seguir comprando
          </Button>
        </div>

        <div className="mt-6 rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">
          Recibirás un correo electrónico con los detalles de tu pedido
        </div>

      </div>
    </div>
  )
}
