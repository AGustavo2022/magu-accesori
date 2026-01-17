"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { ResolvedCartItem } from "@/lib/types/cart.types"


interface CartItemProps {
  item: ResolvedCartItem
  isCheckoutMode?: boolean
  onIncrease?: () => void
  onDecrease?: () => void
  onRemove?: () => void
}

export function CartItem({
  item,
  isCheckoutMode = false,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {

  //const { productId, quantity, subtotal } = item
  const { productId, title, image_url, stock, price, discount, quantity, subtotal } = item

  const unitPrice =
    discount && discount > 0
      ? price * (1 - discount / 100)
      : price

  return (
    <div className="flex gap-4 py-3 items-center">
      {/* Imagen */}
      <div className="h-24 w-24 overflow-hidden rounded-md bg-muted">
        <Image
          src={image_url || "/placeholder.svg"}
          alt={title}
          width={96}
          height={96}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold line-clamp-2">{title}</h3>
            <span className="font-bold">
              {formatPrice(subtotal)}
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            Precio unitario: {formatPrice(unitPrice)}
          </p>
          {isCheckoutMode && 
          <p className="text-xs text-muted-foreground">
            Stock: {stock} 
          </p>
          }
        </div>

        <div className="flex items-center justify-between mt-3">
          {isCheckoutMode ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onDecrease}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="w-8 text-center font-bold">
                {quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={onIncrease}
                disabled={quantity >= stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Cantidad: {quantity}
            </p>
          )}

          {isCheckoutMode && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
