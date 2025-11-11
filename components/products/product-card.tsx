import { ShoppingCart } from "lucide-react"
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
  return (
    <Card className="w-full overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex flex-col h-[380px] p-0">
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
          </Suspense>
        </Link>
      </div>

      <CardContent className="p-3 flex flex-col flex-1">
        <div className="flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="text-base line-clamp-2 mb-1">{product.title}</h3>
            <p className="text-xs text-gray-600 line-clamp-3">{product.short_description}</p>
          </div>

          <div className="mt-auto pt-3">
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
