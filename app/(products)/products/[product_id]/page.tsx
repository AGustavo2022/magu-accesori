import { notFound } from "next/navigation"
import { getProductById } from "@/lib/data"
import { ProductDetail } from "@/components/products/product-detail"
import { Product } from "@/lib/definitions"


export default async function ProductItemPage(props: { params: Promise<{ product_id: string }> }) {
  
  const params = await props.params
  const product = await getProductById(params.product_id)
  if (!product || product.length === 0) {
    notFound()
  }


  return <ProductDetail product={product[0]}/>
}

