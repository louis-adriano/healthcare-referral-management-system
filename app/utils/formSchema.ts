import { z } from "zod"

const phoneRegex = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/

export const FormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date format",
  }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Australian phone number"),
  address: z.string().min(1, "Address is required"),
  reasonForReferral: z.string().min(1, "Reason for referral is required"),
  urgencyLevel: z.enum(["Routine", "Urgent", "Emergency"], {
    required_error: "Urgency level is required",
  }),
  clinicalNotes: z.string().optional(),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: "You must confirm patient consent",
  }),
})

export type FormData = z.infer<typeof FormSchema>

