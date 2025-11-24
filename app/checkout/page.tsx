"use client"

import { useState } from "react"
import { CheckoutProgress } from "@/components/checkout/checkout-progress"
import { CartItem } from "@/components/cart-item"
import { OrderSummary } from "@/components/checkout/order-summary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Package, CreditCard, CheckCircle2, Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import PaymentPage from "@/components/checkout/payment-options"

export default function CheckoutPage() {

    const [currentStep, setCurrentStep] = useState(1)
    // Definimos el ID inicial que queremos pre-seleccionar.
    const initialPaymentId = 'transfer';
    
    // Estado para guardar la selección final del usuario
    const [finalSelection, setFinalSelection] = useState(initialPaymentId);

    // Función que recibirá el ID seleccionado del componente hijo
    const handlePaymentSelected = (selectedId: string) => {
        setFinalSelection(selectedId);
        console.log("Método de pago final seleccionado en la página:", selectedId);
    };

    const { items } = useCart()

    //   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    //   const shipping = subtotal > 50 ? 0 : 5.99
    console.log(items)

    return (
        <div className="min-h-screen bg-background">
            <CheckoutProgress currentStep={currentStep} />

            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Contenido principal */}
                    <div className="lg:col-span-2">
                        {currentStep === 1 && (
                            <div>
                                <h1 className="mb-6 text-2xl font-bold uppercase">Tu Carrito</h1>
                                <div className="space-y-2">

                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <CartItem
                                                key={item.product.id}
                                                item={item}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <Button className="mt-8 w-full" size="lg" onClick={() => setCurrentStep(2)}>
                                    Continuar con la Entrega
                                </Button>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div>
                                <h1 className="mb-6 text-2xl font-bold uppercase">Información de Entrega</h1>
                                <form className="space-y-6">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">Nombre</Label>
                                            <Input id="firstName" placeholder="Nombre" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Apellidos</Label>
                                            <Input id="lastName" placeholder="Apellidos" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="tu@email.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <Input id="phone" type="tel" placeholder="+34 600 000 000" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Dirección</Label>
                                        <Input id="address" placeholder="Calle, número, piso" />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">Ciudad</Label>
                                            <Input id="city" placeholder="Rio Grande" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="province">Provincia</Label>
                                            <Input id="province" placeholder="Tierra del Fuego" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="postal">C.P.</Label>
                                            <Input id="postal" placeholder="9420" />
                                        </div>
                                    </div>

                                    {/* <div className="flex items-start gap-2">
                                        <Checkbox id="saveAddress" />
                                        <Label htmlFor="saveAddress" className="text-sm leading-none">
                                            Guardar esta dirección para futuras compras
                                        </Label>
                                    </div> */}

                                    <div className="flex gap-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex-1 bg-transparent"
                                            onClick={() => setCurrentStep(1)}
                                        >
                                            Volver
                                        </Button>
                                        <Button type="button" className="flex-1" onClick={() => setCurrentStep(3)}>
                                            Continuar al Pago
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div>

                                <PaymentPage/>
                                {/* <h1 className="mb-6 text-2xl font-bold uppercase">Pago</h1>
                                <form className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" maxLength={19} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                                        <Input id="cardName" placeholder="NOMBRE APELLIDOS" />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry">Fecha de Vencimiento</Label>
                                            <Input id="expiry" placeholder="MM/AA" maxLength={5} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvv">CVV</Label>
                                            <Input id="cvv" type="password" placeholder="123" maxLength={3} />
                                        </div>
                                    </div> */}

                                    {/* <div className="flex items-start gap-2 pb-8">
                                        <Checkbox id="terms" />
                                        <Label htmlFor="terms" className="text-sm leading-none">
                                            Acepto los términos y condiciones y la política de privacidad
                                        </Label>
                                    </div> */}

                                    <div className="flex gap-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex-1 bg-transparent"
                                            onClick={() => setCurrentStep(2)}
                                        >
                                            Volver
                                        </Button>
                                        <Button type="button" className="flex-1" onClick={() => setCurrentStep(4)}>
                                            Realizar Pedido
                                        </Button>
                                    </div>
                                {/* </form> */}
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="py-12 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-foreground">
                                    <CheckCircle2 className="h-10 w-10 text-background" />
                                </div>
                                <h1 className="mb-4 text-3xl font-bold uppercase">¡Pedido Confirmado!</h1>
                                <p className="mb-2 text-muted-foreground">
                                    Número de pedido: <span className="font-bold">#ADI-2024-1234</span>
                                </p>
                                <p className="mb-8 text-muted-foreground">Recibirás un email de confirmación en breve</p>
                                <div className="mx-auto max-w-md space-y-4">
                                    <div className="flex items-center gap-4 rounded border p-4 text-left">
                                        <Package className="h-8 w-8 flex-shrink-0" />
                                        <div>
                                            <p className="font-bold">Envío Estimado</p>
                                            <p className="text-sm text-muted-foreground">3-5 días laborables</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 rounded border p-4 text-left">
                                        <CreditCard className="h-8 w-8 flex-shrink-0" />
                                        <div>
                                            <p className="font-bold">Total Pagado</p>
                                            {/* <p className="text-sm text-muted-foreground">${(subtotal + shipping).toFixed(2)}</p> */}
                                        </div>
                                    </div>
                                </div>
                                <Button className="mt-8 w-full sm:w-auto" size="lg">
                                    Ver Mis Pedidos
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Resumen del pedido - sidebar */}
                    {/* {currentStep < 4 && (
            <div className="lg:col-span-1">
              <div className="sticky top-4 rounded border bg-card p-6">
                <h2 className="mb-6 text-lg font-bold uppercase">Resumen del Pedido</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Cantidad: {item.quantity}</p>
                      </div>
                      <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <OrderSummary subtotal={subtotal} shipping={shipping} />
              </div>
            </div>
          )} */}
                </div>
            </div>
        </div>
    )
}
