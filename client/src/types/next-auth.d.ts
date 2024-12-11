import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    username?: string;
    email?: string;
    isAnonymous?: boolean;
    cyclingUsernames?: [string];
    wallet?: number;
  }
  interface JWT {
    username?: string;
    email?: string | null;
    isAnonymous?: boolean;
    cyclingUsernames?: [string];
    wallet?: number;
  }
  interface Session {
    user: {
      username?: string;
      email?: string | null;
      isAnonymous?: boolean;
      cyclingUsernames?: string[];
      wallet?: number;
    } & DefaultSession["user"];
  }
}
