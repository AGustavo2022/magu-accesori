import ProductGrid from "@/components/products/product-grid"
import { getProductsBySubcategory } from "@/lib/data"
import { unslugify } from "@/lib/utils"


export default async function CategoryPage(props: { params: Promise<{ subcategory_id: string }> }) {

  const {subcategory_id} = await props.params

  const products = await getProductsBySubcategory(unslugify(subcategory_id))

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductGrid products={products} />
    </div>
  )
}
