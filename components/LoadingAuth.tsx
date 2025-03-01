import { Loader2 } from "lucide-react"

export function LoadingAuth() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">Verifying authentication...</p>
      </div>
    </div>
  )
}

