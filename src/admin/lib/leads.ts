import { supabase } from "@/lib/supabase"
import type { Lead, LeadInput } from "@/admin/types"

export async function listLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Lead[]
}

export async function getLead(id: string): Promise<Lead | null> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  return data as Lead | null
}

export async function createLeadRecord(input: LeadInput): Promise<Lead> {
  const { data, error } = await supabase
    .from("leads")
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data as Lead
}

export async function updateLeadRecord(
  id: string,
  input: Partial<LeadInput>
): Promise<Lead> {
  const { data, error } = await supabase
    .from("leads")
    .update(input)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as Lead
}

export async function deleteLeadRecord(id: string): Promise<void> {
  const { error } = await supabase.from("leads").delete().eq("id", id)
  if (error) throw error
}
