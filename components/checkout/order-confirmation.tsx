"use client"

import { CheckCircle2, MapPin, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { OrderConfirmationProps } from "@/lib/types/order.types"
import { formatPrice } from "@/lib/utils"

/* -------------------- COMPONENT -------------------- */

export default function OrderConfirmation({
  order,
  items,
}: OrderConfirmationProps) {

console.log(order, items)

  const router = useRouter()

  const {
    order_number,
    total,
    subtotal,
    shipping_cost,
    payment_method,
    created_at,
    shipping_data,
  } = order

  const date = new Date(created_at)

  const fecha = date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const hora = date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  // const subtotal = Number(order.total + 3500)


  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-4xl md:text-5xl font-semibold">
              Pedido confirmado
            </h1>
            <p className="text-lg text-muted-foreground">
              Hemos recibido tu pedido y lo procesaremos pronto
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* ORDER INFO */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="p-6 text-center">
              <p className="text-xs uppercase text-muted-foreground mb-1">
                Número de pedido
              </p>
              <p className="text-lg font-medium">{order_number}</p>
            </Card>

            <Card className="p-6 text-center">
              <p className="text-xs uppercase text-muted-foreground mb-1">
                Fecha del pedido
              </p>

              <p className="text-lg font-medium">{fecha}</p>
              <p className="text-sm text-muted-foreground">{hora}</p>
            </Card>
          </div>

          {/* ITEMS */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Productos
            </h2>

            <Card className="p-6">
              <div className="space-y-4">
                {items.map(item => {
                  const { id, title, quantity, price } = item

                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between border-b last:border-none py-3"
                    >
                      <div>
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-muted-foreground">
                          Cantidad: {quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        ${(Number(price) * quantity).toFixed(2)}
                      </p>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* SHIPPING */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Detalle de la Entrega
            </h2>

            <Card className="p-6">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="space-y-1">
                  <p className="font-medium">
                    {shipping_data.firstName} {shipping_data.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {shipping_data.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {shipping_data.city}, {shipping_data.province}{" "}
                    {shipping_data.postal}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tel: {shipping_data.phone}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Email: {shipping_data.email}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* PAYMENT */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Detalle del Pago
            </h2>

            <Card className="p-6">
              <div className="flex gap-3 items-center">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <p className="font-medium">{payment_method}</p>
              </div>
            </Card>
          </div>

          {/* SUMMARY */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Resumen del Pedido
            </h2>

            <Card className="p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span className="text-muted-foreground">{formatPrice(Number(shipping_cost))}</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(Number(total))}</span>
              </div>
            </Card>
          </div>


          {/* CTA */}
          <div className="text-center">
            <Button size="lg" onClick={() => router.push("/products")}>
              Seguir comprando
            </Button>
          </div>
          {/* FOOTER INFO */}
          <div className="p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground">
            Recibirás un correo electrónico con los detalles de tu pedido
          </div>
        </div>

      </div>

    </div>
  )


}
