import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormField } from "@/components/contact/FormField"
import { RadioOptions } from "@/components/contact/RadioOptions"
import { submitReferral, type ReferralFormData } from "@/lib/referral"

const payoutMethods = ["GCash", "Maya", "Bank transfer"] as const

type FormErrors = Partial<Record<keyof ReferralFormData, string>>

const emptyForm: ReferralFormData = {
  referrerName: "",
  referrerMobile: "",
  referrerEmail: "",
  payoutMethod: "",
  referredBusinessName: "",
  referredContactName: "",
  referredContactInfo: "",
  notes: "",
}

function validate(data: ReferralFormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.referrerName.trim())
    errors.referrerName = "Please enter your name."

  if (!data.referrerMobile.trim()) {
    errors.referrerMobile = "Please enter a mobile number."
  } else if (!/^[0-9+\-\s()]{7,}$/.test(data.referrerMobile.trim())) {
    errors.referrerMobile = "Please enter a valid mobile number."
  }

  if (!data.payoutMethod)
    errors.payoutMethod = "Please choose how you'd like to be paid."

  if (!data.referredBusinessName.trim())
    errors.referredBusinessName = "Please enter the business name."

  if (!data.referredContactName.trim())
    errors.referredContactName = "Please enter a contact name."

  if (!data.referredContactInfo.trim())
    errors.referredContactInfo =
      "Please enter a mobile number or email for them."

  return errors
}

export function ReferralForm() {
  const [data, setData] = useState<ReferralFormData>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle")

  const update = <K extends keyof ReferralFormData>(
    key: K,
    value: ReferralFormData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus("submitting")
    try {
      await submitReferral(data)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[14px] border border-border bg-surface p-8 text-center">
        <h2 className="text-foreground">Thank you.</h2>
        <p className="mt-3 text-muted-foreground">
          We will reach out to {data.referredContactName || "them"} soon,
          and message you once it's confirmed.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {status === "error" && (
        <div
          role="alert"
          className="rounded-[10px] border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground"
        >
          Something went wrong sending your referral. Please try again, or
          message us directly on Messenger or WhatsApp.
        </div>
      )}

      <p className="text-sm font-semibold text-foreground">Your details</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Your name"
          htmlFor="referrerName"
          required
          error={errors.referrerName}
        >
          <Input
            id="referrerName"
            name="referrerName"
            autoComplete="name"
            value={data.referrerName}
            onChange={(e) => update("referrerName", e.target.value)}
          />
        </FormField>

        <FormField
          label="Your mobile number"
          htmlFor="referrerMobile"
          required
          error={errors.referrerMobile}
        >
          <Input
            id="referrerMobile"
            name="referrerMobile"
            type="tel"
            autoComplete="tel"
            value={data.referrerMobile}
            onChange={(e) => update("referrerMobile", e.target.value)}
          />
        </FormField>
      </div>

      <FormField label="Your email" htmlFor="referrerEmail">
        <Input
          id="referrerEmail"
          name="referrerEmail"
          type="email"
          autoComplete="email"
          value={data.referrerEmail}
          onChange={(e) => update("referrerEmail", e.target.value)}
        />
      </FormField>

      <FormField
        label="How should we pay your PHP 1,000?"
        htmlFor="payoutMethod"
        required
        error={errors.payoutMethod}
      >
        <RadioOptions
          name="payoutMethod"
          value={data.payoutMethod}
          onChange={(value) => update("payoutMethod", value)}
          options={payoutMethods}
        />
      </FormField>

      <div className="mt-2 border-t border-border pt-6">
        <p className="text-sm font-semibold text-foreground">
          Who you're referring
        </p>
      </div>

      <FormField
        label="Their business name"
        htmlFor="referredBusinessName"
        required
        error={errors.referredBusinessName}
      >
        <Input
          id="referredBusinessName"
          name="referredBusinessName"
          value={data.referredBusinessName}
          onChange={(e) => update("referredBusinessName", e.target.value)}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Contact name"
          htmlFor="referredContactName"
          required
          error={errors.referredContactName}
        >
          <Input
            id="referredContactName"
            name="referredContactName"
            value={data.referredContactName}
            onChange={(e) => update("referredContactName", e.target.value)}
          />
        </FormField>

        <FormField
          label="Their mobile or email"
          htmlFor="referredContactInfo"
          required
          error={errors.referredContactInfo}
        >
          <Input
            id="referredContactInfo"
            name="referredContactInfo"
            value={data.referredContactInfo}
            onChange={(e) => update("referredContactInfo", e.target.value)}
          />
        </FormField>
      </div>

      <FormField label="Anything else we should know?" htmlFor="notes">
        <Textarea
          id="notes"
          name="notes"
          placeholder="Optional"
          value={data.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </FormField>

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full"
      >
        {status === "submitting" ? "Sending..." : "Submit referral"}
      </Button>
    </form>
  )
}
