-- Run this in the Supabase SQL editor for your project.

create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  team text not null check (team in ('1st', '2nd')),
  voter_name text not null,
  nominee_name text not null,
  created_at timestamptz not null default now(),
  -- one vote per person per award (team)
  unique (team, voter_name)
);

alter table votes enable row level security;

-- No public policies are created: all access goes through the server-side
-- API routes using the service role key, so the anon/public key has zero
-- access to this table (voter identity + who they voted for stays private).
