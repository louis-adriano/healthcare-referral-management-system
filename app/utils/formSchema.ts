import { z } from "zod"

export const FormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date format",
  }),
  reasonForReferral: z.string().min(1, "Reason for referral is required"),
  urgencyLevel: z.enum(["Routine", "Urgent", "Emergency"], {
    required_error: "Urgency level is required",
  }),
  clinicalNotes: z.string().optional(),
})

export type FormData = z.infer<typeof FormSchema>

