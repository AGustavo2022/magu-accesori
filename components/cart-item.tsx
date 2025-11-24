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
    // NUEVA PROP: Indica si el carrito está en modo de revisión/pago
    isCheckoutMode?: boolean; 
}

export function CartItem({ item, isCheckoutMode = true }: CartItemProps) {

    console.log(isCheckoutMode)

    const { updateQuantity, removeItem} = useCart()
    
    const { product, quantity } = item;
    const { id, title, price, image_url, stock } = product;
    
    // Si estamos en modo checkout (o cualquier modo que no permita edición), 
    // deshabilitamos las acciones de edición.
    const disableEditing = isCheckoutMode; 

    // Botón de Decrementar: Deshabilitado si la cantidad es 1 O si estamos en modo solo lectura
    const isMinusDisabled = quantity <= 1 || disableEditing;
    
    // Botón de Incrementar: Deshabilitado si se alcanza el stock O si estamos en modo solo lectura
    const isPlusDisabled = quantity >= stock || disableEditing;


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
                        <span className="text-base font-bold ml-4">{formatPrice(price*quantity)}</span>
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
                            // AÑADIDO: Usa la variable de deshabilitación
                            // disabled={isMinusDisabled} 
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
                            // AÑADIDO: Usa la variable de deshabilitación
                            // disabled={isPlusDisabled}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Botón de Eliminar */}
                    {!disableEditing && (
                    <Button
                        variant="ghost"
                        size="icon"
                        // Usa la función 'removeItem'
                        onClick={() => removeItem(id)}
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        // AÑADIDO: Usa la prop para deshabilitar el botón de eliminar
                        // disabled={disableEditing}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    )}
                </div>
            </div>
        </div>
    );
}