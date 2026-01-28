
import { ITEMS_PAGINATION_PAGE } from "../constants/pagination.constants";
import { sql } from "../db/db";

import { Product } from "../types/definitions";


export async function getProductsAll() {

  try {
    const response = await sql`
      SELECT 
        p.id, -- Puedes usar p.id para mayor claridad, aunque no es estrictamente necesario aquí
        p.title,
        p.short_description,
        p.long_description,
        p.price,
        p.stock,
        p.image_url,
        c.name AS category, 
        sc.name AS subcategory, 
        p.status,
        p.discount,
        p.created_at
      FROM products2 p
      INNER JOIN categories c ON p.category = c.id
      INNER JOIN subcategories sc ON p.subcategory = sc.id
      WHERE p.status = true
        AND p.stock > 0
      ORDER BY p.id ASC
    `;
    return response as Product[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function getProductsDashboard() {
  try {
    const response = await sql`
      SELECT 
        p.id, -- Puedes usar p.id para mayor claridad, aunque no es estrictamente necesario aquí
        p.title,
        p.short_description,
        p.long_description,
        p.price,
        p.stock,
        p.image_url,
        c.name AS category, 
        sc.name AS subcategory, 
        p.status,
        p.discount,
        p.created_at
      FROM products2 p
      INNER JOIN categories c ON p.category = c.id
      INNER JOIN subcategories sc ON p.subcategory = sc.id
      ORDER BY p.id ASC
    `;
    return response as Product[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function getProductsByCategory(
  categoryName: string,
  page: number = 1
): Promise<Product[]> {

  const offset = (page - 1) * ITEMS_PAGINATION_PAGE;

  const result = await sql`
    SELECT 
      p.id,
      p.title,
      p.short_description,
      p.long_description,
      p.price,
      p.stock,
      p.image_url,
      c.name AS category,        
      sc.name AS subcategory,     
      p.status,
      p.discount,
      p.created_at
    FROM products2 p
    INNER JOIN categories c ON p.category = c.id
    INNER JOIN subcategories sc ON p.subcategory = sc.id
    WHERE c.name = ${categoryName}
      AND p.status = true
      AND p.stock > 0
    ORDER BY p.id ASC
    LIMIT ${ITEMS_PAGINATION_PAGE}
    OFFSET ${offset}
  `;

  return result as Product[];
}
export async function getProductById(product_id: string): Promise<Product[]> {

  try {
    const response = await sql`
            SELECT 
                p.id,
                p.title,
                p.short_Description, 
                p.long_Description,
                p.price,
                p.stock,
                p.specifications,
                p.image_url,
                c.name AS category,       
                sc.name AS subcategory,   
                p.status,
                p.discount,
                p.created_at
            FROM products2 p
            
            INNER JOIN categories c ON p.category = c.id
            INNER JOIN subcategories sc ON p.subcategory = sc.id

            WHERE p.id = ${product_id}::uuid 
        `;

    return response as Product[];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product by ID.');
  }
}

export async function getProductsPages(
  query: string = "",
  page: number = 1
) {
  const offset = (page - 1) * ITEMS_PAGINATION_PAGE;
  const search = `%${query}%`;

  try {
    const response = await sql`
      SELECT 
        p.id,
        p.title,
        p.short_description,
        p.long_description,
        p.price,
        p.stock,
        p.image_url,
        c.name AS category, 
        sc.name AS subcategory, 
        p.status,
        p.discount,
        p.created_at
      FROM products2 p
      INNER JOIN categories c ON p.category = c.id
      INNER JOIN subcategories sc ON p.subcategory = sc.id
      WHERE 
        p.status = true
        AND p.stock > 0
        AND (
          p.title ILIKE ${search}
          OR p.short_description ILIKE ${search}
          OR c.name ILIKE ${search}
          OR sc.name ILIKE ${search}
          OR p.price::text ILIKE ${search}
        )
      ORDER BY p.id ASC
      LIMIT ${ITEMS_PAGINATION_PAGE}
      OFFSET ${offset}
    `;

    return response;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch paginated products.");
  }
}

export async function getProductsTotalPages(query: string = "") {
  const search = `%${query}%`;

  try {
    const count = await sql`
      SELECT COUNT(*) 
      FROM products2 p
      INNER JOIN categories c ON p.category = c.id
      INNER JOIN subcategories sc ON p.subcategory = sc.id
      WHERE 
        p.status = true
        AND p.stock > 0
        AND (
          p.title ILIKE ${search}
          OR p.short_description ILIKE ${search}
          OR c.name ILIKE ${search}
          OR sc.name ILIKE ${search}
          OR p.price::text ILIKE ${search}
        )
    `;

    const total = Number(count[0].count);
    return Math.ceil(total / ITEMS_PAGINATION_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of pages.");
  }
}

