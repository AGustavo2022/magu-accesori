import { notFound } from "next/navigation"
import ProductGrid from "@/components/products/product-grid"
import { getProductsByid } from "@/lib/actions"


export default async function CategoryPage({ params }: { params: { product_id: number } }) {
  const { product_id } = params
  const products = await getProductsByid(product_id)

  // Si no hay productos, mostrar página 404
  if (products.length === 0) {
    notFound()
  }

  console.log(products)
  //const categoryTitle = getCategoryTitle(categoria)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-2 text-center">{categoryTitle}</h1>
      <p className="text-gray-600 mb-8 text-center">Explora nuestra selección de {categoryTitle.toLowerCase()}</p> */}

      {/* Mostrar los productos usando el componente ProductGrid */}
      {/* <ProductGrid products={products} /> */}
    </div>
  )
}
