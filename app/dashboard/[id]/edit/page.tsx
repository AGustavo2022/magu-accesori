
import Breadcrumbs from "@/components/breadcrumbs";
import Form from "@/components/dashboard/edit-form"
import { getProductById } from "@/lib/data";

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {

  const { id } = await props.params;

  const productData = await getProductById(id);

  if (!productData || productData.length === 0) {
    return <div>Producto no encontrado.</div>;
  }

  const product = productData[0];

  return (
    <main>
      {/* <h1>Editar: {product.title}</h1> */}

      <Breadcrumbs/>

      <Form product={product} />
    </main>
  );
}