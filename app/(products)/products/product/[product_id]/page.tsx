import { notFound } from "next/navigation"
import { getProductsByid } from "@/lib/actions"
import ProductItem from "@/components/products/product-item"


export default async function ProductPage({ params }: { params: { product_id: string } }) {
  
  const product_id = Number(params.product_id)
  const product = await getProductsByid(product_id)

  // Si no hay productos, mostrar página 404
  if (product.length === 0) {
    notFound()
  }

  return (
    <ProductItem product={product[0]} />
  )
}

