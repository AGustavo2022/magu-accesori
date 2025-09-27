
import { getProductos } from "@/lib/actions"
import ProductCard from "./product-card"
import { ProductGridProps } from "@/lib/definitions"


export default function ProductGrid({ products }: ProductGridProps) {
  
  //const productsDb = await getProductos()

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
      {products.map((item) => (
        <ProductCard key={item.id} product={item}
        />
      ))}
    </div>
  )
}
