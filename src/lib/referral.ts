import { supabase } from "@/lib/supabase"

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
 * Writes the referral straight into Supabase (public insert is allowed by
 * the "referrals" table's RLS policy; only an authenticated admin can read
 * or manage rows afterward — see supabase/schema.sql). Submissions show up
 * in /admin/referrals.
 */
export async function submitReferral(data: ReferralFormData): Promise<void> {
  const { error } = await supabase.from("referrals").insert({
    referrer_name: data.referrerName,
    referrer_mobile: data.referrerMobile,
    referrer_email: data.referrerEmail || null,
    payout_method: data.payoutMethod,
    referred_business_name: data.referredBusinessName,
    referred_contact_name: data.referredContactName,
    referred_contact_info: data.referredContactInfo,
    notes: data.notes || null,
  })

  if (error) throw error
}
