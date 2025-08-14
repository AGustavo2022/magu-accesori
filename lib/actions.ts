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
    FROM categories
    ORDER BY id ASC
  `;
  return response;
}


export async function getCategorias2() {

  const response = await sql`
  SELECT 
      c.id AS category_id,
      c.name AS category_name,
      c.description,
      COALESCE(
        json_agg(
          json_build_object(
            'subcategory_id', s.id,
            'subcategory_name', s.name
          )
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'
      ) AS subcategories
    FROM categories c
    LEFT JOIN subcategories s ON s.category_id = c.id
    GROUP BY c.id
    ORDER BY c.id;
  `;
  return response;
}



export async function getProductos() {

  const response = await sql`
    SELECT 
      id,
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

export async function getProductsBySubcategory(subcategoryId: number): Promise<Product[]> {
  const result = await sql`
    SELECT 
      id,
      name,
      description,
      price,
      image_url,
      stock,
      status,
      category_id,
      subcategory_id
    FROM products
    WHERE subcategory_id = ${subcategoryId}
    ORDER BY id ASC
  `;
  return result as Product[];
}

export async function getProductsByCategory(categoryId: number, subcategory_id: number): Promise<Product[]> {
  const result = await sql`
    SELECT 
      id,
      sku,
      name,
      price,
      description,
      image_url,
      stock,
      subcategory_id,
      status
    FROM products
    WHERE subcategory_id = ${categoryId}
    ORDER BY id ASC
  `;
  return result as Product[];
}

export async function getProductsByid(product_id: number): Promise<Product[]> {

  const response = await sql`
    SELECT 
      id,
      name,
      description,
      price,
      image_url,
      stock,
      status,
      category_id,
      subcategory_id
    FROM products
    WHERE id = 1
    ORDER BY id ASC
  `;
  return response as Product[];
}
