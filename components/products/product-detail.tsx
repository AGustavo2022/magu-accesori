"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Heart, Share2, Package, Calendar, Tag } from "lucide-react"
import { Product } from "@/lib/definitions"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import Breadcrumbs from "../breadcrumbs"
import { createSlug, formatPrice } from "@/lib/utils"

interface ProductDetailProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
}


export function ProductDetail({ product}: ProductDetailProps) {
  
  console.log(product)
  
  const { addItem } = useCart(); 

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

    const handleAddToCart = (product: Product) => {
      addItem(product)
    console.log("Añadiendo al carrito:", product.title)
    // Aquí implementarías la lógica del carrito
  }

  const isOutOfStock = product.stock === 0
  const isInactive = !product.status
  const isLowStock = product.stock <= 5 && product.stock > 0
  const isDiscount = product.discount > 0
  const priceDiscount = product.price * (1 - (product.discount / 100));



  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <Card className="p-0 overflow-hidden">
            <div className="aspect-square relative p-0">
              {product.image_url ? (
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  width={500}
                  height={300}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-24 h-24 text-muted-foreground" />
                </div>
              )}

              {/* Status badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {isDiscount &&
                  <Badge
                    className="h-16 w-16 rounded-full text-3xl bg-red-600/70"
                    variant="destructive"
                  >
                    {`${product.discount}%`}
                  </Badge>
                }
                {isInactive && <Badge variant="destructive">Producto Inactivo</Badge>}
                {isOutOfStock && <Badge variant="secondary" className="bg-red-100 border border-red-300 rounded-lg">Agotado</Badge>}
                {isLowStock && (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                    Últimas unidades
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>

            {/* Terminar de redondear la idea */}

            <Breadcrumbs
              
              breadcrumbs={[
                { label: 'Inicio', href: '/' },
                { label: 'Productos', href: '/products' },
                { label: `${product.category}`, href: `/category/${createSlug(product.category)}` },
                {
                  label: `${product.subcategory}`,
                  href: `/category/subcategory/${createSlug (product.subcategory)}`,
                  active: true,
                },
              ]}
            />

            <h1 className="text-2xl font-bold text-balance mb-2">{product.title}</h1>
            {/* <div className="text-3xl font-bold text-primary mb-4">{formatPrice(product.price)}</div> */}

              {isDiscount ? (
                <>
                  {/* 1. Precio Original (Tachado y Pequeño) */}
                  <span className="text-xl text-gray-500 line-through pr-5">
                    {formatPrice(product.price)}
                  </span>

                  {/* 2. Precio Final (Grande y Destacado) */}
                  <span className="text-3xl font-bold text-red-600">
                    {formatPrice(priceDiscount)}
                  </span>
                </>
              ) : (
                // Si no hay descuento, solo muestra el precio normal
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
          </div>

          {product.short_description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">{product.short_description}</p>
            </div>
          )}

          <Separator />

          {/* Product Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Detalles del Producto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Stock:</strong> {product.stock} unidades
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Agregado:</strong> 
                  {/* {formatDate(product.created_at)} */}
                  se devuelve la fecha
                </span>
              </div>

              {product.category && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Categoría ID:</strong> {product.category}
                  </span>
                </div>
              )}

              {product.subcategory && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Subcategoría ID:</strong> {product.subcategory}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => handleAddToCart?.(product)}
                disabled={isOutOfStock || isInactive}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isOutOfStock ? "Agotado" : isInactive ? "No Disponible" : "Añadir al Carrito"}
              </Button>
{/* 
              <Button size="lg" variant="outline" onClick={() => handleAddToWishlist?.(product)}>
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5" />
              </Button> */}

              {/* <Button size="lg" variant="outline">
                <Share2 className="w-5 h-5" />
              </Button> */}
            </div>

            {/* {isLowStock && !isOutOfStock && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>¡Últimas unidades!</strong> Solo quedan {product.stock} productos en stock.
                </p>
              </div>
            )}

            {isOutOfStock && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">
                  <strong>Producto agotado.</strong> Este producto no está disponible actualmente.
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  )
}
