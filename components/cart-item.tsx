"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { Product } from "@/lib/definitions"
import { useCart } from "@/contexts/cart-context"

export interface CartItemData {
    product: Product;
    quantity: number;
}


interface CartItemProps {
    item: CartItemData; 
}

export function CartItem({ item }: CartItemProps) {

    const { total, updateQuantity, removeItem} = useCart()
   
    const { product, quantity } = item;
    const { id, title, price, image_url, stock } = product;

    return (
        <div className="flex gap-4 border-b py-6 items-center">
            {/* Imagen del Producto */}
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-muted rounded-md">
                <Image
                    src={image_url || "/placeholder.svg"}
                    alt={title}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between h-full">
                <div>
                    <div className="flex justify-between items-start">
                        {/* Título y Precio Total de la Línea */}
                        <h3 className="text-base font-bold line-clamp-2">{title}</h3>
                        <span className="text-base font-bold ml-4">{formatPrice(total)}</span>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Precio unitario: {formatPrice(price)}
                    </p>
                    {/* Muestra opciones solo si existen */}

                </div>

                {/* Controles de Cantidad y Eliminar */}
                <div className="flex items-center justify-between mt-3">
                    {/* Control de Cantidad */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            // Usa la función 'updateQuantity'
                            onClick={() => updateQuantity(id, quantity - 1)}
                            className="h-8 w-8"
                            disabled={quantity <= 1}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            // Usa la función 'updateQuantity'
                            onClick={() => updateQuantity(id, quantity + 1)}
                            className="h-8 w-8"
                            disabled={quantity >= stock}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Botón de Eliminar */}
                    <Button
                        variant="ghost"
                        size="icon"
                        // Usa la función 'removeItem'
                        onClick={() => removeItem(id)}
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}