"use client"

import React, { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { CheckoutProgress } from "@/components/checkout/checkout-progress"
import { CartItem } from "@/components/cart/cart-item"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import PaymentPage from "@/components/checkout/payment-options"
import { createOrder } from "@/lib/actions/order.actions"
import { shippingSchema } from "@/lib/schemas/order.schema"
import { useRouter } from "next/navigation"
import { CreateOrderState, ShippingData } from "@/lib/types/order.types"
import { useCart } from "@/contexts/cart.context"
import { resolveCart } from "@/contexts/cart.selectors"
import { formatPrice } from "@/lib/utils"
import { CheckCircle, MapPin, Package } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"

const initialState: CreateOrderState = {
  success: false,
  errors: {},
}

export default function CheckoutPage() {

  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setpaymentMethod] = useState({ id: "Transferencia", title: "Transferencia Bancaria (CBU/Alias)", })
  const [state, formAction] = useFormState(createOrder, initialState)

  const router = useRouter()
  const { items } = useCart()
  const { items: resolvedItems, total, itemCount } = resolveCart(items)

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
  const [clientErrors, setClientErrors] = useState<Record<string, string[]>>({})

  useEffect(() => {
    if (state.success && state.order) {
      router.replace(`/order/${state.order.order_number}`)
    }
  }, [state.success, state.order, router])

  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target

    setShippingData(prev => ({
      ...prev,
      [name]: value,
    }))

    setClientErrors(prev => {
      const copy = { ...prev }
      delete copy[`shipping.${name}`]
      return copy
    })
  }


  return (
    <div className="min-h-screen bg-background">
      <CheckoutProgress currentStep={currentStep} />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* CONTENIDO CENTRADO */}
        <div className="mx-auto max-w-3xl space-y-8">

          {/* STEP 1 */}
          {currentStep === 1 && (
            <>
              <h1 className="mb-6 text-2xl font-bold uppercase text-center">
                Tu Carrito
              </h1>

              <div className="space-y-4">
                {resolvedItems.map(item => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center pt-4 text-lg">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">
                  {formatPrice(total)}
                </span>
              </div>

              <Button
                className="mt-8 w-full"
                size="lg"
                onClick={() => setCurrentStep(2)}
              >
                Continuar con la Entrega
              </Button>
            </>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <>
              <h1 className="mb-6 text-2xl font-bold uppercase text-center">
                Información de Entrega
              </h1>

              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Nombre</Label>
                    <Input
                      name="firstName"
                      value={shippingData.firstName}
                      onChange={handleShippingChange}
                      placeholder="Ingresá tu nombre"
                    />
                    {(clientErrors["shipping.firstName"] ||
                      state.errors?.["shipping.firstName"]) && (
                        <p className="text-sm text-red-500">
                          {clientErrors["shipping.firstName"]?.[0] ??
                            state.errors?.["shipping.firstName"]?.[0]}
                        </p>
                      )}
                  </div>

                  <div>
                    <Label>Apellido</Label>
                    <Input
                      name="lastName"
                      value={shippingData.lastName}
                      onChange={handleShippingChange}
                      placeholder="Ingresá tu apellido"
                    />
                    {(clientErrors["shipping.lastName"] ||
                      state.errors?.["shipping.lastName"]) && (
                        <p className="text-sm text-red-500">
                          {clientErrors["shipping.lastName"]?.[0] ??
                            state.errors?.["shipping.lastName"]?.[0]}
                        </p>
                      )}
                  </div>
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    value={shippingData.email}
                    onChange={handleShippingChange}
                    placeholder="Ingresá tu correo electrónico"
                  />
                  {(clientErrors["shipping.email"] ||
                    state.errors?.["shipping.email"]) && (
                      <p className="text-sm text-red-500">
                        {clientErrors["shipping.email"]?.[0] ??
                          state.errors?.["shipping.email"]?.[0]}
                      </p>
                    )}
                </div>

                <div>
                  <Label>Teléfono</Label>
                  <Input
                    name="phone"
                    value={shippingData.phone}
                    onChange={handleShippingChange}
                    placeholder="Ingresá tu teléfono (ej: 11 2345 6789)"
                  />
                  {(clientErrors["shipping.phone"] ||
                    state.errors?.["shipping.phone"]) && (
                      <p className="text-sm text-red-500">
                        {clientErrors["shipping.phone"]?.[0] ??
                          state.errors?.["shipping.phone"]?.[0]}
                      </p>
                    )}
                </div>

                <div>
                  <Label>Dirección</Label>
                  <Input
                    name="address"
                    value={shippingData.address}
                    onChange={handleShippingChange}
                    placeholder="Ingresá tu dirección (calle y número)"
                  />
                  {(clientErrors["shipping.address"] ||
                    state.errors?.["shipping.address"]) && (
                      <p className="text-sm text-red-500">
                        {clientErrors["shipping.address"]?.[0] ??
                          state.errors?.["shipping.address"]?.[0]}
                      </p>
                    )}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label>Ciudad</Label>
                    <Input value={shippingData.city} disabled />
                  </div>

                  <div>
                    <Label>Provincia</Label>
                    <Input value={shippingData.province} disabled />
                  </div>

                  <div>
                    <Label>Código Postal</Label>
                    <Input value={shippingData.postal} disabled />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setCurrentStep(1)}
                  >
                    Volver
                  </Button>

                  <Button
                    className="flex-1"
                    onClick={() => {
                      const result = shippingSchema.safeParse(shippingData)

                      if (!result.success) {
                        const errors: Record<string, string[]> = {}

                        result.error.issues.forEach(issue => {
                          const key = `shipping.${issue.path.join(".")}`
                          if (!errors[key]) errors[key] = []
                          errors[key].push(issue.message)
                        })

                        setClientErrors(errors)
                        return
                      }

                      setClientErrors({})
                      setCurrentStep(3)
                    }}
                  >
                    Continuar al Pago
                  </Button>
                </div>
              </div>
            </>
          )}
          {/* STEP 3 */}
          {currentStep === 3 && (
            <>
              <h1 className="mb-6 text-2xl font-bold uppercase text-center">
                Método de Pago
              </h1>

              <PaymentPage
                selectedId={paymentMethod.id}
                onSelect={(paymentSelected) => {
                  setpaymentMethod(paymentSelected)
                }}
              />
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setCurrentStep(2)}
                >
                  Volver
                </Button>

                <Button
                  className="flex-1"
                  onClick={() => {

                    setCurrentStep(4)
                  }}
                >
                  Resumen
                </Button>
              </div>
            </>
          )}
              {/* STEP 4 · RESUMEN */}
              {currentStep === 4 && (
            <>
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-light">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h1 className="mb-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  ¡Resumen de la compra!
                </h1>
              </div>

              <Card className="mb-6 overflow-hidden border-border bg-card">
                {/* Order Items */}
                <div className="px-6 py-4">
                  <h2 className="mb-4 flex items-center gap-2 font-medium text-foreground">
                    <Package className="h-4 w-4" />
                    Productos ({itemCount})
                  </h2>
                  <div className="space-y-4">
                    {resolvedItems.map((item) => (
                      <CartItem key={item.productId} item={item} />
                    ))}
                  </div>
                </div>
                <Separator />
                {/* Shipping & Payment */}
                <div className="grid gap-6 px-6 py-4 sm:grid-cols-2">
                  {/* Shipping Address */}
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                      <MapPin className="h-4 w-4" />
                      Dirección de envío
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">{shippingData.firstName} {shippingData.lastName}</p>
                      <p>{shippingData.address}</p>
                      <p>{shippingData.phone}</p>
                      <p>{shippingData.city}</p>
                      <p>{shippingData.province}</p>
                    </div>
                  </div>
                    
                  {/* Payment Summary */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-foreground">Resumen de pago</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">$</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Envío</span>
                        <span className="text-success font-medium">Gratis</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span className="text-foreground">Total</span>
                        <span className="text-foreground">${total.toFixed(2)}</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">Pagado con {paymentMethod.title}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}


              <form action={formAction} className="space-y-6">

                {/* Hidden inputs */}
                <input
                  type="hidden"
                  name="items"
                  value={JSON.stringify(
                    items.map(i => ({
                      productId: i.productId,
                      quantity: i.quantity,
                    }))
                  )}
                />

                <input type="hidden" name="paymentMethod" value={paymentMethod.title} />

                <input type="hidden" name="shipping_firstName" value={shippingData.firstName} />
                <input type="hidden" name="shipping_lastName" value={shippingData.lastName} />
                <input type="hidden" name="shipping_email" value={shippingData.email} />
                <input type="hidden" name="shipping_phone" value={shippingData.phone} />
                <input type="hidden" name="shipping_address" value={shippingData.address} />
                <input type="hidden" name="shipping_city" value={shippingData.city} />
                <input type="hidden" name="shipping_province" value={shippingData.province} />
                <input type="hidden" name="shipping_postal" value={shippingData.postal} />

                <div className="mt-8 flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setCurrentStep(2)}
                  >
                    Volver
                  </Button>

                  <Button type="submit" className="flex-1">
                    Crear Pedido
                  </Button>
                </div>
              </form>
        </div>
      </div>
    </div>
  )
}
