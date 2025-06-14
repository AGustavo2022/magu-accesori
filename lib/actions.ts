// app/actions.ts
"use server";
import { neon } from '@neondatabase/serverless';

const sqlDb = `${process.env.DATABASE_URL}`

 export async function getData() {
  const sql = neon(sqlDb);
  const response = await sql `SELECT id, nombre, descripcion FROM categorias ORDER BY id ASC`;
  return response;
}


export async function getProductos() {
  const sql = neon(sqlDb);

  const response = await sql`
    SELECT 
      p.id,
      p.nombre,
      p.descripcion,
      p.precio,
      p.image_url,
      c.nombre AS categoria
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    ORDER BY p.id ASC
  `;

  return response;
}
