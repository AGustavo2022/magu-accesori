
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
      FROM products p
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
    FROM products p
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
                (p.price - (p.price * p.discount / 100))::numeric AS final_price,
                p.created_at
            FROM products p
            
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


interface ProductFilters {
  query?: string
  page?: number
  category?: string | null
  subcategory?: string | null
}

export async function getProductsPages({
  query = "",
  page = 1,
  category,
  subcategory,
}: ProductFilters): Promise<Product[]> {

  const offset = (page - 1) * ITEMS_PAGINATION_PAGE
  const search = `%${query}%`

  try {
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

        -- 🔥 Precio final calculado
        ROUND(
          p.price * (1 - COALESCE(p.discount, 0) / 100.0),
          2
        ) AS final_price,

        p.created_at
      FROM products p
      INNER JOIN categories c ON p.category = c.id
      INNER JOIN subcategories sc ON p.subcategory = sc.id
      WHERE 
        p.status = true
        AND p.stock > 0

        ${query
          ? sql`
            AND (
              p.title ILIKE ${search}
              OR p.short_description ILIKE ${search}
              OR c.name ILIKE ${search}
              OR sc.name ILIKE ${search}
            )
          `
          : sql``}

        ${category
          ? sql`AND c.name = ${category}`
          : sql``}

        ${subcategory
          ? sql`AND sc.name = ${subcategory}`
          : sql``}

      ORDER BY p.id ASC
      LIMIT ${ITEMS_PAGINATION_PAGE}
      OFFSET ${offset}
    `

    return result as Product[]
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch products.")
  }
}




export async function getProductsTotalPages({
  query = "",
  category,
  subcategory,
}: ProductFilters) {

  const search = `%${query}%`

  try {
    const count = await sql`
      SELECT COUNT(*) 
      FROM products p
      INNER JOIN categories c ON p.category = c.id
      INNER JOIN subcategories sc ON p.subcategory = sc.id
      WHERE 
        p.status = true
        AND p.stock > 0

        ${query
          ? sql`
            AND (
              p.title ILIKE ${search}
              OR p.short_description ILIKE ${search}
              OR c.name ILIKE ${search}
              OR sc.name ILIKE ${search}
              OR p.price::text ILIKE ${search}
            )
          `
          : sql``}

        ${category
          ? sql`AND c.name = ${category}`
          : sql``}

        ${subcategory
          ? sql`AND sc.name = ${subcategory}`
          : sql``}
    `

    const total = Number(count[0].count)

    return Math.ceil(total / ITEMS_PAGINATION_PAGE)
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of pages.")
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
      FROM products p
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


export async function getProductsDashboardPages(
  query: string,
  page: number,
  status?: boolean,
  categoryName?: string,
  onlyOutOfStock?: boolean
): Promise<Product[]> {

  const offset = (page - 1) * ITEMS_PAGINATION_PAGE

  const products = await sql`
    SELECT 
      p.id,
      p.title,
      p.short_description,
      p.long_description,
      p.price::numeric AS price,
      (p.price - (p.price * p.discount / 100))::numeric AS final_price,
      p.specifications,
      p.stock,
      p.image_url,
      c.name AS category,
      sc.name AS subcategory,
      p.status,
      p.discount,
      p.created_at
    FROM products p
    INNER JOIN categories c ON p.category = c.id
    INNER JOIN subcategories sc ON p.subcategory = sc.id
    WHERE 1=1

      ${query
        ? sql`AND (
            p.title ILIKE ${'%' + query + '%'} OR
            p.short_description ILIKE ${'%' + query + '%'}
          )`
        : sql``}

      ${status !== undefined
        ? sql`AND p.status = ${status}`
        : sql``}

      ${
        status === true && onlyOutOfStock === true
          ? sql`AND p.stock = 0`
          : sql``
      }

      ${
        status === true && onlyOutOfStock !== true
          ? sql`AND p.stock > 0`
          : sql``
      }

      ${categoryName
        ? sql`AND c.name = ${categoryName}`
        : sql``}

    ORDER BY p.created_at DESC
    LIMIT ${ITEMS_PAGINATION_PAGE}
    OFFSET ${offset}
  `

  return products as Product[]
}

export async function getProductsDashboardTotalCount(
  query: string,
  status?: boolean,
  categoryName?: string,
  onlyOutOfStock?: boolean
): Promise<number> {
  const result = await sql`
    SELECT COUNT(*) AS total
    FROM products p
    INNER JOIN categories c ON p.category = c.id
    WHERE 1=1

      ${query
        ? sql`AND (
            p.title ILIKE ${'%' + query + '%'} OR
            p.short_description ILIKE ${'%' + query + '%'}
          )`
        : sql``}

      ${status !== undefined
        ? sql`AND p.status = ${status}`
        : sql``}

      ${
        status === true && onlyOutOfStock === true
          ? sql`AND p.stock = 0`
          : sql``
      }

      ${
        status === true && onlyOutOfStock !== true
          ? sql`AND p.stock > 0`
          : sql``
      }

      ${categoryName
        ? sql`AND c.name = ${categoryName}`
        : sql``}
  `

  return Number(result[0].total)
}


export async function getProductsDashboardTotalPages(
  query: string,
  status?: boolean,
  categoryName?: string
) {
  const count = await sql`
    SELECT COUNT(*)
    FROM products p
    INNER JOIN categories c ON p.category = c.id
    WHERE 1=1
      ${query
        ? sql`AND (
            p.title ILIKE ${'%' + query + '%'} OR
            p.short_description ILIKE ${'%' + query + '%'}
          )`
        : sql``}
      ${status !== undefined ? sql`AND p.status = ${status}` : sql``}
      ${categoryName
        ? sql`AND c.name = ${categoryName}`
        : sql``}
  `

  return Math.ceil(Number(count[0].count) / ITEMS_PAGINATION_PAGE)
}


export async function getTopFiveOutOfStockProducts(): Promise<Product[]> {
  const products = await sql`
    SELECT 
      p.id,
      p.title,
      p.short_description,
      p.long_description,
      p.price::numeric AS price,
      (p.price - (p.price * p.discount / 100))::numeric AS final_price,
      p.specifications,
      p.stock,
      p.image_url,
      c.name AS category,
      sc.name AS subcategory,
      p.status,
      p.discount,
      p.created_at
    FROM products p
    INNER JOIN categories c ON p.category = c.id
    INNER JOIN subcategories sc ON p.subcategory = sc.id
    WHERE p.stock = 0
      AND p.status = true
    ORDER BY p.created_at DESC
    LIMIT 5
  `

  return products as Product[]
}


export async function getTopFiveOldestProducts(): Promise<Product[]> {
  const products = await sql`
    SELECT 
      p.id,
      p.title,
      p.short_description,
      p.long_description,
      p.price::numeric AS price,
      (p.price - (p.price * p.discount / 100))::numeric AS final_price,
      p.specifications,
      p.stock,
      p.image_url,
      c.name AS category,
      sc.name AS subcategory,
      p.status,
      p.discount,
      p.created_at
    FROM products p
    INNER JOIN categories c ON p.category = c.id
    INNER JOIN subcategories sc ON p.subcategory = sc.id
    WHERE p.status = true
    ORDER BY p.created_at ASC
    LIMIT 5
  `

  return products as Product[]
}

