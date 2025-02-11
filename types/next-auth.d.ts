import type { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string
    provider?: string
  }

  interface User extends DefaultUser {
    provider?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    provider?: string
  }
}

