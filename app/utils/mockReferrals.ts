export interface Referral {
    id: string
    patientName: string
    dateSubmitted: string
    status: "Pending" | "In Progress" | "Completed" | "Cancelled"
    urgencyLevel: "Routine" | "Urgent" | "Emergency"
    reasonForReferral: string
    outcome?: string
    feedback?: string
    clinicalNotes?: string
  }
  
  export const mockReferrals: Referral[] = [
    {
      id: "1",
      patientName: "Stephanie Brown",
      dateSubmitted: "2025-01-25",
      status: "In Progress",
      urgencyLevel: "Urgent",
      reasonForReferral: "Severe anxiety and depression symptoms requiring immediate psychiatric evaluation",
      outcome: "Initial assessment completed. Follow-up appointment scheduled.",
      feedback: "Patient shows signs of severe anxiety. Recommend cognitive behavioral therapy.",
      clinicalNotes:
        "Patient reports difficulty sleeping, loss of appetite, and frequent panic attacks. Consider medication options.",
    },
    {
      id: "2",
      patientName: "John Doe",
      dateSubmitted: "2025-01-20",
      status: "Completed",
      urgencyLevel: "Routine",
      reasonForReferral: "Annual cardiac check-up",
      outcome: "No significant cardiac issues found. Lifestyle changes recommended.",
      feedback: "Suggest follow-up in 6 months for routine check.",
      clinicalNotes:
        "Patient's blood pressure slightly elevated. Recommend diet modifications and increased physical activity.",
    },
    {
      id: "3",
      patientName: "Jane Smith",
      dateSubmitted: "2025-01-28",
      status: "Pending",
      urgencyLevel: "Emergency",
      reasonForReferral: "Sudden onset of severe headache and vision changes",
      outcome: "Awaiting initial consultation.",
      clinicalNotes:
        "Patient reports worst headache of life. Conduct immediate neurological examination and consider CT scan.",
    },
    {
      id: "4",
      patientName: "Michael Johnson",
      dateSubmitted: "2025-01-15",
      status: "Cancelled",
      urgencyLevel: "Routine",
      reasonForReferral: "Persistent skin rash not responding to over-the-counter treatments",
      outcome: "Patient cancelled the appointment.",
      clinicalNotes: "Patient described rash as itchy and spreading. Consider allergy testing if rescheduled.",
    },
    {
      id: "5",
      patientName: "Emily Davis",
      dateSubmitted: "2025-01-22",
      status: "In Progress",
      urgencyLevel: "Urgent",
      reasonForReferral: "Abnormal mammogram results requiring further investigation",
      outcome: "Initial tests conducted. Awaiting results for further diagnosis.",
      clinicalNotes: "Mammogram showed suspicious mass in left breast. Scheduled for biopsy next week.",
    },
  ]
  
  