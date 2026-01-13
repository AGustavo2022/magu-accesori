import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { sql } from './lib/db/db';
import { User } from './lib/types/user.types';

async function getUser(email: string): Promise<User | undefined> {
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
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log(`Usuario: ${user}`)
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
           if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});