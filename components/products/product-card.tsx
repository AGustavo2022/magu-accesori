import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ProductCardProps } from "@/lib/definitions"
import { Suspense } from "react"
import { InvoiceSkeleton } from "../skeletons"


export default function ProductCard({ product }: ProductCardProps) {

  if (!product) {
    return <p>Producto no encontrado</p>
  }

  const isDiscount = product.discount > 0

  return (
    <Card className="w-full overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex flex-col h-[380px] p-0">
      
      {/* 1. IMAGEN (Parte superior) */}
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <Suspense fallback={<InvoiceSkeleton />}>
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
                  className="h-12 w-14 rounded-full text-xl bg-red-600/70"
                  variant="destructive"
                >
                  {`${product.discount}%`}
                </Badge>
              }
            </div>
          </Suspense>
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
            <p className="text-xs text-gray-600 line-clamp-2">{product.short_description}</p>
          </div>

          {/* 4. PRECIO Y BOTÓN (Parte inferior - fijo) */}
          <div className="pt-3"> {/* Eliminé mt-auto, que ya no es necesario si el div superior tiene flex-1 */}
            <div className="flex items-center mb-2">
              <span className="text-xl font-bold text-green-600">${product.price}</span>
            </div>

            <Button className="w-full text-xs">
              <ShoppingCart className="h-3 w-3 mr-1" />
              Agregar al carrito
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}