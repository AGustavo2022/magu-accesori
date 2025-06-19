// app/actions.ts
"use server";
import { neon } from '@neondatabase/serverless';
import { Product } from './definitions';

const sqlDb = `${process.env.DATABASE_URL}`

const sql = neon(sqlDb);

export async function getCategorias() {

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
  return response as Product[];
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  
  const result = await sql`
    SELECT 
      p.id,
      p.name,
      p.price,
      p.description,
      p.image_url,
      p.stock,
      p.status,
      pc.name AS category
    FROM products p
    JOIN product_categories pc ON p.category_id = pc.id
    WHERE LOWER(pc.name) = LOWER(${category})
    ORDER BY p.id ASC
  `;
  return result as Product[];
}