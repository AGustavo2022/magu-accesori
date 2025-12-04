import { notFound } from "next/navigation"
import { getProductById } from "@/lib/data"
import { ProductDetail } from "@/components/products/product-detail"
import { Spinner } from "@/components/ui/spinner";

export default async function ProductItemPage(props: { params: Promise<{ product_id: string }> }) {
  
  const { product_id } = await props.params;

  // console.log(product_id)

  const product = await getProductById(product_id)
  if (!product || product.length === 0) {
    notFound()
  }


  return (
    
    <ProductDetail product={product[0]}/>
  )
}

