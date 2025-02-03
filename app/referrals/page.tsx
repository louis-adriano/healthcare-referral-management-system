import { Suspense } from "react"
import ReferralsContent from "./referrals-content"
import { Skeleton } from "@/components/ui/skeleton"

export default function ReferralsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-10" />
          </div>
          <div className="mb-4 flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      }
    >
      <ReferralsContent />
    </Suspense>
  )
}

