"use client"
import React, { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { getProductsByid } from "@/lib/actions"
import ProductItem from "@/components/products/product-item"
import { Product } from "@/lib/definitions"


export default function ProductItemPage({ params }: { params: Promise<{ product_id: string }> }) {
  
  const { product_id } =  React.use(params) 
  const numericProductsId = Number(product_id);
  
  const [products, setProducts] = useState<Array<Product>>([]);


  useEffect(() => {
    async function fetchData() {
      const data = await getProductsByid(numericProductsId)
      console.log(data)
      setProducts(data as Product[]);
    }
    fetchData();
  }, [numericProductsId]);
  
  return (
    <ProductItem product={products[0]} />
  )
}

