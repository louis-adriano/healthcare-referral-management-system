import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

const isDevelopment = process.env.NODE_ENV === "development"

export default withAuth(
  function middleware(req) {
    const isAuthPage = req.nextUrl.pathname.startsWith("/login")
    const isAuthed = !!req.nextauth.token

    if (isDevelopment) {
      console.log("[Middleware] Path:", req.nextUrl.pathname)
      console.log("[Middleware] Auth status:", isAuthed ? "Authenticated" : "Not authenticated")
    }

    // Handle auth page access
    if (isAuthPage) {
      if (isAuthed) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      return null
    }

    // All other routes are protected by default
    if (!isAuthed) {
      const url = new URL("/login", req.url)
      url.searchParams.set("callbackUrl", encodeURI(req.url))
      return NextResponse.redirect(url)
    }

    return null
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        const isAuthorized = !!token
        if (isDevelopment) {
          console.log("[Middleware] Authorization check:", isAuthorized)
        }
        return isAuthorized
      },
    },
    pages: {
      signIn: "/login",
      error: "/login",
    },
  },
)

export const config = {
  matcher: ["/login", "/referrals/:path*", "/dashboard", "/api/auth/:path*"],
}

