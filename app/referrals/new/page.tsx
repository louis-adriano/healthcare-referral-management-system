import { PatientReferralForm } from "@/app/components/PatientReferralForm"

export default function NewReferralPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">New Patient Referral</h1>
      <PatientReferralForm />
    </div>
  )
}

