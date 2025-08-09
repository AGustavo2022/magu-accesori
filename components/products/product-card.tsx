import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  title: string
  price: number
  description: string
  imageUrl: string
}

export default function ProductCard({ title, price, description, imageUrl }: ProductCardProps) {

  return (
    <Card className="w-full overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex flex-col h-[450px]">
      <div className="relative">
        <Link href="/">
          <Image className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            src={imageUrl || "/backpack.png"}
            alt={title}
            width={500}
            height={300}
          />
        </Link>
      </div>

      <CardContent className="p-3 flex flex-col flex-1">
        <div className="flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="font-semibold text-base line-clamp-2 mb-1">{title}</h3>
            <p className="text-xs text-gray-600 line-clamp-3">{description}</p>
          </div>

          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center mb-2">
              <span className="text-xl font-bold text-green-600">${price}</span>
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
