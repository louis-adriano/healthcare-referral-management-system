"use client"

import { useState } from "react"
import { mockReferrals, type Referral } from "@/app/lib/mockReferrals"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Bell } from "lucide-react"

export default function ReferralOutcomesPage() {
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals)
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null)
  const [sortBy, setSortBy] = useState<"patientName" | "dateSubmitted" | "status">("dateSubmitted")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterDateRange, setFilterDateRange] = useState<{ start: string; end: string }>({ start: "", end: "" })

  const sortedReferrals = [...referrals].sort((a, b) => {
    if (sortBy === "patientName") return a.patientName.localeCompare(b.patientName)
    if (sortBy === "dateSubmitted") return new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime()
    return a.status.localeCompare(b.status)
  })

  const filteredReferrals = sortedReferrals.filter((referral) => {
    if (filterStatus !== "all" && referral.status !== filterStatus) return false
    if (filterDateRange.start && new Date(referral.dateSubmitted) < new Date(filterDateRange.start)) return false
    if (filterDateRange.end && new Date(referral.dateSubmitted) > new Date(filterDateRange.end)) return false
    return true
  })

  const handleStatusChange = (referralId: string, newStatus: Referral["status"]) => {
    setReferrals(referrals.map((ref) => (ref.id === referralId ? { ...ref, status: newStatus } : ref)))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Referral Outcomes</h1>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </div>

      {!selectedReferral ? (
        <>
          <div className="mb-4 flex flex-wrap gap-4">
            <Select onValueChange={(value) => setSortBy(value as typeof sortBy)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patientName">Patient Name</SelectItem>
                <SelectItem value="dateSubmitted">Date Submitted</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              placeholder="Start Date"
              onChange={(e) => setFilterDateRange({ ...filterDateRange, start: e.target.value })}
              className="w-[180px]"
            />
            <Input
              type="date"
              placeholder="End Date"
              onChange={(e) => setFilterDateRange({ ...filterDateRange, end: e.target.value })}
              className="w-[180px]"
            />
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgency
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReferrals.map((referral) => (
                  <tr
                    key={referral.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedReferral(referral)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{referral.patientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{referral.dateSubmitted}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          referral.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : referral.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : referral.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          referral.urgencyLevel === "Emergency"
                            ? "bg-red-100 text-red-800"
                            : referral.urgencyLevel === "Urgent"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {referral.urgencyLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <Button variant="ghost" onClick={() => setSelectedReferral(null)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
          </Button>
          <h2 className="text-xl font-semibold mb-4">{selectedReferral.patientName}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Date Submitted</p>
              <p>{selectedReferral.dateSubmitted}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Urgency Level</p>
              <p>{selectedReferral.urgencyLevel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <Select
                onValueChange={(value) => handleStatusChange(selectedReferral.id, value as Referral["status"])}
                defaultValue={selectedReferral.status}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Outcome</p>
            <p>{selectedReferral.outcome || "No outcome recorded yet."}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Feedback</p>
            <p>{selectedReferral.feedback || "No feedback provided yet."}</p>
          </div>
        </div>
      )}
    </div>
  )
}

