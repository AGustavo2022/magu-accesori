"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Package } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { redirect } from "next/navigation"
import { useState } from "react"
import { CartItem } from "../cart-item"
import { formatPrice } from "@/lib/utils"

export function CartDrawer() {

  const [isOpen, setIsOpen] = useState(false);

  const { items, total, itemCount, clearCart } = useCart()

const handleCheckout = async () => {
    //console.log(items, total, itemCount);

    // 2. Cierra el Drawer
    setIsOpen(false); 

    // 3. Redirige a la página de checkout
    redirect('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <ShoppingCart className="h-4 w-4" />
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg px-4">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrito de Compras
            {itemCount > 0 && <Badge variant="secondary">{itemCount} productos</Badge>}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <Package className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
              <p className="text-muted-foreground">Agrega algunos productos para comenzar</p>
            </div>
          ) : (
            <>
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <CartItem
                        key={item.product.id}
                        item={item}
                        isCheckoutMode={true}
                      />
                    ))}
                  </div>
                </div>

              <Separator />

              <div className="py-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary"> {formatPrice(total)} </span>
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={() => handleCheckout()}
                    className="w-full" size="lg">
                    Finalizar compra
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                    Vaciar Carrito
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
