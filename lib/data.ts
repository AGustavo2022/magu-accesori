// app/actions.ts
"use server";
import { neon } from '@neondatabase/serverless';
import { Product } from './types/definitions';
import { ITEMS_PER_PAGE, ITEMS_PER_PAGECAT } from './data/product.data';

const sqlDb = `${process.env.DATABASE_URL}`

export const sql = neon(sqlDb);


export async function getCategoryAll() {
    
    try {
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
            GROUP BY c.id, c.name, c.description
            ORDER BY c.id;
        `;

        return response; 

    } catch (error) {
        // Manejo de errores conciso
        console.error('Database Error:', error);
        throw new Error('Failed to fetch categories with subcategories.');
    }
}

export async function getCategoryTotalPages(
  categoryName: string
): Promise<number> {

  const result = await sql`
    SELECT COUNT(*) AS count
    FROM products2 p
    INNER JOIN categories c ON p.category = c.id
    WHERE c.name = ${categoryName}
      AND p.status = true
      AND p.stock > 0
  `;

  const totalItems = Number(result[0]?.count) || 0;
  return Math.ceil(totalItems / ITEMS_PER_PAGECAT);
}


const ITEMS_PER_PAGESUB = 12; // mismo valor que usás arriba

export async function getProductsBySubcategory(
  subcategoryName: string,
  page: number = 1
): Promise<Product[]> {
  const offset = (page - 1) * ITEMS_PER_PAGESUB;

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
        p.created_at
      FROM products2 p
      INNER JOIN categories c ON p.category = c.id
      INNER JOIN subcategories sc ON p.subcategory = sc.id
      WHERE sc.name = ${subcategoryName}
        AND p.status = true
        AND p.stock > 0
      ORDER BY p.id ASC
      LIMIT ${ITEMS_PER_PAGESUB}
      OFFSET ${offset};
    `;

    return result as Product[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch paginated subcategory products.");
  }
}

export async function getSubcategoryTotalPages(
  subcategoryName: string
): Promise<number> {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM products2 p
      INNER JOIN subcategories sc ON p.subcategory = sc.id
      WHERE sc.name = ${subcategoryName}
        AND p.status = true
        AND p.stock > 0
    `;

    const total = Number(count[0].count);
    return Math.ceil(total / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total pages for subcategory.");
  }
}

