import { notFound } from "next/navigation"

export default function TermsOfUse() {
  const isError = false // Replace with actual error check

  if (isError) {
    notFound() // or display a custom error message
  }
  const lastUpdated = "2025-02-03" // Update this date when changes are made

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Terms of Use</h1>
      <p className="text-sm text-gray-500 mb-4">Last Updated: {lastUpdated}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Rules and Responsibilities</h2>
        <ul className="list-disc pl-6">
          <li>You are responsible for maintaining the confidentiality of patient data.</li>
          <li>Do not share your login credentials with others.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User Responsibilities</h2>
        <ul className="list-disc pl-6">
          <li>Users must ensure their login credentials are kept secure.</li>
          <li>Users must not share patient data without consent.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Data Security</h2>
        <p>We take data security seriously and comply with all relevant regulations.</p>
      </section>
    </div>
  )
}

