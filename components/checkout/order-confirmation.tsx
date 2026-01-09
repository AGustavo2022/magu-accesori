"use client"

import { CheckCircle2, MapPin, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

/* -------------------- TYPES -------------------- */

type OrderItem = {
  id: string
  title: string
  quantity: number
  price: string
}

type ShippingData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postal: string
}

type Order = {
  order_number: string
  total: string
  payment_method: string
  created_at: string
  shipping_data: ShippingData
}

type OrderConfirmationProps = {
  order: Order
  items: OrderItem[]
}

/* -------------------- COMPONENT -------------------- */

export default function OrderConfirmation({
  order,
  items,
}: OrderConfirmationProps) {

  const {
    order_number,
    total,
    payment_method,
    created_at,
    shipping_data,
  } = order

  const date = new Date(created_at)

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
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-3">

          {/* MAIN */}
          <div className="lg:col-span-2 space-y-8">

            {/* ORDER INFO */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="p-6">
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Número de pedido
                </p>
                <p className="text-lg font-medium">{order_number}</p>
              </Card>

              <Card className="p-6">
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Fecha del pedido
                </p>
                <p className="text-lg font-medium">
                  {date.toLocaleString()}
                </p>
              </Card>
            </div>

            {/* ITEMS */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Productos</h2>
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
                Dirección de envío
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
                Método de pago
              </h2>
              <Card className="p-6">
                <div className="flex gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground mt-1" />
                  <p className="font-medium">{payment_method}</p>
                </div>
              </Card>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <h2 className="text-xl font-semibold">Resumen</h2>

              <Card className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-semibold">
                      ${Number(total).toFixed(2)}
                    </span>
                  </div>

                  <Separator />

                  <Link href="/products">
                    <Button className="w-full" size="lg">
                      Seguir comprando
                    </Button>
                  </Link>
                </div>
              </Card>

              <div className="p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground">
                Recibirás un correo electrónico con los detalles de tu pedido
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
