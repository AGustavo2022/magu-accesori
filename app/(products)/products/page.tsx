
import ProductGrid from '@/components/products/product-grid'
import { getProductos } from '@/lib/actions'
import { notFound } from 'next/navigation';


export default async function ProductItemPage() {
  const product = await getProductos()
  if (!product || product.length === 0) {
    notFound()
  }
  return <ProductGrid products={product} />
}


