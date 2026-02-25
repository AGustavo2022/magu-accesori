import { sql } from '../db/db';
import { Category } from '../types/definitions';

export async function getCategoryAll() {
  try {
    const response = await sql`
      SELECT 
        c.id AS category_id,
        c.name AS category_name,
        c.description,
        COALESCE(
          jsonb_agg(
            jsonb_build_object(
              'subcategory_id', s.id,
              'subcategory_name', s.name
            )
            ORDER BY s.id
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'::jsonb
        ) AS subcategories
      FROM categories c
      LEFT JOIN subcategories s 
        ON s.category_id = c.id
      GROUP BY c.id
      ORDER BY c.id;
    `;

    return response as Category[];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories with subcategories.');
  }
}

