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
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
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
};
