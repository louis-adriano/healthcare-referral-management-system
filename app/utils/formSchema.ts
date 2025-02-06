import { z } from "zod"

const phoneRegex = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/
const medicareRegex = /^[2-6]\d{9}$/

export const FormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date format",
  }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Australian phone number"),
  address: z
    .string()
    .min(1, "Address is required")
    .regex(/^.+, .+ [A-Z]{2,3}, Australia$/, "Invalid address format"),
  medicareNumber: z.string().regex(medicareRegex, "Invalid Medicare number (should be 10 digits starting with 2-6)"),
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

