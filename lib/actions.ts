// app/actions.ts
"use server";
import { neon } from '@neondatabase/serverless';

const sqlDb = `${process.env.DATABASE_URL}`


export async function getCategorias() {
  
  const sql = neon(sqlDb);

  const response = await sql`
   SELECT 
      id,
      name,
      description
    FROM product_categories
    ORDER BY id ASC
  `;
  return response;
}

export async function getProductos() {
  const sql = neon(sqlDb);
  const response = await sql`
    SELECT 
      id,
      sku,
      name,
      price,
      description,
      image_url,
      stock,
      category_id,
      status
    FROM products
    ORDER BY id ASC
  `;
  return response;
}

