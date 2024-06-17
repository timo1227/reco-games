import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

import { db } from '@/lib/db'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/login',
  },
  providers: [Google],
  // debug: true,
})
