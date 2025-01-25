import { PatientReferralForm } from "./components/PatientReferralForm"

export default function Home() {
  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Patient Referral Form</h1>
        <PatientReferralForm />
      </div>
    </div>
  )
}

