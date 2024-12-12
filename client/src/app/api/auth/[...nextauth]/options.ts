//todo: (1) Create callbacks for signin, signout and signup methods

import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import axios from "axios";
import { JWT, NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const baseURL = "http://localhost:3000"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
    })
  ],
  callbacks: {
    async signIn({ user, account}) {
      if (account?.provider === 'google') {
        try {
          await dbConnect();

          const existingUser = await UserModel.findOne({ email: user.email });

          if (!existingUser) {
            //? Create new user
            const name = (user?.name?.length ?? 0) > 20 ? user.name?.slice(0, 19) : user.name;
            const newUser = new UserModel({
              username: name,
              email: user.email,
              isAnonymous: true,
              cyclingUsernames: [name],
              wallet: 0,
              auctionsHosted: [],
              auctionsJoined: [],
              productsOwned: [],
              dailyLoginBonusClaimed: false,
            })

            await newUser.save();

            return true;
          } else {
            return true;
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      } 
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        const response = await axios.get(`${baseURL}/api/user/details?email=${user.email}`);
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
    signIn: '/login',
    error: '/error'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}