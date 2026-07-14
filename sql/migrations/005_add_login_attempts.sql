-- Table for login rate limiting (IP-based, rolling 1-hour window)
create table if not exists login_attempts (
  id uuid default gen_random_uuid() primary key,
  ip text not null,
  created_at timestamptz default now()
);
create index if not exists login_attempts_ip_created_at_idx on login_attempts (ip, created_at);

-- Add turnstile_token column to existing tables that need CAPTCHA verification
alter table signup_attempts add column if not exists turnstile_token text;

-- Table for order rate limiting (IP-based, rolling 1-hour window)
create table if not exists order_attempts (
  id uuid default gen_random_uuid() primary key,
  ip text not null,
  user_id uuid references profiles(id) on delete set null,
  created_at timestamptz default now()
);
create index if not exists order_attempts_ip_created_at_idx on order_attempts (ip, created_at);
create index if not exists order_attempts_user_created_at_idx on order_attempts (user_id, created_at);
