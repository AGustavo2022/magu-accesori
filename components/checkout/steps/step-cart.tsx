"use client"

import { CartItem } from "@/components/cart/cart-item"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"

interface StepCartProps {
  items: any[]
  total: number
  onNext: () => void
}

export function StepCart({ items, total, onNext }: StepCartProps) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold uppercase text-center">
        Tu Carrito
      </h1>

      <div className="space-y-4">
        {items.map(item => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>

      <Separator />

      <div className="mt-6 flex justify-between items-center text-lg">
        <span className="font-medium">Subtotal</span>
        <span className="font-bold">{formatPrice(total)}</span>
      </div>

      <Button className="w-full mt-8" size="lg" onClick={onNext}>
        Continuar con la Entrega
      </Button>
    </>
  )
}
