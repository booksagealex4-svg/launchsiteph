export const PACKAGE_OPTIONS = ["Launch", "Momentum", "Authority", "Custom"] as const
export const PAYMENT_STATUS_OPTIONS = ["Unpaid", "Partial", "Paid"] as const
export const PROJECT_STATUS_OPTIONS = [
  "Inquiry",
  "Quoted",
  "In Progress",
  "Delivered",
  "Completed",
  "Cancelled",
] as const

export interface Client {
  id: string
  name: string
  business_name: string
  email: string | null
  phone: string | null
  package: (typeof PACKAGE_OPTIONS)[number]
  total_price: number
  amount_paid: number
  payment_status: (typeof PAYMENT_STATUS_OPTIONS)[number]
  start_date: string | null
  target_launch_date: string | null
  status: (typeof PROJECT_STATUS_OPTIONS)[number]
  notes: string | null
  created_at: string
  updated_at: string
}

export type ClientInput = Omit<Client, "id" | "created_at" | "updated_at">

export const REFERRAL_STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Client Converted",
  "Commission Paid",
  "Not Converted",
] as const

export interface Referral {
  id: string
  referrer_name: string
  referrer_mobile: string
  referrer_email: string | null
  payout_method: string
  referred_business_name: string
  referred_contact_name: string
  referred_contact_info: string
  notes: string | null
  status: (typeof REFERRAL_STATUS_OPTIONS)[number]
  created_at: string
  updated_at: string
}
