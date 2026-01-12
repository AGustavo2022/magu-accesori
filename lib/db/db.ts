// lib/db.ts
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // Asegurate de tener esta env var
//   ssl: { rejectUnauthorized: false }, // Necesario para Neon
// });

// export default pool;



import { neon } from '@neondatabase/serverless';

const sqlDb = `${process.env.DATABASE_URL}`

export const sql = neon(sqlDb);
