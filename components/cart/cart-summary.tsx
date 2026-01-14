"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"

export interface CartSummaryProps {
  total: number
  onCheckout: () => void
  onClear: () => void
}

export function CartSummary({
  total,
  onCheckout,
  onClear,
}: CartSummaryProps) {
  return (
    <div className="py-4 space-y-4 sticky bottom-0 bg-background">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-2xl font-bold text-primary">
          {formatPrice(total)}
        </span>
      </div>

      <div className="space-y-2">
        <Button onClick={onCheckout} size="lg" className="w-full">
          Finalizar compra
        </Button>

        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={onClear}
        >
          Vaciar carrito
        </Button>
      </div>
    </div>
  )
}
