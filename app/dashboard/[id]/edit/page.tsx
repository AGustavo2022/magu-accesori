//import { fetchProducts } from "@/lib/data"
import Breadcrumbs from "@/components/dashboard/breadcrumbs";
import Form from "@/components/dashboard/edit-form"
import { getProductById } from "@/lib/data";

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {

  const { id } = await props.params;

  const productData = await getProductById(id)

  console.log(productData)
  if (!productData) {
    // Manejar el caso de que el producto no exista (ej: mostrar 404)
    return <div>Producto no encontrado.</div>;
  }

  const product = productData[0];

  console.log(productData)
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Productos', href: '/dashboard/products' }, // Asumo que esta es la lista de productos
          {
            label: `Editar: ${product.title}`, // Usamos el título del producto
            href: `/dashboard/products/${id}/edit`, // La ruta actual
            active: true,
          },
        ]}
      />
      <Form product={product} />
    </main>
  )
}
