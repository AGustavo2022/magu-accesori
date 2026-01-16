"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ProductCardProps } from "@/lib/types/definitions"
import { formatPrice, productToCartItem } from "@/lib/utils"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart.context"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart()

  if (!product) {
    return <p>Producto no encontrado</p>
  }

  const isOutOfStock = product.stock === 0
  const isInactive = !product.status
  const hasDiscount = product.discount > 0

  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount / 100)
    : product.price

  const isProductInCart = items.some(
    (item) => item.productId === product.id
  )

  const handleAddToCart = () => {addItem(productToCartItem(product, 1))}

  return (
    <Card className="w-full overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex flex-col h-95 p-0">
      {/* Imagen */}
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image_url || "/backpack.png"}
            width={500}
            height={300}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            alt={product.title}
          />

          {hasDiscount && (
            <Badge
              className="absolute top-2 right-2 rounded-full w-12 h-12 flex items-center justify-center bg-red-500 text-white text-lg font-bold shadow-lg"
              variant="destructive"
            >
              {product.discount}%
            </Badge>
          )}
        </Link>
      </div>

      <CardContent className="p-3 flex flex-col flex-1">
        <div className="flex flex-col flex-1">
          {/* Texto */}
          <div className="flex-1">
            <Link href={`/product/${product.id}`}>
              <h3 className="text-base font-semibold line-clamp-2 hover:text-blue-600">
                {product.title}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground line-clamp-3">
              {product.short_description}
            </p>
          </div>

          <span className="text-xs text-muted-foreground">
            Stock: {product.stock}
          </span>

          {/* Precio + acción */}
          <div className="pt-2 flex items-center justify-between">
            {hasDiscount ? (
              <div className="flex items-baseline gap-2">
                <span className="text-sm line-through text-muted-foreground">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xl font-bold text-red-600">
                  {formatPrice(discountedPrice)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold">
                {formatPrice(product.price)}
              </span>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                  onClick={handleAddToCart}
                  disabled={
                    isOutOfStock ||
                    isInactive ||
                    isProductInCart
                  }
                >
                  <ShoppingCart />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isProductInCart
                    ? "Ya está en el carrito"
                    : "Agregar al carrito"}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
