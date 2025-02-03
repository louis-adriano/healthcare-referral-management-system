"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { mockReferrals, type Referral } from "@/app/utils/mockReferrals"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, ArrowLeft, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "../context/notifications-context"
import { v4 as uuidv4 } from "uuid"

export default function ReferralsContent() {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterDateRange, setFilterDateRange] = useState<{ start: string; end: string }>({ start: "", end: "" })
  const [sortBy, setSortBy] = useState<string>("dateDesc")
  const [showJson, setShowJson] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { dispatch } = useNotifications()
  const searchParams = useSearchParams()
  const selectedId = searchParams.get("id")

  useEffect(() => {
    const loadReferrals = () => {
      const storedReferrals: Referral[] = JSON.parse(localStorage.getItem("referrals") || "[]")
      const allReferrals = [...storedReferrals, ...mockReferrals]
      const uniqueReferrals = allReferrals.reduce((acc: Referral[], current) => {
        const x = acc.find((item) => item.id === current.id)
        if (!x) {
          return acc.concat([current])
        } else {
          return acc
        }
      }, [])
      setReferrals(uniqueReferrals)
    }

    loadReferrals()
    window.addEventListener("storage", loadReferrals)

    return () => {
      window.removeEventListener("storage", loadReferrals)
    }
  }, [])

  useEffect(() => {
    if (selectedId) {
      const referral = referrals.find((r) => r.id === selectedId)
      if (referral) {
        setSelectedReferral(referral)
      }
    }
  }, [selectedId, referrals])

  const filteredReferrals = referrals
    .filter((referral) => {
      const matchesSearch = referral.patientName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === "all" || referral.status === filterStatus
      const matchesDateRange =
        (!filterDateRange.start || new Date(referral.dateSubmitted) >= new Date(filterDateRange.start)) &&
        (!filterDateRange.end || new Date(referral.dateSubmitted) <= new Date(filterDateRange.end))
      return matchesSearch && matchesStatus && matchesDateRange
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "nameAsc":
          return a.patientName.localeCompare(b.patientName)
        case "nameDesc":
          return b.patientName.localeCompare(a.patientName)
        case "dateAsc":
          return new Date(a.dateSubmitted).getTime() - new Date(b.dateSubmitted).getTime()
        case "dateDesc":
        default:
          return new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime()
      }
    })

  const handleStatusChange = (referralId: string, newStatus: Referral["status"]) => {
    setReferrals(
      referrals.map((ref) => {
        if (ref.id === referralId) {
          const updatedRef = { ...ref, status: newStatus }
          toast({
            title: "Referral Status Updated",
            description: `Status changed to ${newStatus} for ${ref.patientName}`,
          })

          // Create notification for status update
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: uuidv4(),
              message: `Status updated to ${newStatus} for ${ref.patientName}'s referral`,
              timestamp: new Date().toISOString(),
              read: false,
              type: "status_update",
              referralId: ref.id,
            },
          })

          return updatedRef
        }
        return ref
      }),
    )
  }

  const handleDialogClose = () => {
    setSelectedReferral(null)
    setShowJson(false)
  }

  const handleCopyJson = () => {
    if (selectedReferral) {
      navigator.clipboard.writeText(JSON.stringify(selectedReferral, null, 2))
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Referrals</h1>
        <Button variant="outline" size="icon" onClick={() => router.push("/referrals/new")}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm">
        <Input
          type="text"
          placeholder="Search patients"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[200px]"
        />

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

        <Select onValueChange={setSortBy} defaultValue="dateDesc">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nameAsc">Name (A-Z)</SelectItem>
            <SelectItem value="nameDesc">Name (Z-A)</SelectItem>
            <SelectItem value="dateAsc">Date (Oldest first)</SelectItem>
            <SelectItem value="dateDesc">Date (Newest first)</SelectItem>
          </SelectContent>
        </Select>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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

      <Dialog open={!!selectedReferral} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex items-center relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0 absolute left-0"
                onClick={() => setSelectedReferral(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="flex-1 text-center">Referral Details</DialogTitle>
            </div>
          </DialogHeader>
          {selectedReferral && (
            <>
              <div className="max-h-[60vh] overflow-y-auto pr-2">
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Patient Name</p>
                      <p className="mt-1">{selectedReferral.patientName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <Select
                        onValueChange={(value) => handleStatusChange(selectedReferral.id, value as Referral["status"])}
                        defaultValue={selectedReferral.status}
                      >
                        <SelectTrigger className="mt-1">
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
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date Submitted</p>
                      <p className="mt-1">{selectedReferral.dateSubmitted}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Urgency Level</p>
                      <p className="mt-1">{selectedReferral.urgencyLevel}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Reason for Referral</p>
                    <p className="mt-1">{selectedReferral.reasonForReferral || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Clinical Notes</p>
                    <p className="mt-1">{selectedReferral.clinicalNotes || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Outcome</p>
                    <p className="mt-1">{selectedReferral.outcome || "No outcome recorded yet."}</p>
                  </div>
                  {selectedReferral.feedback && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Feedback</p>
                      <p className="mt-1">{selectedReferral.feedback}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 flex items-center space-x-2">
                <Button variant="default" onClick={() => setShowJson(!showJson)}>
                  {showJson ? "Hide JSON" : "View JSON"}
                </Button>
                {showJson && (
                  <Button variant="outline" size="sm" className="flex items-center space-x-1" onClick={handleCopyJson}>
                    <Copy className="h-4 w-4" />
                    <span>{copyFeedback ? "Copied!" : "Copy JSON"}</span>
                  </Button>
                )}
              </div>
              {showJson && (
                <div className="mt-4">
                  <textarea
                    readOnly
                    className="w-full h-48 p-2 text-sm font-mono bg-gray-100 border rounded resize-none"
                    value={JSON.stringify(selectedReferral, null, 2)}
                  />
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

