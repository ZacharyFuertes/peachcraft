-- Enable RLS on carts table
-- This is required because saveCartForUser/getCartForUser use authOnly: true (anon key)
-- RLS ensures users can only see/modify their own cart

alter table carts enable row level security;

create policy "Users manage own cart"
  on carts
  for all
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
