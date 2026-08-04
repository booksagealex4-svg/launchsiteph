import { supabase } from "@/lib/supabase"
import type { Client, ClientInput } from "@/admin/types"

export async function listClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Client[]
}

export async function getClient(id: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  return data as Client | null
}

export async function createClientRecord(input: ClientInput): Promise<Client> {
  const { data, error } = await supabase
    .from("clients")
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data as Client
}

export async function updateClientRecord(
  id: string,
  input: Partial<ClientInput>
): Promise<Client> {
  const { data, error } = await supabase
    .from("clients")
    .update(input)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as Client
}

export async function deleteClientRecord(id: string): Promise<void> {
  const { error } = await supabase.from("clients").delete().eq("id", id)
  if (error) throw error
}
