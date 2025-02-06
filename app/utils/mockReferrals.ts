export interface Referral {
  id: string
  patientName: string
  email: string
  phoneNumber: string
  address: string
  medicareNumber: string
  dateOfBirth: string
  gender: string
  dateSubmitted: string
  status: "Pending" | "In Progress" | "Completed" | "Cancelled"
  urgencyLevel: "Routine" | "Urgent" | "Emergency"
  reasonForReferral: string
  clinicalNotes: string
  outcome?: string
  feedback?: string
}

export const mockReferrals: Referral[] = [
  {
    id: "1",
    patientName: "Stephanie Brown",
    email: "stephanie.brown@example.com",
    phoneNumber: "0451234567",
    address: "42 Mental Health Ave, Richmond VIC, Australia",
    medicareNumber: "2123456789",
    dateOfBirth: "1990-05-10",
    gender: "Female",
    dateSubmitted: "2025-01-25",
    status: "In Progress",
    urgencyLevel: "Urgent",
    reasonForReferral: "Severe anxiety and depression symptoms requiring immediate psychiatric evaluation",
    clinicalNotes:
      "Patient reports difficulty sleeping, loss of appetite, and frequent panic attacks. Consider medication options.",
    outcome: "Initial assessment completed. Follow-up appointment scheduled.",
    feedback: "Patient shows signs of severe anxiety. Recommend cognitive behavioral therapy.",
  },
  {
    id: "2",
    patientName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "0452345678",
    address: "15 Heart Street, Carlton VIC, Australia",
    medicareNumber: "3987654321",
    dateOfBirth: "1975-11-22",
    gender: "Male",
    dateSubmitted: "2025-01-20",
    status: "Completed",
    urgencyLevel: "Routine",
    reasonForReferral: "Annual cardiac check-up",
    clinicalNotes:
      "Patient's blood pressure slightly elevated. Recommend diet modifications and increased physical activity.",
    outcome: "No significant cardiac issues found. Lifestyle changes recommended.",
    feedback: "Suggest follow-up in 6 months for routine check.",
  },
  {
    id: "3",
    patientName: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "0453456789",
    address: "78 Neuro Lane, Box Hill VIC, Australia",
    medicareNumber: "1122334455",
    dateOfBirth: "1985-03-15",
    gender: "Female",
    dateSubmitted: "2025-01-28",
    status: "Pending",
    urgencyLevel: "Emergency",
    reasonForReferral: "Sudden onset of severe headache and vision changes",
    clinicalNotes:
      "Patient reports worst headache of life. Conduct immediate neurological examination and consider CT scan.",
    outcome: "Awaiting initial consultation.",
  },
  {
    id: "4",
    patientName: "Michael Johnson",
    email: "michael.johnson@example.com",
    phoneNumber: "0454567890",
    address: "91 Dermatology Road, Kew VIC, Australia",
    medicareNumber: "6677889900",
    dateOfBirth: "1960-07-08",
    gender: "Male",
    dateSubmitted: "2025-01-15",
    status: "Cancelled",
    urgencyLevel: "Routine",
    reasonForReferral: "Persistent skin rash not responding to over-the-counter treatments",
    clinicalNotes: "Patient described rash as itchy and spreading. Consider allergy testing if rescheduled.",
    outcome: "Patient cancelled the appointment.",
  },
  {
    id: "5",
    patientName: "Emily Davis",
    email: "emily.davis@example.com",
    phoneNumber: "0455678901",
    address: "123 Oncology Street, Hawthorn VIC, Australia",
    medicareNumber: "9988776655",
    dateOfBirth: "1995-09-28",
    gender: "Female",
    dateSubmitted: "2025-01-22",
    status: "In Progress",
    urgencyLevel: "Urgent",
    reasonForReferral: "Abnormal mammogram results requiring further investigation",
    clinicalNotes: "Mammogram showed suspicious mass in left breast. Scheduled for biopsy next week.",
    outcome: "Initial tests conducted. Awaiting results for further diagnosis.",
  },
]

