"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FormSchema, type FormData } from "../utils/formSchema"
import { usePredictiveAddress } from "../hooks/usePredictiveAddress"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import type { Referral } from "@/app/utils/mockReferrals"
import { useNotifications } from "../context/notifications-context"

export function PatientReferralForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showJson, setShowJson] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { dispatch } = useNotifications()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })

  const { address, predictions, handleAddressChange, handlePredictionSelect } = usePredictiveAddress()

  const onSubmit = async (data: FormData) => {
    const newReferral: Referral = {
      id: uuidv4(),
      patientName: `${data.firstName} ${data.lastName}`,
      dateSubmitted: new Date().toISOString().split("T")[0],
      status: "Pending",
      urgencyLevel: data.urgencyLevel,
      reasonForReferral: data.reasonForReferral,
      clinicalNotes: data.clinicalNotes || "-",
      outcome: "",
      feedback: "",
    }

    const existingReferrals: Referral[] = JSON.parse(localStorage.getItem("referrals") || "[]")
    const updatedReferrals = [newReferral, ...existingReferrals]
    localStorage.setItem("referrals", JSON.stringify(updatedReferrals))

    // Create notification for new referral
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: uuidv4(),
        message: `New referral created for ${newReferral.patientName}`,
        timestamp: new Date().toISOString(),
        read: false,
        type: "new_referral",
        referralId: newReferral.id,
      },
    })

    toast({
      title: "Referral Submitted",
      description: `New referral created for ${newReferral.patientName}`,
    })

    setIsSubmitted(true)
    setTimeout(() => {
      router.push("/referrals")
    }, 2000)
  }

  const handleCopyJson = () => {
    const formData = watch()
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2))
    setCopyFeedback(true)
    setTimeout(() => setCopyFeedback(false), 2000)
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-2xl font-semibold">Referral created successfully!</h2>
          <p>Redirecting to referrals page...</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-bold text-gray-700">
            First Name
          </label>
          <Input
            id="firstName"
            placeholder="Enter patient's first name"
            {...register("firstName")}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-bold text-gray-700">
            Last Name
          </label>
          <Input
            id="lastName"
            placeholder="Enter patient's last name"
            {...register("lastName")}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-bold text-gray-700">
          Date of Birth
        </label>
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <Input
              type="date"
              id="dateOfBirth"
              {...field}
              value={field.value ? field.value.toISOString().split("T")[0] : ""}
              onChange={(e) => field.onChange(new Date(e.target.value))}
              max={new Date().toISOString().split("T")[0]}
              className={errors.dateOfBirth ? "border-red-500" : ""}
            />
          )}
        />
        {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth.message}</p>}
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-bold text-gray-700">
          Gender
        </label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter patient's email"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-700">
          Phone Number
        </label>
        <Input
          id="phoneNumber"
          placeholder="Enter Australian phone number"
          {...register("phoneNumber")}
          className={errors.phoneNumber ? "border-red-500" : ""}
        />
        {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-bold text-gray-700">
          Address
        </label>
        <Input
          id="address"
          value={address}
          onChange={(e) => {
            handleAddressChange(e)
            setValue("address", e.target.value)
          }}
          placeholder="Start typing an Australian address"
          className={errors.address ? "border-red-500" : ""}
        />
        {predictions.length > 0 && (
          <ul className="mt-1 border border-gray-200 rounded-md">
            {predictions.map((prediction) => (
              <li
                key={prediction.place_id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handlePredictionSelect(prediction)
                  setValue("address", prediction.description)
                }}
              >
                {prediction.description}
              </li>
            ))}
          </ul>
        )}
        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
      </div>

      <div>
        <label htmlFor="reasonForReferral" className="block text-sm font-bold text-gray-700">
          Reason for Referral
        </label>
        <Textarea
          id="reasonForReferral"
          placeholder="Describe the reason for referral"
          {...register("reasonForReferral")}
          className={errors.reasonForReferral ? "border-red-500" : ""}
        />
        {errors.reasonForReferral && <p className="mt-1 text-sm text-red-500">{errors.reasonForReferral.message}</p>}
      </div>

      <div>
        <label htmlFor="urgencyLevel" className="block text-sm font-bold text-gray-700">
          Urgency Level
        </label>
        <Controller
          control={control}
          name="urgencyLevel"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className={errors.urgencyLevel ? "border-red-500" : ""}>
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Routine">Routine</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.urgencyLevel && <p className="mt-1 text-sm text-red-500">{errors.urgencyLevel.message}</p>}
      </div>

      <div>
        <label htmlFor="clinicalNotes" className="block text-sm font-bold text-gray-700">
          Clinical Notes
        </label>
        <Textarea id="clinicalNotes" placeholder="Add any additional clinical notes" {...register("clinicalNotes")} />
      </div>

      <div className="border-2 border-gray-300 rounded-md p-4 bg-gray-50">
        <div className="flex items-center space-x-2">
          <Controller
            name="consentGiven"
            control={control}
            render={({ field }) => (
              <Checkbox id="consentGiven" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <label
            htmlFor="consentGiven"
            className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I confirm that I have obtained the patient&apos;s consent for this referral.
          </label>
        </div>
        {errors.consentGiven && <p className="mt-1 text-sm text-red-500">{errors.consentGiven.message}</p>}
      </div>

      <div className="flex space-x-4">
        <Button type="submit" className="w-full md:w-auto">
          Submit Referral
        </Button>
        <Button type="button" onClick={() => setShowJson(!showJson)} className="w-full md:w-auto">
          {showJson ? "Hide JSON" : "View JSON"}
        </Button>
        {showJson && (
          <Button
            type="button"
            onClick={handleCopyJson}
            className="w-full md:w-auto flex items-center space-x-1"
            variant="outline"
          >
            <Copy className="h-4 w-4" />
            <span>{copyFeedback ? "Copied!" : "Copy JSON"}</span>
          </Button>
        )}
      </div>
      {showJson && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <pre className="whitespace-pre-wrap">{JSON.stringify(watch(), null, 2)}</pre>
        </div>
      )}
    </form>
  )
}

