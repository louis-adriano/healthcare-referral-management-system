import { notFound } from "next/navigation"

export default function TermsOfUse() {
  const isError = false // Replace with actual error check

  if (isError) {
    notFound() // or display a custom error message
  }
  const lastUpdated = "2025-02-03" // Update this date when changes are made

  return (
    <div className="ml-6 mr-12 py-4 mt-4 mb-4">
      <h1 className="text-2xl font-bold mb-4">Terms of Use</h1>
      <p className="text-sm text-gray-500 mb-4">Last Updated: {lastUpdated}</p>
      <p>By submitting the referral form, you agree to the following terms and conditions:</p>
      <br></br>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1.	Purpose of Referral</h2>
        <p>This referral form is intended to facilitate the transfer of patient information 
          for medical consultation, treatment, or further assessment by a specialist. 
          By completing this form, you consent to the sharing of necessary health 
          information between the referring GP and the specialist.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2.	Patient Consent</h2>
        <p>Before submitting the referral, the GP confirms that the patient has given 
          explicit consent to share their personal and medical information as outlined 
          in this referral form. The patient understands that their data will be used for 
          the purpose of medical care and will be handled in accordance with applicable 
          privacy regulations.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3.	Confidentiality</h2>
        <p>All information provided in the referral form, including personal, medical, 
          and contact details, is confidential and will be used solely for the purpose of referral. 
          This information will not be disclosed to any third parties without the patient&rsquo;s 
          consent unless required by law or for medical purposes.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4.	Accuracy of Information</h2>
        <p>The GP is responsible for ensuring that the information provided in this referral 
          form is accurate and up to date. Inaccurate or incomplete information may delay 
          the referral process or lead to improper treatment.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5.	Referrals for Medical Treatment</h2>
        <p>The referral form should only be used for referring patients for appropriate 
          medical treatment, diagnosis, or specialist consultations. 
          Any referral for non-medical purposes is prohibited.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6.	Data Protection and Privacy</h2>
        <p>Patient data submitted through the referral form is subject to strict privacy 
          and data protection policies, in compliance with relevant healthcare privacy 
          regulations, HIPAA.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7.	Changes to Terms</h2>
        <p>The referring GP reserves the right to modify or update these terms at any time. 
          Any changes will be communicated and must be accepted before submitting any further 
          referral forms.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Acknowledgment </h2>
        <p>By submitting this referral form, I confirm that I have read and understood 
          the terms of use provided. I acknowledge that I am providing accurate information and 
          consent to the sharing of relevant patient data for the purpose of medical referral and 
          treatment, in accordance with applicable privacy laws and regulations.</p>
      </section>
    </div>
  )
}

