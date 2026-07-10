-- Add payment_method and payment_status columns to orders
alter table if exists orders
  add column if not exists payment_method text,
  add column if not exists payment_status text default 'pending';

-- Create gcash_payments table for manual GCash payment verification
create table if not exists gcash_payments (
  id uuid default gen_random_uuid() primary key,
  order_id uuid not null references orders(id) on delete cascade,
  gcash_reference_number text not null,
  screenshot_url text,
  customer_email text not null,
  submitted_at timestamptz default now(),
  verified_at timestamptz,
  status text not null default 'pending'
);

-- Prevent reuse of the same GCash reference number
create unique index if not exists idx_gcash_payments_ref_no on gcash_payments (gcash_reference_number);

-- Index for admin panel queries by status
create index if not exists idx_gcash_payments_status on gcash_payments (status);
create index if not exists idx_orders_payment_status on orders (payment_status);
