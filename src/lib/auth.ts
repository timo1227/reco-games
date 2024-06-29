import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'

import { db } from '@/lib/db'

import { sendVerificationRequest } from './auth-send-request'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/login',
  },
  providers: [
    Resend({
      from: 'no-reply@timsserver.com',
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        await sendVerificationRequest({
          identifier: email,
          url,
          provider: { server, from },
        })
      },
    }),
    Google,
  ],
  // debug: true,
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      }
    },
  },
})
