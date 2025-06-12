import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  title: string
  price: number
  originalPrice?: number
  rating: number
  discount?: string
  description: string
  imageUrl: string
}

export default function ProductCard({
  title,
  price,
  originalPrice,
  rating,
  discount,
  description,
  imageUrl,
}: ProductCardProps) {
  return (
    <Card className="w-full overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount && <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">{discount}</Badge>}
        <Button size="icon" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-base line-clamp-2">{title}</h3>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            ))}
            <span className="text-xs text-gray-600 ml-1">({rating}.0)</span>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2">{description}</p>

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">${price.toFixed(2)}</span>
            {originalPrice && <span className="text-xs text-gray-500 line-through">${originalPrice.toFixed(2)}</span>}
          </div>

          <div className="flex gap-2 pt-1">
            <Button className="flex-1 text-xs">
              <ShoppingCart className="h-3 w-3 mr-1" />
              Agregar
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
