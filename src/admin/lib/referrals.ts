import { supabase } from "@/lib/supabase"
import type { Referral } from "@/admin/types"

export async function listReferrals(): Promise<Referral[]> {
  const { data, error } = await supabase
    .from("referrals")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Referral[]
}

export async function updateReferralStatus(
  id: string,
  status: Referral["status"]
): Promise<void> {
  const { error } = await supabase
    .from("referrals")
    .update({ status })
    .eq("id", id)

  if (error) throw error
}

export async function deleteReferralRecord(id: string): Promise<void> {
  const { error } = await supabase.from("referrals").delete().eq("id", id)
  if (error) throw error
}
