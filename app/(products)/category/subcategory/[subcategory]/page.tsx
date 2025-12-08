import ProductGrid from "@/components/products/product-grid"
import { getProductsBySubcategory } from "@/lib/data"
import { unslugify } from "@/lib/utils"

export const dynamic = "force-dynamic";

export default async function CategoryPage(props: { params: Promise<{ subcategory: string }> }) {

  const {subcategory} = await props.params

  const products = await getProductsBySubcategory(unslugify(subcategory))

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductGrid products={products} />
    </div>
  )
}
