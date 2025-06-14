// app/page.tsx
import pool from '@/lib/db';

export default async function Home() {
  const categorias = await getCategorias();
  console.log('Categorías:', categorias); // Este se verá en la consola del servidor (no del navegador)

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

async function getCategorias() {
  const res = await pool.query('SELECT * FROM categorias ORDER BY id ASC');
  return res.rows;
}
