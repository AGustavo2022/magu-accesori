// app/page.tsx
import {getCategorias, getData, getProductos} from '@/lib/actions';

export default async function Home() {
  
  const categorias = await getCategorias()
  const productos = await getProductos()
  console.log(productos)
  return (

    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Categorías</h1>
      <ul className="list-disc pl-6">
        {categorias.map((cat: any) => (
          <li key={cat.id}>{cat.nombre}.........{cat.descripcion}</li>
        ))}
      </ul>
    </main>
  );
}
