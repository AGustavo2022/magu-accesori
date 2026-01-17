"use client"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/components/cart/cart-item"
import { formatPrice } from "@/lib/utils"
import { CheckCircle, MapPinPlus, Package } from "lucide-react"

interface StepSummaryProps {
    items: any[]
    itemCount: number
    shippingData: any
    paymentMethod: any
    subtotal: number
    shippingCost: number
    total: number
    onBack: () => void
}

export function StepSummary({
    items,
    itemCount,
    shippingData,
    paymentMethod,
    subtotal,
    shippingCost,
    total,
    onBack,
}: StepSummaryProps) {
    return (
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
                        {items.map((item) => (
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
                            <MapPinPlus className="h-4 w-4" />
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
                                <span className="text-foreground">{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Envío</span>
                                <span className="text-success">{formatPrice(shippingCost)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-medium">
                                <span className="text-foreground">Total</span>
                                <span className="text-foreground">{formatPrice(total)}</span>
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">Pagado con {paymentMethod.title}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}