import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userrole: 'Client' | 'Freelancer';
      avatarColor?: string | null;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    userrole: 'Client' | 'Freelancer';
    avatarColor?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userrole: 'Client' | 'Freelancer';
    avatarColor?: string | null;
  }
}
