//todo: (1) Create callbacks for signin, signout and signup methods

import axios from "axios";
import { JWT, NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user, account}) {
      if (account?.provider === 'google') {
        const userExists = await axios.get(`/api/user/exists?email=${user.email}`);
        if (!userExists.data.success) {
          return false;
        }
        if (userExists.data.exists) {
          return true;
        } else {
          const newUser = await axios.post('/api/user/create', { username: user.name, email: user.email });
          if (!newUser.data.success) {
            return false;
          }
          return true;
        }
      } 
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        const response = await axios.get(`/api/user/details?email=${user.email}`);
        if (response.data.success) {
          const mongoUser = response.data.user;
          token.username = mongoUser.username;
          token.isAnonymous = mongoUser.isAnonymous;
          token.cyclingUsernames = mongoUser?.cyclingUsernames;
          token.wallet = mongoUser.wallet; 
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session, token: JWT}) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.isAnonymous = token.isAnonymous;
        session.user.cyclingUsernames = token.cyclingUsernames || [];
        session.user.wallet = token.wallet;
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