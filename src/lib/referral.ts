export interface ReferralFormData {
  referrerName: string
  referrerMobile: string
  referrerEmail: string
  payoutMethod: string
  referredBusinessName: string
  referredContactName: string
  referredContactInfo: string
  notes: string
}

/**
 * Swap this implementation for a real endpoint (Formspree, mailto, or an
 * API route) before launch — same pattern as submitInquiry in
 * InquiryForm.tsx. Left as a stub so the rest of the form's behaviour can
 * be built and tested now.
 */
export async function submitReferral(_data: ReferralFormData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900))
}
