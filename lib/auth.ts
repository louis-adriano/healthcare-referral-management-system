import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const isDev = process.env.NODE_ENV === "development"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, account }) {
      // Remove unused 'profile' parameter
      if (isDev) console.log("[Auth] JWT callback:", { token, account })
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      if (isDev) console.log("[Auth] Session callback:", { session, token })
      if (session.user) {
        session.accessToken = token.accessToken as string
        session.provider = token.provider as string
      }
      return session
    },
  },
  events: {
    async signIn(message) {
      if (isDev) console.log("[Auth] User signed in:", message)
    },
    async signOut(message) {
      if (isDev) console.log("[Auth] User signed out:", message)
    },
    async createUser(message) {
      if (isDev) console.log("[Auth] User created:", message)
    },
    async linkAccount(message) {
      if (isDev) console.log("[Auth] Account linked:", message)
    },
    async session(message) {
      if (isDev) console.log("[Auth] Session updated:", message)
    },
  },
  logger: {
    error(code, metadata) {
      console.error("[Auth] Error:", { code, metadata })
    },
    warn(code) {
      if (isDev) console.warn("[Auth] Warning:", code)
    },
    debug(code, metadata) {
      if (isDev) console.debug("[Auth] Debug:", { code, metadata })
    },
  },
  debug: isDev,
}

