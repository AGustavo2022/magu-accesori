import { getProductos } from "@/lib/actions"
import ProductCard from "./product-card"
import { ProductGridProps } from "@/lib/definitions"


export default async function ProductGrid({ products }: ProductGridProps) {
  
  //const productsDb = await getProductos()

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.name}
          price={product.price}
          description={product.description}
          imageUrl={product.image_url}
        />
      ))}
    </div>
  )
}
