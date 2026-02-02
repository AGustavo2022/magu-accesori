"use client"

import { CartItem } from "@/components/cart/cart-item"
import { formatPrice } from "@/lib/utils"

interface StepCartProps {
  items: any[]
  total: number
  onNext: () => void
}

export function StepCart({ items, total}: StepCartProps) {
  return (


    <div className="flex flex-col">

      <div className="pb-16">
        <h1 className="mb-6 text-2xl font-bold uppercase text-center">
          Tu Carrito
        </h1>

        <div className="space-y-4">
          {items.map(item => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>
      </div>
    </div>

  )
}
