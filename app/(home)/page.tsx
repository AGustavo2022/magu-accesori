// app/page.tsx
import {getData} from '@/lib/actions';

export default async function Home() {
  
  const categorias = await getData();

  return (

    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Categorías</h1>
      <ul className="list-disc pl-6">
        {categorias.map((cat: any) => (
          <li key={cat.id}>{cat.nombre}</li>
        ))}
      </ul>
    </main>
  );
}
