import { sql } from '../db/db';


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


