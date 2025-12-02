
"use client"

import React, { useState } from "react"
import { CheckoutProgress } from "@/components/checkout/checkout-progress"
import { CartItem } from "@/components/cart-item"
import { OrderSummary } from "@/components/checkout/order-summary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/contexts/cart-context"
import PaymentPage from "@/components/checkout/payment-options"
import OrderConfirmation from "@/components/checkout/order-confirmation"
import { createOrder } from "@/lib/actions"

// Types
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

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<number>(1)

  // payment (controlled by parent)
  const [paymentMethod, setPaymentMethod] = useState<string>("transfer")
  const handlePaymentSelected = (id: string) => setPaymentMethod(id)

  // shipping state
  const [shippingData, setShippingData] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Rio Grande",
    province: "Tierra del Fuego",
    postal: "9420",
  })

  // order created from server action
  const [createdOrder, setCreatedOrder] = useState<any | null>(null)

  // cart
  const { items, clearCart } = useCart()
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setShippingData({ ...shippingData, [e.target.name]: e.target.value })

  async function handleSubmit(formData: FormData) {
    const result = await createOrder(formData);
    setCurrentStep(4)
    setCreatedOrder(result)
    console.log(createdOrder)
    clearCart()
  }

  return (
    <div className="min-h-screen bg-background">
      <CheckoutProgress currentStep={currentStep} />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div>
                <h1 className="mb-6 text-2xl font-bold uppercase">Tu Carrito</h1>
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
                <Button className="mt-8 w-full" size="lg" onClick={() => setCurrentStep(2)}>
                  Continuar con la Entrega
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h1 className="mb-6 text-2xl font-bold uppercase">Información de Entrega</h1>
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" name="firstName" value={shippingData.firstName} onChange={handleShippingChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellidos</Label>
                      <Input id="lastName" name="lastName" value={shippingData.lastName} onChange={handleShippingChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={shippingData.email} onChange={handleShippingChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" name="phone" value={shippingData.phone} onChange={handleShippingChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" name="address" value={shippingData.address} onChange={handleShippingChange} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" name="city" value={shippingData.city} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Provincia</Label>
                      <Input id="province" name="province" value={shippingData.province} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal">C.P.</Label>
                      <Input id="postal" name="postal" value={shippingData.postal} readOnly />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setCurrentStep(1)}>
                      Volver
                    </Button>
                    <Button type="button" className="flex-1" onClick={() => setCurrentStep(3)}>
                      Continuar al Pago
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Aquí se envía el formulario (createOrder) */}
            {currentStep === 3 && (
              <form
                action={handleSubmit}
                className="space-y-6"
                // we want the browser to handle the submit to the server action
              >
                <h1 className="mb-6 text-2xl font-bold uppercase">Método de Pago</h1>

                <PaymentPage selected={paymentMethod} onSelect={handlePaymentSelected} />

                {/* Hidden inputs so server action receives everything */}
                <input type="hidden" name="items" value={JSON.stringify(items.map(i => ({ productId: i.product.id, title: i.product.title, price: i.product.price, quantity: i.quantity })))} />
                <input type="hidden" name="paymentMethod" value={paymentMethod} />
                <input type="hidden" name="shippingData" value={JSON.stringify(shippingData)} />

                <div className="flex gap-4 mt-8">
                  <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setCurrentStep(2)}>
                    Volver
                  </Button>

                  {/* Submit crea la orden en server action y redirige al cliente */}
                  <Button type="submit" className="flex-1">
                    Crear Pedido
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 4 - Solo muestra lo creado. createdOrder viene del server action (set en action) */}
            {currentStep === 4 && (
              <div>
                {/* <h1 className="mb-6 text-2xl font-bold uppercase">Pedido Confirmado</h1> */}
                {createdOrder ? (
                  <OrderConfirmation order={createdOrder} />
                ) : (
                  <div className="p-4 bg-yellow-50 rounded">No se encontró la orden. Si acabás de crearla, recargá o volvé a intentar.</div>
                )}
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <div className="sticky top-4 rounded border bg-card p-6">
                <h2 className="mb-6 text-lg font-bold uppercase">Resumen del Pedido</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm pb-3">
                      <div className="flex-1">
                        <p className="font-medium">{item.product.title}</p>
                        <p className="text-xs text-muted-foreground">Cantidad: {item.quantity}</p>
                      </div>
                      <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <OrderSummary subtotal={subtotal} shipping={shipping} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
