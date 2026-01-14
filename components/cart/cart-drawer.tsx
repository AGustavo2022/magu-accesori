"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart.context"
import { resolveCart } from "@/contexts/cart.selectors"
import { useState } from "react"
import { CartItem } from "./cart-item"
import { CartSummary } from "./cart-summary"
import { CartEmpty } from "./cart-empty"
import { useRouter } from "next/navigation"
import { Product } from "@/lib/types/definitions"

interface CartDrawerProps {
  products: Product[]
}

export function CartDrawer() {
 
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const { items: cartItems, updateQuantity, removeItem, clearCart } = useCart()

  const { items, total, itemCount } = resolveCart(cartItems)

  console.log(items, total, itemCount)


  const handleCheckout = () => {
    setIsOpen(false)
    router.push("/checkout")
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg px-4">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart />
            Carrito
            {itemCount > 0 && (
              <Badge variant="secondary">
                {itemCount} productos
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[90vh]">
          {items.length === 0 ? (
            <CartEmpty />
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2">
                {items.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    isCheckoutMode
                    onIncrease={() =>
                      updateQuantity(
                        item.productId,
                        item.quantity + 1
                      )
                    }
                    onDecrease={() =>
                      updateQuantity(
                        item.productId,
                        item.quantity - 1
                      )
                    }
                    onRemove={() =>
                      removeItem(item.productId)
                    }
                  />
                ))}
              </div>

              <CartSummary
                total={total}
                onCheckout={handleCheckout}
                onClear={clearCart}
              />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
