-- Add editable GCash payment settings to the website_settings singleton
alter table if exists website_settings
  add column if not exists gcash_number text,
  add column if not exists gcash_account_name text,
  add column if not exists gcash_qr text;

update website_settings set updated_at = now() where id = 'singleton';