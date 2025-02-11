"use client"

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GoogleButton } from "@/components/ui/GoogleButton"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

type LoginData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<{
    google: boolean
    credentials: boolean
  }>({
    google: false,
    credentials: false,
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam) {
      setError(errorParam)
    }
  }, [searchParams])

  const onSubmit = async () => {
    setIsLoading((prev) => ({ ...prev, credentials: true }))
    toast({
      title: "Login Attempt",
      description: "Email/password login is not implemented in this demo.",
    })
    setIsLoading((prev) => ({ ...prev, credentials: false }))
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, google: true }))
      setError(null)
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
        toast({
          title: "Authentication Error",
          description: "Failed to sign in with Google. Please try again.",
          variant: "destructive",
        })
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Unexpected error occurred")
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, google: false }))
    }
  }

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "AccessDenied":
        return "Access denied. Please try again."
      case "Verification":
        return "The sign in link is no longer valid. It may have been used already or it may have expired."
      case "Configuration":
        return "There is a problem with the server configuration. Please contact support."
      case "invalid_client":
        return "Invalid client credentials. Please contact support."
      default:
        return "An error occurred during sign in. Please try again."
    }
  }

  return (
    <div className="fixed inset-0 flex w-full h-full bg-gray-100">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 overflow-y-auto">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Healthcare Referral System</h1>
            <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{getErrorMessage(error)}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            <GoogleButton onClick={handleGoogleSignIn} className="w-full" disabled={isLoading.google}>
              {isLoading.google ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in with Google"
              )}
            </GoogleButton>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                  disabled={isLoading.credentials}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                  className={`mt-1 ${errors.password ? "border-red-500" : ""}`}
                  disabled={isLoading.credentials}
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primary/90">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading.credentials}>
                {isLoading.credentials ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="max-w-2xl text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Streamline Your Medical Referrals</h2>
              <p className="text-lg">A secure and efficient way to manage patient referrals and track their progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

