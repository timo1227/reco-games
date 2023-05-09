import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import { db } from "@/lib/db";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/Login",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // Connect to database
        await dbConnect();
        // Find user in database with email address
        const user = await User.findOne({ email: credentials?.email });

        // Email not found
        if (!user) {
          throw new Error("Email not found");
        }

        // Check the hashed password against the plain text password
        const isValid = await compare(
          credentials!.password,
          user.hashedPassword
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return user object
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        // session.user!.id = token.id
        session.user!.name = token.name;
        session.user!.email = token.email;
        session.user!.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      await dbConnect();

      const dbUser = await User.findOne({ email: user.email });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser._id,
        name: dbUser.username,
        email: dbUser.email,
        image: dbUser.image,
      };
    },
  },
};
