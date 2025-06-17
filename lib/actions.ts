// app/actions.ts
"use server";
import { neon } from '@neondatabase/serverless';

const sqlDb = `${process.env.DATABASE_URL}`

 export async function getData() {
  const sql = neon(sqlDb);
  const response = await sql `
  SELECT id, nombre, descripcion, precio, stock, categoria_id 
    FROM productos 
    ORDER BY id ASC
  `;
  // console.log(response)
  return response;
}


export async function getCategorias() {
  
  const sql = neon(sqlDb);

  const response = await sql`
   SELECT 
      id,
      nombre,
      descripcion
    FROM categorias
    ORDER BY id ASC
  `;

  // console.log(response)
  return response;
}

// falata agregar la imagenes a la bd
export async function getProductos() {
  const sql = neon(sqlDb);
  const response = await sql`
    SELECT 
      id,
      nombre,
      descripcion,
      precio,
      stock,
      categoria_id,
      estado_id
    FROM productos
    ORDER BY id ASC
  `;

  console.log(response)
  return response;
}

