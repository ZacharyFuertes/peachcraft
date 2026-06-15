-- Create cart_items table for item-level cart persistence
create table if not exists cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  product_id uuid not null,
  qty integer not null,
  price numeric not null,
  name text not null,
  image text,
  swatch text,
  stock_qty integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint cart_item_unique_per_user_product unique (user_id, product_id)
);
create index if not exists cart_items_user_id_idx on cart_items (user_id);

-- Track add attempts for rate limiting
create table if not exists cart_add_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now()
);
create index if not exists cart_add_attempts_user_id_created_at_idx on cart_add_attempts (user_id, created_at);
