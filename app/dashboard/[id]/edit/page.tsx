
import Form from "@/components/dashboard/edit-form"
import { getCategoryAll } from "@/lib/data";
import { getProductById } from '@/lib/data/product.data';
import { Category } from "@/lib/types/definitions";

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {

  const { id } = await props.params;

const [productData, categories] = await Promise.all([
        getProductById(id),
        getCategoryAll(),
    ]);
  
  if (!productData || productData.length === 0) {
    return <div>Producto no encontrado.</div>;
  }

  const product = productData[0];

  return (
    <main>
      <Form product={product} categories={categories as Category[]} />
    </main>
  );
}