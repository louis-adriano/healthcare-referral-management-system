"use client"

import { SessionProvider } from "next-auth/react"
import type React from "react"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

const isDevelopment = process.env.NODE_ENV === "development"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  useEffect(() => {
    if (error) {
      const errorMessage = (() => {
        switch (error) {
          case "AccessDenied":
            return "You do not have permission to access this resource."
          case "Verification":
            return "The sign in link is no longer valid."
          case "Configuration":
            return isDevelopment
              ? "There is a problem with the server configuration."
              : "An authentication error occurred."
          case "AccessToken":
            return "Failed to retrieve access token."
          default:
            return "There was a problem with authentication."
        }
      })()

      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      })

      if (isDevelopment) {
        console.error("[Auth] Error:", error)
      }
    }
  }, [error, toast])

  return <SessionProvider>{children}</SessionProvider>
}

