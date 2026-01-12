import { notFound } from "next/navigation"
import { getProductById } from '@/lib/data/product.data';
import { ProductDetail } from "@/components/products/product-detail"


export default async function ProductItemPage({
  params,
}:{
  params: Promise<{ product_id: string }>
}) {

  const { product_id } = await params;

  const product = await getProductById(product_id)
  
  if (!product || product.length === 0) {
    notFound()
  }

  return (
    
    <ProductDetail product={product[0]}/>
  )
}

