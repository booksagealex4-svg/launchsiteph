import { useState, type FormEvent } from "react"
import { useSearchParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FormField } from "@/components/contact/FormField"
import { RadioOptions } from "@/components/contact/RadioOptions"
import { BUSINESS_EMAIL } from "@/lib/site"

const industries = [
  "Healthcare",
  "Legal",
  "Architecture and Design",
  "Accounting and Finance",
  "Real Estate",
  "Restaurant and Cafe",
  "Hotel and Resort",
  "Education",
  "Fitness and Wellness",
  "Personal Brand",
  "Other",
] as const

const packageOptions = ["Not sure yet", "Launch", "Momentum", "Authority"] as const
const contactMethods = ["Messenger", "WhatsApp", "Call", "Email"] as const
const websiteOptions = [
  "No",
  "Yes but it needs replacing",
  "Only a Facebook page",
] as const

interface InquiryFormData {
  name: string
  businessName: string
  industry: string
  mobile: string
  email: string
  preferredContact: string
  packageInterest: string
  templateInterest: string
  hasWebsite: string
  message: string
}

type FormErrors = Partial<Record<keyof InquiryFormData, string>>

/**
 * Sends the inquiry as a pre-filled email to BUSINESS_EMAIL via a mailto:
 * link. No backend required — the visitor's own email client opens with
 * the message ready to send. Swap for a proper form endpoint (Formspree,
 * an API route) later if mailto's reliance on a configured mail client
 * becomes a problem.
 */
async function submitInquiry(data: InquiryFormData): Promise<void> {
  const subject = `New inquiry from ${data.name} — ${data.businessName}`
  const body = [
    `Name: ${data.name}`,
    `Business/practice: ${data.businessName}`,
    `Industry: ${data.industry}`,
    `Mobile: ${data.mobile}`,
    `Email: ${data.email}`,
    `Preferred contact method: ${data.preferredContact}`,
    `Package interest: ${data.packageInterest}`,
    `Template interest: ${data.templateInterest || "—"}`,
    `Already has a website: ${data.hasWebsite}`,
    "",
    "Message:",
    data.message || "(none)",
  ].join("\n")

  const mailtoUrl = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  // Brief delay so the "Sending..." state is visible before handing off
  // to the visitor's email client.
  await new Promise((resolve) => setTimeout(resolve, 400))
  window.location.href = mailtoUrl
}

function buildInitialState(searchParams: URLSearchParams): InquiryFormData {
  const packageParam = searchParams.get("package")
  const templateParam = searchParams.get("template")

  return {
    name: "",
    businessName: "",
    industry: "",
    mobile: "",
    email: "",
    preferredContact: "",
    packageInterest: packageOptions.includes(
      packageParam as (typeof packageOptions)[number]
    )
      ? (packageParam as string)
      : "Not sure yet",
    templateInterest: templateParam ?? "",
    hasWebsite: "",
    message: "",
  }
}

function validate(data: InquiryFormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) errors.name = "Please enter your name."
  if (!data.businessName.trim())
    errors.businessName = "Please enter your business or practice name."
  if (!data.industry) errors.industry = "Please select an industry."

  if (!data.mobile.trim()) {
    errors.mobile = "Please enter a mobile number."
  } else if (!/^[0-9+\-\s()]{7,}$/.test(data.mobile.trim())) {
    errors.mobile = "Please enter a valid mobile number."
  }

  if (!data.email.trim()) {
    errors.email = "Please enter an email address."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address."
  }

  if (!data.preferredContact)
    errors.preferredContact = "Please choose a preferred contact method."
  if (!data.hasWebsite)
    errors.hasWebsite = "Please let us know if you have a website."

  return errors
}

export function InquiryForm() {
  const [searchParams] = useSearchParams()
  const [data, setData] = useState<InquiryFormData>(() =>
    buildInitialState(searchParams)
  )
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  )

  const update = <K extends keyof InquiryFormData>(
    key: K,
    value: InquiryFormData[K]
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
      await submitInquiry(data)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[14px] border border-border bg-surface p-8 text-center">
        <h2 className="text-foreground">Almost there.</h2>
        <p className="mt-3 text-muted-foreground">
          Your email app should have opened with your message ready. Hit
          send there to complete your inquiry, and you will hear back
          within one business day.
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
          Something went wrong sending your message. Please try again, or
          message us directly on Messenger or WhatsApp.
        </div>
      )}

      <FormField label="Name" htmlFor="name" required error={errors.name}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </FormField>

      <FormField
        label="Business or practice name"
        htmlFor="businessName"
        required
        error={errors.businessName}
      >
        <Input
          id="businessName"
          name="businessName"
          value={data.businessName}
          onChange={(e) => update("businessName", e.target.value)}
        />
      </FormField>

      <FormField
        label="Industry"
        htmlFor="industry"
        required
        error={errors.industry}
      >
        <Select
          id="industry"
          name="industry"
          value={data.industry}
          onChange={(e) => update("industry", e.target.value)}
        >
          <option value="">Select industry</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </Select>
      </FormField>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Mobile number"
          htmlFor="mobile"
          required
          error={errors.mobile}
        >
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            autoComplete="tel"
            value={data.mobile}
            onChange={(e) => update("mobile", e.target.value)}
          />
        </FormField>

        <FormField label="Email" htmlFor="email" required error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </FormField>
      </div>

      <FormField
        label="Preferred contact method"
        htmlFor="preferredContact"
        required
        error={errors.preferredContact}
      >
        <RadioOptions
          name="preferredContact"
          value={data.preferredContact}
          onChange={(value) => update("preferredContact", value)}
          options={contactMethods}
        />
      </FormField>

      <FormField label="Package interest" htmlFor="packageInterest">
        <Select
          id="packageInterest"
          name="packageInterest"
          value={data.packageInterest}
          onChange={(e) => update("packageInterest", e.target.value)}
        >
          {packageOptions.map((pkg) => (
            <option key={pkg} value={pkg}>
              {pkg}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="Template interest" htmlFor="templateInterest">
        <Input
          id="templateInterest"
          name="templateInterest"
          placeholder="e.g. Meridian"
          value={data.templateInterest}
          onChange={(e) => update("templateInterest", e.target.value)}
        />
      </FormField>

      <FormField
        label="Do you already have a website?"
        htmlFor="hasWebsite"
        required
        error={errors.hasWebsite}
      >
        <RadioOptions
          name="hasWebsite"
          value={data.hasWebsite}
          onChange={(value) => update("hasWebsite", value)}
          options={websiteOptions}
        />
      </FormField>

      <FormField label="Message" htmlFor="message">
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us a bit about what you need."
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </FormField>

      <Button type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Sending..." : "Send inquiry"}
      </Button>
    </form>
  )
}
