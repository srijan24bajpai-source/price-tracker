-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.

create table if not exists public.submissions (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 2 and 120),
  category text not null,
  sub text,
  price numeric not null check (price >= 0),
  unit text default 'unit',
  seller text,
  city text,
  country text,
  product_id text, -- set when the report is a new price for an existing listed item
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id bigint generated always as identity primary key,
  product_id text not null,
  name text not null default 'Anonymous',
  text text not null check (char_length(text) between 1 and 1000),
  price numeric check (price is null or price >= 0),
  place text,
  created_at timestamptz not null default now()
);

-- If you already ran the first version of this file, run just this line:
alter table public.submissions add column if not exists product_id text;

alter table public.submissions enable row level security;
alter table public.comments enable row level security;

-- Anyone may submit, but only as 'pending'
create policy "anyone can submit" on public.submissions
  for insert to anon, authenticated with check (status = 'pending');

-- Signed-in admin may add entries that go live immediately
create policy "admin inserts any" on public.submissions
  for insert to authenticated with check (true);

-- Public sees approved only; signed-in admin sees everything
create policy "public reads approved" on public.submissions
  for select to anon using (status = 'approved');
create policy "admin reads all" on public.submissions
  for select to authenticated using (true);

-- Only signed-in admin can approve / reject / delete
create policy "admin updates" on public.submissions
  for update to authenticated using (true) with check (true);
create policy "admin deletes" on public.submissions
  for delete to authenticated using (true);

-- Comments: public read + write
create policy "anyone reads comments" on public.comments for select to anon, authenticated using (true);
create policy "anyone adds comments" on public.comments for insert to anon, authenticated with check (true);
create policy "admin deletes comments" on public.comments for delete to authenticated using (true);

-- Then: Authentication -> Users -> Add user (your admin email + password),
-- and turn OFF "Allow new users to sign up" (Authentication -> Providers -> Email)
-- so nobody else can become an authenticated admin.

-- Daily price snapshots, written by the /api/daily-snapshot Vercel cron job (service role key, server-side only).
create table if not exists public.price_history (
  day date not null,
  item_id text not null,
  price numeric not null,
  source text,
  primary key (day, item_id)
);
alter table public.price_history enable row level security;
-- Everyone can read the history; nobody but the server (service role bypasses RLS) can write it.
create policy "public reads price history" on public.price_history for select to anon, authenticated using (true);
