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

-- Referrals table — fed by the public form at /referral. Unlike clients,
-- anyone can INSERT a new referral (that's the point of a public form),
-- but only an authenticated user (you) can read, update or delete rows.
create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_name text not null,
  referrer_mobile text not null,
  referrer_email text,
  payout_method text not null,
  referred_business_name text not null,
  referred_contact_name text not null,
  referred_contact_info text not null,
  notes text,
  status text not null default 'New',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table referrals enable row level security;

create policy "Anyone can submit a referral"
  on referrals
  for insert
  with check (true);

create policy "Authenticated users can view referrals"
  on referrals
  for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update referrals"
  on referrals
  for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can delete referrals"
  on referrals
  for delete
  using (auth.role() = 'authenticated');

drop trigger if exists referrals_set_updated_at on referrals;

create trigger referrals_set_updated_at
before update on referrals
for each row execute function set_updated_at();

-- Leads table — potential clients you're tracking before they sign on.
-- Admin-only, same access pattern as clients (not fed by any public form).
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  profession text,
  phone text,
  email text,
  address text,
  source text,
  status text not null default 'New',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table leads enable row level security;

create policy "Authenticated users can manage leads"
  on leads
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop trigger if exists leads_set_updated_at on leads;

create trigger leads_set_updated_at
before update on leads
for each row execute function set_updated_at();

-- After running this, create your login user under
-- Dashboard > Authentication > Users > Add user (email + password).
-- That's the only account that will be able to sign in at /admin.
