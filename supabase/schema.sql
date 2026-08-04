-- Run this once in your Supabase project's SQL editor (Dashboard > SQL Editor > New query).
-- Creates the clients table used by the admin tracker at /admin, with row level
-- security so only an authenticated user (you) can read or write rows.

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text not null,
  email text,
  phone text,
  package text not null default 'Launch',
  total_price numeric not null default 0,
  amount_paid numeric not null default 0,
  payment_status text not null default 'Unpaid',
  start_date date,
  target_launch_date date,
  status text not null default 'Inquiry',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table clients enable row level security;

create policy "Authenticated users can manage clients"
  on clients
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists clients_set_updated_at on clients;

create trigger clients_set_updated_at
before update on clients
for each row execute function set_updated_at();

-- After running this, create your login user under
-- Dashboard > Authentication > Users > Add user (email + password).
-- That's the only account that will be able to sign in at /admin.
