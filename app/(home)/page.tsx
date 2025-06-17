// app/page.tsx
import {getCategorias, getData, getProductos} from '@/lib/actions';

export default async function Home() {
  
  // ejemplo de consulta de la base de dato
  const categorias = await getCategorias()

  return (

    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Categorías</h1>
      <ul className="list-disc pl-6">
        {categorias.map((cat: any) => (
          <li key={cat.id}>{cat.name}.........{cat.description}</li>
        ))}
      </ul>
    </main>
  );
}
