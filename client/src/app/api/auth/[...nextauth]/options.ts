//todo: (1) Create callbacks for signin, signout and signup methods

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      //? This assigns all the properties of user to token
      if (user) {
        // token.email = user.email;
      }

      return token
    },
    async session({ session, token }) {
      //? This assigns all the properties of token to a user object in session
      if (token) {
        // session.user.email = token.email;
      }

      return session
    },
  },
  pages: {
    newUser: '/signup',
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}