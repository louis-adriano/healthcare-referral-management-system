"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LoadingAuth } from "@/components/LoadingAuth"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <LoadingAuth />
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-2">Submit Referral</h2>
          <p className="text-muted-foreground mb-4">Create and submit new referrals quickly and securely.</p>
          <Button asChild>
            <Link href="/referrals/new">New Referral</Link>
          </Button>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-2">View Referrals</h2>
          <p className="text-muted-foreground mb-4">Access and manage your submitted referrals.</p>
          <Button asChild>
            <Link href="/referrals">View Referrals</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

