"use client"

import { Package } from "lucide-react"

export function CartEmpty() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
      <Package className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">
        Tu carrito está vacío
      </h3>
      <p className="text-muted-foreground">
        Agregá algunos productos para comenzar
      </p>
    </div>
  )
}
