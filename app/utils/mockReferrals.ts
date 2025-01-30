export interface Referral {
    id: string
    patientName: string
    dateSubmitted: string
    status: "Pending" | "In Progress" | "Completed" | "Cancelled"
    urgencyLevel: "Routine" | "Urgent" | "Emergency"
    specialistType: string
    outcome?: string
    feedback?: string
  }
  
  export const mockReferrals: Referral[] = [
    {
      id: "1",
      patientName: "Stephanie Brown",
      dateSubmitted: "2025-01-25",
      status: "In Progress",
      urgencyLevel: "Urgent",
      specialistType: "Psychiatrist",
      outcome: "Initial assessment completed. Follow-up appointment scheduled.",
      feedback: "Patient shows signs of severe anxiety. Recommend cognitive behavioral therapy.",
    },
    {
      id: "2",
      patientName: "John Doe",
      dateSubmitted: "2025-01-20",
      status: "Completed",
      urgencyLevel: "Routine",
      specialistType: "Cardiologist",
      outcome: "No significant cardiac issues found. Lifestyle changes recommended.",
      feedback: "Suggest follow-up in 6 months for routine check.",
    },
    {
      id: "3",
      patientName: "Jane Smith",
      dateSubmitted: "2025-01-28",
      status: "Pending",
      urgencyLevel: "Emergency",
      specialistType: "Neurologist",
      outcome: "Awaiting initial consultation.",
    },
    {
      id: "4",
      patientName: "Michael Johnson",
      dateSubmitted: "2025-01-15",
      status: "Cancelled",
      urgencyLevel: "Routine",
      specialistType: "Dermatologist",
      outcome: "Patient cancelled the appointment.",
    },
    {
      id: "5",
      patientName: "Emily Davis",
      dateSubmitted: "2025-01-22",
      status: "In Progress",
      urgencyLevel: "Urgent",
      specialistType: "Oncologist",
      outcome: "Initial tests conducted. Awaiting results for further diagnosis.",
    },
  ]
  
  