-- Schema reservations pour Supabase
create table if not exists public.reservations (
  id text primary key,
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  duration text not null check (duration in ('30min', '1h')),
  formula text not null check (formula in ('duo', 'trio')),
  date text not null,
  time text not null,
  status text not null check (status in ('pending', 'accepted', 'refused', 'rescheduled')),
  created_at text not null,
  message text
);

create index if not exists reservations_created_at_idx
  on public.reservations (created_at desc);

alter table public.reservations enable row level security;

-- On bloque l'acces public par defaut.
drop policy if exists "deny anon select reservations" on public.reservations;
create policy "deny anon select reservations"
on public.reservations
for select
to anon
using (false);

drop policy if exists "deny anon insert reservations" on public.reservations;
create policy "deny anon insert reservations"
on public.reservations
for insert
to anon
with check (false);
