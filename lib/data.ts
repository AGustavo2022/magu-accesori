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

  try {
    // We artificially delay a response for demo purposes.
    // Don't do this in production :)
    console.log('Fetching revenue data...');
    
    await new Promise((resolve) => setTimeout(resolve, 3000));

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
   console.log('Data fetch completed after 3 seconds.');
 
    return response as Product[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function getProductos2() {

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
    console.log(response)
    return response as Product[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
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
