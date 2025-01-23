"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FormSchema, type FormData } from "../utils/formSchema"
import { usePredictiveAddress } from "../hooks/usePredictiveAddress"

export function PatientReferralForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })

  const { address, predictions, handleAddressChange, handlePredictionSelect } = usePredictiveAddress()

  useEffect(() => {
    console.log("Current predictions:", predictions)
  }, [predictions])

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted with data:", data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-2xl font-semibold">Referral created successfully!</h2>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <Input
          id="fullName"
          placeholder="Enter patient's full legal name"
          {...register("fullName")}
          className={errors.fullName ? "border-red-500" : ""}
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                >
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth.message}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <Input
          id="address"
          value={address}
          onChange={(e) => {
            handleAddressChange(e)
            setValue("address", e.target.value)
          }}
          placeholder="Start typing an address"
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
        <label htmlFor="reasonForReferral" className="block text-sm font-medium text-gray-700">
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
        <label htmlFor="urgencyLevel" className="block text-sm font-medium text-gray-700">
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
        <label htmlFor="clinicalNotes" className="block text-sm font-medium text-gray-700">
          Clinical Notes
        </label>
        <Textarea id="clinicalNotes" placeholder="Add any additional clinical notes" {...register("clinicalNotes")} />
      </div>

      <Button type="submit" className="w-full">
        Submit Referral
      </Button>

      {/* Debugging information */}
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h3 className="font-bold">Debugging Info:</h3>
        <p>Address: {address}</p>
        <p>Predictions Count: {predictions.length}</p>
        <p>Google Maps API Key: {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? "Set" : "Not Set"}</p>
      </div>
    </form>
  )
}

