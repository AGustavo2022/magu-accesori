"use client"


import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Product, ProductCardProps } from "@/lib/definitions"
import { formatPrice } from "@/lib/utils"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"



export default function ProductCard({ product }: ProductCardProps) {

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { addItem, items } = useCart();

  console.log(product)

  if (!product) {
    return <p>Producto no encontrado</p>
  }

  const isOutOfStock = product.stock === 0
  const isInactive = !product.status
  const isDiscount = product.discount > 0
  const priceDiscount = product.price * (1 - (product.discount / 100));
  const isProductInCart = items.some(item => item.product.id === product.id);

  const handleAddToCart = (product: Product) => {
    addItem(product, selectedQuantity);
    //console.log("Añadiendo al carrito:", product.title, "Cantidad:", selectedQuantity)
  }

  return (
    <Card className="w-full overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex flex-col h-[380px] p-0">

      {/* 1. IMAGEN (Parte superior) */}
      <div className="relative">
        <Link href={`/product/${product.id}`}>
            <Image
              src={product.image_url || "/backpack.png"}
              width={500}
              height={300}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300 rounded-none"
              alt={product.title}
            />
            <div className="absolute top-1 right-1 flex flex-col gap-1">
              {isDiscount &&
                <Badge
                  className="h-12 w-12 rounded-full text-xl bg-red-600/70"
                  variant="destructive"
                >
                  {`${product.discount}%`}
                </Badge>
              }
            </div>
          
        </Link>
      </div>

      {/* 2. CONTENIDO PRINCIPAL (Ocupa el resto del espacio vertical) */}
      <CardContent className="p-3 flex flex-col flex-1">

        {/* Este contenedor necesita ser flex y ocupar el espacio disponible */}
        <div className="flex flex-col flex-1">

          {/* 3. TEXTO (Título y descripción - flex-1 para empujar hacia abajo) */}
          <div className="flex-1">
            <Link href={`/product/${product.id}`}>
              <h3 className="text-base line-clamp-2 mb-1 font-semibold hover:text-blue-600 transition-colors">{product.title}</h3>
            </Link>
            <p className="text-xs text-gray-600 line-clamp-3">{product.short_description}</p>
          </div>

          <div>
            <span className="text-xs text-gray-600">Stock : {product.stock}</span>
          </div>

          {/* 4. PRECIO Y BOTÓN (Parte inferior - fijo) */}
          <div className="pt-1"> {/* Eliminé mt-auto, que ya no es necesario si el div superior tiene flex-1 */}
            <div className="flex items-baseline justify-between gap-1">
              {isDiscount ? (
                <>
                  {/* 1. Precio Original (Tachado y Pequeño) */}
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>

                  {/* 2. Precio Final (Grande y Destacado) */}
                  <span className="text-xl font-bold text-red-600">
                    {formatPrice(priceDiscount)}
                  </span>
                </>
              ) : (
                // Si no hay descuento, solo muestra el precio normal
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => handleAddToCart(product)}
                    disabled={isOutOfStock || isInactive || selectedQuantity === 0 || isProductInCart}
                  >
                    <ShoppingCart />
                  </Button>

                </TooltipTrigger>
                <TooltipContent>
                  <p>Agregar al carrito</p>
                </TooltipContent>
              </Tooltip>

            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  )
}

