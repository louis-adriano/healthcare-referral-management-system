import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
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

