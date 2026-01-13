import { sql } from "../db/db";
import { User } from "../types/user.types";


export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql`
      SELECT * FROM users
      WHERE LOWER(email) = LOWER(${email})
      LIMIT 1
    `;
    return user[0] as User | undefined;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
