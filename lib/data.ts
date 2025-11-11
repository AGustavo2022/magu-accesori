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
  id,
  title,
  short_description,
  long_description,
  price,
  stock,
  image_url,
  category,
  subcategory,
  status,
  discount,
  created_at
    FROM products2
    ORDER BY id ASC
  `;
    // console.log(response)
    return response as Product[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
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
