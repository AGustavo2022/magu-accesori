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

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const result = await sql`
    SELECT 
      id,
      name,
      price,
      description,
      image_url,
      stock,
      status,
      category_id
    FROM products
    WHERE category_id = ${categoryId}
    ORDER BY id ASC
  `;
  return result as Product[];
}

export async function getProductsByid(product_id: number): Promise<Product[]> {

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
    WHERE id = ${product_id}
    ORDER BY id ASC
  `;
  return response as Product[];
}
