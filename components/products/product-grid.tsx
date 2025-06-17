import { getProductos } from "@/lib/actions"
import ProductCard from "./product-card"


export default async function ProductGrid() {
  const products = await getProductos()
  console.log(products)
  
  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.nombre}
          price={product.precio}
          description={product.descripcion}
          imageUrl={product.image_url}
        />
      ))}
    </div>
  )
}
