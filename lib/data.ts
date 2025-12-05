// app/actions.ts
"use server";
import { neon } from '@neondatabase/serverless';
import { Product } from './definitions';

const sqlDb = `${process.env.DATABASE_URL}`

const sql = neon(sqlDb);


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

export async function getProductsByCategory(categoryName: string): Promise<Product[]> {
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
    ORDER BY p.id ASC
  `;

  return result as Product[];
}

export async function getProductsBySubcategory(subcategoryName: string): Promise<Product[]> {
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
    ORDER BY p.id ASC
  `;

  return result as Product[];
}

export async function getProductById(product_id: string): Promise<Product []> {
    
    try {
        const response = await sql`
            SELECT 
                p.id,
                p.title,
                p.short_Description, 
                p.long_Description,
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

            WHERE p.id = ${product_id}::uuid 
        `;

        return response as Product[] ; 

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product by ID.');
    }
}



const ITEMS_PER_PAGE = 12; // Cambialo según tu diseño

// Versión paginada: getProductsPages(page: number)
export async function getProductsPages(page: number = 1) {
  const offset = (page - 1) * ITEMS_PER_PAGE;

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
      WHERE p.status = true
        AND p.stock > 0
      ORDER BY p.id ASC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;

    return response as Product[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch paginated products.");
  }
}

// Función para saber cuántas páginas hay
export async function getProductsTotalPages() {
  try {
    const count = await sql`
      SELECT COUNT(*) 
      FROM products2
      WHERE status = true
        AND stock > 0
    `;

    const total = Number(count[0].count);
    return Math.ceil(total / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of pages.");
  }
}