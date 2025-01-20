import { PatientReferralForm } from "./components/PatientReferralForm"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Referral Form</h1>
      <PatientReferralForm />
    </div>
  )
}

