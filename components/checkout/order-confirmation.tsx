"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { User } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { CartItem } from "../cart-item"
// Importamos CartItem desde el path relativo, asumiendo que está en el mismo nivel o es accesible


export function OrderConfirmation() {

    // Usamos el contexto para obtener los ítems reales del carrito
    const { items } = useCart()

    // Datos de la orden (MOCK)
    const orderData = {
        orderNumber: "ADI-2024-789456",
        orderDate: "24 de Noviembre, 2025",
        estimatedDelivery: "28-30 Noviembre, 2025",
        buyer: {
            name: "Juan Pérez",
            email: "juan.perez@email.com",
            phone: "+54 11 1234-5678",
            dni: "35.678.901",
        },
        // Nota: Si usas 'items' del 'useCart()', este array 'items' de mock es redundante
        // Se deja como referencia si necesitaras datos fijos.
        // items: [...] 
        shipping: {
            name: "Juan Pérez",
            address: "Av. Corrientes 1234",
            city: "Buenos Aires",
            postalCode: "C1043",
            country: "Argentina",
            phone: "+54 11 1234-5678",
        },
        payment: {
            method: "Tarjeta de Crédito",
            last4: "4242",
        },
        summary: {
            subtotal: 270.0,
            shipping: 0.0,
            tax: 56.7,
            total: 326.7,
        },
    }

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 border-b-4 border-black pb-6">
                    <div className="mb-4 flex items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black">
                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-center font-black text-4xl uppercase tracking-tight">PEDIDO CONFIRMADO</h1>
                    <p className="mt-2 text-center text-neutral-600">{orderData.orderDate}</p>
                </div>

                <div className="mb-6 text-center">
                    <p className="text-neutral-600 text-sm font-bold uppercase tracking-wider">Número de Pedido</p>
                    <p className="font-black text-2xl mt-1">{orderData.orderNumber}</p>
                </div>

                {/* Sección de Ítems del Pedido */}
                <Card className="mb-6 border-2 border-black p-6">
                    <h2 className="mb-4 font-black text-sm uppercase tracking-wider">PRODUCTOS EN TU ORDEN</h2>
                    <div className="space-y-4 divide-y divide-neutral-200">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <CartItem
                                    key={item.product.id}
                                    item={item}
                                    // *** IMPORTANTE: Se establece en TRUE para deshabilitar los botones de edición ***
                                    isCheckoutMode={false}
                                />
                            ))
                        ) : (
                            <p className="text-center py-4 text-neutral-500">No hay productos cargados en el carrito actual.</p>
                        )}
                    </div>
                </Card>

                <Card className="mb-6 border-2 border-black p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                            <User className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="font-black text-sm uppercase tracking-wider">DATOS DEL COMPRADOR</h2>
                    </div>
                    <div className="space-y-2 text-neutral-700">
                        <div className="flex justify-between">
                            <span className="font-bold">Nombre:</span>
                            <span>{orderData.buyer.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Email:</span>
                            <span>{orderData.buyer.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Teléfono:</span>
                            <span>{orderData.buyer.phone}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">DNI:</span>
                            <span>{orderData.buyer.dni}</span>
                        </div>
                    </div>
                </Card>

                <Card className="mb-6 border-2 border-black p-6">
                    <h2 className="mb-4 font-black text-sm uppercase tracking-wider">DIRECCIÓN DE ENVÍO</h2>
                    <div className="space-y-1 text-neutral-700">
                        <p className="font-bold">{orderData.shipping.name}</p>
                        <p>{orderData.shipping.address}</p>
                        <p>
                            {orderData.shipping.city}, {orderData.shipping.postalCode}
                        </p>
                        <p>{orderData.shipping.country}</p>
                        <p className="pt-2">{orderData.shipping.phone}</p>
                    </div>
                </Card>

                <Card className="mb-6 border-2 border-black p-6">
                    <h2 className="mb-3 font-black text-sm uppercase tracking-wider">MÉTODO DE PAGO</h2>
                    <p className="text-neutral-700">
                        {orderData.payment.method} terminada en {orderData.payment.last4}
                    </p>
                </Card>

                <Card className="mb-8 border-2 border-black bg-neutral-50 p-6">
                    <h2 className="mb-4 font-black text-sm uppercase tracking-wider">RESUMEN</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-neutral-700">
                            <span>Subtotal</span>
                            <span className="font-bold">${orderData.summary.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-neutral-700">
                            <span>Envío</span>
                            <span className="font-bold text-green-600">GRATIS</span>
                        </div>
                        <div className="flex justify-between text-neutral-700">
                            <span>Impuestos</span>
                            <span className="font-bold">${orderData.summary.tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t-2 border-black pt-3">
                            <div className="flex justify-between">
                                <span className="font-black text-xl uppercase">Total</span>
                                <span className="font-black text-2xl">${orderData.summary.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="space-y-3">
                    <Button className="h-14 w-full bg-black font-black text-lg uppercase tracking-wide hover:bg-neutral-800">
                        Seguir mi Pedido
                    </Button>
                    <Button
                        variant="outline"
                        className="h-14 w-full border-2 border-black font-black text-lg uppercase tracking-wide hover:bg-neutral-100 bg-transparent"
                    >
                        Seguir Comprando
                    </Button>
                </div>
            </div>
        </div>
    )
}