"use client"

import { CheckCircle2, MapPin, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function OrderConfirmation({ order }: { order: any }) {

  const {
    orderId,
    items,
    total,
    shippingData,
    paymentMethod,
    created_at,
  } = order

  console.log( 
    orderId,
    items,
    total,
    shippingData,
    paymentMethod,
    created_at,)


  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-4xl md:text-5xl font-semibold text-balance">Pedido confirmado</h1>
            <p className="text-lg text-muted-foreground">Hemos recibido tu pedido y lo procesaremos pronto</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6">
              <p className="text-xs font-medium uppercase text-muted-foreground tracking-wide mb-2">Número de pedido</p>
              <p className="text-lg font-medium">{orderId}</p>
            </Card>

            <Card className="p-6">
              <p className="text-xs font-medium uppercase text-muted-foreground tracking-wide mb-2">Fecha del pedido</p>
              <p className="text-lg font-medium">{created_at}</p>
            </Card>
          </div>


            {/* Order Items */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Productos</h2>
                <Card className="p-6">
                  <div className="space-y-6">

                    {items.map((item: any) => (
                      <div key={item.productId} className="py-4 border-b last:border-none flex items-center justify-between">

                        {/* Info del producto */}
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Cantidad: {item.quantity}
                          </p>
                        </div>

                        {/* Precio */}
                        <p className="font-semibold">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Dirección de envío</h2>
                <Card className="p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium">
                        {shippingData.firstName} {shippingData.lastName}
                      </p>

                      <p className="text-sm text-muted-foreground">{shippingData.address}</p>

                      <p className="text-sm text-muted-foreground">
                        {shippingData.city}, {shippingData.province} {shippingData.postal}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Tel: {shippingData.phone}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Email: {shippingData.email}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
                <Card className="p-6">
                  <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{paymentMethod}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Resumen</h2>
                <Card className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${total.toFixed(2)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                  <Link href="/products" className="w-full block">
                    <Button className="w-full" size="lg" >
                      Seguir comprando
                    </Button>
                  </Link>
                  </div>
                </Card>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-center text-muted-foreground">
                    Recibirás un correo electrónico con los detalles de tu pedido
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
