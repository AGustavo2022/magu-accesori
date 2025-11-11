
import ProductGrid from '@/components/products/product-grid'
import { getProductsAll } from '@/lib/data'
import { notFound } from 'next/navigation';

export default async function ProductItemPage() {
  const product = await getProductsAll()
  // console.log(product)
  if (!product || product.length === 0) {
    notFound()
  }
  return (
    // se agrega suspender sin veerificar q funciones
  <>
  <ProductGrid products={product} />
  </>
  )
}


