-- Create table to record signup attempts for rate limiting
create table if not exists signup_attempts (
  id uuid default gen_random_uuid() primary key,
  ip text not null,
  created_at timestamptz default now()
);
create index if not exists signup_attempts_ip_created_at_idx on signup_attempts (ip, created_at);

-- Create carts table to persist a single cart per user
create table if not exists carts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  items jsonb not null,
  updated_at timestamptz default now(),
  constraint unique_user_cart unique (user_id)
);
create index if not exists carts_user_id_idx on carts (user_id);
