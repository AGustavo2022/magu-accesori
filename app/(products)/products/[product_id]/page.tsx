import React from "react"
import { notFound } from "next/navigation"
import { getProductsByid } from "@/lib/actions"
import ProductItem from "@/components/products/product-item"


export default async function ProductItemPage(props: { params: Promise<{ product_id: string }> }) {
  
  const params = await props.params
  const numericProductId = Number(params.product_id)
  const product = await getProductsByid(numericProductId)
  if (!product || product.length === 0) {
    notFound()
  }
  return <ProductItem product={product} />
}

