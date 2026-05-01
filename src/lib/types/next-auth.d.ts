/* eslint-disable @typescript-eslint/no-empty-object-type */
import { AuthUser } from "./auth";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }

  interface User extends AuthUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends AuthUser {}
}
