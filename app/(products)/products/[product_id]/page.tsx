import { notFound } from "next/navigation"
import { getProductsByid } from "@/lib/actions"
import { ProductDetail } from "@/components/products/product-detail"
import { Product } from "@/lib/definitions"


export default async function ProductItemPage(props: { params: Promise<{ product_id: string }> }) {
  
  const params = await props.params
  const numericProductId = Number(params.product_id)
  const product = await getProductsByid(numericProductId)
  if (!product || product.length === 0) {
    notFound()
  }


  return <ProductDetail product={product[0]}/>
}

